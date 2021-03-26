var Cocoen=(()=>{var m=Object.defineProperty;var i=(o,e)=>{for(var t in e)m(o,t,{get:e[t],enumerable:!0})};var u={};i(u,{create:()=>c,parse:()=>a});var p=`
  div {
    background: red;
  }
`,n=class extends HTMLElement{connectedCallback(){let e=this.attachShadow({mode:"closed"});e.innerHTML=`
      <style>${p}</style>
      <div>
        <slot name="before" />
      </div>
      <slot name="after" />
    `}disconnectedCallback(){console.log("disconnected from the DOM",this)}};var d="cocoen",r=`${d}-component`;customElements.define(r,n);var l=()=>{document.removeEventListener("DOMContentLoaded",l)};document.addEventListener("DOMContentLoaded",l);var c=o=>{let e=document.createElement(r),t=o.querySelectorAll("img")[0],s=o.querySelectorAll("img")[1];t.setAttribute("slot","before"),s.setAttribute("slot","after"),e.append(t.cloneNode(!0)),e.append(s.cloneNode(!0)),o.replaceWith(e)},a=o=>{[...o.querySelectorAll(`.${d}`)].map(t=>c(t))};return u;})();
//# sourceMappingURL=index.js.map
