#include "userprog/syscall.h"
#include <stdio.h>
#include <syscall-nr.h>
#include "devices/shutdown.h"
#include "threads/interrupt.h"
#include "threads/thread.h"
#include "threads/synch.h"
#include "threads/vaddr.h"
#include "lib/kernel/stdio.h"
#include "lib/kernel/list.h"
#include "filesys/file.h"

#define CLOSE_ALL -1
struct lock read_write_lock;

static void syscall_handler (struct intr_frame *);

void
syscall_init (void) 
{
  intr_register_int (0x30, 3, INTR_ON, syscall_handler, "syscall");
  lock_init(&read_write_lock);
}

struct vm_entry * check_pointer(void* ptr);
void check_string(const char* ptr);
void check_buffer_read(const char* ptr, unsigned size);
void check_buffer_write(const char* ptr, unsigned size);
void exit(int status);
void halt(void);
int exec(char* cmd_line);
bool create(const char * file, unsigned size);
bool remove(const char * file);
int open(const char* file);
int filesize(int fd);
int read(int fd, void* buffer, unsigned size);
int write(int fd, void* buffer, unsigned size);
void seek(int fd , unsigned position);
unsigned tell(int fd);
void close(int fd);
int mmap(int fd, void* addr);
bool check_unmapped_addr(void* addr,int page_num);
struct vm_entry* mmap_vm_entry(struct file* file, void* addr, int file_length, int page_cnt, int page_num);
void munmap(int mapping);
void do_unmap(struct mmap_file* mmap_file);

static void
syscall_handler (struct intr_frame *f UNUSED) 
{
  // from f, get the esp
  void* esp_ = f->esp;
  check_pointer(esp_+4);

  // from esp, get the syscall numner.
  // and increment esp.
  int syscall_number = *((int*)esp_);
  esp_ = esp_+ 4;

  int exit_status;
  int fd;
  const char * file;
  void *buffer;
  unsigned size;
  unsigned position;
  const char * cmd_line;
  int pid;
  struct thread* t = thread_current();
  void * addr;
  int mapid;

  // switch statement
  switch(syscall_number) { 
    case SYS_HALT:
      halt();
      break;

    case SYS_EXIT:
      exit_status = *((unsigned int*)esp_);
      exit(exit_status);
      break;

    case SYS_EXEC:
      check_pointer(esp_+4);
      cmd_line = *((char **)esp_);
      check_string(cmd_line);
      f->eax = exec(cmd_line);
      break;

    case SYS_WAIT:
      pid = *((const int *)esp_);
      f->eax = process_wait(pid);
      break;

    case SYS_CREATE:
      file = *((const char **)esp_);
      esp_+=4;
      size = *((unsigned*)esp_);
      check_pointer(file);
      f->eax = create(file, size);
      break;

    case SYS_REMOVE:
      file = *((const char **)esp_);
      f->eax = remove(file);
      break;

    case SYS_OPEN:
      file = *((const char **)esp_);
      check_pointer(file);
      f->eax = open(file);
      break;

    case SYS_FILESIZE:
      fd = *((int *)esp_);
      f->eax = filesize(fd);
      break;

    case SYS_READ:
      fd = *((int*)esp_);
      esp_+=4;
      buffer = *((void**)esp_);
      esp_+=4;
      size = *((unsigned int*)esp_);
      check_buffer_read(buffer, size);
      f->eax = read(fd, buffer, size);
      break;

    case SYS_WRITE:
      fd = *((int*)esp_);
      esp_+=4;
      buffer = *((void**)esp_);
      esp_+=4;
      size = *((unsigned*)esp_);
      check_buffer_write(buffer, size);
      f->eax = write(fd, buffer, size);
      break;

    case SYS_SEEK:
      fd = *((int*)esp_);
      esp_ = esp_+ 4;
      position = *((unsigned*)esp_);
      esp_ = esp_+ 4;
      seek(fd, position);
      break;

    case SYS_TELL:
      fd = *((int*)esp_);
      f->eax = tell(fd);
      break;

    case SYS_CLOSE:
      fd = *((int*)esp_);
      close(fd);
      break;

    case SYS_MMAP:
      fd = *((int*)esp_);
      esp_ = esp_+4;
      addr = *((void**)esp_);
      mmap(fd, addr);

    case SYS_MUNMAP:
      mapid = *((int*)esp_);
      munmap(mapid);
  }
  
}


