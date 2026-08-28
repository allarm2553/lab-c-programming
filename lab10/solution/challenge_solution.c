#include <stdio.h>
#include <string.h>

int main() {
    char cmdBuffer[64];
    printf("Enter Serial Command (e.g. $SET,RELAY,ON# or $READ,TEMP#): ");
    if (fgets(cmdBuffer, sizeof(cmdBuffer), stdin) != NULL) {
        cmdBuffer[strcspn(cmdBuffer, "\r\n")] = '\0';
        
        printf("\n--- Command Packet Parser Analysis ---\n");
        printf("Raw Packet:    %s (Length: %zu chars)\n", cmdBuffer, strlen(cmdBuffer));
        
        if (strstr(cmdBuffer, "$SET,RELAY,ON#") != NULL) {
            printf("Action: Executing -> RELAY SWITCH ENERGIZED [ON]\n");
        } else if (strstr(cmdBuffer, "$SET,RELAY,OFF#") != NULL) {
            printf("Action: Executing -> RELAY SWITCH DE-ENERGIZED [OFF]\n");
        } else if (strstr(cmdBuffer, "$READ,TEMP#") != NULL) {
            printf("Action: Telemetry -> Reading Sensor Temp: 28.50 C\n");
        } else {
            printf("Action: [UNKNOWN COMMAND] Syntax error or invalid header.\n");
        }
    }
    return 0;
}