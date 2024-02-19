import{useState as t,useRef as e,useEffect as o,useLayoutEffect as n}from"react";import i,{css as r}from"styled-components";import{LeftCircleOutlined as s,PlusCircleFilled as l,MinusCircleFilled as c,RightCircleOutlined as a}from"@ant-design/icons";import{jsxs as h,jsx as d}from"react/jsx-runtime";const m=0,u=1,g=n=>{const[i,r]=t(n.c1),[s,l]=t(n.c2),c=e(i),a=e(s);o((()=>{r((t=>[t[0]*n.widthRatio,t[1]*n.heightRatio])),l((t=>[t[0]*n.widthRatio,t[1]*n.heightRatio]))}),[n.widthRatio,n.heightRatio]);const g=(t,e)=>{t.stopPropagation();const o=t=>{const o=(t=>{const e=n.canvasRef.current.getBoundingClientRect();return[(t.clientX-e.left)/n.scale,(t.clientY-e.top)/n.scale]})(t,n.canvasRef.current,n.scale);e===m?(r([o[0],o[1]]),c.current=[o[0],o[1]]):e===u&&(l([o[0],o[1]]),a.current=[o[0],o[1]])};window.addEventListener("mousemove",o);const i=()=>{window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",i)};window.addEventListener("mouseup",i)};return h("g",{children:[d("line",{x1:i[0],y1:i[1],x2:s[0],y2:s[1],strokeWidth:n.strokeWidth/n.scale,stroke:n.svgColor}),d("circle",{onMouseDown:t=>g(t,m),r:n.radius/n.scale,cx:i[0],cy:i[1],fill:n.svgColor}),d("circle",{onMouseDown:t=>g(t,u),r:n.radius/n.scale,cx:s[0],cy:s[1],fill:n.svgColor}),d("text",{style:{WebkitUserSelect:"none",msUserSelect:"none",userSelect:"none",textAnchor:"middle",fontSize:n.fontSize,fill:n.textColor},x:(i[0]+s[0])/2,y:(i[1]+s[1])/2,children:(()=>{const t=Math.abs(i[0]-s[0]),e=Math.abs(i[1]-s[1]),o=Math.sqrt(t*t+e*e);return Math.round(o)})()})]})},f=i.div.attrs((t=>({style:{transform:`scale(${t.scale})`,top:t.top+"px",left:t.left+"px",width:t.width,height:t.height}})))`
  background-color: white;
  position: relative;
  display: flex;
`,p=i.div.attrs((t=>({style:{width:t.width,height:t.height,cursor:t.$panning?"grabbing ":"grab"}})))`
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: #454545;
  align-items: center;
  justify-content: center;
`,w=i.div`
  display: flex;
  position: absolute;
  padding: 0.2rem;
  top: 0;
  left: calc(100% - 4rem);
  transition: left 0.2s linear;
  ${t=>t.$onLeft&&r`
      left: 0;
    `};
`,v=i.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`,x=({maxZoomInFactor:i,themeColor:r,contrastColor:m,componentWidth:u,componentHeight:x,dotSize:y,lineWidth:C,fontSize:M,imgSrc:R})=>{const[k,S]=t(1),[b,z]=t(0),[W,L]=t(0),[$,E]=t(!0),[B,D]=t(1),[P,U]=t(1),Y=e(null),j=e(null),A=e(null),[F,H]=t([0,0]),[I,X]=t(!1),[Z,q]=t(0);o((()=>(window.addEventListener("resize",(()=>G())),window.removeEventListener("resize",J))),[]),n((()=>{J()}),[]);const G=()=>{const t=Y.current.getBoundingClientRect();z((e=>(D(t.width/e),t.width))),L((e=>(U(t.height/e),t.height)))},J=()=>{const t=Y.current.getBoundingClientRect();z(t.width),L(t.height)},K=t=>{const e=.001*t.deltaY;return Math.min(Math.max(k-e,1),i)},N=(t,e,o=k)=>{const n=(o-1)*b/2,i=(o-1)*W/2;return[Math.max(-1*n,Math.min(n,F[0]+t)),Math.max(-1*i,Math.min(i,F[1]+e))]},O=()=>({color:r,width:"1.2rem"});return h(p,{onMouseUp:()=>X(!1),onMouseDown:()=>X(!0),onMouseMove:t=>{const e=N(2*t.movementX,2*t.movementY);I&&H(e)},ref:Y,$panning:I,width:u,height:x,children:[h(f,{ref:j,onWheel:t=>{const e=K(t);H(N(0,0,e)),S(e)},scale:k,left:F[0],top:F[1],width:b,height:W,children:[d("img",{src:R,style:{width:b,height:W},alt:"Background"}),d(v,{ref:A,viewBox:`0 0 ${b} ${W}`,children:Array(Z).fill(null).map(((t,e)=>d(g,{c1:[.4*b,W/2],c2:[.6*b,W/2],radius:y,strokeWidth:C,scale:k,canvasRef:A,svgColor:r,textColor:m,fontSize:M,widthRatio:B,heightRatio:P},e)))})]}),h(w,{$onLeft:$,children:[!$&&d(s,{style:O(),onClick:()=>E(!0)}),d(l,{style:O(),onClick:()=>q(Z+1)}),d(c,{style:O(),onClick:()=>q(Math.max(0,Z-1))}),$&&d(a,{style:O(),onClick:()=>E(!1)})]})]})};x.defaultProps={maxZoomInFactor:5,themeColor:"#ff2da4",contrastColor:"#a60050",componentWidth:"100%",componentHeight:"400px",dotSize:8,lineWidth:3,fontSize:"0.8rem",imgSrc:"https://img1.baidu.com/it/u=904793130,704474900&fm=253&fmt=auto&app=138&f=JPG?w=800&h=500"};export{x as Annotator};
