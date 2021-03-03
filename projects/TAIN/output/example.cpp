#include <iostream>

int main(int argc, char * argv[]) {

  struct tain_animal {
    unsigned short int age = 4;
    float height = 0.55;
    float width = 0.4;
    // need to analice the function return value. run = <time, speed>{ "time is <time>, and speed is <speed>" };
    unsigned short int sleep = 5;
  }; tain_animal animal;

  struct tain_animal2 {
    unsigned short int age = 4;
    float height = 0.55;
    float width = 0.4;
    char run[14]  = "I'm running!";
    unsigned short int sleep = 5;
  }; tain_animal2 animal2;

  std::cout << animal.age << std::endl;
  std::cout << animal2.run << std::endl;

  return 0;
}