struct vm_entry *
check_pointer(void* ptr) {
  struct thread* t = thread_current();
  if(!is_user_vaddr(ptr) || find_vme(&thread_current()->vm, ptr) == NULL) 
    exit(-1);
  return find_vme(&thread_current()->vm, ptr);
}

void
check_string(const char* ptr){
  char* temp = ptr;
  struct vm_entry* vme;
  check_pointer(temp);
  for(temp; *temp != '\0'; temp++){
    vme = check_pointer(temp+1);
    if (vme == NULL){
      exit(-1);
    }
  }
}

void
check_buffer_read(const char* ptr, unsigned size){
  char* temp = ptr;
  struct vm_entry* vme;

  for(temp; temp < ptr+size; temp++){
    vme = check_pointer(temp);
    if (vme == NULL || vme -> writable == false){
      exit(-1);
    }
  }
}

void
check_buffer_write(const char* ptr, unsigned size){
  char* temp = ptr;
  struct vm_entry* vme;

  check_pointer(temp);
  for(temp; temp < ptr+size; temp++){
    vme = check_pointer(temp);
    if (vme == NULL){
      exit(-1);
    }
  }
}

void
exit(int status) {
  struct thread* t = thread_current();
  
  printf ("%s: exit(%d)\n", t->name, status);
  t->exit_status = status;

  thread_exit();
}

void
halt(void) {
  shutdown_power_off();
}

int
write(int fd, void* buffer, unsigned size){
  lock_acquire(&read_write_lock);
  int a;
  struct thread* t = thread_current();
  if(fd == 1){
    putbuf(buffer, size);
    size = a;
  }
  else{
    if(( 2 <= fd && fd <= 127) && t->fd[fd] != NULL){
      a = file_write(t->fd[fd], buffer, size);
    }
    else{
      a = 0;
    }
  }
  lock_release(&read_write_lock);
  return a;
}

int
exec(char *cmd_line){
  int tid = process_execute(cmd_line);
  struct thread* t = return_thread_by_tid(tid);

  if(t == NULL)
    return -1;

  sema_down(&t->loaded);

  bool ls = t->load_success;
  if(ls) {
    return tid;
  }
  else {
    list_remove(&t->child);
    return -1;
  }
}

bool
create(const char * file, unsigned size){
  return filesys_create(file, size);
}

int
open(const char * file){
  if(file == NULL) return -1;
  struct file* file_ = filesys_open (file);
  if(file_ ==  NULL) return -1;

  struct thread* t = thread_current();
  int i;
  for(i = 2; i < 128; i++) {
    if(t->fd[i] == NULL) {
      t->fd[i] = file_;
      return i;
    }
  }
  return -1;
}

bool
remove(const char* file) {
  return filesys_remove(file);
}


int
filesize(int fd){
int a;
struct thread* t = thread_current();
if (( 2 <= fd && fd <= 127) && t->fd[fd] != NULL){
  a = file_length(t->fd[fd]);
}
else 
  a = -1;
return a;
}

int
read(int fd, void* buffer, unsigned size){
  lock_acquire(&read_write_lock);
  int a;
  struct thread* t = thread_current();
  if(fd == 0){
    int i;
    for(i = 0; i < size; i++){
      *(char*)(buffer+i) = input_getc();
    }
    a = size;
  }
  else{
    if(( 1 <= fd && fd <= 127) && (t->fd[fd] != NULL)){
      a = file_read(t->fd[fd], buffer, size);
    }
    else{
      a = -1;
    }
  }
  lock_release(&read_write_lock);
  return a;
}

void
seek(int fd , unsigned position){
   struct thread* t = thread_current();
   if(( 2 <= fd && fd <= 127) && t->fd[fd] != NULL){
      file_seek(t -> fd[fd], position);
    }
}

unsigned
tell(int fd){
  struct thread* t = thread_current();
  if( ( 2 <= fd && fd <= 127) && t->fd[fd] != NULL){
      file_tell(t->fd[fd]);
  }
}

