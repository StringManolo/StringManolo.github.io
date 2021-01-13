import * as std from "std";
import * as os from "os";

let run = command => {
  let p = std.popen(command, "r"),
  msg = "",
  r = "";

  while(( r = p.getline() ) != null) {
    msg += r + "\n";                                              }
  return msg;
}

let cli = {};
cli.COLORS = {
  RED: "\x1b[31m",
  RESET: "\x1b[0m",
  YELLOW:"\x1b[33m",
  BLUE: "\x1b[34m",
  GREEN: "\x1b[32m"
};
                                                                for (let i in scriptArgs) {
  switch(scriptArgs[i]) {
    case "-t":
    case "--token":
      cli.token = scriptArgs[+i + +1];
    break;

    case "-s":
    case "--save":
      let fd = std.open(".token", "w");
      fd.puts(cli.token);
      fd.close();
    break;

    case "-l":
    case "--load":
      cli.token = std.loadFile(".token");
    break;

    case "-h":
    case "--help":
      throw `

usage: qjs tgbot.js [options]
  -t  --token            Telegram Bot Api Token. https://t.me/BotFather
  -s  --save             Save the token internally to start the bot in the future without manually provide the token each time.
  -l  --load             Use the saved token to start the bot.
  -h  --help             This message.
  -v  --verbose          Show basic feedback to the command line interface.
  -w  --wait             Bot delay in seconds. (Can process multiple messages at once, so you don't need a really low number to don't fallback).

Examples:
qjs tgbot.js -t 192829292:iqidkwiexampleunvalidtokeniwjwusjwis -s -v

qjs tgbot.kz -l -v

qjsc -o ctgbot tgbot.js && cp tgbot ~/../usr/bin/
tgbot -l -w 2 -v

`;

    case "-v":
    case "--verbose":
      cli.v = true;;
    break;

    case "-w":
    case "--wait":
      cli.wait = scriptArgs[+i + +1];
    break;
  }
}


if (!cli.token) {
  throw `${cli.COLORS.RED}No has introducido tu token de telegram.${cli.COLORS.RESET}

Si aún no pusiste tu token.
Inicia con: qjs tgbot.js -t 183828181:kqnsiwnskwkziqnsoqnsiqn -s

Si ya introduciste tu token.
Inicia con: qjs tgbot.js -l

Si aún no tienes un token.
Visita ${cli.COLORS.BLUE}https://t.me/BotFather${cli.COLORS.RESET} y escríbele /newBot


ESCRIBE ${cli.COLORS.YELLOW}qjs tgbot.js -h${cli.COLORS.RESET} PARA OBTENER LISTA DE COMANDOS.`;
}

let bot = () => {
let api = run(`curl https://api.telegram.org/bot${cli.token}/getUpdates --silent`);

let apiJson = JSON.parse(api);

if (apiJson.ok !== true) {
  throw `Telegram Api Returning An Error:
${api}`;
}

if (!apiJson.result) {
  throw `No results to parse:
${api}`;
}

let process = (text, username, chatId) => {
  let response = "";


  if (text.substr(0,1) == "/") {
    let recv = text.substring(1).toLowerCase();
    switch(recv) {
      case "start":
        response = "Comandos Disponibles:\n/Placeholder1 Haz esto\n/Placeholder2 Haz Aquello\n";
      break;

      case "hola":
        response = `Hola ${username} soy un bot escrito en javascript por @StringManolo.`;
      break;

      case "adios":
      case "chao":
        response = `Un placer ${username}! Qué vaya bien.`;
      break;

      default:
        response = `No se que significa ${recv}...`;
    }

  }

  if (response) {
    cli.v && console.log(`Respuesta: ${response}\n`);
    let aux = `https://api.telegram.org/bot${cli.token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(response)}`;
    run(`curl "${aux}" --silent`);
  }
}


let lastId = 0;
for (let i in apiJson.result) {
  if (apiJson.result[i].message &&
  apiJson.result[i].message.text &&
  apiJson.result[i].update_id &&
  apiJson.result[i].message.from.username &&
  apiJson.result[i].message.chat.id) {
    let text = apiJson.result[i].message.text;
    let updateId = apiJson.result[i].update_id;
    let username = apiJson.result[i].message.from.username;
    let chatId = apiJson.result[i].message.chat.id;
    lastId = updateId;
    process(text, username, chatId);
  }
}

let borrarMensajesApi = () => {
  run(`curl https://api.telegram.org/bot${cli.token}/getUpdates?offset=${+lastId + 1} --silent`);
}

borrarMensajesApi();
cli.v && console.log("Bot process end");
}

/* Corre el bot cada 10 segundos */
let i = 0;
for (;;) {
  cli.v && console.log(`Running bot for the ${++i}° time.`);
  bot();
  cli.v && console.log(`Waiting ${(cli.wait || 20)} seconds to save resources.`);
  os.sleep( (cli.wait || 20) * 1000);
}
