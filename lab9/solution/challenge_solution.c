#include <stdio.h>

int main() {
    FILE *fp = fopen("datalog.csv", "w");
    if (fp == NULL) {
        printf("Error creating datalog.csv!\n");
        return 1;
    }
    
    // Write CSV Header
    fprintf(fp, "Sample,Time,Voltage_V,Temperature_C\n");
    
    // Write Sample Industrial Records
    fprintf(fp, "1,09:00,380.2,42.5\n");
    fprintf(fp, "2,09:05,379.8,43.1\n");
    fprintf(fp, "3,09:10,381.0,44.0\n");
    
    fclose(fp);
    printf("Successfully logged industrial telemetry data to 'datalog.csv'!\n");
    return 0;
}