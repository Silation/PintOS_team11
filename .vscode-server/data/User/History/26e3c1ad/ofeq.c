#include "vm/swap.h"
struct bitmap* swap;
struct block* swap_disk;

void swap_init(void){
    swap = bitmap_create(10);
    bitmap_set_all(swap, false);
    swap_disk = = block_get_role(BLOCK_SWAP);
};

size_t swap_out(void* kaddr){
    size_t sector;
    sector = bitmap_scan_and_flip (swap, 0, 1, false);
    for(sector)
    block_write(swap_disk, sector, kaddr);
    return esctor
};

void swap_in(size_t used_index, void* kaddr){
    block_read(swap_disk, used_index, kaddr);
    //bitmap 0으로 바꿈
};