import{j as a}from"./jsx-runtime.u17CrQMm.js";import{a as u}from"./index.UEuQJ2Tp.js";const f=[{id:"ADD",label:"ADD",symbol:"+",category:"arithmetic"},{id:"SUB",label:"SUB",symbol:"−",category:"arithmetic"},{id:"AND",label:"AND",symbol:"∧",category:"logic"},{id:"OR",label:"OR",symbol:"∨",category:"logic"},{id:"XOR",label:"XOR",symbol:"⊕",category:"logic"},{id:"NOT",label:"NOT",symbol:"¬",category:"logic"},{id:"SHL",label:"SHL",symbol:"≪",category:"shift"},{id:"SHR",label:"SHR",symbol:"≫",category:"shift"}],_=15;function b(e){return e.reduce((o,t)=>o<<1|t,0)}function A(e){return[3,2,1,0].map(o=>e>>o&1)}function g(e){return e>=8?e-16:e}function O(e,o,t){const r=b(o),s=b(t);let i=0,n=!1,d=!1;switch(e){case"ADD":{const m=r+s;i=m&_,n=m>_;const c=g(r)+g(s);d=c<-8||c>7;break}case"SUB":{i=r-s&_,n=r>=s;const c=g(r)-g(s);d=c<-8||c>7;break}case"AND":i=r&s;break;case"OR":i=r|s;break;case"XOR":i=r^s;break;case"NOT":i=~r&_;break;case"SHL":i=r<<1&_,n=(r&8)!==0;break;case"SHR":i=r>>1,n=(r&1)!==0;break;default:i=0}return{resultBits:A(i),flags:{Z:i===0,C:n,N:(i&8)!==0,V:d}}}function R({bit:e,index:o,disabled:t,onToggle:r,groupLabel:s}){return a.jsx("button",{type:"button",className:"alu-sim__bit","data-on":e===1,disabled:t,"aria-pressed":e===1,"aria-label":`${s} bit ${o}, currently ${e}`,onClick:r,children:e})}function y({label:e,bits:o,disabled:t,onToggleBit:r}){return a.jsxs("div",{className:"alu-sim__row",children:[a.jsx("span",{className:"alu-sim__row-label",children:e}),a.jsx("div",{className:"alu-sim__bits",role:"group","aria-label":`${e} input bits`,children:o.map((s,i)=>a.jsx(R,{bit:s,index:3-i,disabled:t,groupLabel:e,onToggle:()=>r(i)},i))})]})}function L(){const[e,o]=u.useState([0,1,0,1]),[t,r]=u.useState([0,0,1,1]),[s,i]=u.useState("ADD"),[n,d]=u.useState(!1),m=f.find(l=>l.id===s)??f[0],c=s==="NOT",{resultBits:v,flags:j}=u.useMemo(()=>O(s,e,t),[s,e,t]);u.useEffect(()=>{d(!0);const l=setTimeout(()=>d(!1),500);return()=>clearTimeout(l)},[s,e,t]);const x=l=>p=>{l(S=>S.map((h,B)=>B===p?h?0:1:h))},N=b(e),k=b(t),w=b(v);return a.jsxs("div",{className:"alu-sim",children:[a.jsxs("div",{className:"alu-sim__panel",children:[a.jsxs("div",{className:"alu-sim__operands",children:[a.jsx(y,{label:"A",bits:e,disabled:!1,onToggleBit:x(o)}),a.jsxs("div",{className:"alu-sim__decimal mono-value",children:["= ",N]}),a.jsx(y,{label:"B",bits:t,disabled:c,onToggleBit:x(r)}),a.jsx("div",{className:"alu-sim__decimal mono-value",children:c?"— unused for NOT":`= ${k}`})]}),a.jsx("div",{className:"alu-sim__opcodes",role:"group","aria-label":"Select ALU operation",children:f.map(l=>a.jsx("button",{type:"button",className:"alu-sim__opbtn","data-active":l.id===s,"data-category":l.category,"aria-pressed":l.id===s,onClick:()=>i(l.id),children:l.label},l.id))})]}),a.jsx("div",{className:`alu-sim__trace ${n?"is-active":""}`,"aria-hidden":"true",children:a.jsx("svg",{viewBox:"0 0 40 120",preserveAspectRatio:"none",children:a.jsx("path",{d:"M 20 0 V 120"})})}),a.jsxs("div",{className:"alu-sim__core",children:[a.jsx("span",{className:"alu-sim__core-op mono-value",children:m.symbol}),a.jsx("span",{className:"eyebrow",children:m.label})]}),a.jsx("div",{className:`alu-sim__trace ${n?"is-active":""}`,"aria-hidden":"true",children:a.jsx("svg",{viewBox:"0 0 40 120",preserveAspectRatio:"none",children:a.jsx("path",{d:"M 20 0 V 120"})})}),a.jsxs("div",{className:"alu-sim__readout",children:[a.jsxs("div",{className:"alu-sim__result",children:[a.jsx("span",{className:"alu-sim__row-label",children:"RESULT"}),a.jsx("div",{className:"alu-sim__bits alu-sim__bits--result",children:v.map((l,p)=>a.jsx("span",{className:"alu-sim__bit alu-sim__bit--readonly","data-on":l===1,children:l},p))}),a.jsxs("div",{className:"alu-sim__decimal mono-value",children:["= ",w]})]}),a.jsx("div",{className:"alu-sim__flags",role:"group","aria-label":"Status flags",children:Object.entries(j).map(([l,p])=>a.jsxs("div",{className:"alu-sim__flag",children:[a.jsx("span",{className:"alu-sim__led","data-on":p}),a.jsx("span",{className:"alu-sim__flag-label mono-value",children:l})]},l))})]}),a.jsx("style",{children:`
        .alu-sim {
          display: grid;
          grid-template-columns: 1fr auto auto auto 1fr;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow-x: auto;
        }
        .alu-sim__panel {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .alu-sim__row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .alu-sim__row-label {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--paper-dim);
          width: 1.4em;
        }
        .alu-sim__bits {
          display: flex;
          gap: 0.35rem;
        }
        .alu-sim__bits--result {
          gap: 0.35rem;
        }
        .alu-sim__bit {
          width: 2.1rem;
          height: 2.1rem;
          border-radius: var(--radius);
          border: 1px solid var(--border-strong);
          background: var(--bg);
          color: var(--paper-dim);
          font-family: var(--font-mono);
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
        }
        .alu-sim__bit:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .alu-sim__bit[data-on='true'] {
          background: var(--trace-dim);
          border-color: var(--trace);
          color: var(--trace);
        }
        .alu-sim__bit--readonly {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: default;
        }
        .alu-sim__decimal {
          font-size: 0.78rem;
          color: var(--paper-dim);
          margin-left: 2.15rem;
        }
        .alu-sim__opcodes {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.4rem;
        }
        .alu-sim__opbtn {
          padding: 0.45rem 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          background: var(--bg);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius);
          color: var(--paper-dim);
          cursor: pointer;
        }
        .alu-sim__opbtn[data-active='true'] {
          background: var(--trace-dim);
          border-color: var(--trace);
          color: var(--trace);
        }
        .alu-sim__trace {
          width: 24px;
          height: 100%;
          min-height: 140px;
        }
        .alu-sim__trace svg {
          width: 100%;
          height: 100%;
        }
        .alu-sim__trace path {
          fill: none;
          stroke: var(--border-strong);
          stroke-width: 2;
          transition: stroke 0.3s ease;
        }
        .alu-sim__trace.is-active path {
          stroke: var(--trace);
        }
        .alu-sim__core {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 1.25rem 1rem;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius);
          background: var(--panel-raised);
        }
        .alu-sim__core-op {
          font-size: 1.8rem;
          color: var(--trace);
        }
        .alu-sim__readout {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .alu-sim__flags {
          display: flex;
          gap: 1rem;
        }
        .alu-sim__flag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .alu-sim__led {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background: var(--border-strong);
          display: inline-block;
        }
        .alu-sim__led[data-on='true'] {
          background: var(--carry);
          box-shadow: 0 0 6px var(--carry);
        }
        .alu-sim__flag-label {
          font-size: 0.78rem;
          color: var(--paper-dim);
        }

        @media (max-width: 860px) {
          .alu-sim {
            grid-template-columns: 1fr;
          }
          .alu-sim__trace {
            width: 100%;
            height: 24px;
            transform: rotate(90deg);
            min-height: unset;
          }
        }
      `})]})}export{L as default};
