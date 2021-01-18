import * as std from "std";
import * as os from "os";

let run = command => {
  let p = std.popen(command, "r"),
  msg = "",
  r = "";

  while(( r = p.getline() ) != null) {
    msg += r + "\n";
  }
  return msg;
}

let a = (threads) => {
  for(let i = 0; i < threads; ++i) {
    let worker = new os.Worker("c.js");
  }
}

let cli = {};
for (let i in scriptArgs) {
  switch (scriptArgs[i]) {
    case "-t":
      cli.t = scriptArgs[+i + 1];
    break;

    case "-d":
      cli.d = scriptArgs[+i + 1];
    break;

    case "-s":
      cli.s = scriptArgs[+i + 1];
    break;
  }
}

a(cli.t);

/* Keep alive */
console.log(`Waiting ${cli.s}`);
os.sleep(+cli.s * 1000);
