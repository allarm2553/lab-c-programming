#include <stdio.h>
#include <stdbool.h>

struct SystemState {
    float temperature;
    bool ledBeacon;
    bool coolingFan;
};

void runTaskSensor(unsigned long currentMs, unsigned long *prevMs, struct SystemState *sys) {
    if (currentMs - *prevMs >= 500) {
        *prevMs = currentMs;
        sys->temperature = 41.5f; 
        
        if (sys->temperature > 40.0f) {
            sys->coolingFan = true;
        } else {
            sys->coolingFan = false;
        }
        
        printf("[Task 1 @ %4lums] Sensor Temp: %.1f C -> Fan: %s\n", 
               currentMs, sys->temperature, sys->coolingFan ? "ACTIVATED [ON]" : "STANDBY [OFF]");
    }
}

void runTaskBeacon(unsigned long currentMs, unsigned long *prevMs, struct SystemState *sys) {
    if (currentMs - *prevMs >= 100) {
        *prevMs = currentMs;
        sys->ledBeacon = !sys->ledBeacon;
        printf("[Task 2 @ %4lums] Heartbeat LED: %s\n", 
               currentMs, sys->ledBeacon ? "BLINK (1)" : "DARK  (0)");
    }
}

int main() {
    struct SystemState myNode = {25.0f, false, false};
    unsigned long prevSensorMs = 0;
    unsigned long prevBeaconMs = 0;
    
    printf("=== SMART IOT CONTROLLER NON-BLOCKING SCHEDULER ===\n");
    
    for (unsigned long simTime = 100; simTime <= 1000; simTime += 100) {
        runTaskBeacon(simTime, &prevBeaconMs, &myNode);
        runTaskSensor(simTime, &prevSensorMs, &myNode);
    }
    
    printf("===================================================\n");
    return 0;
}