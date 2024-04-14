#include <stdio.h>

int main() {
    int *p = NULL;
    printf("%d\n", *p); // Dereferencing a NULL pointer causes segfault
    return 0;
}
