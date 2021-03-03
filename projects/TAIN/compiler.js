import * as std from "std";

let run = command => {
  let p = std.popen(command, "r"),
  msg = "",
  r = "";
  while(( r = p.getline() ) != null) {
    msg += r + "\n";
  }
  return msg;
}

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

let code = std.loadFile( cli.file )

run(`qjs javascriptCompiler.js -f ${cli.file} -o .tain_internal.json && qjs tain2cpp.js -f .tain_internal.json -o .tain_internal.cpp && g++ -o ${cli.output} .tain_internal.cpp`);
