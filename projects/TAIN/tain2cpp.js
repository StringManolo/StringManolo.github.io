import * as std from "std";

let cli = {};
for (let i in scriptArgs) {
  let value = scriptArgs[1 + +i];
  switch(scriptArgs[i]) {
    case "-f":
    case "--file":
      cli.file = value;
    break;

    case "-o":
    case "--output":
      cli.output = value;
    break;
  }
}

let code = JSON.parse(std.loadFile( cli.file || "intermediate" ));

let containers = Object.entries(code.definitions);

let expressions = Object.entries(code.expressions);

let cppIncludes = "";
const cppMain1 = `int main(int argc, char * argv[]) {
`;
const cppMain2 = `return 0;
}`;
let cppCode = "";

// Add type of value, example int, char, etx
let addType = (value, id) => {
  //console.log(typeof(value)); 
  let type = "";

  /* Numbers */
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
        return type + " float";
      } else {
        return type + " double";
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
    if(value[0] == "<") {
      return "// need to analice the function return value.";
    } else {
      return `char ${id}[${value.length}]`;
    }
  }


}

// Containers
for (let i = 0; i < containers.length; ++i) {
  console.log(containers[i][0]);
  let ids = containers[i][1].ids;
  let values = containers[i][1].values;
  let stringId = "";
  console.log(`VALUES: ${JSON.stringify(values)}`);

  cppCode += `  struct tain_${containers[i][0]} {\n`; 
  for(let i in ids) {
    if (new RegExp("^char ", "").test(addType(values[i]))) {
      values[i] = `"${values[i]}"`;
      stringId = ids[i];
      ids[i] = "";
    }
    cppCode += `    ${addType(values[i], stringId)} ${ids[i]} = ${values[i]};\n`
  }
  cppCode += `  }; tain_${containers[i][0]} ${containers[i][0]};\n\n`;
} 

// Expresions
for (let i = 0; i < expressions.length; ++i) {

}

const endCode = `${cppIncludes}
${cppMain1}
${cppCode}
${cppMain2}
`;

console.log(endCode);
