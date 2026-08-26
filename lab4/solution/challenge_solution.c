#include <stdio.h>

int main() {
    int n, i, j;
    printf("Enter number of rows (N): ");
    if (scanf("%d", &n) == 1) {
        for (i = 1; i <= n; i++) {
            for (j = 1; j <= i; j++) {
                printf("*");
            }
            printf("\n");
        }
    }
    return 0;
}