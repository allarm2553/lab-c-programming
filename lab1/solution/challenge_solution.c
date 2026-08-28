#include <stdio.h>

int main() {
    int adcValue;
    float current, voltage, power;
    
    printf("Enter 10-bit ADC Raw Value (0-1023): ");
    if (scanf("%d", &adcValue) == 1) {
        printf("Enter Circuit Current (Amp): ");
        if (scanf("%f", &current) == 1) {
            voltage = (adcValue / 1023.0f) * 5.0f;
            power = voltage * current;
            
            printf("\n--- Electrical Measurement Results ---\n");
            printf("ADC Raw Value: %d\n", adcValue);
            printf("Measured Voltage: %.2f V\n", voltage);
            printf("Circuit Current:  %.2f A\n", current);
            printf("Calculated Power: %.2f W\n", power);
        }
    }
    return 0;
}