if(location.hostname.includes("ezoradom.js.org")){
  document.addEventListener("DOMContentLoaded",()=>{
     let nav = document.querySelector('nav');
     nav.innerText = '☰';
     nav.style.fontSize = '2rem';
     nav.style.position = 'fixed';
     nav.style.background = '#1B0E3D';
     nav.style.paddingInline = '10px';
     nav.style.borderRadius = '10px';
     nav.style.zIndex = '5';
     nav.onclick = () => location.href='/menu';
    });
}
