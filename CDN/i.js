/*
©2025 Ezora - All rights reserved. Cannot be copied under any other name. / 
Tüm hakları saklıdır. Başka bir isim altında kopyalanamaz.



i.js is dynamic. The room is updated when the EzoraDOM is updated. 
i.js dinamiktir. EzoraDOM güncellendiğinde oda güncellenir.
*/

const ez = {

  // Head functions
  pageLang: function(lang){
    document.documentElement.setAttribute("lang", lang);
  },
  
  pageTitle: function(title){
   document.title = title; 
  },
  
  pageCharset: function(charset){
   let el = document.createElement('meta');
   el.setAttribute("charset", charset);
   document.head.appendChild(el);
  },
  
  pageFavicon: function(src){
    if(!src){
      this._ezoraSyntaxErr("Src is required");
      return;
    } else {
      let el = document.createElement('link');
      el.setAttribute("rel", "icon");
      el.setAttribute("href", src);
      
      document.head.appendChild(el)
    }
  },
  
  createMetaElement: function(name,content){
   let el = document.createElement("meta");
   name = name.toLowerCase();
   if(name === "refresh" || name === "x-ua-compatible"){
     el.setAttribute("http-equiv",name);
   } else {
     el.setAttribute("name", name);
   }
   
   
   el.setAttribute("content", content);
   document.head.appendChild(el);
  },
  
  
  // body functions
  print: function(content,repeat){
    if(!repeat||repeat==1){
    document.write(content);
   } else if(repeat===0){
   } else if(repeat>1){
     for(let i=1;i<=repeat;i++){
       document.write(content);
     }
   }
  },
  
  printBl: function(content,repeat){
   if(!repeat||repeat==1){
    document.write(`<div>${content}</div>`);
   } else if(repeat===0){
   } else if(repeat>1){
     for(let i=1;i<=repeat;i++){
       document.write(`<div>${content}</div>`);
     }
   }
  },
 
 repeat: function(repeat,func){
  if(repeat>=1&&typeof func==="function"){
  for(let i=1;i<=repeat;i++){func()}
  } else if(repeat===0){} else {
   this._ezoraSyntaxErr();
  }
 },
  
  replaceHTMLById: function(id,content){
    this._selectorF("id",id,"innerHTML",content);
  },
  
  replaceHTMLByClassName: function(className,content,x){
    this._selectorF("class", className,"innerHTML",content,x);
  },
  
  replaceHTMLByTagName: function(tagName,content,x){
    this._selectorF("tag",tagName,"innerHTML",content,x);
  },
  
  replaceHTMLByQuerySelector: function(select,content,x){
    this._selectorF("querySelector",select,"innerHTML",content,x);
  },
  
  replaceTextById: function(id,content){
    this._selectorF("id",id,"innerText",content);
  },
  
  replaceTextByClassName: function(className,content,x){
    this._selectorF("class", className,"innerText",content,x);
  },
  
  replaceTextByTagName: function(tagName,content,x){
    this._selectorF("tag",tagName,"innerText",content,x);
  },
  
  replaceTextByQuerySelector: function(select,content,x){
    this._selectorF("querySelector",select,"innerText",content,x);
  },
  
  createElement: function(tag,content,id,className,location){
   let el = document.createElement(tag);
   if(content!==0&&content) el.innerHTML=content;
   this._applyId(id,el);
   this._applyClassName(className,el);
   this._placeInLocation(location,el);
  },
  
  createLinkElement: function(text,href,id,className,location){
    let el = document.createElement("a");
    el.innerText = text;
    el.href = href;
    this._applyId(id,el);
    this._applyClassName(className,el);
    this._placeInLocation(location,el);
  },
  
  createButton: function(text,onclick,id,className,location){
    let el = document.createElement("button");
    el.innerText = text;
    if(onclick !== 0 && onclick) el.setAttribute("onclick",onclick);
    this._applyId(id,el);
    this._applyClassName(className,el);
    this._placeInLocation(location,el);
  },
  
  createImage: function(src,alt,id,className,location){
   let el = document.createElement("img");
    if(src!==0&&src){
      el.src = src;
    } else {
      this._ezoraSyntaxErr();
      return;
    }
    if(alt!==0&&alt) el.alt = alt;
    this._applyId(id,el);
    this._applyClassName(className,el);
    this._placeInLocation(location,el); 
  },
  
  createVideo: function(src,poster,id,className,location,autoplay,controls){
   let el = document.createElement("video");
   if(src!==0&&src){
    el.src = src;
   } else{
     this._ezoraSyntaxErr();
     return;
   } 
   
   if(poster!==0&&poster) el.poster = poster;
   
   if(autoplay===1||autoplay===true){
     el.setAttribute("autoplay","");
   } else {
     el.removeAttribute("autoplay");
   }
  
   if(controls===1 || controls===true || !controls){
     el.setAttribute("controls","");
   } else {
     el.removeAttribute("controls");
   }
   
    this._applyId(id,el);
    this._applyClassName(className,el);
    this._placeInLocation(location,el);  
 },
 
 createAudio: function(src,controls,id,className,location,autoplay,volume){
   let el = document.createElement("audio");
   if(src!==0&&src){
     el.src = src;
   } else {
     this._ezoraSyntaxErr();
     return;
   }
   
   if(controls===1||controls===true){
     el.setAttribute("controls","");
   }
   
   if(autoplay===1||autoplay===true){
     el.setAttribute("autoplay","");
   }
   
   if(typeof volume === 'number' && volume >= 0 && volume <= 1){
     el.volume = volume;
   }
   
   this._applyId(id,el);
   this._applyClassName(className,el);
   this._placeInLocation(location,el);
 },
 
 removeElementById: function(id){
   document.getElementById(id).remove();
 },
 
 removeElementByClassName: function(className,sel){
   this._selectorF("removeByclass",className,'','',sel);
 },
 
 removeElementByTagName: function(tag,sel){
   this._selectorF("removeBytag",tag,'','',sel);
 },
 
removeElementByQuerySelector: function(qs,sel){
  // qs => QuerySelector
   this._selectorF("removeByquerySelector",qs,'','',sel);
 },
 
setStyleById: function(id,x,y){
  document.getElementById(id).style[x]=y;
},

setStyleByClassName: function(className,x,y,sel){
  this._selectorF('styleByclass',className,x,y,sel);
},
 
setStyleByTagName: function(tag,x,y,sel){
  this._selectorF('styleByTag',tag,x,y,sel);
},
 
setStyleByQuerySelector: function(sel,x,y,z){
  this._selectorF('styleByQuerySelector', sel,x,y,z);
},
 
addEventById: function(id,e,func){
  document.getElementById(id).addEventListener(e,func);
},

addEventByClassName: function(className,e,func,sel){
  this._addEventListener("getElementsByClassName",className,e,func,sel);
},

addEventByTagName: function(tag,e,func,sel){
  this._addEventListener("getElementsByTagName",tag,e,func,sel);
},

addEventByQuerySelector: function(qs,e,func,sel){
  this._addEventListener("querySelector",qs,e,func,sel);
},

removeEventById: function(id,e,func){
  document.getElementById(id).removeEventListener(e,func);
},

removeEventByClassName: function(className,e,func,sel){
  this._removeEventListener("getElementsByClassName",className,e,func,sel);
},

removeEventByTagName: function(tag,e,func,sel){
  this._removeEventListener("getElementsByTagName",tag,e,func,sel);
},

removeEventByQuerySelector: function(qs,e,func,sel){
  this._removeEventListener("querySelector",qs,e,func,sel);
},

setData: function(key,value){
  localStorage.setItem(key,value);
},

getData: function(key){
  return localStorage.getItem(key);
},

removeData: function(key){
  localStorage.removeItem(key);
},

// Assets
createLiveClock: function(fontSize,id,className,location){
  let el = document.createElement('p');
  
   if(typeof fontSize==="number"){
     el.setAttribute("style",`font-size: ${fontSize*10}px`);
   } else if(typeof fontSize==="string"){
     el.setAttribute("style",`font-size: ${fontSize}`);  
   }
  el.className=className;
  el.id=id;
  el.innerText='...';
  setTimeout(updateTheClock,50);
  function updateTheClock(){
    let hour = new Date().getHours().toString().padStart(2,'0');
    let minute = new Date().getMinutes().toString().padStart(2,'0');
    let second = new Date().getSeconds().toString().padStart(2,'0');
    el.innerText=`${hour}:${minute}:${second}`;
  }
  setInterval(updateTheClock,1000);
  this._placeInLocation(location,el);
},











  // Unavaible Functions
  _ezoraSyntaxErr: function(msg){
  if(!msg){
   console.error(`EzoraDOM Syntax Error`);
   } else {
   console.error(`EzoraDOM Syntax Error:${msg}`);
   }
  },
  
  _selectorF: function(type, sel, x, y, z){
   if (type == "id") {
    document.getElementById(sel)[x] = y;
  } else if (type == "class") {
    if (!z || z === "f") {
      document.getElementsByClassName(sel)[0][x] = y;
    } else if (z > 0) {
      document.getElementsByClassName(sel)[z][x] = y;
    } else if (z === "all") {
      let els = document.getElementsByClassName(sel);
      for (let i = 0; i < els.length; i++) {
        els[i][x] = y;
      }
    } else {
      this._ezoraSyntaxErr();
    }
  } else if (type == "tag") {
    if (!z || z === "f") {
      document.getElementsByTagName(sel)[0][x] = y;
    } else if (z > 0) {
      document.getElementsByTagName(sel)[z][x] = y;
    } else if (z === "all") {
      let els = document.getElementsByTagName(sel);
      for (let i = 0; i < els.length; i++) {
        els[i][x] = y;
      }
    } else {
      this._ezoraSyntaxErr();
    }
  } else if (type == "querySelector") {
    if (!z || z === "f") {
      document.querySelector(sel)[x] = y;
    } else if (z > 0) {
      document.querySelectorAll(sel)[z][x] = y;
    } else if (z === "all") {
      document.querySelectorAll(sel).forEach((el) => {
        el[x] = y;
      });
    } else {
      this._ezoraSyntaxErr();
    }
   } else if (type == "removeByclass") {
    if (!z || z === "f") {
      document.getElementsByClassName(sel)[0].remove();
    } else if (z > 0) {
      document.getElementsByClassName(sel)[z].remove();
    } else if (z === "all") {
      let els = document.getElementsByClassName(sel);
      for (let i = els.length-1 ; i >= 0; i--) {
        els[i].remove();
      }
    } else {
      this._ezoraSyntaxErr();
    }
  } else if (type == "removeBytag") {
    if (!z || z === "f") {
      document.getElementsByTagName(sel)[0].remove();
    } else if (z > 0) {
      document.getElementsByTagName(sel)[z].remove();
    } else if (z === "all") {
      let els = document.getElementsByTagName(sel);
      for (let i = els.length-1; i >= 0; i--) {
        els[i].remove();
      }
    } else {
      this._ezoraSyntaxErr();
    }
  } else if (type == "removeByquerySelector") {
    if (!z || z === "f") {
      document.querySelector(sel).remove();
    } else if (z > 0) {
      document.querySelectorAll(sel)[z].remove();
    } else if (z === "all") {
      document.querySelectorAll(sel).forEach((el) => {
        el.remove()
      });
    } else {
      this._ezoraSyntaxErr();
    }
   } else if (type == "styleByclass") {
    if (!z || z === "f") {
      document.getElementsByClassName(sel)[0].style[x] = y;
    } else if (z > 0) {
      document.getElementsByClassName(sel)[z].style[x] = y;
    } else if (z === "all") {
      let els = document.getElementsByClassName(sel);
      for (let i = 0; i < els.length; i++) {
        els[i].style[x] = y;
      }
    } else {
      this._ezoraSyntaxErr();
    }
  } else if (type == "styleByTag") {
    if (!z || z === "f") {
      document.getElementsByTagName(sel)[0].style[x] = y;
    } else if (z > 0) {
      document.getElementsByTagName(sel)[z].style[x] = y;
    } else if (z === "all") {
      let els = document.getElementsByTagName(sel);
      for (let i = 0; i < els.length; i++) {
        els[i].style[x] = y;
      }
    } else {
      this._ezoraSyntaxErr();
    }
  } else if (type == "styleByQuerySelector") {
    if (!z || z === "f") {
      document.querySelector(sel).style[x] = y;
    } else if (z > 0) {
      document.querySelectorAll(sel)[z].style[x] = y;
    } else if (z === "all") {
      document.querySelectorAll(sel).forEach((el) => {
        el.style[x] = y;
      });
    } else {
      this._ezoraSyntaxErr();
    }
   } 
  },
  
  _applyId: function(id,el){
    if(id === 0){} else if(id){
      el.id = id;
    } else if(!id){
      this._alertErr();
    }
  },
  
  _applyClassName: function(className,el){
    if(className === 0){} 
    else if(className){
      el.className = className;
    } else if(!className){
      this._alertErr();
    }
  },
  
  _placeInLocation: function(loc,el){
    if(!loc||loc=="body"){
     document.body.appendChild(el);
   } else{
     document.querySelector(loc).appendChild(el);
   }
  },
 
_addEventListener: function(type,name,e,func,sel){
  if(type==="getElementsByClassName"|| type==="getElementsByTagName"){
   let els = document[type](name);
  if(!sel||sel==="f"){
    els[0].addEventListener(e,func);
  } else if(sel>0){
    els[sel].addEventListener(e,func);
  } else if(sel==="all"){
    for(let i=0;i<els.length;i++){
      els[i].addEventListener(e,func);
     }
   }
 }
 else if (type==="querySelector"){
  
  if(!sel||sel==="f"){
    document[type](name).addEventListener(e,func);
  } else if(sel>0){
    document[`${type}All`](name)[sel].addEventListener(e,func);
  } else if(sel==="all"){
    document[`${type}All`](name).forEach(
     el => {
       el.addEventListener(e,func);
   });
  }
 } 
},

_removeEventListener: function(type,name,e,func,sel){
  if(type==="getElementsByClassName"|| type==="getElementsByTagName"){
   let els = document[type](name);
  if(!sel||sel==="f"){
    els[0].removeEventListener(e,func);
  } else if(sel>0){
    els[sel].removeEventListener(e,func);
  } else if(sel==="all"){
    for(let i=0;i<els.length;i++){
      els[i].removeEventListener(e,func);
     }
   }
 } else if (type==="querySelector"){
  
  if(!sel||sel==="f"){
    document[type](name).removeEventListener(e,func);
  } else if(sel>0){
    document[`${type}All`](name)[sel].removeEventListener(e,func);
  } else if(sel==="all"){
    document[`${type}All`](name).forEach(
     el => {
       el.removeEventListener(e,func);
   });
  }
 }
},

_alertErr: function(){
  setInterval(()=>{
      let lang = navigator.language;
        if(lang.includes("tr")){
          alert("EzoraDOM sayfanızda hata buldu. Lütfen Hatanızı düzeltin.");
        } else if(lang.includes("fr")){
          alert("EzoraDOM a détecté une erreur sur votre page. Veuillez la corriger.");
        } else if(lang.includes("de")){
          alert("EzoraDOM hat auf Ihrer Seite einen Fehler gefunden. Bitte beheben Sie den Fehler.");
        } else if(lang.includes("ar")){
          alert("وجد EzoraDOM خطأً في صفحتك. يُرجى إصلاحه.");
        } else if(lang.includes("es")){
          alert("EzoraDOM encontró un error en tu página. Por favor, corrígelo.");
        } else if(lang.includes("it")){
          alert("EzoraDOM ha trovato un errore nella tua pagina. Per favore, correggilo.");
        } else if(lang.includes("pt")){
          alert("EzoraDOM encontrou um erro na sua página. Por favor, corrija.");
        } else if(lang.includes("zh")){
           alert("EzoraDOM 在您的页面中发现了一个错误。请修复它。");
        } else if(lang.includes("ru")){
           alert("EzoraDOM обнаружил ошибку на вашей странице. Пожалуйста, исправьте её.");
        } else if(lang.includes("ja")){
          alert("EzoraDOM がページでエラーを検出しました。修正してください。");
        } else {
          alert("EzoraDOM found an error on your page. Please fix the error.");
        }
  },1100);
 }
};

console.err = function(msg){
  console.error(msg);
};
