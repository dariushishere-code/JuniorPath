import{c as m,h as g,i as b,r as y,p as j,j as e,a as o,T as w,B as v,Z as N,C as p,u as k,b as S,L as c}from"./index-MIyQgpOs.js";import{g as d}from"./projects-9LaDkT6p.js";import{L as B,M as z,S as R}from"./server-WzmgDPiz.js";import{m as a}from"./proxy--5CZRzrb.js";import{R as x}from"./radial-glow-button-BRfng1hE.js";import{A as h}from"./arrow-right-Bs2lECjE.js";import{C as F}from"./check-circle-2-zHcK7UkO.js";/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=m("Briefcase",[["rect",{width:"20",height:"14",x:"2",y:"7",rx:"2",ry:"2",key:"eto64e"}],["path",{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"zwj3tp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=m("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=m("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);function u(){!g.current&&b();const[s]=y.useState(j.current);return s}function C({title:s="An awesome title",className:r,...i}){const t="data:image/svg+xml,"+encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' color-interpolation-filters='sRGB'>
      <g>
        <rect width='1' height='1' fill='black' />
        <rect width='1' height='1' fill='url(#red)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#green)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#yellow)' style='mix-blend-mode:screen' />
      </g>
      <defs>
        <radialGradient id='yellow' cx='0' cy='0' r='1' >
          <stop stop-color='yellow' />
          <stop stop-color='yellow' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='green' cx='1' cy='0' r='1' >
          <stop stop-color='green' />
          <stop stop-color='green' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='red' cx='0' cy='1' r='1' >
          <stop stop-color='red' />
          <stop stop-color='red' offset='1' stop-opacity='0' />
        </radialGradient>
      </defs>
    </svg>
  `);return e.jsxs("section",{className:o("aurora-hero-wrapper w-full min-h-[400px] h-[500px] sm:h-[600px] relative overflow-hidden",r),...i,children:[e.jsx("style",{children:`
        .aurora-hero-wrapper {
          --stripe-color: #000;
          --bg-filter: blur(10px) opacity(50%) saturate(200%);
          background: var(--stripe-color);
          font-family: Inter, sans-serif;
        }
        :is(.dark) .aurora-hero-wrapper {
          --stripe-color: #fff;
          --bg-filter: blur(10px) invert(100%);
        }
        @keyframes smoothBg {
          from { background-position: 50% 50%, 50% 50%; }
          to { background-position: 350% 50%, 350% 50%; }
        }
        .aurora-hero-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          --stripes: repeating-linear-gradient(
            100deg, 
            var(--stripe-color) 0%, 
            var(--stripe-color) 7%, 
            transparent 10%, 
            transparent 12%, 
            var(--stripe-color) 16%
          );
          --rainbow: repeating-linear-gradient(
            100deg, 
            #60a5fa 10%, 
            #e879f9 15%, 
            #60a5fa 20%, 
            #5eead4 25%, 
            #60a5fa 30%
          );
          background-image: var(--stripes), var(--rainbow);
          background-size: 300%, 200%;
          background-position: 50% 50%, 50% 50%;
          filter: var(--bg-filter);
          mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
        }
        .aurora-hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--stripes), var(--rainbow);
          background-size: 200%, 100%;
          animation: smoothBg 60s linear infinite;
          background-attachment: fixed;
          mix-blend-mode: difference;
        }
        .aurora-content {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          place-content: center;
          place-items: center;
          flex-flow: column;
          gap: 4.5%;
          text-align: center;
          backdrop-filter: contrast(0.9) blur(7px) url(#fluted);
          -webkit-backdrop-filter: contrast(0.9) blur(7px) url(#fluted);
          mix-blend-mode: difference;
          filter: invert(1);
        }
        .h1-scalingSize {
          font-size: calc(1rem - -5vw);
          position: relative;
          isolation: isolate;
          font-weight: 700;
        }
        .h1-scalingSize::first-letter {
          font-size: 300%;
        }
        .h1-scalingSize::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: white;
          text-shadow: 0 0 1px #ffffff;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-color: white;
          -webkit-mask: linear-gradient(#000 0 0) luminance;
          mask: linear-gradient(#000 0 0) luminance, alpha;
          backdrop-filter: blur(19px) brightness(12.5);
          -webkit-text-stroke: 1px white;
          display: flex;
          margin: auto;
          z-index: 1;
          pointer-events: none;
        }
      `}),e.jsx("div",{className:"aurora-hero-bg"}),e.jsx("div",{className:"aurora-content",children:e.jsx("h1",{className:"h1-scalingSize","data-text":s,children:s})}),e.jsx("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",colorInterpolationFilters:"sRGB",style:{position:"absolute",opacity:0,height:0,width:0,pointerEvents:"none"},"aria-hidden":"true",focusable:"false",children:e.jsxs("filter",{id:"fluted",primitiveUnits:"objectBoundingBox",children:[e.jsx("feImage",{x:"0",y:"0",result:"image_0",crossOrigin:"anonymous",href:t,preserveAspectRatio:"none meet",width:".03",height:"1"}),e.jsx("feTile",{in:"image_0",result:"tile_0"}),e.jsx("feGaussianBlur",{stdDeviation:".0001",edgeMode:"none",in:"tile_0",result:"bar_smoothness",x:"0",y:"0"}),e.jsx("feDisplacementMap",{scale:".08",xChannelSelector:"R",yChannelSelector:"G",in:"SourceGraphic",in2:"bar_smoothness",result:"displacement_0"})]})})]})}const E=[{id:"projects",title:"Real Projects",description:"Ship 10 portfolio-ready builds — not toy tutorials. Guided steps, real scope, employer-facing outcomes.",icon:P,span:"md:col-span-2",accent:"from-teal-500/20 to-transparent"},{id:"stacks",title:"3 Stacks",description:"Frontend, Backend, or Fullstack — pick your path and go deep.",icon:B,span:"md:col-span-1",accent:"from-lime-500/20 to-transparent",cluster:!0},{id:"points",title:"Gamified Points",description:"Earn XP, unlock milestones, and stay motivated as you clear each project stage.",icon:w,span:"md:col-span-1",accent:"from-amber-500/20 to-transparent",showXp:!0},{id:"flashcards",title:"Flashcards",description:"Reinforce concepts with stack-specific cards so theory sticks while you build.",icon:v,span:"md:col-span-1",accent:"from-cyan-500/20 to-transparent"},{id:"portfolio",title:"Job-Ready Portfolio",description:"Finish with a coherent project trail that proves skills — interviews, not just certificates.",icon:G,span:"md:col-span-1",accent:"from-emerald-500/20 to-transparent",showAvatars:!0}];function M({text:s}){return u()?e.jsx("span",{children:s}):e.jsx("span",{className:"inline-flex flex-wrap","aria-label":s,children:s.split("").map((i,t)=>e.jsx(a.span,{className:"inline-block",whileHover:{y:-4},transition:{type:"spring",stiffness:500,damping:20},children:i===" "?" ":i},`${i}-${t}`))})}function A(){const s=[{Icon:z,label:"FE",tip:"Frontend"},{Icon:R,label:"BE",tip:"Backend"},{Icon:p,label:"FS",tip:"Fullstack"}];return e.jsx("div",{className:"mt-4 flex items-center gap-2",children:s.map(({Icon:r,label:i,tip:t})=>e.jsxs("div",{title:t,className:"flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-teal-300",children:[e.jsx(r,{size:18,"aria-hidden":!0}),e.jsx("span",{className:"sr-only",children:t})]},i))})}function L({className:s}){const r=u();return e.jsxs("section",{className:o("w-full",s),"aria-labelledby":"why-us-heading",children:[e.jsxs("div",{className:"mb-8 max-w-2xl",children:[e.jsx("p",{className:"mb-2 text-sm font-medium uppercase tracking-wider text-teal-400/90",children:"Why JuniorPath"}),e.jsx("h2",{id:"why-us-heading",className:"text-3xl font-bold text-white sm:text-4xl",children:"Built like a virtual internship"}),e.jsx("p",{className:"mt-3 text-gray-400",children:"Structure, stacks, and outcomes designed so juniors ship work that actually opens doors."})]}),e.jsx("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-3",children:E.map((i,t)=>{const n=i.icon;return e.jsxs(a.article,{className:o("group relative overflow-hidden rounded-xl border border-white/10 bg-[#161616] p-6",i.span),initial:r?!1:{opacity:0,y:16},whileInView:r?void 0:{opacity:1,y:0},viewport:{once:!0,margin:"-40px"},transition:{duration:.4,delay:t*.06},whileHover:r?void 0:{scale:1.02,transition:{duration:.2}},children:[e.jsx("div",{className:o("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-100",i.accent)}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lime-300",children:e.jsx(n,{size:22,"aria-hidden":!0})}),e.jsx("h3",{className:"mb-2 text-xl font-semibold text-white",children:e.jsx(M,{text:i.title})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-400",children:i.description}),i.cluster?e.jsx(A,{}):null,i.showXp&&e.jsxs("div",{className:"mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-lime-300",children:[e.jsx(N,{size:14,"aria-hidden":!0}),"+XP on every milestone"]}),i.showAvatars&&e.jsx("div",{className:"mt-4 flex -space-x-2","aria-hidden":!0,children:["JP","FE","BE"].map(l=>e.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-full border border-[#161616] bg-teal-500/30 text-[10px] font-bold text-teal-100",children:l},l))})]})]},i.id)})})]})}function X(){const{isAuthenticated:s}=k(),r=S(),i=[{id:"frontend",name:"Frontend",tech:"Next.js + TypeScript",color:"from-blue-500 to-cyan-500",projects:d("frontend")},{id:"backend",name:"Backend",tech:"Node.js + .NET",color:"from-green-500 to-emerald-500",projects:d("backend")},{id:"fullstack",name:"Fullstack",tech:"Next.js + Node.js + .NET",color:"from-purple-500 to-pink-500",projects:d("fullstack")}];return e.jsxs("div",{className:"min-h-screen bg-[#0A0A0A]",children:[e.jsxs("section",{className:"relative overflow-hidden min-h-[90vh] flex items-center justify-center",children:[e.jsx("div",{className:"absolute inset-0",children:e.jsx(C,{title:"",className:"h-full min-h-full"})}),e.jsxs("div",{className:"max-w-5xl mx-auto text-center relative z-10 px-4 pt-32 pb-20",children:[e.jsx(a.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6},children:e.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8",children:[e.jsx(I,{size:14,className:"text-purple-400"}),e.jsx("span",{className:"text-sm text-purple-300",children:"Virtual Remote Internship Platform"})]})}),e.jsxs(a.h1,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},className:"text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6",children:["Junior",e.jsx("span",{className:"text-purple-400",children:"Path"}),e.jsx("br",{}),e.jsx("span",{className:"gradient-text text-3xl sm:text-4xl md:text-5xl",children:"Build Real Projects. Become Job-Ready."})]}),e.jsx(a.p,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},className:"text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10",children:"Complete 10 portfolio-ready projects in Frontend, Backend, or Fullstack. Guided steps, points, flashcards — skills employers actually want."}),e.jsx(a.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},className:"flex flex-col sm:flex-row items-center justify-center gap-4",children:s?e.jsxs(x,{type:"button",onClick:()=>r("/dashboard"),className:"inline-flex items-center gap-2",children:["Go to Dashboard",e.jsx(h,{size:18})]}):e.jsxs(e.Fragment,{children:[e.jsxs(x,{type:"button",onClick:()=>r("/signup"),className:"inline-flex items-center gap-2",children:["Start Free — Get 50 Points",e.jsx(h,{size:18})]}),e.jsx(c,{to:"/login",className:"px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white font-semibold text-lg transition-all",children:"Login"})]})}),e.jsx(a.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto",children:[{value:"30",label:"Projects"},{value:"150",label:"Flashcards"},{value:"3",label:"Stacks"}].map(t=>e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-2xl sm:text-3xl font-bold text-white",children:t.value}),e.jsx("div",{className:"text-sm text-gray-500",children:t.label})]},t.label))})]})]}),e.jsx("section",{className:"py-20 px-4 relative z-10",children:e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsxs(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"text-center mb-10",children:[e.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-white mb-4",children:"Why JuniorPath"}),e.jsx("p",{className:"text-gray-400 text-lg max-w-2xl mx-auto",children:"Everything you need to go from junior to interview-ready."})]}),e.jsx(L,{})]})}),e.jsx("section",{className:"py-20 px-4 bg-[#0D0D0D]",children:e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsxs(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"text-center mb-16",children:[e.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-white mb-4",children:"Choose Your Path"}),e.jsx("p",{className:"text-gray-400 text-lg max-w-2xl mx-auto",children:"Every stack has a 10-project tree from beginner to advanced."})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:i.map((t,n)=>e.jsxs(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:n*.15},className:"p-6 rounded-2xl bg-[#161616] border border-white/5 hover:border-white/10 transition-all",children:[e.jsx("div",{className:`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-4`,children:e.jsx(p,{size:24,className:"text-white"})}),e.jsx("h3",{className:"text-xl font-bold text-white mb-1",children:t.name}),e.jsxs("p",{className:"text-sm text-gray-500 mb-4",children:[t.tech," · ",t.projects.length," projects"]}),e.jsx("div",{className:"relative space-y-0 pl-3",children:t.projects.map((l,f)=>e.jsxs("div",{className:"relative flex items-start gap-3 pb-4 last:pb-0",children:[f<t.projects.length-1&&e.jsx("div",{className:"absolute left-[9px] top-5 bottom-0 w-px bg-white/10"}),e.jsx("div",{className:`relative z-10 mt-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${l.difficulty==="beginner"?"bg-green-500/20 text-green-400":l.difficulty==="intermediate"?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}`,children:l.order}),e.jsx("span",{className:"text-sm text-gray-400 leading-snug",children:l.title})]},l.id))})]},t.id))})]})}),e.jsx("section",{className:"py-20 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"text-center mb-16",children:e.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-white mb-4",children:"How It Works"})}),e.jsx("div",{className:"space-y-8",children:[{step:"01",title:"Sign Up & Choose Your Stack",desc:"Create your account, get 50 bonus points, and pick Frontend, Backend, or Fullstack."},{step:"02",title:"Follow the Roadmap Tree",desc:"Projects unlock sequentially. Start beginner and climb to advanced."},{step:"03",title:"Build & Submit",desc:"Code in-browser or locally. Submit your GitHub repo and mark complete."},{step:"04",title:"Earn Points & Level Up",desc:"+100 points per project, +10 per flashcard. Track progress and build your portfolio."}].map((t,n)=>e.jsxs(a.div,{initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{delay:n*.1},className:"flex items-start gap-6",children:[e.jsx("div",{className:"flex-shrink-0 w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center",children:e.jsx("span",{className:"text-lg font-bold text-purple-400",children:t.step})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-1",children:t.title}),e.jsx("p",{className:"text-gray-400",children:t.desc})]})]},t.step))})]})}),e.jsx("section",{className:"py-20 px-4",children:e.jsxs(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-green-500/10 border border-white/5",children:[e.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-white mb-4",children:"Ready to Start Your Journey?"}),e.jsx("p",{className:"text-gray-400 text-lg mb-8",children:"Join junior developers building real projects and landing interviews."}),!s&&e.jsxs(x,{type:"button",onClick:()=>r("/signup"),className:"inline-flex items-center gap-2",children:["Get Started Free",e.jsx(F,{size:18})]})]})}),e.jsx("footer",{className:"py-8 px-4 border-t border-white/5",children:e.jsxs("div",{className:"max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(p,{size:16,className:"text-purple-400"}),e.jsx("span",{className:"text-sm text-gray-500",children:"JuniorPath © 2026. Built for developers, by developers."})]}),e.jsxs("div",{className:"flex items-center gap-4 text-sm text-gray-500",children:[e.jsx(c,{to:"/suggest",className:"hover:text-white transition-colors",children:"Suggest a Project"}),e.jsx(c,{to:"/snake",className:"hover:text-white transition-colors",children:"Snake Game"})]})]})})]})}export{X as default};
