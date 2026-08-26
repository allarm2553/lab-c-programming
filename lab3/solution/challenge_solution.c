#include <stdio.h>

int main() {
    float income, tax = 0.0;
    printf("Enter net annual income: ");
    if (scanf("%f", &income) == 1) {
        if (income <= 150000) {
            tax = 0.0;
        } else if (income <= 300000) {
            tax = (income - 150000) * 0.05;
        } else if (income <= 500000) {
            tax = (150000 * 0.05) + ((income - 300000) * 0.10);
        } else {
            tax = (150000 * 0.05) + (200000 * 0.10) + ((income - 500000) * 0.15);
        }
        
        printf("Income: %.2f Baht\n", income);
        printf("Calculated Tax: %.2f Baht\n", tax);
    }
    return 0;
}