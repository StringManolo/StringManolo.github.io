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


const target = "https://stringmanolo.ga/";

const command = "curl " + target + " --silent";
for (;;) {
  run(command);
}
