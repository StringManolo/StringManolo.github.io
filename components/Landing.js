import { html } from "../ff2.mjs";

const Landing = props => {
  
  return html`
<div class="myDivs">
  <h1>${props.innerText}</h1>
  ${props.links.map(link => html`<a href="${link.href}">${link.innerText}</a>`)}
</div>`;

}

export default Landing;
