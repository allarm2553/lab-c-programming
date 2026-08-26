#include <stdio.h>

int main() {
    int num;
    float score;
    
    printf("Enter integer: ");
    scanf("%d", &num);
    
    printf("Enter float score: ");
    scanf("%f", &score);
    
    printf("Value = %d, Score = %.1f\n", num, score);
    return 0;
}