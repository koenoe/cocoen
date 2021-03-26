var a=`
  div {
    background: red;
  }
`,n=class extends HTMLElement{connectedCallback(){let o=this.attachShadow({mode:"closed"});o.innerHTML=`
      <style>${a}</style>
      <div>
        <slot name="before" />
      </div>
      <slot name="after" />
    `}disconnectedCallback(){console.log("disconnected from the DOM",this)}};var s="cocoen",d=`${s}-component`;customElements.define(d,n);var r=()=>{document.removeEventListener("DOMContentLoaded",r)};document.addEventListener("DOMContentLoaded",r);var l=e=>{let o=document.createElement(d),t=e.querySelectorAll("img")[0],c=e.querySelectorAll("img")[1];t.setAttribute("slot","before"),c.setAttribute("slot","after"),o.append(t.cloneNode(!0)),o.append(c.cloneNode(!0)),e.replaceWith(o)},m=e=>{[...e.querySelectorAll(`.${s}`)].map(t=>l(t))};export{l as create,m as parse};
//# sourceMappingURL=index.esm.js.map
