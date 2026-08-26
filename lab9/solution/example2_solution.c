#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[50];
    
    fp = fopen("test.txt", "r");
    
    if (fp == NULL) {
        printf("Could not open file!\n");
        return 1;
    }
    
    fgets(buffer, 50, fp);
    printf("File Content: %s\n", buffer);
    fclose(fp);
    return 0;
}