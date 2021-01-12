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

let cli = {};
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
  }
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

let obtenerHoraPorPais = pais => {
  let timeZones = std.loadFile("timezones.txt");
  let timeZones2 = std.loadFile("timezones2.txt");

  let jsonTimezones = JSON.parse(timeZones);
  let jsonTimezones2 = JSON.parse(timeZones2);

  let zonasUsuario = [];

  for (let i in jsonTimezones) {
    if (new RegExp(pais, "gi").test(jsonTimezones[i].name)) {
      let usos = jsonTimezones[i].timezones;
      zonasUsuario = jsonTimezones[i].timezones;

    }
  }

  let tz = [];
  for (let i in zonasUsuario) {
    for (let j in jsonTimezones2) {
      for (let k in jsonTimezones2[j].utc) {
        if (new RegExp(zonasUsuario[i], "gi").test(jsonTimezones2[j].utc[k])) {
          tz.push({
            timezone: jsonTimezones2[j].utc[k],
            offset: +jsonTimezones2[j].offset - 1
          });
        }
      }
    }
  }

  let aux = new Date().toString().split(" ")[4].split(":");
  let tiempo = {
    hora: aux[0],
    minutos: aux[1],
    segundos: aux[2]
  };


  if (tiempo.hora == 0) {
    tiempo.hora = 23;
  } else {
    tiempo.hora -= 1;
  }

  let tiempoActual = {};
  for (let i in tz) {
    tiempoActual.hora = tiempo.hora + tz[i].offset;
    if (tiempoActual.hora > 24) {
      tiempoActual.hora -= 12;
    }

    if (tiempoActual.hora < 0) {
      tiempoActual.hora += 12;
    }

    tz[i].hora = tiempoActual.hora;
    tz[i].minuto = tiempo.minutos;
    tz[i].segundo = tiempo.segundos;
  }
  return tz;
}

let process = (text, username, chatId) => {
  let response = "";

  let start = false;
  if (text == "/start") {
    start = true;
  }

  if (text.substr(0,1) == "/") {
    let aux = obtenerHoraPorPais(text.substring(1));
    if (!aux) {
      return;
    }
   
    console.log(`El usuario ${username} pidio ${text}`);
    response = `Hola ${username}, el pais ${text.substring(1)} tiene ${aux.length} uso/s horario/s.`;
    for (let i in aux) {
      response += `\n\n${aux[i].timezone}: ${aux[i].hora}:${aux[i].minuto}:${aux[i].segundo}\nLa diferencia horaria es de ${aux[i].offset} horas`;
    }

    response += `\n\n\nLa Hora internacional es ${new Date().getUTCHours()}`;
    if (!obtenerHoraPorPais(text.substring(1))) {
      response = false;
    }
  }

  if (response) {
    if (start) {
      response = "Escribe /pais para ver la hora.\nPor ejemplo /spain";
    }
    console.log(`Respuesta: ${response}\n`);
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
console.log("Bot process end");
}

/* Corre el bot cada 10 segundos */
let i = 0;
for (;;) {
  console.log(`Running bot ${++i}`);
  bot();
  os.sleep(60 * 1000);

}
