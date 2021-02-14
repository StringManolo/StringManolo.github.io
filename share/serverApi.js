import * as std from "std";

/* Use os.worker to stop blocking on pipe reading */

/* Read from pipe representing api console output until "END!" is found*/


let run = command => {
  let p = std.popen(command, "r"),
  msg = "",
  r = "";
  while(( r = p.getline() ) != null) {
    msg += r + "\n";
  }
  return msg;
}

let runInBackground = command =>{
  std.popen(command, "r");
  return;
}

let cli = {};
cli.COLORS = {
  RED: "\x1b[31m",
  RESET: "\x1b[0m",
  YELLOW:"\x1b[33m",
  BLUE: "\x1b[34m",
  GREEN: "\x1b[32m"
};


const apiPipe = "./apiPipe";
const consolePipe = "./consolePipe";
run(`mkfifo ${apiPipe}; mkfifo ${consolePipe}`);

cli.port = 8000;
cli.ip = "127.0.0.1";
for (let i in scriptArgs) {
  let argValue = scriptArgs[+i + 1];
  switch(scriptArgs[i]) { 
    case "-p":
    case "--port":
      cli.port = argValue;
    break;

    case "-i":
    case "--ip":
      cli.ip = argValue;
    break;
  }
}

const socketCode = `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
//#include <pthread.h>
//#include <cstdlib>
#include <iostream>
#include <unistd.h>
#include <vector>
//#include <array>
//#include <errno.h>

#include <fstream>

#define ERROR -1
/* Short te code a bit */
#define cout std::cout <<
#define br << std::endl
#define string std::string

int main(int argc, char **argv) {
  int sfd = 0;
  int sockbind = 0;
  int socklist = 0;

  struct in_addr ip;
  sockaddr_in sockaddr;


  sfd = socket(AF_INET, SOCK_STREAM, 0);
  if (sfd == ERROR) {
    cout "Failed to create socket." br;
    return 1;
  }

  sockaddr.sin_family = AF_INET;
  inet_aton("${cli.ip}", &ip);
  sockaddr.sin_addr.s_addr = ip.s_addr;
  sockaddr.sin_port = htons(${cli.port});
  sockbind = bind(sfd, (struct sockaddr*)&sockaddr, sizeof(sockaddr));
  if (sockbind == ERROR) {
    string error = strerror(errno);
    cout "Failed to bind to port ${cli.port} : ";
    cout error br;
    return 2;
  }

  socklist = listen(sfd, 10);
  if (socklist == ERROR) {
    cout "Failed to listen on socket." br;
    return 3;
  }

  cout "Server is listening @ http://${cli.ip}:${cli.port}" br;

  std::vector<char> buffer(2048);
  string resp;

  for(;;) {
    auto addrlen = sizeof(sockaddr);
    int connection = accept(sfd, (struct sockaddr*)&sockaddr, (socklen_t*)&addrlen);

    if (connection == ERROR) {
      cout "Failed to grab connection." br;
    }

    auto bytesRead = read(connection, &buffer[0], buffer.size());
    string bufferOut(buffer.begin(), buffer.end()); //Is possible to add null terminators before .end? That will make the .c_str() break before end.
    bufferOut += "END!";

    std::ofstream out("${consolePipe}");
    out << bufferOut;
    out.close();

    int c;
    resp = "";
    FILE *fd = std::fopen("${apiPipe}", "w+");
    while ((c = std::fgetc(fd)) != '\\r') {
      resp += c;
      if (resp.find("END!") != string::npos) {
        break;
      }
    }


    send(connection, resp.c_str(), resp.length(), 0);
    close(connection);
  }

  return 0;
}`;


let startServer = config => {
  console.log(`Generating server code...`);
  let fd = std.open(".server_internal_compilation_tmp_file.cpp", "w");
  fd.puts(socketCode);
  fd.close();

  console.log(`Code generated. Compiling...`);
  run("g++ -o .server_internal_runnable_sockets .server_internal_compilation_tmp_file.cpp && chmod +775 .server_internal_runnable_sockets");
  console.log("Server compiled, running on background");
  runInBackground("./.server_internal_runnable_sockets &")
  console.log(`Server is listening on background`);
  
}


let readNextRequest = () => {
  let b = "";
  let request = "";
  let fd = std.open("./consolePipe", "r"); //mkfifo consolePipe
/* Create config file to correlate name of pipes with other software */
  while( (b = fd.readAsString(1)) != "" ) {
    console.log(b);
    request += b;
    if (b == null) {
      
    } else if (/END\!/g.test(request)) {
      console.log("Regexp match. Request!");
      fd.close();
      return request.replace("END!");
    }
  }
  fd.close();
}

let answerRequest = request => {
  let req = {};
  request = request.split("\n");
  for (let i in request) {
    if (i === 0) {
      [req.method, req.path, req.httpVer] = request[i].split(" ");
    }
  }
  console.log(`
Request parsed:
${JSON.stringify(req, null, 2)}
`);

  let fd = std.open("./apiPipe", "w");
  fd.puts(`200 OK HTTP/1.1

This is a dummy response send from quickjs

END!`);
  fd.close();
}

startServer();
let request = readNextRequest();
console.log(`The first request was ${request}`);
answerRequest(request);
