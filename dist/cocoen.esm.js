var s="cocoen",r=`${s}-component`;var h=(n,e)=>{let t;return(...o)=>{let i;return t&&clearTimeout(t),t=setTimeout(()=>{i=n(...o)},e),i}};var a=(n,e)=>{let t=0;n instanceof MouseEvent?t=n.clientX:n instanceof TouchEvent&&(t=n.touches[0].clientX);let o=e?.getBoundingClientRect().left||0;return t-o};var u=({dragElementWidth:n,hostElementWidth:e,x:t})=>{let o=t;t<0?o=n:t>=e&&(o=e-n);let i=o+n/2;return i/=e,i*100};var d=n=>Number.parseInt(window.getComputedStyle(n).width,10);var m=n=>`${n}%`;var p=`
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
`,c=class extends HTMLElement{constructor(){super();this.xValue=0;this.elementWidthValue=0;this.dragElementWidthValue=0;this.openRatioValue=50;this.isDraggingValue=!1;this.rendered=!1;this.drag=null,this.shadowDOM=this.attachShadow({mode:"closed"}),this.onDragStartHandler=e=>this.onDragStart(e),this.onDragEndHandler=()=>this.onDragEnd(),this.onDragHandler=e=>this.onDrag(e),this.onClickHandler=e=>this.onClick(e),this.debouncedUpdateDimensions=h(()=>{this.updateDimensions()},250)}get x(){return this.xValue}set x(e){this.xValue=e,window.requestAnimationFrame(()=>{this.openRatio=u({x:this.xValue,dragElementWidth:this.dragElementWidth,hostElementWidth:this.elementWidth})})}get elementWidth(){return this.elementWidthValue}set elementWidth(e){this.elementWidthValue=e}get dragElementWidth(){return this.dragElementWidthValue}set dragElementWidth(e){this.dragElementWidthValue=e}get isDragging(){return this.isDraggingValue}set isDragging(e){this.isDraggingValue=e}get openRatio(){return this.openRatioValue}set openRatio(e){this.openRatioValue=e,this.updateStyles()}connectedCallback(){this.rendered||(this.render(),this.rendered=!0,document.dispatchEvent(new CustomEvent("cocoen:rendered",this.customEventPayload())),this.drag=this.shadowDOM.querySelector("#drag"),this.updateDimensions(),this.addEventListener("mousedown",this.onDragStartHandler),this.addEventListener("touchstart",this.onDragStartHandler),this.addEventListener("mousemove",this.onDragHandler),this.addEventListener("touchmove",this.onDragHandler),this.addEventListener("click",this.onClickHandler),window.addEventListener("resize",this.debouncedUpdateDimensions),window.addEventListener("mouseup",this.onDragEndHandler),window.addEventListener("touchend",this.onDragEndHandler))}disconnectedCallback(){this.removeEventListener("mousedown",this.onDragStartHandler),this.removeEventListener("touchstart",this.onDragStartHandler),this.removeEventListener("mousemove",this.onDragHandler),this.removeEventListener("touchmove",this.onDragHandler),this.removeEventListener("click",this.onClickHandler),window.removeEventListener("resize",this.debouncedUpdateDimensions),window.removeEventListener("mouseup",this.onDragEndHandler),window.removeEventListener("touchend",this.onDragEndHandler)}render(){this.shadowDOM.innerHTML=`
      <style>${p}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `}updateDimensions(){this.elementWidth=d(this),this.drag&&(this.dragElementWidth=d(this.drag)),document.dispatchEvent(new CustomEvent("cocoen:resized",this.customEventPayload()))}updateStyles(){let e=this.shadowDOM.querySelector("#before"),t=this.shadowDOM.querySelector("#drag"),o=m(this.openRatio);e.style.width=o,t.style.left=o,document.dispatchEvent(new CustomEvent("cocoen:updated",this.customEventPayload()))}onDragStart(e){e.preventDefault(),this.isDragging=!0}onDrag(e){e.preventDefault(),!!this.isDragging&&(this.x=a(e,this))}onDragEnd(){this.isDragging=!1}onClick(e){e.preventDefault(),this.x=a(e,this)}calculateOpenRatio(e){let t=e;e<0?t=this.dragElementWidth:e>=this.elementWidth&&(t=this.elementWidth-this.dragElementWidth);let o=t+this.dragElementWidth/2;return o/=this.elementWidth,`${o*100}%`}customEventPayload(){return{detail:{elementWidth:this.elementWidth,openRatio:this.openRatio,rendered:this.rendered}}}};customElements.define(r,c);var l=n=>{let e=document.createElement(r),t=n.querySelectorAll("img")[0],o=n.querySelectorAll("img")[1];if(!t||!o)throw new Error("Cocoen needs two images");return t.setAttribute("slot","before"),o.setAttribute("slot","after"),e.append(t.cloneNode(!0)),e.append(o.cloneNode(!0)),n.replaceWith(e),e};var g=n=>{[...n.querySelectorAll(`.${s}`)].map(t=>l(t))};export{l as create,g as parse};
//# sourceMappingURL=cocoen.esm.js.map
