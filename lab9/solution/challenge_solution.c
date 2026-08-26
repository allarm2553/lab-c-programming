#include <stdio.h>

int main() {
    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) {
        printf("Cannot create file!\n");
        return 1;
    }
    
    fprintf(fp, "Name: Somchai Deejai, Grade: 4.00\n");
    fclose(fp);
    printf("File written successfully.\n");
    
    // อ่านไฟล์กลับมาแสดงผล
    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        printf("Cannot open file for reading!\n");
        return 1;
    }
    
    char buffer[100];
    printf("\nReading from file:\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    fclose(fp);
    
    return 0;
}