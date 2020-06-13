/*** SM ROUTER */
var _BASEURL = window.location.protocol+"//"+location.host.split(":")[0];
var tamHistorialPrevio = -1;
CambioURLDetect(window.history.length);

function CambiarPagina(url) {
  switch (url) {

    case _BASEURL+"/#/html2json.html" :
      AñadirHistorial(url);
      AñadirTemplate("html2json");
      CorrerScripts();
    break;

    case _BASEURL+"/#/index.html" :
      AñadirHistorial(url);
      AñadirTemplate("index");
    break;
    
    case _BASEURL+"/#/about.html" :
      AñadirHistorial(url);
      AñadirTemplate("about");
    break;


    default:
      AñadirHistorial(url);
      AñadirTemplate("cuatroscientoscuatro");
      
  }
}

function CambioURLDetect(tamHistorial) {

  var url = new URL (window.location);
  url.port = "";

  if(tamHistorial !== tamHistorialPrevio) {
      CambiarPagina(url+"");
  }

  tamHistorialPrevio = window.history.length;
  setTimeout(function() {
    CambioURLDetect(window.history.length);
  }, 30);
  
}

function AñadirTemplate(smTemplateID) {
  RemoverPagina();
  var scripts = document.querySelectorAll("script");
  for(var i = 0; i < scripts.length; ++i) {
    
    if(scripts[i].className == "smTemplate") { 
      if(scripts[i].id == smTemplateID) { 
        if (!document.querySelector("#p"+scripts[i].id)) {
          var div = document.createElement("div");
	      div.id = "p"+scripts[i].id;
	      div.className = "hsmTemplate";
          div.innerHTML = atob(scripts[i].innerHTML.substr(3));
          document.body.appendChild(div); 
          
        } else {
          "El id ya existe.";
	    }  
      } else {
	    "El template introducido por parámetro no corresponde al script que está siendo iterado.";
      } 
    } else {
      "El script no tiene class=\"smTemplate\"\n" + scripts[i].className;
    } 
  }
}

function AñadirHistorial(url) {
  history.pushState({}, "", url);
}

function CorrerScripts() {
  var scripts = document.querySelectorAll(".hsmTemplate > script");
  for(var i = 0; i < scripts.length; ++i) {
    try{
      eval(scripts[i].innerHTML);
    } catch(e) {
      alert(e);
    }
  }
}

function RemoverPagina() {
  if (document.querySelector(".hsmTemplate")) {
    document.querySelector(".hsmTemplate").outerHTML = "";
  }
}
/* FIN SM ROUTER ***/


