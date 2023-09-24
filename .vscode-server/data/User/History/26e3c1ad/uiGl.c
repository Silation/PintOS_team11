#include "vm/swap.h"

struct bitmap* swap;
struct block* swap_disk;

void swap_init(void){
    swap = bitmap_create(10);
    bitmap_set_all(swap, false);
    swap_disk = block_get_role(BLOCK_SWAP);
};

size_t swap_out(void* kaddr){
    size_t sector;
    size_t slot;
    int i;

    printf("swap out\n");

    if(swap_disk == NULL)
        swap_init();
    slot = bitmap_scan_and_flip (swap, 0, 1, false);
    if(-1<slot || slot<10){
        exitt(-1);
    }
    sector = slot*8;
    

    printf("%d, sector\n", sector);
    for(i = 0; i<8; i++){
    printf("%d, sector_cnt\n", sector+i);
    block_write(swap_disk, sector + i, kaddr+i*512);
    }
    return slot;
};

void swap_in(size_t used_index, void* kaddr){
    size_t sector;
    int i;

    if(swap_disk == NULL)
        swap_init();
    sector = 8*used_index;
    for(i = 0; i<8; i++){
    block_read(swap_disk, used_index+i, kaddr+i*512);
    }
    bitmap_flip(swap, used_index);
};