class EzoraDOMTFApp{

  // Head functions
  pageLang(lang){
    document.documentElement.lang = lang;
  }
  
  pageTitle(title){
   document.title = title; 
  }
  
  pageCharset(charset){
   let el = document.createElement('meta');
   el.charset = charset;
   document.head.appendChild(el);
  }
  
  pageFavicon(src){
    if(!src){
      this._ezoraSyntaxErr("Src is required");
      return;
    } else {
      let el = document.createElement('link');
      el.rel = "icon";
      el.href = src;
      
      document.head.appendChild(el);
    }
  }
  
  createMetaElement(name,content){
   let el = document.createElement("meta");
   name = name.toLowerCase();
   if(name === "refresh" || name === "x-ua-compatible"){
     el.setAttribute("http-equiv",name);
   } else {
     el.setAttribute("name", name);
   }
   el.content = content;
   document.head.appendChild(el);
  }
  
  connectStyleFile(href){
    let el = document.createElement("link");
   el.rel = "stylesheet";
   el.href = href;
   document.head.appendChild(el);
  }
  
  connectScriptFile(src,location){
    let el = document.createElement("script");
    el.src = src;
    this._placeInLocation(location,el);
  }
  
  // body functions
  print(content,repeat){
    if(!repeat||repeat==1){
    let el=document.createElement("span");
    el.innerHTML = content;
    document.body.appendChild(el);
   } else if(repeat===0){
   } else if(repeat>1){
     for(let i=1;i<=repeat;i++){
     let el=document.createElement("span");
     el.innerHTML = content;
     document.body.appendChild(el);
     }
   }
  }
  
  printBl(content,repeat){
   if(!repeat||repeat==1){
    let el=document.createElement("div");
    el.innerHTML = content;
    document.body.appendChild(el);
   } else if(repeat===0){
   } else if(repeat>1){
     for(let i=1;i<=repeat;i++){
      let el=document.createElement("div");
      el.innerHTML = content;
      document.body.appendChild(el);
     }
   }
  }
 
 repeat(repeat,func){
  if(repeat>=1&&typeof func==="function"){
  for(let i=1;i<=repeat;i++){func()}
  } else if(repeat===0){} else {
   this._ezoraSyntaxErr();
  }
 }
  
  replaceHTMLById(id,content){
    this._newSelectorF("assignById",id,"innerHTML",content);
  }
  
  replaceHTMLByClassName(className,content,x){
    this._newSelectorF("assignByClassName", className,"innerHTML",content,x);
  }
  
  replaceHTMLByTagName(tagName,content,x){
    this._newSelectorF("assignByTagName",tagName,"innerHTML",content,x);
  }
  
  replaceHTMLByQuerySelector(select,content,x){
    this._newSelectorF("assignByQuerySelector",select,"innerHTML",content,x);
  }
  
  replaceTextById(id,content){
    this._newSelectorF("assignById",id,"textContent",content);
  }
  
  replaceTextByClassName(className,content,x){
    this._newSelectorF("assignByClassName", className,"textContent",content,x);
  }
  
  replaceTextByTagName(tagName,content,x){
    this._newSelectorF("assignByTagName",tagName,"textContent",content,x);
  }
  
  replaceTextByQuerySelector(select,content,x){
    this._newSelectorF("assignByQuerySelector",select,"textContent",content,x);
  }
  
  createElement(tag,content,id,className,location){
   let el = document.createElement(tag);
   if(content!==0&&content) el.innerHTML=content;
   this._applyId(id,el);
   this._applyClassName(className,el);
   this._placeInLocation(location,el);
  }
  
  createLinkElement(text,href,id,className,location){
    let el = document.createElement("a");
    el.innerText = text;
    el.href = href;
    this._applyId(id,el);
    this._applyClassName(className,el);
    this._placeInLocation(location,el);
  }
  
  createButton(text,onclick,id,className,location){
    let el = document.createElement("button");
    el.innerText = text;
    if(onclick !== 0 && onclick) el.setAttribute("onclick",onclick);
    this._applyId(id,el);
    this._applyClassName(className,el);
    this._placeInLocation(location,el);
  }
  
  createImage(src,alt,id,className,location){
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
  }
  
  createVideo(src,poster,id,className,location,autoplay,controls){
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
 }
 
