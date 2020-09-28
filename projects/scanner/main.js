import ff from "https://fastframework.ga/ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);

function parser(codigo) {
  var tmp = codigo;
  var dFrag = document.createDocumentFragment();
  var parser = new DOMParser();
  var parseado = parser.parseFromString(tmp, "text/html");
  return parseado
}

ael($("#hSink"), "click", () => {
  let sinks = ["write","writeln","domain","innerHTML","outerHTML","insertAdjacentHTML","onevent","baseURI","documentURI","location","referrer","URL","URLUnencoded","href","search","hash","pathname","self","name","eval","javascript:","setInterval","setTimeout","import url","add","after","append","animate","insertAfter","insertBefore","before","prepend","replaceAll","replaceWith","wrap","wrapInner","wrapAll","has","constructor","init","index","parseHTML"];
  let tmpInner = $("resultOuter").innerText;
  for(let i = 0; i < sinks.length; ++i) {
    tmpInner = tmpInner.replace(new RegExp(sinks[i], "gim"), `TEMPORALSINKHOLDER${sinks[i]}ENDTEMPORALSINKHOLDER`);
  }
  /*$("resultOuter").innerText = tmpInner;*/
  $("resultOuter").innerHTML = htmlEntities(tmpInner/*$("resultOuter").innerHTML*/)
    .replace(new RegExp("endtemporalsinkholder", "gim"), "</span>")
    .replace(new RegExp("temporalsinkholder", "gim"), "<span class=\"xssRed\">");


});

ael($("#urlB"), "click", () => {
  const CORS = "https://cors-anywhere.herokuapp.com/";
  ff._GET(CORS + $("#url").value, resp => {
  let tags = htmlTags();
  let results = [];
  let out = [];
  let pResp = parser(resp);

  for(let i = 1, aux; i < tags.length; ++i) {
    try {
      aux = pResp.querySelectorAll(tags[i]);
      if (aux.length) {
        for(let j = 0; j < aux.length; ++j) {
          out.push("<br />- " + htmlEntities(tags[i] + "" + (+j+1) + ":" + aux[j].outerHTML) + "<br />");
        
        }
        results.push(tags[i] + ":" + aux.length);
      }
    } catch(er) {}
  }

  
  ff.customTags = {
    resultTags: "<br /><br />Date:" + new Date() +"<br /><br />Tags Found:<br />- " + results.join("<br />- ") + "<br />",
    resultOuter: "<br />Tags Content:" + out.join(" ")
  };
  
  ff.getUnknownTags();

    /*
    let dom = parser(resp).querySelectorAll("*");
    for(let elem of dom) {
       _(elem.constructor.name);
    }
    */
    
  });
});

function htmlEntities(string) {
  let a = document.createTextNode(string);
  let b = document.createElement('pre');
  b.appendChild(a);
  return b.innerHTML;
}

function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function htmlTags(bool) {
  if (!bool) {
    var safe = ["!DOCTYPE html", "html","/html","head","/head","meta","body","/body",
"title","/title","script","/script","style","/style",
"section","/section","article","/article","input",
"/input","button","/button","select","/select",
"option","/option","br","br /","textarea","/textarea",
"a","a /","abbr","/abbr","acronym","/acronym",
"address","/address","applet","/applet","area",
"/area","aside","/aside","audio","/audio",
"b","/b","base","/base","basefont","/basefont",
"bdi","/bdi","bdo","/bdo","big","/big",
"blockquote","/blockquote","canvas","/canvas",
"caption","/caption","center","/center","cite",
"/cite","code","/code","col","/col","colgroup",
"/colgroup","data","/data","datalist","/datalist",
"dd","/dd","del","/del","details","/details",
"dfn","/dfn","dialog","/dialog","dir","/dir",
"div","/div","dl","/dl","dt","/dt","em","/em",
"embed","/embed","fieldset","/fieldset","figcaption",
"/figcaption","figure","/figure","font","/font",
"footer","/footer","form","/form","frame","/frame",
"frameset","/frameset","h1","/h1","h2","/h2","h3",
"/h3","h4","/h4","h5","/h5","h6","/h6","header",
"/header","hr","/hr","i","/i","iframe","/iframe",
"img","/img","ins","/ins","kbd","/kbd","label",
"/label","legend","/legend","li","/li","link","/link",
"main","/main","map","/map","mark","/mark",
"meter","/meter","nav","/nav","noframes","/noframes",
"noscript","/noscript","object","/object","ol","/ol",
"optgroup","/optgroup","output","/output","p","/p",
"param","/param","picture","/picture","pre","/pre",
"postgress","/postgress","q","/q","rp","/rp","rt","/rt",
"ruby","/ruby","s","/s","samp","/samp","small","/small",
"source","/source","span","/span","strike","/strike",
"strong","/strong","sub","/sub","summary","/summary",
"sup","/sup","svg","/svg","table","/table","tbody","/tbody",
"td","/td","template","/template","tfoot","/tfoot","th","/th",
"thead","/thead","time","/time","tr","/tr","track","/track",
"tt","/tt","u","/u","ul","/ul","var","/var","video",
"/video","wbr","/wbr","wbr /"];

      var completeTags = [];
      for (var i = 0; i < safe.length; ++i) {
        completeTags.push(/*"<" + */safe[i]/* + ">"*/);
      }
      return completeTags;
  } else {
    return ["accept","accept-charset", "accesskey","action","align","alt","async","autocomplete","autofocus",
"autoplay","bgcolor","border","charset","checked","cite",
"class","color","cols","colspan","content",
"contenteditable","controls","coords","data","datetime",
"default","defer","dir","dirname","disabled","download",
"draggable","dropzone","enctype","for","form","formaction",
"headers","height","hidden","high","href",
"hreflang","http-equiv","id","ismap","kind",
"label","lang","list","loop","low","max",
"maxlength","media","method","min","multiple","muted",
"name","novalidate","onabort","onafterprint",
"onbeforeprint","onbeforeunload","onblur","oncanplay","oncanplaythrough",
"onchange","onclick","oncontextmenu","oncopy","oncuechange","oncut",
"ondblclick","ondrag","ondragend","ondragenter","ondragleave",
"ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended",
"onerror","onfocus","onhashchange","oninput","oninvalid","onkeydown",
"onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmousemove",
"onmouseout","onmouseover","onmouseup","onmousewheel","onoffline",
"ononline","onpagehide","onpageshow","onpaste","onpause",
"onplay","onplaying","onpopstate","onprogress","onratechange","onreset",
"onresize","onscroll","onsearch","onseeked","onseeking","onselect","onstalled",
"onstorage","onsubmit","onsuspend","onetimeupdate","ontoggle","onunload","onvolumechange","onwaiting",
"onwheel","open","optimum","pattern","placeholder","poster","preload",
"readonly","rel","required","reversed","rows","rowspan","sandbox",
"scope","selected","shape","size","sizes","spellcheck","src",
"srcdoc","srclang","srcset","start","step","tabindex",
"target","translate","type","usemap","value","width",
"wrap"];
  }
}
