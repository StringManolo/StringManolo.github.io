
/* Shortcuts */

let $ = (elem, selec) => selec ? $(elem).querySelector(selec) : document.querySelector(elem);

let $$ = (elem, selec) => selec ? $(elem).querySelectorAll(selec) : document.querySelectorAll(elem);

let ael = (elem, ev, cb) => {
  cb ? elem.addEventListener(ev, (e) => cb(e)) : elem.addEventListener("click", (e) => ev(e))
  return elem;
}

Element.prototype.add = function(child, retChild) {
  this.appendChild(child);
  return (retChild ? child : this);
};
/* End shortcuts */

let originalStyles = {};

ael($("#icon_house_wrapper"), "change", e => {
  if(e.target.checked) {
    $(".icon_house").style.borderRight = `1px solid ${bgColor || "#fff"}`;
    $("header").style.borderBottom = `1px solid ${bgColor || "#fff"}`;
    $("header p").style.color = "#555";
    $("nav").style.borderBottom = `1px solid ${mainColor}`;
    $("nav").style.display = "flex";
    $$("section > article").forEach(art => art.style.display = "none");
    $("nav > input").focus();
  } else {
    $("nav > input").value = "";
    $(".icon_house").style.borderRight = `1px solid ${mainColor}`;
    $("header").style.borderBottom = `1px solid ${mainColor}`;
    $("header p").style.color = `${mainColor}`;
    $("section > article").style.display = "block";
    $("nav").style.display = "none";
    $$("section > article").forEach(art => art.style.display = "block");
  }
});

let loadListAvailableArticles = (path, maxArticles = 10) => {
  fetch(path)
  .then(data => data.json())
  .then(data => {
    for (let i in data.list) {
      if (i < maxArticles) {
        loadArticle(`${location.href}/articles/${data.list[i]}`)
      } else {
        break;
      }
    }
  });
};

let loadArticle = path => {
  fetch(path)
  .then(data => data.json())
  .then(data => {

    let smallImage = make("img", { className: "smallImage", src: data.image })
    smallImage.style.width = "15%";

    let sect = make("section");
    let art = make("article");

    let fullScreen = ael(make("span", { className: "fullScreenButton", innerText: "⛶" }), e => {
      /* TODO: 
       * Animate the fullscreen
       * Button to back to top.
       * Share Button.
       * Urls to load articles when shared.
       * Dark mode 
       * */
      let st = e.target.style;
      let pst = e.target.parentNode.style;
      
      if (pst.boxShadow != "none") {
        originalStyles.fullScreen = {
	  padding: pst.padding,
	  margin: pst.margin,
	  width: pst.width,
	  border: pst.border,
	  boxShadow: pst.boxShadow,
	  display: pst.display
	};

	e.target.innerText = "❌";
        pst.padding = "0";
        pst.paddingLeft = "1%";
        pst.margin = "0";
        pst.width = "98%";
        pst.border = "none";
        pst.boxShadow = "none";
        $$("section > article").forEach(art => art.style.display = "none");
        $("header").style.display = "none";
        $("nav").style.display = "none";
        pst.display = "block";
      } else {
	e.target.innerText = "⛶"; 
	let os = originalStyles.fullScreen;
        pst.padding = os.padding;
        pst.margin = os.margin;
        pst.width = os.width;
        pst.border = os.border;
        pst.boxShadow = os.boxShadow;
        $$("section > article").forEach(art => art.style.display = "block");
        $("header").style.display = "flex";
       // $("nav").style.display = "block";
       // pst.display = "block";  
      }
    });

    let title = make("h1", { innerText: data.title });
    let author = make("span", { innerHTML: data.author });
    let description = make("p", { className: "desc", innerHTML: data.desc });
    let full = make("p", { innerHTML: data.full });
    let image = make("img", { src: data.image });
	
    let tags = make("span", { className: "tags", innerText: data.section });
    tags.style.display = "none"
	  ;
    image.style.display = "none";
    full.style.display = "none";
    ael(art, () => {
      if(image.style.display == "none") {
        image.style.display = "block";
	full.style.display = "block";
	art.querySelector(".smallImage").style.display = "none";
        art.querySelector(".desc").style.display = "none";
      } else {
        image.style.display = "none";
	full.style.display = "none";
	art.querySelector(".smallImage").style.display = "block";
	art.querySelector(".desc").style.display = "block";
      }
    });
	 
    title.add(smallImage);
    $("body > main")
    .add(sect, 1)
    .add(art, 1)
    .add(fullScreen)
    .add(tags)
    .add(title)
    .add(author)
    .add(description)
    .add(image)
    .add(full)

  });
};

/* Search box funcionality */
ael($("nav > input"), "input", e => {
  let actualSearch = e.target.value;
  let search = new RegExp(actualSearch, "gi");
  $$(".tags").forEach( aSpan => {
    if (search.test(aSpan.innerText)) {
      aSpan.parentNode.style.display = "block";
    } else {
      aSpan.parentNode.style.display = "none";
    }
  });
});


  loadListAvailableArticles(`${location.href}/articles/articlesList.json`, 10)
    // loadArticle("/articles/termux.json");

