/*** SM ROUTER */
var _BASEURL = window.location.protocol+"//"+location.host.split(":")[0];
var tamHistorialPrevio = -1;
try {
CambioURLDetect(window.history.length);
} catch(err) { alert(err) }

function CambiarPagina(url) {
  switch (url.toLowerCase()) {

    case _BASEURL+"/#/inicio.html":
      alert("Detectado Inicio");
      AñadirHistorial(url);
    break;

    default:
      AñadirHistorial(url);
      alert("La url " + url + " no está en el router.");
      
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
  }, 10);
  
}



function AñadirHistorial(url) {
  history.pushState({}, "", url);
}

/* FIN SM ROUTER ***/



