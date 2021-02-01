import * as std from "std";

const articlesFolder = "./articles/";

let run = args => {
  let aux = `${args}`;
  let prog = std.popen(aux, "r");
  let r, msg = "";
  while ((r = prog.getline()) != null) {
    msg += r + "\n";
  }
  return msg;
}


let cli = {};

for (let i in scriptArgs) {
  switch(scriptArgs[i]) {
    case "-e":
    case "--edit":
      cli.e = true;
      cli.articleName = scriptArgs[1 + +i];
    break;

    case "-c":
    case "--create":
      cli.c = true;
    break;

    case "-d":
    case "--delete":
      cli.d = true;
      cli.articleName = scriptArgs[1 + +i];
    break;

    case "-u":
    case "--update":
      cli.u = true;
    break;

    case "-h":
    case "--help":
      console.log(`usage: qjs artGen.js option

  -c  --create  Create a new article and update list of articles.
  -e  --edit articleName  Edit an article.
  -u  --update  Update the list of articles.
  -h  --help    Show this message

NOTICE: Only 1 argument at time.
`);
      std.exit();
    break;
  }
}

if(!cli.c && !cli.e && !cli.u && !cli.d) {
  console.log(`No arguments found. Use -h for usage`);
  std.exit();
}

if (cli.c) {
  let article = {};

  console.log("File Name");
  let filename = std.in.getline();
  console.log("Title:");
  article.title = std.in.getline();
  console.log("Desc:");
  article.desc = std.in.getline();
  console.log("Author:");
  article.author = std.in.getline();
  console.log("Full Article:");
  article.full = std.in.getline();
  console.log("Section");
  article.section = std.in.getline();
  console.log("Image Local Path:");
  article.image = std.in.getline();
  article.date = new Date();

  console.log(JSON.stringify(article, null, 2));

  let json = JSON.stringify(article);

  let fd = std.open(`${articlesFolder}${filename}`, "w+");
  fd.puts(json);
  fd.close()

  let listOfArticles = run(`ls ${articlesFolder}`).split("\n");

  let articlesList = {};
  articlesList.list = [];
  for(let i in listOfArticles) {
    if(listOfArticles[i] != "articlesList.json" && listOfArticles[i] != "") {
      articlesList.list.push(listOfArticles[i])
    }
  }

  fd = std.open(`${articlesFolder}articlesList.json`, "w+");
  fd.puts(JSON.stringify(articlesList));
  fd.close();

} else if (cli.e) {
  if (!cli.articleName) {
    console.log("Write the filename of your article.");
    cli.articleName = std.in.getline();
  }

  let fileContent = std.loadFile(`./articles/${cli.articleName}`);
  console.log(fileContent);
  let json = JSON.parse(fileContent);	
  console.log(`
Write the name of the property you want to edit:`);
  let propName = std.in.getline();
  console.log(`Write the new content:`);
  let propContent = std.in.getline();
  json[propName] = propContent;

  console.log(`The ${propName} inside ${cli.articleName} file changed to ${json[propName]}
  Save changes? y/n`);
  let save = false;
  if (/y/gi.test(std.in.getline())) {
    let fd = std.open(`./articles/${cli.articleName}`, "w");
    fd.puts(JSON.stringify(json));
    fd.close();
  }
} else if (cli.u) {
  let listOfArticles = run(`ls ${articlesFolder}`).split("\n");

  let articlesList = {};
  articlesList.list = [];
  for(let i in listOfArticles) {
    if(listOfArticles[i] != "articlesList.json" && listOfArticles[i] != "") {
      articlesList.list.push(listOfArticles[i])
    }
  }
  let fd = std.open(`${articlesFolder}articlesList.json`, "w+");
  fd.puts(JSON.stringify(articlesList));
  fd.close();
  console.log("Sucessfull");

} else if(cli.d) {
  console.log("Not available yet in this version. Do it manually."); 
}
