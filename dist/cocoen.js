var Cocoen=(()=>{var u=Object.defineProperty;var m=(n,e)=>{for(var t in e)u(n,t,{get:e[t],enumerable:!0})};var p={};m(p,{create:()=>r,parse:()=>h});var s="cocoen",i=`${s}-component`;var d=(n,e)=>{let t;return(...o)=>{let a;return t&&clearTimeout(t),t=setTimeout(()=>{a=n(...o)},e),a}};var c=`
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
    background: #fff;
    bottom: 0;
    cursor: ew-resize;
    left: 50%;
    margin-left: -1px;
    position: absolute;
    top: 0;
    width: 2px;
  }

  #drag:before {
    border: 3px solid #fff;
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
`,l=class extends HTMLElement{constructor(){super();this.xValue=0;this.elementWidthValue=0;this.dragElementWidthValue=0;this.openRatioValue="50%";this.isDraggingValue=!1;this.rendered=!1;this.drag=null,this.shadowDOM=this.attachShadow({mode:"closed"}),this.onDragStartHandler=e=>this.onDragStart(e),this.onDragEndHandler=()=>this.onDragEnd(),this.onDragHandler=e=>this.onDrag(e),this.onClickHandler=e=>this.onClick(e),this.debouncedUpdateDimensions=d(()=>{this.updateDimensions()},250)}get x(){return this.xValue}set x(e){this.xValue=e,window.requestAnimationFrame(()=>{this.openRatio=this.calculateOpenRatio(this.xValue)})}get elementWidth(){return this.elementWidthValue}set elementWidth(e){this.elementWidthValue=e}get dragElementWidth(){return this.dragElementWidthValue}set dragElementWidth(e){this.dragElementWidthValue=e}get isDragging(){return this.isDraggingValue}set isDragging(e){this.isDraggingValue=e}get openRatio(){return this.openRatioValue}set openRatio(e){this.openRatioValue=e,this.updateStyles()}connectedCallback(){this.rendered||(this.render(),this.rendered=!0,document.dispatchEvent(new CustomEvent("cocoen:rendered",this.customEventPayload())),this.drag=this.shadowDOM.querySelector("#drag"),this.updateDimensions(),this.addEventListener("mousedown",this.onDragStartHandler),this.addEventListener("touchstart",this.onDragStartHandler),this.addEventListener("mousemove",this.onDragHandler),this.addEventListener("touchmove",this.onDragHandler),this.addEventListener("click",this.onClickHandler),window.addEventListener("resize",this.debouncedUpdateDimensions),window.addEventListener("mouseup",this.onDragEndHandler),window.addEventListener("touchend",this.onDragEndHandler))}disconnectedCallback(){this.removeEventListener("mousedown",this.onDragStartHandler),this.removeEventListener("touchstart",this.onDragStartHandler),this.removeEventListener("mousemove",this.onDragHandler),this.removeEventListener("touchmove",this.onDragHandler),this.removeEventListener("click",this.onClickHandler),window.removeEventListener("resize",this.debouncedUpdateDimensions),window.removeEventListener("mouseup",this.onDragEndHandler),window.removeEventListener("touchend",this.onDragEndHandler)}render(){this.shadowDOM.innerHTML=`
      <style>${c}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `}updateDimensions(){this.elementWidth=Number.parseInt(window.getComputedStyle(this).width,10),this.drag&&(this.dragElementWidth=Number.parseInt(window.getComputedStyle(this.drag).width,10)),document.dispatchEvent(new CustomEvent("cocoen:resized",this.customEventPayload()))}updateStyles(){let e=this.shadowDOM.querySelector("#before"),t=this.shadowDOM.querySelector("#drag");e.style.width=this.openRatio,t.style.left=this.openRatio,document.dispatchEvent(new CustomEvent("cocoen:updated",this.customEventPayload()))}onDragStart(e){e.preventDefault(),this.isDragging=!0}onDrag(e){e.preventDefault(),!!this.isDragging&&(this.x=this.calculateXfromEvent(e))}onDragEnd(){this.isDragging=!1}onClick(e){e.preventDefault(),this.x=this.calculateXfromEvent(e)}calculateXfromEvent(e){let t=0;e instanceof MouseEvent?t=e.clientX:e instanceof TouchEvent&&(t=e.touches[0].clientX);let o=this.getBoundingClientRect().left||0;return t-o}calculateOpenRatio(e){let t=e;e<0?t=this.dragElementWidth:e>=this.elementWidth&&(t=this.elementWidth-this.dragElementWidth);let o=t+this.dragElementWidth/2;return o/=this.elementWidth,`${o*100}%`}customEventPayload(){return{detail:{elementWidth:this.elementWidth,openRatio:this.openRatio,rendered:this.rendered}}}};customElements.define(i,l);var r=n=>{let e=document.createElement(i),t=n.querySelectorAll("img")[0],o=n.querySelectorAll("img")[1];if(!t||!o)throw new Error("Cocoen needs two images");return t.setAttribute("slot","before"),o.setAttribute("slot","after"),e.append(t.cloneNode(!0)),e.append(o.cloneNode(!0)),n.replaceWith(e),e};var h=n=>{[...n.querySelectorAll(`.${s}`)].map(t=>r(t))};return p;})();
//# sourceMappingURL=cocoen.js.map
