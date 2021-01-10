import ff from "./ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);

_("Alert called from main.js file");
