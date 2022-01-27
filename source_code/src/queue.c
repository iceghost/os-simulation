#include "queue.h"

#include <stdio.h>
#include <stdlib.h>

int empty(struct queue_t* q) { return (q->size == 0); }

void sift_up(struct queue_t* q) {
    int i = q->size - 1;
    int parent = (i - 1) / 2;
    while (i > 0 && q->proc[parent]->priority < q->proc[i]->priority) {
        struct pcb_t* temp = q->proc[parent];
        q->proc[parent] = q->proc[i];
        q->proc[i] = temp;

        i = parent;
        parent = (i - 1) / 2;
    }
}

void sift_down(struct queue_t* q) {
    int i = 0;
    while (1) {
        int i_max = i;

        int l = 2 * i + 1;
        if (l < q->size && q->proc[l]->priority > q->proc[i_max]->priority) {
            i_max = l;
        }

        int r = 2 * i + 2;
        if (r < q->size && q->proc[r]->priority > q->proc[i_max]->priority) {
            i_max = r;
        }

        if (i != i_max) {
            struct pcb_t* temp = q->proc[i];
            q->proc[i] = q->proc[i_max];
            q->proc[i_max] = temp;
            i = i_max;
        } else {
            break;
        }
    }
}

void enqueue(struct queue_t* q, struct pcb_t* proc) {
    /* put a new process to queue [q] */
    q->proc[q->size] = proc;
    q->size += 1;
    sift_up(q);
}

struct pcb_t* dequeue(struct queue_t* q) {
    /* return a pcb whose prioprity is the highest
     * in the queue [q] and remember to remove it from q
     * */
    if (q->size == 0) return NULL;
    // swap remove
    struct pcb_t* temp = q->proc[0];
    q->proc[0] = q->proc[q->size - 1];
    q->proc[q->size - 1] = temp;
    q->size -= 1;
    return q->proc[q->size];
}
