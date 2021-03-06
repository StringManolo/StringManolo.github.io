import * as std from "std";                                            
/* Get arguments from cli */
let cli = {};
for (let i in scriptArgs) {
  let value = scriptArgs[1 + +i];
  switch(scriptArgs[i]) {
    case "-f":                                                             case "--file":
      cli.file = value;
    break;

    case "-o":
    case "--output":                                                         cli.output = value;                                                  break;
  }                                                                    }                                                                      
let tain = {};                                                         tain.controlFlow = {}; //Add here the execution order
tain.controlFlowCounter = 1;                                           tain.containers = {};                                                  tain.containers.global = {};
tain.comentaries = [];
tain.calls = [];
tain.calls_functions = [];
tain.tout = [];

let findFirstNotCharFromPos = (pos, code) => {
  for(let i = pos; i < code.length; ++i) {
    if (!/[a-zA-Z0-9]/.test(code[i])) {
      return code[i];
    }
  }
}

let parseTainKeyword = line => {
  line = line.replace("tain", "").trim();
  //line = line.replaceAll(" ", "");
  let containersId = line.split("[")[0].trim();
  let containersProp = line.split("[")[1].split("]")[0];
  if (/\|/g.test(containersProp)) {
    containersProp = containersProp.split("|");
  } else {
    containersProp = [containersProp];
  }

  let containersValue = line.split("[")[2].split("]")[0];
  if (/\|/g.test(containersValue)) {
    containersValue = containersValue.split("|");
  } else {
    containersValue = [containersValue];
  }

  for (let i in containersValue) {
    if (new RegExp("^return", "i").test(containersValue[i])) {
      containersValue[i] = containersValue[i].replace("return", "FUNCTION([...args]){ ") + " }";
    }
  }

  if (containersId) {
    for (let i in containersProp) {
      if (!tain.containers[containersId]) {
        tain.containers[containersId] = {};
      }

      tain.containers[containersId][containersProp[i].trim()] = containersValue[i].trim();

      tain.controlFlow[`f${tain.controlFlowCounter++}`] = `define scoped ${containersId} -> ${containersProp[i].trim()} -> ${eval(containersValue[i].replace("_","").trim())}`;

      /* Precompute */
      if (tain.containers[containersId][containersProp[i].trim()][0] == "_") {
        tain.containers[containersId][containersProp[i].trim()] = eval(tain.containers[containersId][containersProp[i].trim()].replace("_", ""));
      }
    }

  } else {
    for (let i in containersProp) {
      tain.containers.global[containersProp[i].trim()] = containersValue[i].trim();

      tain.controlFlow[`f${tain.controlFlowCounter++}`] = `define global -> ${containersProp[i].trim()} -> ${eval(containersValue[i].replace("_", "").trim())}`;

      /* Precompute */
       if (tain.containers.global[containersProp[i].trim()][0] == "_") {
         tain.containers.global[containersProp[i].trim()] = eval(tain.containers.global[containersProp[i].trim()].replace("_",""));
      }
    }
  }
}


let parseToutKeyword = line => {
  tain.tout.push( { scope: line.split("tout")[1].split("[")[0].trim(),
  args: line.split("tout")[1].split("[")[1].split("]")[0].trim()});

  tain.controlFlow[`f${tain.controlFlowCounter++}`] = `tout -> ${JSON.stringify(tain.tout[tain.tout.length-1])}`;

  if (/\|/g.test(tain.tout[tain.tout.length-1].args)) {
    tain.tout[tain.tout.length-1].args = tain.tout[tain.tout.length-1]
.args.split("|");
    for (let i in tain.tout[tain.tout.length-1].args) {
      tain.tout[tain.tout.length-1].args[i] = tain.tout[tain.tout.length-1].args[i].trim()
    }
  } else {
    tain.tout[tain.tout.length-1].args = [tain.tout[tain.tout.length-1].args];
  }
}


/* TODO Unir lineas cuando . ultimo char de linea */

let tainSourceCode = std.loadFile( cli.file )

let tainClean = tainSourceCode.replaceAll("  ", "");

let lines = tainClean.split("\n");



for (let i in lines) {
  if (/\#/g.test(lines[i])) {
    tain.comentaries.push("#" + lines[i].split("#").splice(1).join("#"));
    lines[i] = lines[i].split("#")[0];
    tain.controlFlow[`f${tain.controlFlowCounter++}`] = `comentary -> ${tain.comentaries[tain.comentaries.length-1]}`;
  }

  if (/^t/.test(lines[i])) {
    let word = lines[i].split(findFirstNotCharFromPos(0, lines[i]))[0];
    switch(word) {
      case "tain":
        parseTainKeyword(lines[i]);
      break;

      case "tout":
        parseToutKeyword(lines[i]);
      break;
    }
  } else {
    // not checking global scope functions yet
    let scope = lines[i].split(findFirstNotCharFromPos(1, lines[i]))[0];
    let containerEntries = Object.entries(tain.containers);
    for (let j in containerEntries) {
      if (scope == containerEntries[j][0]) {
        switch(lines[i].split("[").length) {
          case 1:
            throw `Error in line ${+i + 1} while transpiling tain to json
hint: If you try to do a call without arguments, add []. Or maybe you forgot tain keyword ?
Line: ${lines[i]}`;
          break;

          case 2:
            tain.calls.push(lines[i]); //replace by value
            tain.controlFlow[`f${tain.controlFlowCounter++}`] = `call -> ${lines[i]}`;
          break;

          case 3:
            let aux = lines[i].toString().replaceAll(" ", "");
            tain.calls_functions.push( { containerName: aux.split("[")[0], property: aux.split("]")[0].split("[")[1], values: aux.split("[")[2].split("]")[0] });
            tain.controlFlow[`f${tain.controlFlowCounter++}`] = `function call -> ${JSON.stringify(tain.calls_functions[tain.calls_functions.length-1])}`;
            if (/\|/g.test(tain.calls_functions[tain.calls_functions.length-1].values)) {
              tain.calls_functions[tain.calls_functions.length-1].values = tain.calls_functions[tain.calls_functions.length-1].values.split("|");
            }
          break;

          default:
            throw `Why so many [ ? ${lines[i]}`;
        }
      }
    }
  }
}


if (cli.output) {
  let fd = std.open(cli.output, "w");
  fd.puts(JSON.stringify(tain, null, 2));
  fd.close();
}

console.log(JSON.stringify(tain, null, 4));
