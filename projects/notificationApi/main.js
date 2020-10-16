import ff from "./ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);


ael($("#noti"), "click", () => {
  _("Asking for permission");
  let promise = Notification.requestPermission();
});

