#include <hash.h>
#include "threads/vaddr.h"
#include "lib/kernel/list.h"
//#include "threads/thread.h"

#define VM_BIN 0
#define VM_FILE 1       // memory mapped file
#define VM_ANON 2       // swap



struct vm_entry {
    uint8_t type;
    void *vaddr;
    bool writable;

    bool is_loaded;
    struct file* file;

    struct list_elem mmap_elem;

    size_t offset;
    size_t read_bytes;
    size_t zero_bytes;

    size_t swap_slot;

    struct hash_elem elem;
};

struct mmap_file {
    int mapid;
    struct file* file;
    struct list_elem elem;
    struct list vme_list;
};

struct page{
    void *kaddr;
    struct vm_entry *vme;
    struct thread* thread;
    struct list_elem lru;
};

struct list_lru{
    struct list lru_list;
    struct lock lru_lock;
    struct list_elem* lru_clock;
};

struct list_lru lru_table;

void lru_list_init(struct list_lru* lru_table);
void add_page_lru(struct page* page);
void del_page_lru(struct page* page);
void vm_init(struct hash * vm);
static unsigned vm_hash_func(const struct hash_elem *e, void *aux);
bool vm_less_func (const struct hash_elem *a, const struct hash_elem *b, void *aux);
void vm_destroy (struct hash *vm);
bool insert_vme (struct hash *vm, struct vm_entry *vme);
bool delete_vme (struct hash *vm, struct vm_entry *vme);
struct vm_entry *find_vme (struct hash *vm, void *vaddr);
bool load_file (void *kaddr, struct vm_entry *vme);
void free_page(void *kaddr);
uint8_t* try_to_free_pages(enum palloc_flags flags);
struct page* alloc_page(enum palloc_flags flags);
static struct list_elem* get_victim();
void __free_page(struct page* page);
