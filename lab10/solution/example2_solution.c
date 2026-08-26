#include <stdio.h>
#include <string.h>

int main() {
    char buffer[15];
    char source[] = "SuperLongString";
    char result[30] = "Prefix_";

    printf("--- การใช้งาน strncpy() และ strncat() ---\n");
    
    strncpy(buffer, source, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\0';
    printf("strncpy ผลลัพธ์ใน buffer: '%s'\n", buffer);

    strncat(result, source, 5);
    printf("strncat ผลลัพธ์ใน result: '%s'\n", result);

    return 0;
}