import { html, render, activateShortcuts, defineShortcut, routerController, cacheStart } from "./ff2.mjs";
import App from "./components/App.js";
import Landing from "./components/Landing.js";

cacheStart(["./"], 86400000, "./cache/cacheWorker.js"); // Cache the index file for 24 hours

activateShortcuts();

const target = $("#app");

const routes = {
  a: {
    path: "landing",
    action: () => {

      let url = "" + window.location;
      if (/\#/g.test(url)) {
        url = url.split("#")[0];
      } 

      const links = [
        { href: url + "#landing", innerText: "Landing Page" },
	{ href: url + "#App", innerText: "Main App" },
	{ href: url + "#default", innerText: "Defualt Page" }
      ];

      render(html`<${Landing} innerText="This is my landing page!" links=${links} />`, target);
    }
  },

  b:{
    path: "App",
    action: () => {
      render(html`<${App} innerText="Hello!" />`, target);
    }
  },

  c: {
    path: "default",
    action: () => {
      alert("You're at not defined route");
    }
  }
};

routerController.start(routes);
