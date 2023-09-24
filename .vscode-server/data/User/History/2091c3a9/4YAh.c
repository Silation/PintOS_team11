#include "vm/page.h"
#include "threads/malloc.h"
#include "userprog/pagedir.h"
#include "threads/thread.h"
#include "vm/swap.h"


static unsigned vm_hash_func(const struct hash_elem *e, void *aux) {
    void* vaddr = hash_entry(e, struct vm_entry, elem)->vaddr;
    return hash_int(vaddr);
}

bool vm_less_func (const struct hash_elem *a, const struct hash_elem *b, void *aux){
    void* vaddr1 = hash_entry(a, struct vm_entry, elem)->vaddr;
    void* vaddr2 = hash_entry(b, struct vm_entry, elem)->vaddr;
    //printf("%0x,%0x, less_vaddr\n", vaddr1, vaddr2);
    return (vaddr1 < vaddr2);
}

void vm_init(struct hash * vm) {
    hash_init(vm, vm_hash_func, vm_less_func, 0);
}



void vm_destroy_func (struct hash_elem *e, void *aux) {
    free(hash_entry(e, struct vm_entry, elem));
}

void vm_destroy (struct hash *vm) {
    hash_destroy(vm, vm_destroy_func);
}



bool insert_vme (struct hash *vm, struct vm_entry *vme) {
    //struct vm_entry* temp = hash_entry(&(vme->elem), struct vm_entry, elem);
    //printf("%0x, %0x,insert_vaddr\n", vme->vaddr, temp->vaddr);
    if(hash_insert(vm, &vme->elem))
        return false;
    return true;
}

bool delete_vme (struct hash *vm, struct vm_entry *vme) {
    if(hash_delete(vm, &vme->elem))
        return true;
    return false;
}


struct vm_entry *find_vme (struct hash *vm, void *vaddr) {
    void* vaddr_rounded = pg_round_down(vaddr);
    struct vm_entry temp;
    temp.vaddr = vaddr_rounded;

    struct hash_elem* find_elem = hash_find(vm, &temp.elem);
    if(find_elem == NULL)
        return NULL;
    
    return hash_entry(find_elem, struct vm_entry, elem);
}

bool load_file (void *kaddr, struct vm_entry *vme){
    bool success;
    uint8_t *zero_start = (uint8_t *) (kaddr + vme->read_bytes);
    int i;
    int a;
    //printf("%0x,%0x,%0x, offset, read_bytes, zero_bytes\n", vme->offset, vme->read_bytes, vme->zero_bytes);
    //file_seek(vme->file, vme->offset);
    //a = file_read(vme->file, kaddr, vme->read_bytes);
    a = file_read_at(vme->file, kaddr, vme->read_bytes, vme->offset);

    for(i = 0; i<vme->zero_bytes;i++) {
        *(char*)(kaddr+a+i) = 0;
    }
    
    if(a==vme->read_bytes){
        vme->is_loaded = 1;
        return 1;
    }
    return 0;
}

void lru_list_init(struct list_lru* lru_table) {
    list_init(&lru_table->lru_list);
    lock_init(&lru_table->lru_lock);
    lru_table->lru_clock = NULL;
}



void add_page_lru(struct page* page) {
    lock_acquire(&lru_table.lru_lock);
    list_push_back(&lru_table.lru_list, &page->lru);
    lock_release(&lru_table.lru_lock);
}

void del_page_lru(struct page* page) {
    lock_acquire(&lru_table.lru_lock);
    if()
    list_remove(&page->lru);
    lock_release(&lru_table.lru_lock);
}

struct page* alloc_page(int flags) {
    //printf("alloc_page\n");
    uint8_t *kpage = palloc_get_page(flags);
    if(kpage == NULL){
        printf("no free page\n");
        kpage = try_to_free_pages(flags);}
    struct page* page = malloc(sizeof(struct page));
    page->kaddr = kpage;
    page->thread=thread_current();
    add_page_lru(page);

    return page;
}

void free_page(void *kaddr) {
    //printf("free_pages\n");
    lock_acquire(&lru_table.lru_lock);
    struct list_elem *e;
    for (e = list_begin (&lru_table.lru_list); e != list_end (&lru_table.lru_list); e = list_next (e)) {
      struct page *t = list_entry (e, struct page, lru);
      if(t->kaddr == kaddr) {
        __free_page(t); break;
      }
    }
    lock_release(&lru_table.lru_lock);
}

uint8_t* try_to_free_pages(int flags){
    //printf("try_to_free_pages\n");
    struct list_elem* victim;
    victim = get_victim();
    free_page(list_entry(victim, struct page, lru)->kaddr);
    return palloc_get_page(flags);
}

void __free_page(struct page* page) {
    struct thread* t = thread_current();
    switch(page->vme->type) {
        case VM_BIN:
            if(pagedir_is_dirty(t->pagedir, page->vme->vaddr) && !page->vme->writable){
                printf("VM_BIN swap out, dirty : %d \n", pagedir_is_dirty(t->pagedir, page->vme->vaddr));
                page->vme->swap_slot = swap_out(page->kaddr);
                page->vme->type = VM_ANON;
            }
            break;
        case VM_FILE:
            if(pagedir_is_dirty(t->pagedir, page->vme->vaddr))
                file_write_at(page->vme->file, pagedir_get_page (t->pagedir, page->vme->vaddr), PGSIZE, page->vme->offset);
            break;
        case VM_ANON:
            printf("VM_ANON swap out\n");
            page->vme->swap_slot = swap_out(page->kaddr);
            break;
    }
    printf("free called\n");
    pagedir_clear_page(page->thread->pagedir, page->vme->vaddr);
    del_page_lru(page);
    palloc_free_page(page->kaddr);
    free(page);
}

static struct list_elem* get_victim() {
    struct page *t;
    struct list_elem* elem;
    //elem = list_next(lru_table.lru_clock);
    //if(elem == list_tail(&lru_table.lru_list))
    //    return NULL;
    //return elem;
    if(list_empty(&lru_table.lru_list)) 
        return NULL;

    while(1){
        if(lru_table.lru_clock == NULL) {
            lru_table.lru_clock = list_begin(&lru_table.lru_list);
        }
        for(elem = lru_table.lru_clock; elem != list_end(&lru_table.lru_list); elem = list_next(elem)){
            t = list_entry (elem, struct page, lru);
            lru_table.lru_clock = list_next(elem);
            if(lru_table.lru_clock == list_tail(&lru_table.lru_list)) {
                lru_table.lru_clock = list_begin(&lru_table.lru_list);
            }

            if(!pagedir_is_accessed(thread_current()->pagedir, t->vme->vaddr)){
                return elem;
            } else {
                pagedir_set_accessed (thread_current()->pagedir, t->vme->vaddr, false);
            }   
        }
    }
}


