import htm from "./htm/htm.mjs";
import { defineShortcut, activateShortcuts } from "./shortcuts/shortcuts.mjs";
import routerController from "./router/router.mjs";
import { cacheStart, cacheClean } from "./cache/cache.mjs";

const H = window.H;
const render = window.R;
const html = htm.bind(H);

export { html, render, defineShortcut, activateShortcuts, routerController, cacheStart, cacheClean }
