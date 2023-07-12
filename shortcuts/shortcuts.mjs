const defineShortcut = (key, value) => {
  if (window[key] !== undefined) {
    throw new ReferenceError(constant + " already defined");
  }
  window[key] = value;
};

const activateShortcuts = () => {
  const wrapQS = selector => document.querySelector(selector);
  const wrapQSA = selector => document.querySelectorAll(selector);
  const wrapAEL = (element, evnt, callback) => {
    callback ? element.addEventListener(evnt, e => callback(e)) : element.addEventListener("click", e => evnt(e));
    return element;
  }

  defineShortcut("$", wrapQS);
  defineShortcut("$$", wrapQSA);
  defineShortcut("ael", wrapAEL);

  return true;
};

export { defineShortcut, activateShortcuts };
