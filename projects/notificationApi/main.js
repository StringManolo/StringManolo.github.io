import ff from "./ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);



var img = '/to-do-notifications/img/icon-128.png';
var text = 'HEY! Your task "' + title + '" is now overdue.';
var notification = new Notification('To do list', { body: text, icon: img });


ael($("#noti"), "click", () => {
  _("Code is making custom notification...");
  let nofication = new Notification("StringManolo", {
    body: `Your Actual Date Is ${new.date()}`,
    icon: './notiIcon.png'
  });

  _("Asking for permission");
  Notification.requestPermission(
  )
  .then(permission => {
    _(`Permission: ${permission}`);
  })
  

});

