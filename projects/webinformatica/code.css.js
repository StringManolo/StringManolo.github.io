

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
const rDeg = "450deg";                                                const aDur = "100ms";

const mainColor = "brown";
const bgColor = "#fefeff";

css(`
* {
  -webkit-tap-highlight-color: transparent;
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
  height: 105px;
  margin: 0 0 10px 0;
  font-size: 1.3em;
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
  left: 1%;
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
  font-size: 3em;
  padding-bottom: 3%;
}

nav > input {
  font-size: 0.8em;
  outline-color: ${mainColor};
}

nav > a {
  text-decoration: none;
  color: #555;
}

nav > input, nav > a {
  padding-left: 4%;
  margin-top: 2%;
}

section {
  display: flex;
  justify-content: center;
}

main > section > article {
  margin-top: 2%;
  width: 90%;
  border: 0.5px solid #999;
  padding: 2%;
  border-radius: 10px;
  box-shadow: 2px 0 10px #ccc;
  font-size: 3em;
}

section > article img {
  margin-top: 5%;
}

section > article h1 {
  display: grid;
}
.
`);

