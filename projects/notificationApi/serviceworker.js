_(`Creating new notification from service worker...`);

swReg.showNotification("StringManolo", {
  body: `Your Date Is ${new Date()}`,
  icon: './notIcon.png'
});
