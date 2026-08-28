#include <stdio.h>

int main() {
    int dutyCycle, periods;
    printf("Enter PWM Duty Cycle (0 - 100%%): ");
    if (scanf("%d", &dutyCycle) == 1) {
        printf("Enter Number of Periods to generate (e.g. 5): ");
        if (scanf("%d", &periods) == 1) {
            int onUnits = dutyCycle / 10;
            int offUnits = 10 - onUnits;
            
            printf("\n--- Generated PWM Signal Waves (%d%% Duty Cycle) ---\n", dutyCycle);
            for (int p = 1; p <= periods; p++) {
                printf("Period %2d: [", p);
                for (int i = 0; i < onUnits; i++) {
                    printf("1");
                }
                for (int j = 0; j < offUnits; j++) {
                    printf("0");
                }
                printf("] Output Voltage ~ %.1f V\n", (dutyCycle / 100.0f) * 5.0f);
            }
        }
    }
    return 0;
}