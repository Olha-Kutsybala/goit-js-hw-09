const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.querySelector("body");t.addEventListener("click",(function(){r=setInterval((()=>{d.style.background=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.setAttribute("disabled","disabled"),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),clearInterval(r),e.setAttribute("disabled","disabled")}));let r=null;
//# sourceMappingURL=01-color-switcher.faf9efff.js.map
