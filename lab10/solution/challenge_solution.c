#include <stdio.h>
#include <string.h>

void testSerialNumber() {
    char sn[30];
    printf("กรุณาป้อน Serial Number (สูงสุด 20 ตัวอักษร): ");
    if (fgets(sn, sizeof(sn), stdin) != NULL) {
        sn[strcspn(sn, "\n")] = 0;
        printf("Length: %zu\n", strlen(sn));
        if (strncmp(sn, "SN-", 3) == 0) {
            printf("Valid Serial Number!\n");
        } else {
            printf("Invalid Serial Number (must start with SN-)\n");
        }
    }
}

void generateReportFilename() {
    char deviceName[50];
    char filename[100];
    printf("กรุณาป้อนชื่ออุปกรณ์: ");
    if (fgets(deviceName, sizeof(deviceName), stdin) != NULL) {
        deviceName[strcspn(deviceName, "\n")] = 0;
        strcpy(filename, deviceName);
        strcat(filename, "_Report.txt");
        printf("Generated Filename: %s\n", filename);
    }
}

void deviceStatusSimulator() {
    char status[20] = "Offline";
    char command[30];
    printf("สถานะอุปกรณ์ปัจจุบัน: %s\n", status);
    printf("ป้อนคำสั่ง (connect/disconnect): ");
    if (fgets(command, sizeof(command), stdin) != NULL) {
        command[strcspn(command, "\n")] = 0;
        if (strcmp(command, "connect") == 0) {
            strcpy(status, "Online");
        } else if (strcmp(command, "disconnect") == 0) {
            strcpy(status, "Offline");
        } else {
            printf("คำสั่งไม่ถูกต้อง\n");
        }
        printf("สถานะอุปกรณ์หลังประมวลผล: %s\n", status);
    }
}

int main() {
    printf("=== กิจกรรมท้าทาย: String Functions ===\n");
    testSerialNumber();
    printf("\n");
    generateReportFilename();
    printf("\n");
    deviceStatusSimulator();
    return 0;
}