var Cocoen=(()=>{var E=Object.defineProperty;var w=(i,e)=>{for(var t in e)E(i,t,{get:e[t],enumerable:!0})};var D={};w(D,{create:()=>l,parse:()=>f});var d="cocoen",s=`${d}-component`;var h=i=>Number.parseInt(window.getComputedStyle(i).height,10);var c=i=>Number.parseInt(window.getComputedStyle(i).width,10);var g=({dragElementSize:i,hostElementSize:e,value:t})=>{let n=Math.min(Math.max(t,0),e),o=.5*i,r=(n+o)/e;return 100*r};var u=(i,e,t="left-to-right")=>{let n=i instanceof MouseEvent?i.clientX:i.touches[0].clientX,o=i instanceof MouseEvent?i.clientY:i.touches[0].clientY,r=0,a=0;return t==="left-to-right"?(r=n,a=e?.getBoundingClientRect().left??0):t==="right-to-left"?(r=n,a=e?.getBoundingClientRect().right??0):t==="top-to-bottom"?(r=o,a=e?.getBoundingClientRect().top??0):t==="bottom-to-top"&&(r=o,a=e?.getBoundingClientRect().bottom??0),r-a};var p=(i,e)=>{let t;return(...n)=>{let o;return t&&clearTimeout(t),t=setTimeout(()=>{o=i(...n)},e),o}};var v=i=>`${i}%`;var y=`
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
    position: absolute;
    top: 0;
    width: 2px;
    transform: translate3d(-50%, 0, 0);
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
`,b=class extends HTMLElement{constructor(){super();this.animateToValue=0;this.colorValue="#fff";this.directionValue="left-to-right";this.dragElementSizeValue=0;this.elementSizeValue=0;this.isDraggingValue=!1;this.openRatioValue=50;this.isRenderedValue=!1;this.isVisibleValue=!1;this.pointValue=0;this.drag=null,this.shadowDOM=this.attachShadow({mode:"open"}),this.onDragStartHandler=()=>this.onDragStart(),this.onDragEndHandler=()=>this.onDragEnd(),this.onDragHandler=e=>this.onDrag(e),this.onClickHandler=e=>this.onClick(e),this.onContextMenuHandler=()=>this.onContextMenu(),this.onIntersectionHandler=(e,t)=>this.onIntersection(e,t),this.debouncedUpdateDimensions=p(()=>{this.updateDimensions()},250),this.intersectionObserver=new IntersectionObserver(this.onIntersectionHandler,{root:null,rootMargin:"0px",threshold:0})}get point(){return this.pointValue}set point(e){this.pointValue=e,window.requestAnimationFrame(()=>{this.openRatio=g({value:this.pointValue,dragElementSize:this.dragElementSize,hostElementSize:this.elementSize})})}get elementSize(){return this.elementSizeValue}set elementSize(e){this.elementSizeValue=e}get dragElementSize(){return this.dragElementSizeValue}set dragElementSize(e){this.dragElementSizeValue=e}get isDragging(){return this.isDraggingValue}set isDragging(e){this.isDraggingValue=e}get openRatio(){return this.openRatioValue}set openRatio(e){this.openRatioValue=e,window.requestAnimationFrame(()=>{this.updateStyles()})}get color(){return this.colorValue}set color(e){this.colorValue=e,window.requestAnimationFrame(()=>{this.style.setProperty("--color",this.color)})}get isVisible(){return this.isVisibleValue}set isVisible(e){this.isVisibleValue=e}get isRendered(){return this.isRenderedValue}set isRendered(e){this.isRenderedValue=e}get animateTo(){return this.animateToValue}set animateTo(e){this.animateToValue=e}get direction(){return this.directionValue}set direction(e){this.directionValue=e,window.requestAnimationFrame(()=>{this.updateDimensions(),this.updateStyles()})}static get observedAttributes(){return["start","color","direction"]}attributeChangedCallback(e,t,n){t!==n&&(e==="start"&&(this.animateTo=Number.parseInt(String(this.getAttribute("start")),10),this.isVisible&&(this.openRatio=this.animateTo)),e==="color"&&(this.color=String(this.getAttribute("color"))),e==="direction"&&(this.direction=this.getAttribute("direction")))}connectedCallback(){this.isRendered||(this.render(),this.isRendered=!0,this.dispatchEvent(new CustomEvent(`${s}:connected`,this.customEventPayload())),this.drag=this.shadowDOM.querySelector("#drag"),this.updateDimensions(),this.addEventListener("mousedown",this.onDragStartHandler,{passive:!0}),this.addEventListener("touchstart",this.onDragStartHandler,{passive:!0}),this.addEventListener("mousemove",this.onDragHandler,{passive:!0}),this.addEventListener("touchmove",this.onDragHandler,{passive:!0}),this.addEventListener("click",this.onClickHandler,{passive:!0}),this.addEventListener("contextmenu",this.onContextMenuHandler,{passive:!0}),window.addEventListener("resize",this.debouncedUpdateDimensions,{passive:!0}),window.addEventListener("mouseup",this.onDragEndHandler,{passive:!0}),window.addEventListener("touchend",this.onDragEndHandler,{passive:!0}),this.intersectionObserver.observe(this))}disconnectedCallback(){this.dispatchEvent(new CustomEvent(`${s}:disconnected`,this.customEventPayload())),this.removeEventListener("mousedown",this.onDragStartHandler),this.removeEventListener("touchstart",this.onDragStartHandler),this.removeEventListener("mousemove",this.onDragHandler),this.removeEventListener("touchmove",this.onDragHandler),this.removeEventListener("click",this.onClickHandler),this.removeEventListener("contextmenu",this.onContextMenuHandler),window.removeEventListener("resize",this.debouncedUpdateDimensions),window.removeEventListener("mouseup",this.onDragEndHandler),window.removeEventListener("touchend",this.onDragEndHandler),this.intersectionObserver.unobserve(this)}render(){this.shadowDOM.innerHTML=`
      <style>${y}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `}updateDimensions(){this.elementSize=this.isHorizontal()?c(this):h(this),this.drag&&(this.dragElementSize=this.isHorizontal()?c(this.drag):h(this.drag)),this.querySelectorAll("img").forEach(e=>{this.isHorizontal()?e.width=this.elementSize:e.height=this.elementSize}),this.dispatchEvent(new CustomEvent(`${s}:resized`,this.customEventPayload()))}updateStyles(){let e=this.shadowDOM.querySelector("#before"),t=this.shadowDOM.querySelector("#drag"),n=v(this.openRatio);this.animateTo?(e.style.transition="width height .75s",t.style.transition="left right top bottom .75s"):(e.style.transition="none",t.style.transition="none"),this.direction==="left-to-right"?(e.style.width=n,t.style.left=n,t.style.right="auto"):this.direction==="right-to-left"?(e.style.width=n,t.style.right=n,t.style.left="auto"):this.direction==="top-to-bottom"?(e.style.height=n,t.style.top=n,t.style.bottom="auto"):this.direction==="bottom-to-top"&&(e.style.height=n,t.style.bottom=n,t.style.top="auto"),this.dispatchEvent(new CustomEvent(`${s}:updated`,this.customEventPayload()))}onDragStart(){this.animateTo=0,this.isDragging=!0}onDrag(e){!this.isDragging||(this.point=u(e,this,this.direction))}onDragEnd(){this.isDragging=!1}onClick(e){this.animateTo=0,this.point=u(e,this,this.direction)}onContextMenu(){this.isDragging=!1}onIntersection(e,t){e.forEach(n=>{n.isIntersecting&&(this.dispatchEvent(new CustomEvent(`${s}:visible`,this.customEventPayload())),this.animateTo&&(this.openRatio=this.animateTo),this.isVisible=!0,t.unobserve(this))})}customEventPayload(){return{bubbles:!0,composed:!0,detail:{elementSize:this.elementSize,openRatio:this.openRatio,isRendered:this.isRendered,isVisible:this.isVisible}}}isHorizontal(){return this.direction==="left-to-right"||this.direction==="right-to-left"}};customElements.define(s,b);var l=(i,e)=>{let t=document.createElement(s),n=i.querySelectorAll("img");if(!n[0]||!n[1])throw new Error("Cocoen needs two images");let o=n[0].cloneNode(!0),r=n[1].cloneNode(!0);return o.setAttribute("slot","before"),r.setAttribute("slot","after"),t.append(o,r),e&&e.start&&t.setAttribute("start",String(e.start)),e&&e.color&&t.setAttribute("color",e.color),e&&e.direction&&t.setAttribute("direction",e.direction),Object.entries(i.dataset).forEach(([a,m])=>{e?.[a]===void 0&&m&&t.setAttribute(a,m)}),i.replaceWith(t),t};var f=i=>{[...i.querySelectorAll(`.${d}`)].map(t=>l(t))};return D;})();
//# sourceMappingURL=cocoen.js.map
