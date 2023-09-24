#include "vm/page.h"
#include "threads/malloc.h"
#include "userprog/pagedir.h"
#include "threads/palloc.h"


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
    struct vm_entry* temp = hash_entry(&(vme->elem), struct vm_entry, elem);
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
    list_remove(&page->lru);
    lock_release(&lru_table.lru_lock);
}



