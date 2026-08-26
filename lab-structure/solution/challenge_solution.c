#include <stdio.h>

// 1. ประกาศ Function Prototype
void showInfo();

// 2. Main Function
int main() {
    // เรียกใช้งานฟังก์ชันย่อย
    showInfo();
    
    // แสดงข้อความยืนยันความถูกต้อง
    printf("C Program Structure Validated Successfully!\n");
    
    // ส่งค่ากลับ 0 เพื่อยืนยันจบโปรแกรมปกติ
    return 0;
}

// 3. Function Definition
void showInfo() {
    printf("=======================================\n");
    printf("  C Programming: Structure Challenge   \n");
    printf("=======================================\n");
}