/*** MISC */
/* 
 * Author: @XSStringManolo
 *
*/
/* MISC ***/


/*** MODULES */
const http = require("http");
const path = require("path");
const fs = require("fs");
/* MODULES ***/


/*** CUSTOM MODULES */
const getFiles = require("./modules/files/getFiles").getFiles;
const getParams = require("./modules/cli/getParams").getParams;
const getContentType = require("./modules/utils/getContentType").getContentType;

let getFileContent = filePath => fs.readFileSync(filePath, { encoding: "utf-8" });
/* CUSTOM MODULES ***/


/*** SHORTCUTS */
global._ = args => console.log(args);
/* SHORTCUTS ***/


/*** GLOBALS */
let config = (() => {
  const params = getParams();
  return { 
    port: params.port || params.p,
    files: params.files || params.f,
    methods: ["get", "head", "post", "options"],
    headers: {
      "server": "Apache",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1",
      "Referrer-Policy": "no-referrer"/*,
      "Content-Security-Policy": "default-src 'none'; img-src 'self'; object-src 'none'; script-src 'self'; style-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"*/
    } 
  };
})();

config.availableFiles = (() => {
  if (config.files) {
    return f.split(",");
  } else {
    return getFiles("./public"); 
  }
})();
/* GLOBALS ***/


/*** ERROR HANDLING */
const USAGE = `Usage:
-p  --port   Number of port to bind to
-f  --files   Comma separated values of filepath/folders to serve. If not set, current path ./public folder is used to serve files.

`;

if (!config.port) {
  _(USAGE);
  process.exit();
}
/* ERROR HANDLING ***/


/*** SERVER FUNCTIONS */
let methodIsValid = method => {
  for(let i in config.methods) {
    if(method.toLowerCase() == config.methods[i]) {
      return true;
    }
  }
  return false;
}

/* Test if file is in public folder or provided as --file argument in cli */
let fileIsAvailable = filepath => {
  filepath = decodeURI(filepath);
  if(filepath == "/") {
    filepath += "index.html";
  }

  if (!config.files) {
    filepath = "./public" + filepath;
  }
  for(let i in config.availableFiles) {
    if (filepath == config.availableFiles[i]) {
      return filepath;
    }
  }
  return false;
}


let getExt = url => {
  let aux = path.extname(decodeURI(url));
  if (!aux && url == "/") {
    aux = "html";
  } else {
    aux = aux.substring(1);
  }
  return aux;
}


let answer = (req, res, requestedFile, code) => { 
  let fileContent, responseCode, contentType;
  if (code == 404 || code == 405) {
    config.ext = "html";
    contentType = getContentType("."+config.ext);
    fileContent = getFileContent(`./defaultPages/${code}.html`);
    responseCode = code;
  } else {
    config.ext = getExt(req.url);
    contentType = getContentType("."+config.ext);
    fileContent = getFileContent(requestedFile);
    responseCode = 200;
  }

  config.headers["Content-Type"] = contentType
  config.headers["Content-Length"] = fileContent.length;
  res.writeHead(responseCode, config.headers);
  if(req.method == "head") {
    res.end();
  } else {
    res.end(fileContent);
  }
}
/* SERVER FUNCTIONS ***/

/*** MAIN */
let fecha = new Date()
let i = 0;
http.createServer( (req, res) => {
  _(`Time: ${new Date()}
Request Number: ${++i}
`);

  if(methodIsValid(req.method)) {
    let requestedFile = fileIsAvailable(req.url);
    if (requestedFile) {
      answer(req, res, requestedFile);
    } else {
      answer(req, res, requestedFile, 404); 
    }
  } else {
    answer(req, res, "dummy", 405);
  }

  
  
}).listen(config.port);
_(`Server is binded`);
/* MAIN ***/
