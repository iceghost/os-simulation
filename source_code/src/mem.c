
#include "mem.h"
#include "stdlib.h"
#include "string.h"
#include <pthread.h>
#include <stdio.h>

static BYTE _ram[RAM_SIZE];

static struct {
	uint32_t proc;	// ID of process currently uses this page
	int index;	// Index of the page in the list of pages allocated
			// to the process.
	int next;	// The next page in the list. -1 if it is the last
			// page.
} _mem_stat [NUM_PAGES];

static pthread_mutex_t mem_lock;

void init_mem(void) {
	memset(_mem_stat, 0, sizeof(*_mem_stat) * NUM_PAGES);
	memset(_ram, 0, sizeof(BYTE) * RAM_SIZE);
	pthread_mutex_init(&mem_lock, NULL);
}

/* get offset of the virtual address */
static addr_t get_offset(addr_t addr) {
	return addr & ~((~0U) << OFFSET_LEN);
}

/* get the first layer index */
static addr_t get_first_lv(addr_t addr) {
	return addr >> (OFFSET_LEN + PAGE_LEN);
}

/* get the second layer index */
static addr_t get_second_lv(addr_t addr) {
	return (addr >> OFFSET_LEN) - (get_first_lv(addr) << PAGE_LEN);
}

/* Search for page table table from the a segment table */
static struct page_table_t * get_page_table(
		addr_t index, 	// Segment level index
		struct seg_table_t * seg_table) { // first level table

	/* Given the Segment index [index], you must go through each
	 * row of the segment table [seg_table] and check if the v_index
	 * field of the row is equal to the index
	 *
	 * */

	if (seg_table[index].table->occupied) {
		return seg_table[index].table->pages;
	}
	return NULL;

}

/* Translate virtual address to physical address. If [virtual_addr] is valid,
 * return 1 and write its physical counterpart to [physical_addr].
 * Otherwise, return 0 */
static int translate(
		addr_t virtual_addr, 	// Given virtual address
		addr_t * physical_addr, // Physical address to be returned
		struct pcb_t * proc) {  // Process uses given virtual address

	/* Offset of the virtual address */
	addr_t offset = get_offset(virtual_addr);
	/* The first layer index */
	addr_t first_lv = get_first_lv(virtual_addr);
	/* The second layer index */
	addr_t second_lv = get_second_lv(virtual_addr);

	/* Search in the first level */
	struct page_table_t * page_table = NULL;
	page_table = get_page_table(first_lv, proc->seg_table);
	if (page_table == NULL) {
		return 0;
	}

	if (page_table->table[second_lv].occupied) {
		/* Concatenate the offset of the virtual addess
			* to [p_index] field of page_table->table[i] to
			* produce the correct physical address and save it to
			* [*physical_addr]  */
		*physical_addr = (page_table->table[second_lv].p_index << OFFSET_LEN) | offset;
		return 1;
	}
	return 0;
}

