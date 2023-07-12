import { html } from "../ff2.mjs";

const App = props => {
  return html`<div class="myDivs">
    <h1>${props.innerText}</h1>
  </div>`;
}

export default App;
