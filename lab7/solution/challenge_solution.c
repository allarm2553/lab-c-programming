#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, *arr;
    float sum = 0.0;
    
    printf("Enter number of elements (N): ");
    if (scanf("%d", &n) == 1 && n > 0) {
        arr = (int *)malloc(n * sizeof(int));
        if (arr == NULL) {
            printf("Memory allocation failed!\n");
            return 1;
        }
        
        printf("Enter %d integers:\n", n);
        for (int i = 0; i < n; i++) {
            scanf("%d", &arr[i]);
            sum += arr[i];
        }
        
        printf("Average = %.2f\n", sum / n);
        free(arr);
    }
    return 0;
}