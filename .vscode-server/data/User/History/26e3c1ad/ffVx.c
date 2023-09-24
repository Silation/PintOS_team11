#include "vm/swap.h"
struct bitmap* swap;
struct block* swap_disk;

void swap_init(void){
    swap = bitmap_create(80);
    bitmap_set_all(swap, false);
    swap_disk = = block_get_role(BLOCK_SWAP);
};

size_t swap_out(void* kaddr){
    size_t sector;
    bitmap_scan_and_flip (struct bitmap *b, size_t start, size_t cnt, bool value);
    block_write(swap_disk, sector, kaddr);
    return esctor
};

void swap_in(size_t used_index, void* kaddr){
    block_read(swap_disk, used_index, kaddr);
    //bitmap 0으로 바꿈
};