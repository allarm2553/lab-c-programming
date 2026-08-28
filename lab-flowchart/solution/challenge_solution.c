#include <stdio.h>

int main() {
    // กิจกรรมท้าทาย ตอนที่ 4: ระบบควบคุมพัดลมระบายความร้อนอัตโนมัติตามระดับอุณหภูมิ (Auto Fan Controller)
    float temp;
    
    printf("Enter Machine Temperature (C): ");
    if (scanf("%f", &temp) == 1) {
        printf("\n--- Auto Fan Controller Status ---\n");
        printf("Temperature: %.2f C\n", temp);
        
        if (temp >= 35.0f) {
            printf("Fan Status: HIGH SPEED [MAX COOLING]\n");
        } else if (temp >= 28.0f) {
            printf("Fan Status: MEDIUM SPEED [NORMAL COOLING]\n");
        } else {
            printf("Fan Status: OFF [STANDBY MODE]\n");
        }
    }
    return 0;
}
