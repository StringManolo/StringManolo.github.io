/* Toggle hamburger button. */
function toggleNav(nav) {
  var nav = document.querySelector(nav);
  nav.style.display == "block" ? nav.style.display = "none" : nav.style.display = "block";
}

/* Click animation (android support) */
function clickEffect(element) {
    var hb = document.querySelector(element);
    var oldStyles = {                                                       textShadow: hb.style.textShadow,                                      fontSize: hb.style.fontSize,
      color: hb.style.color,
      backgroundColor: hb.style.backgroundColor
    };                                                                                                                                          hb.style.textShadow = "2px 2px 5px #000";
    hb.style.color = "#333";
    hb.style.backgroundColor = "#ee0";
    /*  hb.style.fontSize = "0.75em";  */

    return oldStyles;
}

function clickReset(element, oldStyles, timer) {
  function timedReset() {
    var tmp = document.querySelector(element);
    tmp.style.textShadow = oldStyles.textShadow;
    tmp.style.fontSize = oldStyles.fontSize;
    tmp.style.color = oldStyles.color;
    tmp.style.backgroundColor = oldStyles.backgroundColor;
  }

  setTimeout(timedReset, timer);

}

function PeticionGET(url, callback) {
  var peticion = new XMLHttpRequest();
  peticion.open("GET", url , "async");
  peticion.send();
  peticion.onreadystatechange = function() {
    if (peticion.readyState == 4) {
      if (peticion.status == 0 || peticion.status == 200) {
        callback(peticion.responseText);
      }
    }
  }      
}

document.querySelector("header > a").addEventListener("click", function() {
  toggleNav("nav");
  var oldStyles = clickEffect("header > a");
  clickReset("header > a", oldStyles, 80);
});


var navLinks = document.querySelectorAll(".imageLink, .textLink");
var nLL = navLinks.length;
for(var i = 0; i < nLL; ++i) {
  navLinks[i].addEventListener("click", function(ev) {
    /* ev.preventDefault(); */
    toggleNav("nav");
  });
}




