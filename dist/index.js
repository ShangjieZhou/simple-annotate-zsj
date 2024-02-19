"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("styled-components"),o=require("@ant-design/icons"),i=require("react/jsx-runtime");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=n(t);const r=0,l=1,a=t=>{const[o,n]=e.useState(t.c1),[s,a]=e.useState(t.c2),c=e.useRef(o),u=e.useRef(s);e.useEffect((()=>{n((e=>[e[0]*t.widthRatio,e[1]*t.heightRatio])),a((e=>[e[0]*t.widthRatio,e[1]*t.heightRatio]))}),[t.widthRatio,t.heightRatio]);const d=(e,o)=>{e.stopPropagation();const i=e=>{const i=(e=>{const o=t.canvasRef.current.getBoundingClientRect();return[(e.clientX-o.left)/t.scale,(e.clientY-o.top)/t.scale]})(e,t.canvasRef.current,t.scale);o===r?(n([i[0],i[1]]),c.current=[i[0],i[1]]):o===l&&(a([i[0],i[1]]),u.current=[i[0],i[1]])};window.addEventListener("mousemove",i);const s=()=>{window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};window.addEventListener("mouseup",s)};return i.jsxs("g",{children:[i.jsx("line",{x1:o[0],y1:o[1],x2:s[0],y2:s[1],strokeWidth:t.strokeWidth/t.scale,stroke:t.svgColor}),i.jsx("circle",{onMouseDown:e=>d(e,r),r:t.radius/t.scale,cx:o[0],cy:o[1],fill:t.svgColor}),i.jsx("circle",{onMouseDown:e=>d(e,l),r:t.radius/t.scale,cx:s[0],cy:s[1],fill:t.svgColor}),i.jsx("text",{style:{WebkitUserSelect:"none",msUserSelect:"none",userSelect:"none",textAnchor:"middle",fontSize:t.fontSize,fill:t.textColor},x:(o[0]+s[0])/2,y:(o[1]+s[1])/2,children:(()=>{const e=Math.abs(o[0]-s[0]),t=Math.abs(o[1]-s[1]),i=Math.sqrt(e*e+t*t);return Math.round(i)})()})]})},c=s.default.div.attrs((e=>({style:{transform:`scale(${e.scale})`,top:e.top+"px",left:e.left+"px",width:e.width,height:e.height}})))`
  background-color: white;
  position: relative;
  display: flex;
`,u=s.default.div.attrs((e=>({style:{width:e.width,height:e.height,cursor:e.$panning?"grabbing ":"grab"}})))`
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: #454545;
  align-items: center;
  justify-content: center;
`,d=s.default.div`
  display: flex;
  position: absolute;
  padding: 0.2rem;
  top: 0;
  left: calc(100% - 4rem);
  transition: left 0.2s linear;
  ${e=>e.$onLeft&&t.css`
      left: 0;
    `};
`,h=s.default.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`,f=({maxZoomInFactor:t,themeColor:n,contrastColor:s,componentWidth:r,componentHeight:l,dotSize:f,lineWidth:m,fontSize:g,imgSrc:x})=>{const[p,w]=e.useState(1),[v,S]=e.useState(0),[y,C]=e.useState(0),[R,j]=e.useState(!0),[M,b]=e.useState(1),[k,L]=e.useState(1),z=e.useRef(null),E=e.useRef(null),W=e.useRef(null),[$,q]=e.useState([0,0]),[B,P]=e.useState(!1),[F,A]=e.useState(0);e.useEffect((()=>(window.addEventListener("resize",(()=>D())),window.removeEventListener("resize",O))),[]),e.useLayoutEffect((()=>{O()}),[]);const D=()=>{const e=z.current.getBoundingClientRect();S((t=>(b(e.width/t),e.width))),C((t=>(L(e.height/t),e.height)))},O=()=>{const e=z.current.getBoundingClientRect();S(e.width),C(e.height)},U=e=>{const o=.001*e.deltaY;return Math.min(Math.max(p-o,1),t)},Y=(e,t,o=p)=>{const i=(o-1)*v/2,n=(o-1)*y/2;return[Math.max(-1*i,Math.min(i,$[0]+e)),Math.max(-1*n,Math.min(n,$[1]+t))]},H=()=>({color:n,width:"1.2rem"});return i.jsxs(u,{onMouseUp:()=>P(!1),onMouseDown:()=>P(!0),onMouseMove:e=>{const t=Y(2*e.movementX,2*e.movementY);B&&q(t)},ref:z,$panning:B,width:r,height:l,children:[i.jsxs(c,{ref:E,onWheel:e=>{const t=U(e);q(Y(0,0,t)),w(t)},scale:p,left:$[0],top:$[1],width:v,height:y,children:[i.jsx("img",{src:x,style:{width:v,height:y},alt:"Background"}),i.jsx(h,{ref:W,viewBox:`0 0 ${v} ${y}`,children:Array(F).fill(null).map(((e,t)=>i.jsx(a,{c1:[.4*v,y/2],c2:[.6*v,y/2],radius:f,strokeWidth:m,scale:p,canvasRef:W,svgColor:n,textColor:s,fontSize:g,widthRatio:M,heightRatio:k},t)))})]}),i.jsxs(d,{$onLeft:R,children:[!R&&i.jsx(o.LeftCircleOutlined,{style:H(),onClick:()=>j(!0)}),i.jsx(o.PlusCircleFilled,{style:H(),onClick:()=>A(F+1)}),i.jsx(o.MinusCircleFilled,{style:H(),onClick:()=>A(Math.max(0,F-1))}),R&&i.jsx(o.RightCircleOutlined,{style:H(),onClick:()=>j(!1)})]})]})};f.defaultProps={maxZoomInFactor:5,themeColor:"#ff2da4",contrastColor:"#a60050",componentWidth:"100%",componentHeight:"400px",dotSize:8,lineWidth:3,fontSize:"0.8rem",imgSrc:"https://img1.baidu.com/it/u=904793130,704474900&fm=253&fmt=auto&app=138&f=JPG?w=800&h=500"},exports.Annotator=f;
