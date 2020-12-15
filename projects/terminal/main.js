import ff from "./ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);


setTimeout(loadSystem, 3000);

/* Move input character indicator to the end */
ael( $("#terminalInput"), "input", () => {
  $("#terminalInput").value = $("#terminalInput").value.replace(new RegExp("▊", "g"), "") + "▊";
});

ael( $("#terminalInput"), "keydown", e => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    let aux = $("#terminalInput").value;
    $("#terminalInput").value = "▊";



    let span = document.createElement("span");
    span.innerText = "\n$ " + aux.replace(new RegExp("▊", "g"), "");

    $("#terminalFeedback").appendChild(span);

    let span2 = document.createElement("span");
    span2.innerText = system( aux.replace(new RegExp("▊", "g"), "") );
    if (aux.replace(new RegExp("▊", "g"), "") == "rpg") {
      alert("Rpg started!");
    }

    $("#terminalFeedback").appendChild(span2);
    span2.scrollIntoView();
    

  }
});



function system(param) {

  switch(param) {
    case "clear":
      $("#terminalFeedback").innerText = "";
      return "";

    case "pwd":
      return `\n/example/`;

    case "rpg":
      return `

          [ Rpg 1.0 ]

    1. New Game
    2. Continue
    3. Options

    0. Exit
      `;

    default:
      return `\nbash: ${param}: command not found`; 
  }
}

function loadSystem() {
  $("body").style.backgroundColor = "#000";
  $("main").style.display = "block";
  $("#systemBootScreen").style.display = "none";
}

/*
function generateFileStructure(os) {
  let fileStruct;
  if (/linux/gim.test(os)) {
    fileStruct = { 
      "/": {
        "bin": {
	  ["clear", "pwd"]
        },
        "boot": {

        },
	"dev": {

        },
	"etc": {
          "opt": {

	  },
	  "X11": {

	  },
	  "sgml": {
		  
	  },
	  "xml": {
		  
	  }
        },
	"home": {

        },
	"lib": {

	},
	"media": {

        }
      }
    }
  }
  return fileStruct;
}

let dirs = generateFileStructure("Linux");

_(dirs["/"]);

*/
