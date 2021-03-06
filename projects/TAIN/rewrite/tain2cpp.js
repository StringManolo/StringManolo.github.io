import * as std from "std";                                            
let cli = {};                                                          for (let i in scriptArgs) {
  let value = scriptArgs[1 + +i];                                        switch(scriptArgs[i]) {                                                  case "-f":
    case "--file":
      cli.file = value;
    break;

    case "-o":
    case "--output":                                                         cli.output = value;                                                  break;
  }
}

let code = JSON.parse(std.loadFile( cli.file ));

let cppIncludes = "";
let cppGlobalScope = "";
const cppMain1 = `int main(int argc, char * argv[]) {
`;
const cppMain2 = `  return 0;
}`;
let cppCode = "";

let printCommentaries = false;


let transpile = instruction => {
  let getTypeOf = value => {
    value = ( isNaN(+value) ? value : +value);

    let type = "";

    if (value[0] == "_") {
      value = eval(value.replace("_", ""));
    }

    if (typeof(value) == "number") {

      /* sign */
      if(value[0] == "-") {
        type += "signed";
      } else {
        type += "unsigned";
      }

      /* floating point numbers */
      if (/\./.test(value.toString())) {
        if(+value >= -340282346638528859811704183484516925440 && +value <= 340282346638528859811704183484516925440) {
          return "float";
        } else {
          return "double";
        }
      }

      if (value >= -32768 && value <= 32767) {
        return type + " short int";
      } else if (value >= -2147483648 && value <= 2147483657) {
        if (type == "unsigned" && value < 65535) {
          return type + " short int";
        }
        return type + " int";
      } else {
        if (type == "unsigned" && value < 4294967315) {
          return type + " int";
        }
        return type + " long int";
      }
    }


  if (typeof(value) == "string") {
    if(/^return/.test(value)) {
      return `/*tain_function*/auto`;
    } else {
      return `std::string`;
    }
  }




  }

//console.log(`INSTRUCTION: ${instruction}`);
  if (instruction.split(" ")[0] == "define") {
    let type = "";
    switch(instruction.split(" ")[1]) {
      case "global":
        type = getTypeOf(instruction.split("->")[2].trim())
        if (!/\<string\>/g.test(cppIncludes)) {
          if (type == "std::string") {
            cppIncludes += `#include <string>\n`;
          }
        }

        if (type.trim() == `/*tain_function*/auto`) {
          let functionArgs = [];
          let argsFound;
          let functionArgsCounter = 1;
          do {
            argsFound = false;
            if (new RegExp(`\<arg${functionArgsCounter++}\>`, "g").test(instruction.split("->")[2].trim())) {
console.log(`arg${functionArgsCounter - 1} found`);
              argsFound = true;
              functionArgs.push(`args${functionArgsCounter - 1}`);
            } else {
console.log(`NOT MATCHING: ${instruction.split("->")[2]}`);
            }
          } while(argsFound);
          for (let i in functionArgs) {
            instruction = instruction.replace(`<arg${+i + 1}>`, `arg${+i + 1}`);
            functionArgs[i] = `const std::any& ${functionArgs[i]}`;

            // remplaza scope por aprentesis con args
            //instructions = instructions.replace(`
          }
          let parentesis = `(${functionArgs})`;
          instruction = instruction.replace("=", `${parentesis} {`);
          instruction += "}";
//instopar:define scoped math -> mult -> return <arg1> * <arg2>
        } else {
         // console.log(`TYPE NOT MATCHING:${type}`);
        }


        cppGlobalScope += `${type.trim()} ${instruction.split("->")[1].trim()} = ${instruction.split("->")[2].trim()[0] == "_" ? eval(instruction.split("->")[2].replace("_","").trim()) : instruction.split("->")[2].trim()};\n`;
      break;

      case "scoped":
        type = getTypeOf(instruction.split("->")[2].trim());
        if (!/\<string\>/g.test(cppIncludes)) {
          if (type == "std::string") {
            cppIncludes += `#include <string>\n`
          }
        }

        let isFunction = false;
        if (type.trim() == `/*tain_function*/auto`) {
          isFunction = true;
          let functionArgs = [];
          let argsFound;
          let functionArgsCounter = 1;
          do {
            argsFound = false;
            if (new RegExp(`\<arg${functionArgsCounter++}\>`, "g").test(instruction.split("->")[2].trim())) {
console.log(`arg${functionArgsCounter - 1} found`);
              argsFound = true;
              functionArgs.push(`arg${functionArgsCounter - 1}`);
            } else {
console.log(`NOT MATCHING: ${instruction.split("->")[2]}`);
            }
          } while(argsFound);
          for (let i in functionArgs) {
            if (!/\<any\>/.test(cppIncludes)) {
              cppIncludes += "#include <any>\n";
            }
            instruction = instruction.replace(`<arg${+i + 1}>`, `arg${+i + 1}`);
            functionArgs[i] = `const std::any& ${functionArgs[i]}`;

            // remplaza scope por aprentesis con args
            //instructions = instructions.replace(`
          }
          let parentesis = `(${functionArgs})`;
          instruction = instruction.replace(`${instruction.split("->")[1].trim()}`, `${instruction.split("->")[1].trim()}${parentesis} {`);
          instruction += "}";
//instopar:define scoped math -> mult -> return <arg1> * <arg2>
        } else {
         // console.log(`TYPE NOT MATCHING:${type}`);
        }

        for (let i = 0; i < (scopeMirror.length || 1); ++i) {
          if (!scopeMirror[instruction.split(" ")[2]]) {
            scopeMirror[instruction.split(" ")[2]] = {};
            cppCode += `  struct tain_${instruction.split(" ")[2]} {
  }; tain_${instruction.split(" ")[2]} ${instruction.split(" ")[2]};

`;
          }
          scopeMirror[instruction.split(" ")[2]][instruction.split("->")[1]] = instruction.split("->")[2];
          cppCode = cppCode.replace(`}; tain_${instruction.split(" ")[2]}`, `  ${type.trim()} ${instruction.split("->")[1].trim()} ${isFunction ? "" : "="} ${type != "std::string" ? instruction.split("->")[2].trim() : '"' + instruction.split("->")[2].trim() + '"'};
  }; tain_${instruction.split(" ")[2]}`);
        }
      break;
    }
  } else if(printCommentaries && instruction.split(" ")[0] == "comentary") {
    cppCode += instruction.split("->")[1].replace("#", " //") + "\n";
  } else if(instruction.split(" ")[0] == "tout") {
    if (!/\<iostream\>/g.test(cppIncludes)) {
      cppIncludes += `#include <iostream>\n`;
    }

    let aux = JSON.parse(instruction.split("->")[1]);
    let aux2 = aux.args;
    if (/\|/g.test(aux2)) {
      aux2 = aux2.split("|");
    } else {
      aux2 = [aux2.trim()];
    }

    for (let i in aux2) {
      cppCode += `  std::cout << ${aux.scope}.${aux2[i].trim()} << std::endl;\n`
    }

  }
}








let controlFlow = code.controlFlow;
let scopeMirror = {};
for (let i = 1; i < code.controlFlowCounter; ++i) {
  transpile(controlFlow[`f${i}`]);
}


const endCode = `${cppIncludes}
${cppGlobalScope}
${cppMain1}
${cppCode}
${cppMain2}
`;

console.log(endCode);

if (cli.output) {
  let fd = std.open(cli.output, "w")
  fd.puts(endCode);
  fd.close();
}
