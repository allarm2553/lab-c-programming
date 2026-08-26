#include <stdio.h>

int main() {
    char grade;
    printf("Enter grade (A, B, C): ");
    scanf(" %c", &grade);
    
    switch (grade) {
        case 'A':
            printf("Excellent!\n");
            break;
        case 'B':
            printf("Good job!\n");
            break;
        default:
            printf("Try harder!\n");
    }
    return 0;
}