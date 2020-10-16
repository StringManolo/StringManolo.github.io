/*if (!('fetch' in window)) {
  alert("You need an updated Browser to run this software.");
}*/

/* Button click listener */
document.querySelector("#start").addEventListener("click", () => {
  /* Main function of the program */
  startScan(document.querySelector("#url").value);
});

let logs = document.querySelector("#logs");
let twohundred = document.querySelector("#twohundred");
/* Main function definition */
let startScan = url => {
  
  /* Cross origin bypass */
  let cors = "https://cors-anywhere.herokuapp.com/";
  url = cors + url; 


  let directoryFound = dirUrl => {
    fetch(dirUrl, { method: "HEAD" }
    )

    .then(response => (response.ok ? "200" : response.statusText)
    )

    .then(resource => {
      if (resource == 200) {
        twohundred.value += dirUrl.substr(cors.length, dirUrl.length - cors.length) + "\n";
      }
      /*
      alert(`${dirUrl} ${resource}`);
      */
    })

    .catch(error => {
      /* alert(error); */
    })
  };


  /* GET dictionary words lists to use */
  let getDictionary = dictionaryUrl => {

    fetch(cors + dictionaryUrl
    )
    .then(response => response.text()
    )
    .then(responseText => {
      let dictionary = responseText.split("\n");
      for(line in dictionary) {
        if(dictionary[line].substr(0,1) !== "#") {
/* NO IMPRIME EN LOGS */
	  logs.value = `Sending Request to ${url+"/"+dictionary[line]}`;
	  if(line < 1500) {
            directoryFound(url/*"http://127.0.0.1:8000"*/ + "/" + dictionary[line]);
	  } else {
            break; 
	  }
        }
      }
    })
    .catch(error => {
      
    });

  };
 
  /* GET the dictionary from user url */
  getDictionary(document.querySelector("#dictionary").value);

};

