#include <stdio.h>

float calibrateTemperature(int rawADC) {
    return (rawADC * 0.0977f) - 10.0f;
}

void updateMinMax(float temp, float *minTemp, float *maxTemp) {
    if (temp < *minTemp) *minTemp = temp;
    if (temp > *maxTemp) *maxTemp = temp;
}

int main() {
    int adc1, adc2, adc3;
    printf("Enter 3 Raw ADC Samples: ");
    if (scanf("%d %d %d", &adc1, &adc2, &adc3) == 3) {
        float t1 = calibrateTemperature(adc1);
        float t2 = calibrateTemperature(adc2);
        float t3 = calibrateTemperature(adc3);
        
        float minT = t1, maxT = t1;
        updateMinMax(t2, &minT, &maxT);
        updateMinMax(t3, &minT, &maxT);
        
        float avgT = (t1 + t2 + t3) / 3.0f;
        
        printf("\n--- Sensor Calibration Results ---\n");
        printf("Sample 1: %.2f C\n", t1);
        printf("Sample 2: %.2f C\n", t2);
        printf("Sample 3: %.2f C\n", t3);
        printf("Average Temp: %.2f C\n", avgT);
        printf("Min Temp: %.2f C, Max Temp: %.2f C\n", minT, maxT);
    }
    return 0;
}