 createAudio(src,controls,id,className,location,autoplay,volume){
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
 }

createParagraph(content,id,className,location){
  let el = document.createElement("p");
  el.innerHTML = content;
  
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation(location,el);
}

createHyperLink(text,href,id,className,location){
  let el = document.createElement("a");
  el.innerText = text;
  el.href = href;
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation(location,el);
}

createHeader(content,id,className){
  let el = document.createElement("header");
  el.innerHTML = content;
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation('body',el);
}

createFooter(content,id,className){
  let el = document.createElement("footer");
  el.innerHTML = content;
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation('body',el);
}

createSection(content,id,className,loc){
  let el = document.createElement("section");
  el.innerHTML = content;
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation(loc,el);
}

createArticle(content,id,className,loc){
  let el = document.createElement("article");
  el.innerHTML = content;
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation(loc, el);
}
 
 removeElementById(id){
   document.getElementById(id).remove();
 }
 
 removeElementByClassName(className,sel){
   this._newSelectorF("removeByClassName",className,'','',sel);
 }
 
 removeElementByTagName(tag,sel){
   this._newSelectorF("removeByTagName",tag,'','',sel);
 }
 
removeElementByQuerySelector(qs,sel){
  // qs => QuerySelector
   this._newSelectorF("removeByQuerySelector",qs,'','',sel);
 }
 
setStyleById(id,prop,val){
  document.getElementById(id).style[prop] = val;
}

setStyleByClassName(className,prop,val,sel){
  this._newSelectorF('styleByClassName',className,prop,val,sel);
}
 
setStyleByTagName(tag,prop,val,sel){
  this._newSelectorF('styleByTagName',tag,prop,val,sel);
}
 
setStyleByQuerySelector(target,prop,val,sel){
  this._newSelectorF('styleByQuerySelector',target,prop,val,sel);
}
 
addEventById(id,e,func){
  document.getElementById(id).addEventListener(e,func);
}

addEventByClassName(className,e,func,sel){
  this._addEventListener("getElementsByClassName",className,e,func,sel);
}

addEventByTagName(tag,e,func,sel){
  this._addEventListener("getElementsByTagName",tag,e,func,sel);
}

addEventByQuerySelector(qs,e,func,sel){
  this._addEventListener("querySelector",qs,e,func,sel);
}

removeEventById(id,e,func){
  document.getElementById(id).removeEventListener(e,func);
}

removeEventByClassName(className,e,func,sel){
  this._removeEventListener("getElementsByClassName",className,e,func,sel);
}

removeEventByTagName(tag,e,func,sel){
  this._removeEventListener("getElementsByTagName",tag,e,func,sel);
}

removeEventByQuerySelector(qs,e,func,sel){
  this._removeEventListener("querySelector",qs,e,func,sel);
}

setData(key,value){
  localStorage.setItem(key,value);
}

getData(key){
  return localStorage.getItem(key);
}

removeData(key){
  localStorage.removeItem(key);
}

clearDatas(){
  localStorage.clear();
}

// Assets
createLiveClock(fontSize,id,className,location){
  let el = document.createElement('span');
  
   if(typeof fontSize==="number"){
     el.setAttribute("style",`font-size: ${fontSize*10}px`);
   } else if(typeof fontSize==="string"){
     el.setAttribute("style",`font-size: ${fontSize}`);  
   }
  el.className=className;
  el.id=id;
  updateTheClock();
  function updateTheClock(){
    let hour = new Date().getHours().toString().padStart(2,'0');
    let minute = new Date().getMinutes().toString().padStart(2,'0');
    let second = new Date().getSeconds().toString().padStart(2,'0');
    el.textContent=`${hour}:${minute}:${second}`;
  }
  setInterval(updateTheClock,1000);
  this._placeInLocation(location,el);
}

createClickCounterApp(btn1val = '+', btn2val = '-', btn3val = 'reset',increaseAmount = 1, decreaseAmount = 1){
  let el = document.createElement('span');
  document.body.appendChild(el);
  let localNum = `${location.href}ClickCountNum`; //Güvenlik amaçlı 
  
  if(btn1val===0) btn1val = '+';
  if(btn2val===0) btn2val = '-';
  if(btn3val===0) btn3val = 'reset';
  
  let num = Number(localStorage.getItem(localNum)) || 0;
  el.textContent = num;
  function update(task){
    if(task==="+"){
      num += increaseAmount;
    } else if(task==="-"){
      num -= decreaseAmount;
    } else if(task==="0"){
      num=0;
    }
    el.textContent = num;
    localStorage.setItem(localNum,num);
  }
 
 this.createButton(btn1val,0,'btn1',0);
 this.createButton(btn2val,0,'btn2',0);
 this.createButton(btn3val,0,'btn3',0);
 
 this.addEventById('btn1','click',()=>update('+'));
 this.addEventById('btn2','click',()=>update('-')); 
 this.addEventById('btn3','click',()=>update('0')); 
}

createCountdownTimer(time,func,id,className,location){
  let el=document.createElement("span");
 
  let num = time;
  let interval = setInterval(()=>{
    if(num>0){
    num--;
    el.textContent = num;
    } else { 
    clearInterval(interval);
    el.style.display = "none";
    }
  },1000);
  el.textContent = num;
  setTimeout(func, Number(time)*1000);
  
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation(location,el);
}

createCountUpTimer(time,func,id,className,location){
  let el=document.createElement("span");
  let num = 0;
  el.textContent = num;
  let interval = setInterval(()=>{
    if(num<time){
      num++;
      el.textContent = num;
    } else {
      clearInterval(interval);
      el.style.display = "none";
      if(func) func();
    }
  },1000);
  
  this._applyId(id,el);
  this._applyClassName(className,el);
  this._placeInLocation(location,el);
}







