#include <stdio.h>

struct SensorNode {
    int nodeID;
    float temperature;
    float humidity;
    int relayActive;
};

void displayTelemetry(const struct SensorNode *node) {
    printf("\n--- IoT Telemetry Packet Report ---\n");
    printf("Sensor Node ID:  #%04d\n", node->nodeID);
    printf("Ambient Temp:    %.2f C\n", node->temperature);
    printf("Relative Humid:  %.2f %%\n", node->humidity);
    printf("Relay Status:    %s\n", node->relayActive ? "ACTIVATED [ON]" : "STANDBY [OFF]");
    printf("Total Struct Size: %zu Bytes\n", sizeof(struct SensorNode));
}

int main() {
    struct SensorNode node1;
    printf("Enter Node ID (e.g. 101): ");
    if (scanf("%d", &node1.nodeID) == 1) {
        printf("Enter Temperature (C): ");
        if (scanf("%f", &node1.temperature) == 1) {
            printf("Enter Humidity (%%): ");
            if (scanf("%f", &node1.humidity) == 1) {
                printf("Enter Relay State (1 for ON, 0 for OFF): ");
                if (scanf("%d", &node1.relayActive) == 1) {
                    displayTelemetry(&node1);
                }
            }
        }
    }
    return 0;
}