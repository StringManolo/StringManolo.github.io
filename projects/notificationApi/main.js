import ff from "./ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);


ael($("#noti"), "click", () => {
  _("Code is making custom notification...");
  let nofication = new Notification("StringManolo", {
    body: `Your Actual Date Is ${new.date()}`,
    icon: './notiIcon.png'
  });

  _("Asking for permission");
  notification.requestPermission(
  )
  .then(permission => {
    _(`Permission: ${permission}`);
  })
  

});

