#include "userprog/syscall.h"
#include <stdio.h>
#include <syscall-nr.h>
#include "threads/interrupt.h"
#include "threads/thread.h"

#include <string.h>
#include "filesys/filesys.h"
#include "filesys/file.h"
#include "devices/shutdown.h"
#include "userprog/process.h"

static void syscall_handler (struct intr_frame *);

void validity_check (const void *addr);

static void halt(void);
void exit(int status);
static tid_t exec(const char *cmd_line);
static int wait(tid_t tid);

static bool create(const char *file, unsigned initial_size);
static bool remove (const char *file);
static int open (const char *file);
static int filesize (int fd);
static int read (int fd, void *buffer, unsigned size);
static int write (int fd, const void *buffer, unsigned size);
static void seek (int fd, unsigned position);
static unsigned tell (int fd);
static void close (int fd);

struct file 
  {
    struct inode *inode;        /* File's inode. */
    off_t pos;                  /* Current position. */
    bool deny_write;            /* Has file_deny_write() been called? */
  };

void
syscall_init (void) 
{
  intr_register_int (0x30, 3, INTR_ON, syscall_handler, "syscall");
}

static void
syscall_handler (struct intr_frame *f UNUSED) 
{
  void *sp = f->esp;

  switch (*(uint32_t *) sp) {
    // argument : 0
    case SYS_HALT :
      halt();
      break;
    // argument : 1
    case SYS_EXIT :
      validity_check(sp + 4);
      exit(*(uint32_t *)(sp + 4));
      break;
    // argument : 1
    case SYS_EXEC :
      validity_check(sp + 4);
      f->eax = exec((const char *)*(uint32_t *)(sp + 4));
      break;
    // argument : 1
    case SYS_WAIT :
      validity_check(sp + 4);
      f->eax = wait((tid_t)*(uint32_t *)(sp + 4));
      break;
    // argument : 2
    case SYS_CREATE:
      validity_check(sp + 4);
      f->eax = create((const char *)*(uint32_t *)(sp + 4),  (unsigned)*(uint32_t *)(sp + 8));
      break;
    // argument : 1
    case SYS_REMOVE:
      validity_check(sp + 4);
      f->eax = remove ((const char *)*(uint32_t *)(sp + 4));
      break;
    // argument : 1
    case SYS_OPEN:
      validity_check(sp + 4);
      f->eax = open ((const char *)*(uint32_t *)(sp + 4));
      break;
    // argument : 1
    case SYS_FILESIZE:
      validity_check(sp + 4);
      f->eax = filesize ((int)*(uint32_t *)(sp + 4));
      break;
    // argument : 3
    case SYS_READ:
      validity_check(sp + 4);
      f->eax = read ((int)*(uint32_t *)(sp + 4), (void *)*(uint32_t *)(sp + 8), (unsigned)*((uint32_t *)(sp + 12)));
      break;
    // argument : 3
    case SYS_WRITE:
      validity_check(sp + 4);
      f->eax = write((int)*(uint32_t *)(sp + 4), (void *)*(uint32_t *)(sp + 8), (unsigned)*((uint32_t *)(sp + 12)));
      break;
    // argument : 2
    case SYS_SEEK:
      validity_check(sp + 4);
      seek((int)*(uint32_t *)(sp + 4), (unsigned)*((uint32_t *)(sp + 8)));
      break;
    // argument : 1
    case SYS_TELL:
      validity_check(sp + 4);
      f->eax = tell ((int)*(uint32_t *)(sp + 4));
      break;
    // argument : 1
    case SYS_CLOSE:
      validity_check(sp + 4);
      close ((int)*(uint32_t *)(sp + 4));
      break;
  }
}

void validity_check (const void *addr) {
  if(!((addr < ((void *) 0xc0000000))) && (addr >= (void *) 0x08048000UL)) exit(-1);
}

static void halt(void) { shutdown_power_off(); }

void exit(int status) {
  thread_current()->exit_code = status;
  printf("%s: exit(%d)\n", thread_current()->name, status);
  thread_exit();
}

static tid_t exec(const char *cmd_line) { return process_execute(cmd_line); }

static int wait(tid_t tid) { return process_wait(tid); }

static bool create(const char *file, unsigned initial_size) {
  if (file == NULL) exit(-1);
  return filesys_create (file, initial_size);
}

static bool remove (const char *file) {
  if (file == NULL) exit(-1);
  return filesys_remove(file);
}

static int open (const char *file) {
  if (file == NULL) exit(-1);
  validity_check(file);
  struct file *result = filesys_open(file);
  if (result == NULL) return -1;
  for (int i = 3; i < 128; i++) if (thread_current()->file_descriptor[i] == NULL) {
    if (strcmp(thread_current()->name, file) == false) file_deny_write(result);
    thread_current()->file_descriptor[i] = result;
    return i;
  }
  return -1;
}

static int filesize (int fd) {
  struct file *f = thread_current()->file_descriptor[fd];
  if (f == NULL) exit(-1);
  return file_length(f);
}

static int read(int fd, void *buffer, unsigned size) {
  validity_check(buffer);
  if (fd == 0) {
    int i = 0;
    for(i = 0; i < (int) size; i++) if (((char *) buffer)[i] == '\0') break;
    return i;
  }
  struct file *f = thread_current()->file_descriptor[fd];
  if (f == NULL) exit(-1);
  return file_read(f, buffer, size);
}

static int write (int fd, const void *buffer, unsigned size) {
  validity_check(buffer);
  if (fd == 1) {
    putbuf(buffer, size);
    return size;
  }
  struct file *f = thread_current()->file_descriptor[fd];
  if(f == NULL) exit(-1);
  if(f->deny_write) file_deny_write(f);
  return file_write(f, buffer, size);
}

static void seek (int fd, unsigned position) {
  struct file *f = thread_current()->file_descriptor[fd];
  if (f == NULL) exit(-1);
  file_seek(f, position);
}

static unsigned tell (int fd) {
  struct file *f = thread_current()->file_descriptor[fd];
  if (f == NULL) exit(-1);
  return file_tell(f);
}

static void close (int fd) {
  struct file *f = thread_current()->file_descriptor[fd];
  if (f == NULL) exit(-1);
  f = NULL;
  file_close(f);
}