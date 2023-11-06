
struct bitmap* swap;
struct block* swap_disk = block_get_role(BLOCK_SWAP);

void swap_init(void){
    swap = bitmap_create(80);
};

size_t swap_out(void* kaddr){
    size_t sector;
    //bitmap으로 찾음
    block_write(swap_disk, sector, kaddr);
    return esctor
};

void swap_in(size_t used_index, void* kaddr){
    block_read(swap_disk, used_index, kaddr);
    //bitmap 0으로 바꿈
};