void
close(int fd){
  struct thread* t = thread_current();
  if( ( 2 <= fd && fd <= 127) && t->fd[fd] != NULL){
      file_close(t->fd[fd]);
      t->fd[fd] = NULL;
  }
}

int
mmap(int fd, void* addr){
  struct file* temp = process_get_file(fd);
  int length;
  int page_num;
  int i;
  struct vm_entry* vme;
  struct thread* t = thread_current();
  struct file* f;

  temp = process_get_file(fd);
  if(pg_ofs(addr)==0 && addr!=0 && addr!=NULL && temp != NULL){
    f = file_reopen(temp);
    length = file_length(f);

    if(file_length > 0){
      page_num = length/PGSIZE + 1;
      
      if(check_unmapped_addr(addr, page_num)){
        struct mmap_file* mmap_file = malloc(sizeof(struct mmap_file));
        mmap_file->mapid = t->mapid++;
        mmap_file->file = f;
        list_init(&mmap_file->vme_list);

        for(i = 0; i<page_num; i++){
          vme = mmap_vm_entry(f,addr, length, i, page_num);
          list_push_back(&mmap_file->vme_list, &vme->mmap_elem);
        }

        list_push_back(&t->mmap_list, &mmap_file->elem);
        return mmap_file->mapid;
      }
    }
  }
  return -1;

}

bool check_unmapped_addr(void* addr,int page_num){
  int i;
  for(i = 0; i<page_num; i++){
    if(find_vme(&thread_current()->vm, addr+i*PGSIZE) != NULL)
      return 0;
  }
  return 1;
}

struct vm_entry* mmap_vm_entry(struct file* file, void* addr, int file_length, int page_cnt, int page_num){
  int read_bytes;

  struct vm_entry* vme = malloc(sizeof(struct vm_entry));
  vme->type=VM_FILE;
  vme->vaddr=(void *)(addr+page_cnt*PGSIZE);
  vme->file=file;
  vme->writable= true;
  vme->is_loaded=false;
 
  vme->offset= page_cnt*PGSIZE;
  if(page_cnt < page_num-1){
    vme->read_bytes=PGSIZE;
    vme->zero_bytes=0;
  }
  else{
    read_bytes = file_length - page_cnt*PGSIZE;
    vme->read_bytes = read_bytes;
    vme->zero_bytes = PGSIZE - read_bytes;
  }
  insert_vme(&thread_current()->vm, vme);
  printf("%0x, mmap_vaddr\n",vme->vaddr);
  return vme;
}

void munmap(int mapping){
  struct mmap_list* mmap_list = &thread_current()->mmap_list;
  struct list_elem* temp;
  struct mmap_file* mmap_file;

  if(mapping != CLOSE_ALL){
  for(temp = list_begin(mmap_list); temp != list_end(mmap_list);){
    mmap_file = list_entry(temp, struct mmap_file, elem);
    temp = list_next(temp);
    
    if(mmap_file->mapid == mapping || mapping == CLOSE_ALL){
      do_unmap(mmap_file);
      list_remove(&mmap_file->elem);
      free(mmap_file);
    }
  }
}
}

void do_unmap(struct mmap_file* mmap_file){
  struct list_elem* elem;
  struct list* vme_list = &(mmap_file->vme_list);
  struct vm_entry* vme;
  struct thread* t = thread_current();


  for(elem = list_begin(vme_list); elem != list_end(vme_list); elem = list_next(elem)){
    vme = list_entry(elem, struct vm_entry, mmap_elem);
    if(vme->is_loaded && pagedir_is_dirty(t->pagedir, vme-> vaddr)){
      file_write_at(vme->file, pagedir_get_page (t->pagedir, vme-> vaddr), PGSIZE, vme->offset);
    }
    pagedir_clear_page(t->pagedir, vme-> vaddr);
    //free(vme);
  }

  for(elem = list_begin(vme_list); elem != list_end(vme_list);){
    vme = list_entry(elem, struct vm_entry, mmap_elem);
    elem = list_next(elem);
    free(vme);
  }
}