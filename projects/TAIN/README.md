# TAIN

*DEVELOPING JUST STARTED, NOT MATURE LANGUAGE*

Tain is a programming language designed to be small, high level, fast and run everywhere.

Tain is developed using portable javascript code. (Currently running only in quickjs, but will be running in node and browser.)

Tain is not compiled directly, but transpiled to other languages using javascriptCompiler.js, a hand made parser for the language to get a JSON representation of the language. Afterward is transpiled ti other languages and run directly in their enviroments. Right now it's only being transpiled to C++.

A hello world in Tain looks like:
```
tain example [ message ]
             [ "Hello World!" ]

tout example[message]
```

Line breaks matters.
The keyword _tain_ creates a container where the first space separated value is the container name.
The next argument is a [ id1 | id2 | id3 ] list of ids.
In the next line are defined the values of the ids [ "hello" | 7 | 8 * 8 ]
                                                                       The _tout_ keyword is outputing the container id value.                

The program can be compiled to JSON using _qjs javascriptCompiler.js -f helloworld.tain -o helloworld.json_                                                                                                          The JSON representation of the program, can be compiled then to C++ using _qjs tain2cpp -f helloworld.json -o helloworld.cpp_

The C++ code can be compiled directly using _g++ -o helloworld helloworld.cpp_

You can do all this steps at once using _qjs compiler.js -f hellowolrd.tain -o helloworld_

A Tain hello world in JSON looks like:
```
{
  "definitions": {
    "example": {
      "ids": [
        "message"
      ],
      "values": [
        "Hello World!"
      ]
    }
  },
  "expressions": [
    {
      "expression": "tout",
      "contained": "example[message]"
    }
  ]
}
```


A Tain hello world transpiled to c++ looks like:
```
#include <iostream>

int main(int argc, char * argv[]) {

  struct tain_example {
    char message[14]  = "Hello World!";
  }; tain_example example;

  std::cout << example.message << std::endl;

  return 0;
}
```
