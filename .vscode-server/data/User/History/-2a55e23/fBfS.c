struct page* alloc_page(enum palloc_flags flags) {
    uint8_t *kpage = palloc_get_page(flags);
    if(kpage == NULL)
        kpage = try_to_free_pages(flags);
    struct page* page = malloc(sizeof(struct page));
    page->kaddr = kpage;
    page->thread=thread_current();
    add_page_lru(page);
    return page;
}

void __free_page(struct page* page) {
    struct thread* t = thread_current();
    switch(page->vme->type) {
        case VM_BIN:
            if(pagedir_is_dirty(t->pagedir, page->vme->vaddr)){
                page->vme->swap_slot = swap_out(page->kaddr);
                page->vme->type = VM_ANON;
            }
        case VM_FILE:
            if(pagedir_is_dirty(t->pagedir, page->vme->vaddr))
                file_write_at(page->vme->file, pagedir_get_page (t->pagedir, page->vme->vaddr), PGSIZE, page->vme->offset);
        case VM_ANON:
            page->vme->swap_slot = swap_out(page->kaddr);
    }
    del_page_lru(page);
    palloc_free_page(page->kaddr);
    free(page);
}

static struct list_elem* get_victim() {
    struct page *t;
    struct list_elem* elem;
    elem = list_next(lru_table.lru_clock);
    if(elem == list_tail(&lru_table.lru_list))
        return NULL;
    return elem;

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


