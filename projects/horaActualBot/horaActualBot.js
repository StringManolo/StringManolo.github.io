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

let cli = {};                                              for (let i in scriptArgs) {
  switch(scriptArgs[i]) {
    case "-t":
    case "--token":
      cli.token = scriptArgs[+i + +1];
      console.log(`Token: ${cli.token}`);
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
/*console.log(`API: ${api}`);
console.log(`JSON: ${apiJson}`);
console.log(`Formated JSON: ${JSON.stringify(apiJson, null, 3)}`);*/


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
    //console.log(`Name: ${jsonTimezones[i].name}`);
    if (new RegExp(pais, "gi").test(jsonTimezones[i].name)) {
      let usos = jsonTimezones[i].timezones;
      console.log(`Los timezones para ${pais} son ${usos}`);
      console.log(jsonTimezones[i].name);

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
            offset: jsonTimezones2[j].offset
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
    tiempo.hora = 22;
  } else if (tiempo.hora == 1) {
    tiempo.hora = 23;
  } else {
    tiempo.hora -= 2;
  }

  if ((tiempo.hora + 1) == 25) {
    tiempo.hora = 1;
  } else {
    tiempo.hora + 1;
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
  if (text.substr(0,1) == "/") {
    //console.log(text.substring(1));
    let aux = obtenerHoraPorPais(text.substring(1));
    if (!aux) {
      return;
    }


    response = `Hola ${username}, el pais ${text.substring(1)} tiene ${aux.length} uso/s horario/s.`;
    for (let i in aux) {
      response += `\n\n${aux[i].timezone}: ${aux[i].hora}:${aux[i].minuto}:${aux[i].segundo}\nLa diferencia horaria es de ${aux[i].offset} horas`;
    }

    response += `\n\n\nLa fecha utc es ${new Date().getUTCDate()}`;
    if (!obtenerHoraPorPais(text.substring(1))) {
      response = false;
    }
  }

  if (response) {
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
}

/* Corre el bot cada 10 segundos */
for (;;) {
  bot();
  os.sleep(10 * 1000);
}