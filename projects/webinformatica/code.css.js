

let make = (elem, opt) => {
  let el = document.createElement(elem)
  if (opt) {
    for(let [k, v] of Object.entries(opt)) {
      el[k] = v;
    }
  }
  return el;
}  

let add = (elem, chil, rChil) => {
  elem.appendChild(chil);
  return (rChil ? chil : elem);
}

let css = code => add(document.querySelector("head"), make("style", { className: "shortcutStyles", textContent: code }));




const atf = "ease-out";
const rDeg = "180deg";
const aDur = "50ms";

const mainColor = "#cd212a"
const bgColor = "#fefeff";

const pR = 1; /* Portrait Ratio Used to modify all webpage size from just one place */
const lR = 0.4; /* Landscape Ratio Used to modify all webpage size from just one place */

css(`
* {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: 34568b;
  text-decoration: none;
  font-weight: bold;
}

a:visited {
  color: #6b5b95;

}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  text-size-adjust: none;
  text-rendering: optimizeLegibility;
  color: #555;
  background-color: ${bgColor};
}

header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${mainColor};
  margin: 0 0 ${2*pR}% 0;
  font-size: ${2.15*pR}vw;
}

header p {
  color: ${mainColor};
}

@-moz-keyframes spin {
  from { -moz-transform: rotate(0deg); }
  to { -moz-transform: rotate(${rDeg}); }
}

@-webkit-keyframes spin {
  from { -webkit-transform: rotate(0deg); }
  to { -webkit-transform: rotate(${rDeg}); }
}

@keyframes spin {
  from {transform:rotate(0deg);}
  to {transform:rotate(${rDeg});}
}

.icon_house {
  position: absolute;
  left: ${1*pR}%;
  border-right: 1px solid ${mainColor};
}

.icon_house_path {
  fill: ${mainColor};
}

#icon_house_wrapper:checked + label > svg path {
  fill: #555;
  -webkit-animation-name: spin;
  -moz-animation-name: spin;
  -ms-animation-name: spin;
  animation-name: spin;
  -webkit-animation-duration: ${aDur};
  -moz-animation-duration: ${aDur};
  -ms-animation-duration: ${aDur};
  animation-duration: ${aDur};
  -webkit-animation-timing-function: ${atf};
  -moz-animation-timing-function: ${atf};
  -ms-animation-timing-function: ${atf};
  animation-timing-function: ${atf};

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  -ms-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  transform-origin: center;
}

nav {
  width: 100%;
  display: none; 
  flex-wrap: wrap;
  flex-direction: column;
  font-size: ${4*pR}vw;
  padding-bottom: ${3*pR}%;
}

nav > input {
  font-size: ${3*pR}vw;
  outline-color: ${mainColor};
}

nav > a {
  text-decoration: none;
  color: #555;
}

nav > input, nav > a {
  padding-left: ${4*pR}%;
  margin-top: ${2*pR}%;
}

section {
  display: flex;
  justify-content: center;
}

main > section > article {
  margin-top: ${2*pR}%;
  width: 90%;
  border: 0.5px solid #999;
  padding: ${2.5*pR}%;
  border-radius: 10px;
  box-shadow: 2px 0 10px #ccc;
  font-size: ${4.5*pR}vw;
}

section > article img {
  margin-top: 5%;
}

section > article h1 {
  display: grid;
}

.fullScreenButton {
  color: ${mainColor};
  float: right;
}


@media (min-width: 0px) and (orientation:landscape) {
  header {
    margin: 0 0 ${2*lR}% 0;
    font-size: ${2.15*lR}vw;
  }

  .icon_house {
    left: ${1*lR}%;
    height: ${12*lR}vw;
    top: -${2*lR}%;
  }

  /*section > article img {
    margin-top: 40%;
  }*/

  nav {
    font-size: ${4*lR}vw;
    padding-bottom: ${3*lR}%;
  }

  nav > input {
    /*font-size: ${3*lR}vw;*/
    font-size: 18px;
  }

  nav > input, nav > a {
    padding-left: ${4*lR}%;
    margin-top: ${2*lR}%;
  }

  main > section > article {
    margin-top: ${2*lR}%;
    padding: ${2.5*lR}%;
    font-size: ${4.4*lR}vw;
  }

  .fullScreenButton {
    font-size: ${8*lR}vw;
  }

  img {
    
  }

}
`);

