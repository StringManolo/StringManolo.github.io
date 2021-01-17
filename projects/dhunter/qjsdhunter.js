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

let cli = {
  separator: "\n"
};

for (let i in scriptArgs) {
  switch(scriptArgs[i]) {
    case "-t":
    case "--target":
      cli.target = scriptArgs[+i + +1];
    break;

    case "-d":
    case "--dictionary":
      cli.dictionary = scriptArgs[+i + +1];
    break;

    case "-i":
    case "--ignore":
      cli.ignore = true;
    break;
    
    case "-l":
    case "--limit":
      cli.limit = scriptArgs[+i + +1];
    break;

    case "-s":
    case "--separator":
      cli.separator = scriptArgs[+i + +1];
    break;

    case "-h":
    case "--help":
      console.log(`usage: qjs dhunter.js [options]

  -t  --target            Full url of the target
  -d  --dictionary        Full url lf dicctionary
  -s  --separator         String separator. Default is newline
  -l  --limit             Number of words to use. Default all.
  -i  --ignore            Proceed without confirmation.
  -h  --help              This message.
`);
      std.exit(0);

  }
}

let error = msg => {
  console.log(`ERROR: ${msg}

qjs dhunter.js --help
`);
  std.exit(1);
};

!cli.target && error("Missing target argument.");
!cli.dictionary && error("Missing dictionary argument.");

console.log(`Downloading dictionary from ${cli.dictionary}`);
let dictionary = run(`curl --silent -L ${cli.dictionary}`);
console.log(`Download finished. ${dictionary.length} bytes downloaded.
`);

console.log(`Spliting dictionary...`);
try {
  dictionary = dictionary.split(cli.separator);
} catch (err) {
  error(err);
}
if (!cli.limit) {
  console.log(`Splited finished. Using ${dictionary.length} keywords as subdirectories.`);
} else {
  console.log(`Splited finished. Using ${cli.limit} of ${dictionary.length} keywords as subdirectories.`);
  if (+cli.limit < dictionary.length) {
    if (+cli.limit > 0) {
      dictionary.length = +cli.limit;
    } else {
      error(`You can't use ${cli.limit}. Limit argument need to be higher than 0. Makes sense right?`);
    }
  }


}

if (!cli.ignore) {
  console.log(`Triying first key on host...
The end route is ${cli.target}${dictionary[0]}

Write y to proceed.
`);
  if(std.in.getline() != "y") {
    error("You stoped the program. Write the character y next time.");
  }
}

let results = [];

for (let i in dictionary) {
  if (/200/g.test(run(`curl --silent -I ${cli.target}${dictionary[i]}`).split("\n"))) {
    results.push(`${cli.target}${dictionary[i]}`);
  }
}

console.log(`Directories Found:
${results}
`);
