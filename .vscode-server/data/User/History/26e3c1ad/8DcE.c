#include "vm/swap.h"
#include "vm/page.h"

struct bitmap* swap;
struct block* swap_disk;

void swap_init(void){
    lock_acquire(&file_lock);
    swap = bitmap_create(10);
    bitmap_set_all(swap, false);
    swap_disk = block_get_role(BLOCK_SWAP);
    lock_release(&file_lock);
};

size_t swap_out(void* kaddr){
    size_t sector;
    size_t slot;
    int i;
    
    //exit(-1);
    //printf("swap out\n");
    lock_acquire(&file_lock);

    if(swap_disk == NULL)
        swap_init();
    slot = bitmap_scan_and_flip (swap, 0, 1, false);

    sector = slot*8;
    

    //printf("%d, sector\n", sector);
    for(i = 0; i<8; i++){
    //printf("%d, sector_cnt\n", sector+i);
    block_write(swap_disk, sector + i, kaddr+i*512);
    }

    lock_release(&file_lock);
    return slot;
};

void swap_in(size_t used_index, void* kaddr){
    size_t sector;
    int i;
    //printf("swap in\n");
    lock_acquire(&file_lock);

    if(swap_disk == NULL)
        swap_init();
    sector = 8*used_index;
    for(i = 0; i<8; i++){
        block_read(swap_disk, used_index+i, kaddr+i*512);
    }
    bitmap_flip(swap, used_index);
    lock_release(&file_lock);
   // printf("문제없음\n");
};