var Cocoen=(()=>{var E=Object.defineProperty;var w=(i,e)=>{for(var t in e)E(i,t,{get:e[t],enumerable:!0})};var x={};w(x,{create:()=>a,parse:()=>f});var l="cocoen",r=`${l}-component`;var h=i=>Number.parseInt(window.getComputedStyle(i).height,10);var d=i=>Number.parseInt(window.getComputedStyle(i).width,10);var p=({dragElementSize:i,hostElementSize:e,value:t})=>{let n=Math.min(Math.max(t,0),e),o=.5*i,s=(n+o)/e;return 100*s};var u=(i,e,t="horizontal")=>{let n=0,o=0;return t==="horizontal"?(n=i instanceof MouseEvent?i.clientX:i.touches[0].clientX,o=e?.getBoundingClientRect().left??0):t==="vertical"&&(n=i instanceof MouseEvent?i.clientY:i.touches[0].clientY,o=e?.getBoundingClientRect().top??0),n-o};var g=(i,e)=>{let t;return(...n)=>{let o;return t&&clearTimeout(t),t=setTimeout(()=>{o=i(...n)},e),o}};var v=i=>`${i}%`;var y=`
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

  :host([orientation="vertical"]) #before {
    width: 100%;
    height: 50%;
  }

  #drag {
    background: var(--color, #fff);
    bottom: 0;
    cursor: ew-resize;
    left: 50%;
    position: absolute;
    top: 0;
    width: 2px;
    transform: translate3d(-50%, 0, 0);
  }

  :host([orientation="vertical"]) #drag {
    height: 2px;
    left: 0;
    top: 50%;
    width: 100%;
    cursor: ns-resize;
    transform: translate3d(0, -50%, 0);
  }

  #drag:before {
    border: 3px solid var(--color, #fff);
    content: '';
    height: 30px;
    left: 50%;
    position: absolute;
    top: 50%;
    width: 14px;
    transform: translate3d(-50%, -50%, 0);
  }

  :host([orientation="vertical"]) #drag:before {
    height: 14px;
    width: 30px;
  }

  ::slotted(img) {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    pointer-events: none;
  }

  ::slotted(img[slot=before]) {
    max-width: none;
  }

  :host([orientation="vertical"]) ::slotted(img[slot=before]) {
    max-height: none;
    max-width: 100%;
  }

  ::slotted(img[slot=after]) {
    display: block;
    max-width: 100%;
    width: 100%;
  }

  :host([orientation="vertical"]) ::slotted(img[slot=after]) {
    max-height: 100%;
    height: 100%;
  }
`,b=class extends HTMLElement{constructor(){super();this.animateToValue=0;this.colorValue="#fff";this.orientationValue="horizontal";this.dragElementSizeValue=0;this.elementSizeValue=0;this.isDraggingValue=!1;this.openRatioValue=50;this.isRenderedValue=!1;this.isVisibleValue=!1;this.pointValue=0;this.drag=null,this.shadowDOM=this.attachShadow({mode:"open"}),this.onDragStartHandler=()=>this.onDragStart(),this.onDragEndHandler=()=>this.onDragEnd(),this.onDragHandler=e=>this.onDrag(e),this.onClickHandler=e=>this.onClick(e),this.onContextMenuHandler=()=>this.onContextMenu(),this.onIntersectionHandler=(e,t)=>this.onIntersection(e,t),this.debouncedUpdateDimensions=g(()=>{this.updateDimensions()},250),this.intersectionObserver=new IntersectionObserver(this.onIntersectionHandler,{root:null,rootMargin:"0px",threshold:0})}get point(){return this.pointValue}set point(e){this.pointValue=e,window.requestAnimationFrame(()=>{this.openRatio=p({value:this.pointValue,dragElementSize:this.dragElementSize,hostElementSize:this.elementSize})})}get elementSize(){return this.elementSizeValue}set elementSize(e){this.elementSizeValue=e}get dragElementSize(){return this.dragElementSizeValue}set dragElementSize(e){this.dragElementSizeValue=e}get isDragging(){return this.isDraggingValue}set isDragging(e){this.isDraggingValue=e}get openRatio(){return this.openRatioValue}set openRatio(e){this.openRatioValue=e,window.requestAnimationFrame(()=>{this.updateStyles()})}get color(){return this.colorValue}set color(e){this.colorValue=e,window.requestAnimationFrame(()=>{this.style.setProperty("--color",this.color)})}get isVisible(){return this.isVisibleValue}set isVisible(e){this.isVisibleValue=e}get isRendered(){return this.isRenderedValue}set isRendered(e){this.isRenderedValue=e}get animateTo(){return this.animateToValue}set animateTo(e){this.animateToValue=e}get orientation(){return this.orientationValue}set orientation(e){this.orientationValue=e,window.requestAnimationFrame(()=>{this.updateDimensions(),this.updateStyles()})}static get observedAttributes(){return["start","color","orientation"]}attributeChangedCallback(e,t,n){t!==n&&(e==="start"&&(this.animateTo=Number.parseInt(String(this.getAttribute("start")),10),this.isVisible&&(this.openRatio=this.animateTo)),e==="color"&&(this.color=String(this.getAttribute("color"))),e==="orientation"&&(this.orientation=this.getAttribute("orientation")))}connectedCallback(){this.isRendered||(this.render(),this.isRendered=!0,this.dispatchEvent(new CustomEvent(`${r}:connected`,this.customEventPayload())),this.drag=this.shadowDOM.querySelector("#drag"),this.updateDimensions(),this.addEventListener("mousedown",this.onDragStartHandler,{passive:!0}),this.addEventListener("touchstart",this.onDragStartHandler,{passive:!0}),this.addEventListener("mousemove",this.onDragHandler,{passive:!0}),this.addEventListener("touchmove",this.onDragHandler,{passive:!0}),this.addEventListener("click",this.onClickHandler,{passive:!0}),this.addEventListener("contextmenu",this.onContextMenuHandler,{passive:!0}),window.addEventListener("resize",this.debouncedUpdateDimensions,{passive:!0}),window.addEventListener("mouseup",this.onDragEndHandler,{passive:!0}),window.addEventListener("touchend",this.onDragEndHandler,{passive:!0}),this.intersectionObserver.observe(this))}disconnectedCallback(){this.dispatchEvent(new CustomEvent(`${r}:disconnected`,this.customEventPayload())),this.removeEventListener("mousedown",this.onDragStartHandler),this.removeEventListener("touchstart",this.onDragStartHandler),this.removeEventListener("mousemove",this.onDragHandler),this.removeEventListener("touchmove",this.onDragHandler),this.removeEventListener("click",this.onClickHandler),this.removeEventListener("contextmenu",this.onContextMenuHandler),window.removeEventListener("resize",this.debouncedUpdateDimensions),window.removeEventListener("mouseup",this.onDragEndHandler),window.removeEventListener("touchend",this.onDragEndHandler),this.intersectionObserver.unobserve(this)}render(){this.shadowDOM.innerHTML=`
      <style>${y}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `}updateDimensions(){this.elementSize=this.orientation==="horizontal"?d(this):h(this),this.drag&&(this.dragElementSize=this.orientation==="horizontal"?d(this.drag):h(this.drag)),this.querySelectorAll("img").forEach(e=>{this.orientation==="horizontal"?e.width=this.elementSize:e.height=this.elementSize}),this.dispatchEvent(new CustomEvent(`${r}:resized`,this.customEventPayload()))}updateStyles(){let e=this.shadowDOM.querySelector("#before"),t=this.shadowDOM.querySelector("#drag"),n=v(this.openRatio);this.animateTo?(e.style.transition="width height .75s",t.style.transition="left top .75s"):(e.style.transition="none",t.style.transition="none"),this.orientation==="horizontal"?(e.style.height="100%",e.style.width=n,t.style.left=n,t.style.top="0px"):this.orientation==="vertical"&&(e.style.width="100%",e.style.height=n,t.style.top=n,t.style.left="0px"),this.dispatchEvent(new CustomEvent(`${r}:updated`,this.customEventPayload()))}onDragStart(){this.animateTo=0,this.isDragging=!0}onDrag(e){!this.isDragging||(this.point=u(e,this,this.orientation))}onDragEnd(){this.isDragging=!1}onClick(e){this.animateTo=0,this.point=u(e,this,this.orientation)}onContextMenu(){this.isDragging=!1}onIntersection(e,t){e.forEach(n=>{n.isIntersecting&&(this.dispatchEvent(new CustomEvent(`${r}:visible`,this.customEventPayload())),this.animateTo&&(this.openRatio=this.animateTo),this.isVisible=!0,t.unobserve(this))})}customEventPayload(){return{bubbles:!0,composed:!0,detail:{elementSize:this.elementSize,openRatio:this.openRatio,isRendered:this.isRendered,isVisible:this.isVisible}}}};customElements.define(r,b);var a=(i,e)=>{let t=document.createElement(r),n=i.querySelectorAll("img");if(!n[0]||!n[1])throw new Error("Cocoen needs two images");let o=n[0].cloneNode(!0),s=n[1].cloneNode(!0);return o.setAttribute("slot","before"),s.setAttribute("slot","after"),t.append(o,s),e&&e.start&&t.setAttribute("start",String(e.start)),e&&e.color&&t.setAttribute("color",e.color),e&&e.orientation&&t.setAttribute("orientation",e.orientation),Object.entries(i.dataset).forEach(([c,m])=>{e?.[c]===void 0&&m&&t.setAttribute(c,m)}),i.replaceWith(t),t};var f=i=>{[...i.querySelectorAll(`.${l}`)].map(t=>a(t))};return x;})();
//# sourceMappingURL=cocoen.js.map
