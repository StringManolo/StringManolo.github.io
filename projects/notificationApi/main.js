import ff from "./ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);


ael($("#noti"), "click", () => {

  _("Asking for permission");
  Notification.requestPermission(
  )
  .then(permission => {
    _(`Permission: ${permission}`);
  
    if(permission) {
      _(`Creating new notification...`);
      let n = new Notification("StringManolo", {
        body: `Your Date Is ${new Date()}`,
	icon: './notIcon.png'
      })
    }
  })
  .catch(error => {
    _(error)
  })

});

