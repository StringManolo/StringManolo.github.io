#include <iostream>

int main(int argc, char * argv[]) {

  struct tain_example {
    char message[14]  = "Hello World!";
  }; tain_example example;

  std::cout << example.message << std::endl;

  return 0;
}
