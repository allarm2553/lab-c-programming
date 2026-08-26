#include <stdio.h>

struct Student {
    char id[15];
    char name[50];
    float score;
};

int main() {
    struct Student stds[3];
    float total = 0.0;
    
    printf("--- Input 3 Students ---\n");
    for (int i = 0; i < 3; i++) {
        printf("Student #%d ID: ", i + 1);
        scanf("%14s", stds[i].id);
        printf("Student #%d Name: ", i + 1);
        scanf("%49s", stds[i].name);
        printf("Student #%d Score: ", i + 1);
        scanf("%f", &stds[i].score);
        total += stds[i].score;
    }
    
    printf("\n--- Student Records ---\n");
    printf("%-15s %-20s %s\n", "ID", "Name", "Score");
    printf("---------------------------------------------\n");
    for (int i = 0; i < 3; i++) {
        printf("%-15s %-20s %.2f\n", stds[i].id, stds[i].name, stds[i].score);
    }
    printf("---------------------------------------------\n");
    printf("Average Score: %.2f\n", total / 3.0);
    
    return 0;
}