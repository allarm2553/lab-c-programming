#include <stdio.h>

long long factorialIterative(int n) {
    long long res = 1;
    for (int i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}

long long factorialRecursive(int n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}

int main() {
    int num;
    printf("Enter an integer: ");
    if (scanf("%d", &num) == 1 && num >= 0) {
        printf("Iterative: %d! = %lld\n", num, factorialIterative(num));
        printf("Recursive: %d! = %lld\n", num, factorialRecursive(num));
    }
    return 0;
}