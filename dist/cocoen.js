var Cocoen=(()=>{var g=Object.defineProperty;var v=(o,e)=>{for(var t in e)g(o,t,{get:e[t],enumerable:!0})};var E={};v(E,{create:()=>s,parse:()=>p});var a="cocoen",r=`${a}-component`;var d=o=>Number.parseInt(window.getComputedStyle(o).width,10);var u=({dragElementWidth:o,hostElementWidth:e,x:t})=>{let n=t;t<0?n=o:t>=e&&(n=e-o);let i=n+o/2;return i/=e,i*100};var l=(o,e)=>{let t=0;o instanceof MouseEvent?t=o.clientX:o instanceof TouchEvent&&(t=o.touches[0].clientX);let n=e?.getBoundingClientRect().left||0;return t-n};var h=(o,e)=>{let t;return(...n)=>{let i;return t&&clearTimeout(t),t=setTimeout(()=>{i=o(...n)},e),i}};var m=o=>`${o}%`;var f=`
  :host {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    overflow: hidden;
    position: relative;
    user-select: none;
  }

  :host *,
  :host *:after,
  :host *:before {
    box-sizing: inherit;
  }

  #before {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 50%;
  }

  #drag {
    background: var(--color, #fff);
    bottom: 0;
    cursor: ew-resize;
    left: 50%;
    margin-left: -1px;
    position: absolute;
    top: 0;
    width: 2px;
  }

  #drag:before {
    border: 3px solid var(--color, #fff);
    content: '';
    height: 30px;
    left: 50%;
    margin-left: -7px;
    margin-top: -15px;
    position: absolute;
    top: 50%;
    width: 14px;
  }

  ::slotted(img) {
    max-height: 100%;
    object-fit: contain;
  }

  ::slotted(img[slot=before]) {
    max-width: none;
  }

  ::slotted(img[slot=after]) {
    display: block;
    max-width: 100%;
    width: 100%;
  }
`,c=class extends HTMLElement{constructor(){super();this.colorValue="#fff";this.dragElementWidthValue=0;this.elementWidthValue=0;this.isDraggingValue=!1;this.openRatioValue=50;this.rendered=!1;this.xValue=0;this.drag=null,this.shadowDOM=this.attachShadow({mode:"closed"}),this.onDragStartHandler=()=>this.onDragStart(),this.onDragEndHandler=()=>this.onDragEnd(),this.onDragHandler=e=>this.onDrag(e),this.onClickHandler=e=>this.onClick(e),this.debouncedUpdateDimensions=h(()=>{this.updateDimensions()},250)}get x(){return this.xValue}set x(e){this.xValue=e,window.requestAnimationFrame(()=>{this.openRatio=u({x:this.xValue,dragElementWidth:this.dragElementWidth,hostElementWidth:this.elementWidth})})}get elementWidth(){return this.elementWidthValue}set elementWidth(e){this.elementWidthValue=e}get dragElementWidth(){return this.dragElementWidthValue}set dragElementWidth(e){this.dragElementWidthValue=e}get isDragging(){return this.isDraggingValue}set isDragging(e){this.isDraggingValue=e}get openRatio(){return this.openRatioValue}set openRatio(e){this.openRatioValue=e,window.requestAnimationFrame(()=>{this.updateStyles()})}get color(){return this.colorValue}set color(e){this.colorValue=e,window.requestAnimationFrame(()=>{this.style.setProperty("--color",this.color)})}static get observedAttributes(){return["start","color"]}attributeChangedCallback(e,t,n){t!==n&&(e==="start"&&(this.openRatio=Number.parseInt(String(this.getAttribute("start")),10)),e==="color"&&(this.color=String(this.getAttribute("color"))))}connectedCallback(){this.rendered||(this.render(),this.rendered=!0,this.dispatchEvent(new CustomEvent(`${r}:rendered`,this.customEventPayload())),this.drag=this.shadowDOM.querySelector("#drag"),this.updateDimensions(),this.addEventListener("mousedown",this.onDragStartHandler,{passive:!0}),this.addEventListener("touchstart",this.onDragStartHandler,{passive:!0}),this.addEventListener("mousemove",this.onDragHandler,{passive:!0}),this.addEventListener("touchmove",this.onDragHandler,{passive:!0}),this.addEventListener("click",this.onClickHandler,{passive:!0}),window.addEventListener("resize",this.debouncedUpdateDimensions,{passive:!0}),window.addEventListener("mouseup",this.onDragEndHandler,{passive:!0}),window.addEventListener("touchend",this.onDragEndHandler,{passive:!0}))}disconnectedCallback(){this.removeEventListener("mousedown",this.onDragStartHandler),this.removeEventListener("touchstart",this.onDragStartHandler),this.removeEventListener("mousemove",this.onDragHandler),this.removeEventListener("touchmove",this.onDragHandler),this.removeEventListener("click",this.onClickHandler),window.removeEventListener("resize",this.debouncedUpdateDimensions),window.removeEventListener("mouseup",this.onDragEndHandler),window.removeEventListener("touchend",this.onDragEndHandler)}render(){this.shadowDOM.innerHTML=`
      <style>${f}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `}updateDimensions(){this.elementWidth=d(this),this.drag&&(this.dragElementWidth=d(this.drag)),this.dispatchEvent(new CustomEvent(`${r}:resized`,this.customEventPayload()))}updateStyles(){let e=this.shadowDOM.querySelector("#before"),t=this.shadowDOM.querySelector("#drag"),n=m(this.openRatio);e.style.width=n,t.style.left=n,this.dispatchEvent(new CustomEvent(`${r}:updated`,this.customEventPayload()))}onDragStart(){this.isDragging=!0}onDrag(e){!this.isDragging||(this.x=l(e,this))}onDragEnd(){this.isDragging=!1}onClick(e){this.x=l(e,this)}calculateOpenRatio(e){let t=e;e<0?t=this.dragElementWidth:e>=this.elementWidth&&(t=this.elementWidth-this.dragElementWidth);let n=t+this.dragElementWidth/2;return n/=this.elementWidth,`${n*100}%`}customEventPayload(){return{bubbles:!0,composed:!0,detail:{elementWidth:this.elementWidth,openRatio:this.openRatio,rendered:this.rendered}}}};customElements.define(r,c);var s=o=>{let e=document.createElement(r),t=o.querySelectorAll("img")[0],n=o.querySelectorAll("img")[1];if(!t||!n)throw new Error("Cocoen needs two images");return t.setAttribute("slot","before"),n.setAttribute("slot","after"),e.append(t.cloneNode(!0)),e.append(n.cloneNode(!0)),o.replaceWith(e),e};var p=o=>{[...o.querySelectorAll(`.${a}`)].map(t=>s(t))};return E;})();
//# sourceMappingURL=cocoen.js.map
