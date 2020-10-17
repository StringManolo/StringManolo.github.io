import ff from "./ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);


ael($("#noti"), "click", () => {

 /* _("Asking for permission"); */
  Notification.requestPermission(
  )
  .then(permission => {
   /*  _(`Permission: ${permission}`); */
  
    if (permission) {
      if ('serviceWorker' in navigator) {
      /* _("New Service worker..."); */
        navigator.serviceWorker.register('./serviceworker.js', {
          scope: './'
        })
        .then(function(reg) {
          window.swReg = reg;
          /* _('registration succeed'); */
        var i = 0;
          setInterval(() => {
	    swReg.showNotification(++i + " xD", {
              body: "La fecha es "+new Date(),
	      icon: './notiIcon.png'
	    })
            .then(ev => {
              /* _(`ev = ${ev}`); */
            });
          }, 300);
        }).catch(function(error) {
         /* _('Registration failed with ' + error); */
        });
      }
    }
  })
  .catch(error => {
    /* _(error) */
  })

});

