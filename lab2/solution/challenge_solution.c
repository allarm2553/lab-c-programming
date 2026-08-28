#include <stdio.h>

int main() {
    unsigned char portb;
    printf("Enter initial PORTB state (0-255): ");
    if (scanf("%hhu", &portb) == 1) {
        portb = portb | (1 << 3);     // Set Bit 3 (Relay ON)
        portb = portb & ~(1 << 5);    // Clear Bit 5 (Valve OFF)
        portb = portb ^ (1 << 7);     // Toggle Bit 7 (LED Toggle)
        
        printf("\n--- Updated PORTB Register Output ---\n");
        printf("PORTB Decimal: %d\n", portb);
        printf("PORTB Hex:     0x%02X\n", portb);
        printf("Bit 3 (Relay): %s\n", (portb & (1 << 3)) ? "ON" : "OFF");
        printf("Bit 5 (Valve): %s\n", (portb & (1 << 5)) ? "ON" : "OFF");
        printf("Bit 7 (LED):   %s\n", (portb & (1 << 7)) ? "ON" : "OFF");
    }
    return 0;
}