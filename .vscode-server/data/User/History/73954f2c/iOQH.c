#include "userprog/syscall.h"
#include <stdio.h>
#include <syscall-nr.h>
#include "threads/interrupt.h"
#include "threads/thread.h"

static void syscall_handler (struct intr_frame *);

void
syscall_init (void) 
{
  intr_register_int (0x30, 3, INTR_ON, syscall_handler, "syscall");
}

static void
syscall_handler (struct intr_frame *f UNUSED) 
{
  // from f, get the esp
  void* esp_ = f->esp;
  
  // from esp, get the syscall numner.
  int syscall_number = *((int*)esp_);
  esp_ = esp_+ 4;

  // switch statement



  printf ("system call!\n");
  thread_exit ();
}
