void lru_list_init(struct list_lru* lru_table);
void add_page_lru(struct page* page);
void del_page_lru(struct page* page);
void free_page(void *kaddr);
uint8_t* try_to_free_pages(enum palloc_flags flags);