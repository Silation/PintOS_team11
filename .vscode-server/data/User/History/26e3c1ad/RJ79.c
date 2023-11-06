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
    size_t slot
    int i;

    slot = bitmap_scan_and_flip (swap, 0, 1, false);
    sector = slot*8;

    for(i = 0; i<8; i++){
    block_write(swap_disk, sector + i, kaddr+i*512);
    }
    return slot;
};

void swap_in(size_t used_index, void* kaddr){
    block_read(swap_disk, used_index, kaddr);
    //bitmap 0으로 바꿈
};