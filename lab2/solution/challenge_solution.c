#include <stdio.h>

int main() {
    int a, b;
    printf("Enter two integers: ");
    if (scanf("%d %d", &a, &b) == 2) {
        printf("a & b  = %d\n", a & b);
        printf("a | b  = %d\n", a | b);
        printf("a ^ b  = %d\n", a ^ b);
        printf("a << 2 = %d\n", a << 2);
    }
    return 0;
}