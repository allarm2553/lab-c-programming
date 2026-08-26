#include <stdio.h>

struct User {
    int id;
    char username[20];
};

int main() {
    struct User user1 = {101, "admin"};
    printf("User ID: %d, Name: %s\n", user1.id, user1.username);
    return 0;
}