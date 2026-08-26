#include <stdio.h>
#define PI 3.14159265

int main() {
    float radius, area, circumference;
    
    printf("Enter radius: ");
    if (scanf("%f", &radius) == 1) {
        area = PI * radius * radius;
        circumference = 2 * PI * radius;
        
        printf("Radius = %.2f\n", radius);
        printf("Area = %.2f\n", area);
        printf("Circumference = %.2f\n", circumference);
    }
    
    return 0;
}