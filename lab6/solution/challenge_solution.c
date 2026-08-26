#include <stdio.h>

int main() {
    char str[100];
    int len = 0;
    
    printf("Enter string: ");
    if (scanf("%99s", str) == 1) {
        while (str[len] != '\0') {
            len++;
        }
        
        printf("Length: %d\n", len);
        printf("Reversed: ");
        for (int i = len - 1; i >= 0; i--) {
            putchar(str[i]);
        }
        printf("\n");
    }
    return 0;
}