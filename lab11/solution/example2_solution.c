#include <stdio.h>
#include <stdbool.h>

int main() {
    unsigned long currentMillis = 1500;
    unsigned long previousMillis = 1000;
    const long interval = 500;
    bool ledState = false;

    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;
        ledState = !ledState;
        printf("Interval Elapsed! LED Toggled to: %s\n", ledState ? "ON (HIGH)" : "OFF (LOW)");
    }
    return 0;
}