#include <stdio.h>

int main() {
    float currentLog[5];
    float sum = 0.0f, maxCurrent = 0.0f;
    
    printf("Enter 5 Motor Current Samples (Amp):\n");
    for (int i = 0; i < 5; i++) {
        printf("Sample [%d]: ", i + 1);
        if (scanf("%f", &currentLog[i]) != 1) return 1;
        sum += currentLog[i];
        if (currentLog[i] > maxCurrent) {
            maxCurrent = currentLog[i];
        }
    }
    
    float avgCurrent = sum / 5.0f;
    printf("\n--- Motor Current Analysis ---\n");
    printf("Average Current: %.2f A\n", avgCurrent);
    printf("Peak Current:    %.2f A\n", maxCurrent);
    
    if (maxCurrent > 15.0f) {
        printf("Status: [OVERLOAD WARNING] Current exceeded 15.0A safe threshold!\n");
    } else {
        printf("Status: [NORMAL] Motor operating within safe current limits.\n");
    }
    
    return 0;
}