  // Unavaible Functions
  _ezoraSyntaxErr(msg){
  if(!msg){
   console.error(`EzoraDOM Syntax Error`);
   } else {
   console.error(`EzoraDOM Syntax Error:${msg}`);
   }
  }
  
  _newSelectorF(type, target, prop, val, sel) {
  const getElements = {
    id: () => document.getElementById(target),
    className: () => document.getElementsByClassName(target),
    tagName: () => document.getElementsByTagName(target),
    querySelector: () => document.querySelectorAll(target)
  };

  const actions = {
    assign: el => el[prop] = val,
    style: el => el.style[prop] = val,
    remove: el => el.remove()
  };

  const actionType = type.includes("style") ? "style" : type.includes("remove") ? "remove" : "assign";
  let selectorType = type.replace(/^(style|remove|assign)By/, '').toLowerCase();
  selectorType = selectorType === 'queryselector' ? 'querySelector' : selectorType;

  try {
    const elements = getElements[selectorType]();

    if(sel === "all" && selectorType != "id") {
      Array.from(elements).forEach(el => actions[actionType](el));
      return;
    }

    if(sel === 0) {
      this._ezoraSyntaxErr(`0 index geçersiz. İlk eleman için "f" kullanın.`);
      return;
    }

    const element = sel === "f" ? (selectorType === "id" ? elements : elements[0]) : elements[sel];

    if(element) {
      actions[actionType](element);
    } else {
      this._ezoraSyntaxErr(`${target} bulunamadı.`);
    }

  } catch(err) {
    this._ezoraSyntaxErr(err.message);
  }
}
  
  _applyId(id,el){
    if(id === 0){} else if(id){
      el.id = id;
    } else if(!id){
      this._alertErr();
    }
  }
  
  _applyClassName(className,el){
    if(className === 0){} 
    else if(className){
      el.className = className;
    } else if(!className){
      this._alertErr();
    }
  }
  
  _placeInLocation(loc,el){
    if(!loc||loc=="body"){
     document.body.appendChild(el);
   } else{
     document.querySelector(loc).appendChild(el);
   }
  }
 
_addEventListener(type,name,e,func,sel){
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
}

_removeEventListener(type,name,e,func,sel){
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
}

_alertErr(){
  setInterval(()=>{
      let lang = navigator.language;
        if(lang.startsWith("tr")){
          alert("EzoraDOM sayfanızda hata buldu. Lütfen Hatanızı düzeltin.");
        } else if(lang.startsWith("fr")){
          alert("EzoraDOM a détecté une erreur sur votre page. Veuillez la corriger.");
        } else if(lang.startsWith("de")){
          alert("EzoraDOM hat auf Ihrer Seite einen Fehler gefunden. Bitte beheben Sie den Fehler.");
        } else if(lang.startsWith("ar")){
          alert("وجد EzoraDOM خطأً في صفحتك. يُرجى إصلاحه.");
        } else if(lang.startsWith("es")){
          alert("EzoraDOM encontró un error en tu página. Por favor, corrígelo.");
        } else if(lang.startsWith("it")){
          alert("EzoraDOM ha trovato un errore nella tua pagina. Per favore, correggilo.");
        } else if(lang.startsWith("pt")){
          alert("EzoraDOM encontrou um erro na sua página. Por favor, corrija.");
        } else if(lang.startsWith("zh")){
           alert("EzoraDOM 在您的页面中发现了一个错误。请修复它。");
        } else if(lang.startsWith("ru")){
           alert("EzoraDOM обнаружил ошибку на вашей странице. Пожалуйста, исправьте её.");
        } else if(lang.startsWith("ja")){
          alert("EzoraDOM がページでエラーを検出しました。修正してください。");
        } else {
          alert("EzoraDOM found an error on your page. Please fix the error.");
        }
  },1100);
 }
}

console.err = function(msg){
  console.error(msg);
};
