#include <stdio.h>

int main() {
    int a = 5;  // Binary: 0101
    int b = 3;  // Binary: 0011
    
    int and_res = a & b;
    int or_res = a | b;
    
    printf("Bitwise AND result: %d\n", and_res);
    printf("Bitwise OR result: %d\n", or_res);
    return 0;
}