addr_t alloc_mem(uint32_t size, struct pcb_t * proc) {
	pthread_mutex_lock(&mem_lock);
	addr_t ret_mem = 0;
	/* Allocate [size] byte in the memory for the
	 * process [proc] and save the address of the first
	 * byte in the allocated memory region to [ret_mem].
	 * */

	uint32_t num_pages = !(size % PAGE_SIZE) ? size / PAGE_SIZE :
		size / PAGE_SIZE + 1; // Number of pages we will use
	int mem_avail = 0; // We could allocate new memory region or not?

	/* First we must check if the amount of free memory in
	 * virtual address space and physical address space is
	 * large enough to represent the amount of required
	 * memory. If so, set 1 to [mem_avail].
	 * Hint: check [proc] bit in each page of _mem_stat
	 * to know whether this page has been used by a process.
	 * For virtual memory space, check bp (break pointer).
	 * */
	uint32_t available = 0;
	for (uint32_t i = 0; i < NUM_PAGES; i++) {
		if (available == num_pages) {
			mem_avail = 1;
			break;
		}
		if (_mem_stat[i].proc == 0) {
			available++;
		}
	}

	int virtual_avail = 0;
	uint32_t contiguous_available = 0;
	addr_t end_addr = 0;
	for (uint32_t i = 0; i < 1 << SEGMENT_LEN; i++) {
		if (contiguous_available >= num_pages) {
			end_addr -= (contiguous_available - num_pages) * PAGE_SIZE;
			virtual_avail = 1;
			break;
		}
		if (!proc->seg_table->table[i].occupied) {
			contiguous_available += 1 << PAGE_LEN;
			end_addr += (1 << PAGE_LEN) * PAGE_SIZE;
			continue;
		}
		for (uint32_t j = 0; j < 1 << PAGE_LEN; j++) {
			end_addr += PAGE_SIZE;
			if (!proc->seg_table->table[i].pages->table[j].occupied) {
				contiguous_available += 1;
				if (contiguous_available == num_pages) {
					break;
				}
			} else {
				contiguous_available = 0;
			}
		}
	}
	if (mem_avail && virtual_avail) {
		/* We could allocate new memory region to the process */
		addr_t start_addr = end_addr - num_pages * PAGE_SIZE;
		ret_mem = start_addr;
		if (end_addr > proc->bp) {
			proc->bp = end_addr;
		}
		/* Update status of physical pages which will be allocated
		 * to [proc] in _mem_stat. Tasks to do:
		 * 	- Update [proc], [index], and [next] field
		 * 	- Add entries to segment table page tables of [proc]
		 * 	  to ensure accesses to allocated memory slot is
		 * 	  valid. */
		int prev_page_i = -1;
		int i = 0;
		uint32_t index = 0;
		while (index < num_pages) {
			if (_mem_stat[i].proc == 0) {
				_mem_stat[i].proc = proc->pid;
				_mem_stat[i].index = index;
				if (prev_page_i != -1)
					_mem_stat[prev_page_i].next = i;
				prev_page_i = i;

				addr_t first_lv = get_first_lv(start_addr + index * PAGE_SIZE);
				addr_t second_lv = get_second_lv(start_addr + index * PAGE_SIZE);
				if (!proc->seg_table->table[first_lv].occupied) {
					proc->seg_table->table[first_lv].occupied = 1;
					proc->seg_table->table[first_lv].pages = malloc(sizeof(struct page_table_t));
					memset(proc->seg_table->table[first_lv].pages, 0, sizeof(struct page_table_t));
				}
				proc->seg_table->table[first_lv].pages->table[second_lv].occupied = 1;
				proc->seg_table->table[first_lv].pages->table[second_lv].p_index = i;

				index += 1;
			}
			i++;
		}
		_mem_stat[prev_page_i].next = -1;

	}
	pthread_mutex_unlock(&mem_lock);
	return ret_mem;
}

int free_mem(addr_t address, struct pcb_t * proc) {
	/* Release memory region allocated by [proc]. The first byte of
	 * this region is indicated by [address]. Task to do:
	 * 	- Set flag [proc] of physical page use by the memory block
	 * 	  back to zero to indicate that it is free.
	 * 	- Remove unused entries in segment table and page tables of
	 * 	  the process [proc].
	 * 	- Remember to use lock to protect the memory from other
	 * 	  processes.  */
	addr_t physical_addr;
	if (translate(address, &physical_addr, proc)) {

		int page_i = physical_addr >> OFFSET_LEN;
		int num_pages = 0;
		pthread_mutex_lock(&mem_lock);
		while (page_i != -1) {
			_mem_stat[page_i].proc = 0;
			num_pages = _mem_stat[page_i].index;
			page_i = _mem_stat[page_i].next;
		}
		pthread_mutex_unlock(&mem_lock);
		num_pages += 1;

		int start_of_seg = 0;
		for (int i = 0; i < num_pages; i++) {
			addr_t first_lv = get_first_lv(address + i * PAGE_SIZE);
			addr_t second_lv = get_second_lv(address + i * PAGE_SIZE);
			if (second_lv == 0) {
				start_of_seg = 1;
			}
			proc->seg_table->table[first_lv].pages->table[second_lv].occupied = 0;
			if (start_of_seg && second_lv == ((1 << PAGE_SIZE) - 1)) {
				free(proc->seg_table->table[first_lv].pages);
				proc->seg_table->table[first_lv].occupied = 0;
			}
		}

		return 0;
	}else{
		return 1;
	}
}

int read_mem(addr_t address, struct pcb_t * proc, BYTE * data) {
	addr_t physical_addr;
	if (translate(address, &physical_addr, proc)) {
		*data = _ram[physical_addr];
		return 0;
	}else{
		return 1;
	}
}

int write_mem(addr_t address, struct pcb_t * proc, BYTE data) {
	addr_t physical_addr;
	if (translate(address, &physical_addr, proc)) {
		_ram[physical_addr] = data;
		return 0;
	}else{
		return 1;
	}
}

void dump(void) {
	int i;
	for (i = 0; i < NUM_PAGES; i++) {
		if (_mem_stat[i].proc != 0) {
			printf("%03d: ", i);
			printf("%05x-%05x - PID: %02d (idx %03d, nxt: %03d)\n",
				i << OFFSET_LEN,
				((i + 1) << OFFSET_LEN) - 1,
				_mem_stat[i].proc,
				_mem_stat[i].index,
				_mem_stat[i].next
			);
			int j;
			for (	j = i << OFFSET_LEN;
				j < ((i+1) << OFFSET_LEN) - 1;
				j++) {

				if (_ram[j] != 0) {
					printf("\t%05x: %02x\n", j, _ram[j]);
				}

			}
		}
	}
}
