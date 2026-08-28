#include <stdio.h>

int main() {
    float waterLevel;
    int mode;
    
    printf("Enter Water Level (0.0 - 100.0%%): ");
    if (scanf("%f", &waterLevel) == 1) {
        printf("Enter Mode (1: AUTO, 2: MANUAL DRAIN, 3: EMERGENCY STOP): ");
        if (scanf("%d", &mode) == 1) {
            printf("\n--- System Control Status ---\n");
            switch (mode) {
                case 1:
                    printf("Mode: AUTOMATIC CONTROL\n");
                    if (waterLevel < 20.0f) {
                        printf("Water Status: LOW (%.1f%%) -> Pump Action: RUN HIGH SPEED\n", waterLevel);
                    } else if (waterLevel <= 80.0f) {
                        printf("Water Status: OPTIMAL (%.1f%%) -> Pump Action: RUN NORMAL SPEED\n", waterLevel);
                    } else {
                        printf("Water Status: FULL (%.1f%%) -> Pump Action: STOP PUMP\n", waterLevel);
                    }
                    break;
                case 2:
                    printf("Mode: MANUAL DRAIN -> Drain Valve: OPEN\n");
                    break;
                case 3:
                    printf("Mode: EMERGENCY STOP -> ALL PUMPS & VALVES SHUTDOWN!\n");
                    break;
                default:
                    printf("Invalid Mode Selected!\n");
            }
        }
    }
    return 0;
}