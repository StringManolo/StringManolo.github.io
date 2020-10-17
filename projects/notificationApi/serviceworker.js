

/*navigator.serviceWorker.getRegistration()
  .then((reg) => reg.showNotification(title, [options]))*/

window.swReg.showNotification("StringManolo", {
  body: `Hello! xD`,
  icon: './notIcon.png'
});

