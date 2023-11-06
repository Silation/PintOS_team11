void free_page(void *kaddr);
uint8_t* try_to_free_pages(int flags);
struct page* alloc_page(int flags);
static struct list_elem* get_victim();
void __free_page(struct page* page);