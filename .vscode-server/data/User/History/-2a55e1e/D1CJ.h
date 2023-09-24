#include "vm/page.h"

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
void free_page(void *kaddr);
uint8_t* try_to_free_pages(enum palloc_flags flags);
struct page* alloc_page(enum palloc_flags flags);
static struct list_elem* get_victim();
void __free_page(struct page* page);