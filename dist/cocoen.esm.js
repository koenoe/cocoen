var a="cocoen",o=`${a}-component`;var l=n=>Number.parseInt(window.getComputedStyle(n).width,10);var m=({dragElementWidth:n,hostElementWidth:e,x:t})=>{let i=Math.min(Math.max(t,0),e),r=.5*n,s=(i+r)/e;return 100*s};var d=(n,e)=>{let t=n instanceof MouseEvent?n.clientX:n.touches[0].clientX,i=e?.getBoundingClientRect().left??0;return t-i};var v=(n,e)=>{let t;return(...i)=>{let r;return t&&clearTimeout(t),t=setTimeout(()=>{r=n(...i)},e),r}};var g=n=>`${n}%`;var b=`
  :host {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    display: block;
    overflow: hidden;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
  }

  :host *,
  :host *:after,
  :host *:before {
    box-sizing: inherit;
    -moz-box-sizing: inherit;
    -webkit-box-sizing: inherit;
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
    pointer-events: none;
  }

  ::slotted(img[slot=before]) {
    max-width: none;
  }

  ::slotted(img[slot=after]) {
    display: block;
    max-width: 100%;
    width: 100%;
  }
`,p=class extends HTMLElement{constructor(){super();this.animateToValue=0;this.colorValue="#fff";this.dragElementWidthValue=0;this.elementWidthValue=0;this.isDraggingValue=!1;this.openRatioValue=50;this.isRenderedValue=!1;this.isVisibleValue=!1;this.xValue=0;this.drag=null,this.shadowDOM=this.attachShadow({mode:"open"}),this.onDragStartHandler=()=>this.onDragStart(),this.onDragEndHandler=()=>this.onDragEnd(),this.onDragHandler=e=>this.onDrag(e),this.onClickHandler=e=>this.onClick(e),this.onContextMenuHandler=()=>this.onContextMenu(),this.onIntersectionHandler=(e,t)=>this.onIntersection(e,t),this.debouncedUpdateDimensions=v(()=>{this.updateDimensions()},250),this.intersectionObserver=new IntersectionObserver(this.onIntersectionHandler,{root:null,rootMargin:"0px",threshold:0})}get x(){return this.xValue}set x(e){this.xValue=e,window.requestAnimationFrame(()=>{this.openRatio=m({x:this.xValue,dragElementWidth:this.dragElementWidth,hostElementWidth:this.elementWidth})})}get elementWidth(){return this.elementWidthValue}set elementWidth(e){this.elementWidthValue=e}get dragElementWidth(){return this.dragElementWidthValue}set dragElementWidth(e){this.dragElementWidthValue=e}get isDragging(){return this.isDraggingValue}set isDragging(e){this.isDraggingValue=e}get openRatio(){return this.openRatioValue}set openRatio(e){this.openRatioValue=e,window.requestAnimationFrame(()=>{this.updateStyles()})}get color(){return this.colorValue}set color(e){this.colorValue=e,window.requestAnimationFrame(()=>{this.style.setProperty("--color",this.color)})}get isVisible(){return this.isVisibleValue}set isVisible(e){this.isVisibleValue=e}get isRendered(){return this.isRenderedValue}set isRendered(e){this.isRenderedValue=e}get animateTo(){return this.animateToValue}set animateTo(e){this.animateToValue=e}static get observedAttributes(){return["start","color"]}attributeChangedCallback(e,t,i){t!==i&&(e==="start"&&(this.animateTo=Number.parseInt(String(this.getAttribute("start")),10),this.isVisible&&(this.openRatio=this.animateTo)),e==="color"&&(this.color=String(this.getAttribute("color"))))}connectedCallback(){this.isRendered||(this.render(),this.isRendered=!0,this.dispatchEvent(new CustomEvent(`${o}:connected`,this.customEventPayload())),this.drag=this.shadowDOM.querySelector("#drag"),this.updateDimensions(),this.addEventListener("mousedown",this.onDragStartHandler,{passive:!0}),this.addEventListener("touchstart",this.onDragStartHandler,{passive:!0}),this.addEventListener("mousemove",this.onDragHandler,{passive:!0}),this.addEventListener("touchmove",this.onDragHandler,{passive:!0}),this.addEventListener("click",this.onClickHandler,{passive:!0}),this.addEventListener("contextmenu",this.onContextMenuHandler,{passive:!0}),window.addEventListener("resize",this.debouncedUpdateDimensions,{passive:!0}),window.addEventListener("mouseup",this.onDragEndHandler,{passive:!0}),window.addEventListener("touchend",this.onDragEndHandler,{passive:!0}),this.intersectionObserver.observe(this))}disconnectedCallback(){this.dispatchEvent(new CustomEvent(`${o}:disconnected`,this.customEventPayload())),this.removeEventListener("mousedown",this.onDragStartHandler),this.removeEventListener("touchstart",this.onDragStartHandler),this.removeEventListener("mousemove",this.onDragHandler),this.removeEventListener("touchmove",this.onDragHandler),this.removeEventListener("click",this.onClickHandler),this.removeEventListener("contextmenu",this.onContextMenuHandler),window.removeEventListener("resize",this.debouncedUpdateDimensions),window.removeEventListener("mouseup",this.onDragEndHandler),window.removeEventListener("touchend",this.onDragEndHandler),this.intersectionObserver.unobserve(this)}render(){this.shadowDOM.innerHTML=`
      <style>${b}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `}updateDimensions(){this.elementWidth=l(this),this.drag&&(this.dragElementWidth=l(this.drag)),this.querySelectorAll("img").forEach(e=>{e.width=this.elementWidth}),this.dispatchEvent(new CustomEvent(`${o}:resized`,this.customEventPayload()))}updateStyles(){let e=this.shadowDOM.querySelector("#before"),t=this.shadowDOM.querySelector("#drag"),i=g(this.openRatio);this.animateTo?(e.style.transition="width .75s",t.style.transition="left .75s"):(e.style.transition="none",t.style.transition="none"),e.style.width=i,t.style.left=i,this.dispatchEvent(new CustomEvent(`${o}:updated`,this.customEventPayload()))}onDragStart(){this.animateTo=0,this.isDragging=!0}onDrag(e){!this.isDragging||(this.x=d(e,this))}onDragEnd(){this.isDragging=!1}onClick(e){this.animateTo=0,this.x=d(e,this)}onContextMenu(){this.isDragging=!1}onIntersection(e,t){e.forEach(i=>{i.isIntersecting&&(this.dispatchEvent(new CustomEvent(`${o}:visible`,this.customEventPayload())),this.animateTo&&(this.openRatio=this.animateTo),this.isVisible=!0,t.unobserve(this))})}customEventPayload(){return{bubbles:!0,composed:!0,detail:{elementWidth:this.elementWidth,openRatio:this.openRatio,isRendered:this.isRendered,isVisible:this.isVisible}}}};customElements.define(o,p);var h=(n,e)=>{let t=document.createElement(o),i=n.querySelectorAll("img");if(!i[0]||!i[1])throw new Error("Cocoen needs two images");let r=i[0].cloneNode(!0),s=i[1].cloneNode(!0);return r.setAttribute("slot","before"),s.setAttribute("slot","after"),t.append(r,s),e&&e.start&&t.setAttribute("start",String(e.start)),e&&e.color&&t.setAttribute("color",e.color),Object.entries(n.dataset).forEach(([u,c])=>{e?.[u]===void 0&&c&&t.setAttribute(u,c)}),n.replaceWith(t),t};var E=n=>{[...n.querySelectorAll(`.${a}`)].map(t=>h(t))};export{h as create,E as parse};
//# sourceMappingURL=cocoen.esm.js.map
