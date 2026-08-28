#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("Enter number of sensor samples to record (N): ");
    if (scanf("%d", &n) == 1 && n > 0) {
        float *buffer = (float *)malloc(n * sizeof(float));
        if (buffer == NULL) {
            printf("Memory allocation failed!\n");
            return 1;
        }
        
        printf("Enter %d sensor readings:\n", n);
        float sum = 0.0f;
        for (int i = 0; i < n; i++) {
            printf("Reading #%d: ", i + 1);
            if (scanf("%f", buffer + i) == 1) {
                sum += *(buffer + i);
            }
        }
        
        printf("\n--- Dynamic Buffer Processing ---\n");
        printf("Allocated Memory: %zu Bytes\n", n * sizeof(float));
        printf("Processed Average: %.2f\n", sum / n);
        
        free(buffer);
        buffer = NULL;
        printf("Memory successfully released (Heap freed).\n");
    }
    return 0;
}