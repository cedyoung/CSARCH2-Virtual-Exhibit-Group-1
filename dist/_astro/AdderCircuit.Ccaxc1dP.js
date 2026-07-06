import{j as e}from"./jsx-runtime.u17CrQMm.js";import{a as c}from"./index.UEuQJ2Tp.js";const p=4,y=260;function h(a){return a.reduce((l,s,t)=>l+(s<<t),0)}function B(a,l,s){const t=a.map((d,i)=>d&l[i]),o=a.map((d,i)=>d^l[i]),m=[s];for(let d=0;d<p;d++)m.push(t[d]|o[d]&m[d]);const n=o.map((d,i)=>d^m[i]);return{g:t,p:o,c:m,sum:n}}function f({bit:a,index:l,onToggle:s,label:t}){return e.jsx("button",{type:"button",className:"adder__bit","data-on":a===1,"aria-pressed":a===1,"aria-label":`${t} bit ${l}, currently ${a}`,onClick:s,children:a})}function M(){const[a,l]=c.useState([1,0,1,0]),[s,t]=c.useState([1,1,0,0]),[o,m]=c.useState(0),[n,d]=c.useState("ripple"),[i,u]=c.useState(-1),_=c.useRef([]),{g:N,p:w,c:x,sum:b}=c.useMemo(()=>B(a,s,o),[a,s,o]),k=h(a),S=h(s),z=h(b)+(x[p]<<p);c.useEffect(()=>{if(_.current.forEach(clearTimeout),_.current=[],u(-1),n==="ripple")for(let r=0;r<=p;r++){const v=setTimeout(()=>u(r),(r+1)*y);_.current.push(v)}else{const r=setTimeout(()=>u(p),y);_.current.push(r)}return()=>_.current.forEach(clearTimeout)},[a,s,o,n]);const g=r=>v=>{r(T=>T.map((j,A)=>A===v?j?0:1:j))},C=n==="ripple"?p*2:4;return e.jsxs("div",{className:"adder",children:[e.jsxs("div",{className:"adder__controls",children:[e.jsxs("div",{className:"adder__operand",children:[e.jsx("span",{className:"adder__row-label",children:"A"}),e.jsx("div",{className:"adder__bits",children:[3,2,1,0].map(r=>e.jsx(f,{bit:a[r],index:r,label:"A",onToggle:()=>g(l)(r)},r))}),e.jsxs("span",{className:"adder__decimal mono-value",children:["= ",k]})]}),e.jsxs("div",{className:"adder__operand",children:[e.jsx("span",{className:"adder__row-label",children:"B"}),e.jsx("div",{className:"adder__bits",children:[3,2,1,0].map(r=>e.jsx(f,{bit:s[r],index:r,label:"B",onToggle:()=>g(t)(r)},r))}),e.jsxs("span",{className:"adder__decimal mono-value",children:["= ",S]})]}),e.jsxs("div",{className:"adder__cin",children:[e.jsx("span",{className:"adder__row-label",children:"C-in"}),e.jsx(f,{bit:o,index:0,label:"Carry-in",onToggle:()=>m(r=>r?0:1)})]}),e.jsxs("div",{className:"adder__mode",role:"group","aria-label":"Adder circuit type",children:[e.jsx("button",{type:"button",className:"adder__modebtn","data-active":n==="ripple",onClick:()=>d("ripple"),children:"Ripple-carry"}),e.jsx("button",{type:"button",className:"adder__modebtn","data-active":n==="lookahead",onClick:()=>d("lookahead"),children:"Carry-lookahead"})]})]}),e.jsxs("div",{className:"adder__chain",children:[e.jsxs("div",{className:`adder__carrynode ${i>=0?"is-settled":""}`,children:[e.jsx("span",{className:"adder__carrybit mono-value","data-on":o===1,children:o}),e.jsx("span",{className:"adder__carrylabel",children:"c0"})]}),[0,1,2,3].map(r=>e.jsxs("div",{className:"adder__stage",children:[e.jsx("div",{className:`adder__wire ${i>=r?"is-live":""}`,"aria-hidden":"true"}),e.jsxs("div",{className:"adder__fa",children:[e.jsxs("span",{className:"adder__fa-label mono-value",children:["FA",r]}),e.jsxs("span",{className:"adder__gp mono-value",children:["G=",N[r]," P=",w[r]]}),e.jsxs("span",{className:"adder__sumbit mono-value",children:["S",r,"=",b[r]]})]}),e.jsx("div",{className:`adder__wire adder__wire--out ${i>=r+1?"is-live":""}`,"aria-hidden":"true"}),e.jsxs("div",{className:`adder__carrynode ${i>=r+1?"is-settled":""}`,children:[e.jsx("span",{className:"adder__carrybit mono-value","data-on":x[r+1]===1,children:i>=r+1?x[r+1]:"?"}),e.jsxs("span",{className:"adder__carrylabel",children:["c",r+1]})]})]},r))]}),e.jsxs("div",{className:"adder__result",children:[e.jsxs("div",{children:[e.jsx("span",{className:"adder__row-label",children:"SUM"})," ",e.jsx("span",{className:"mono-value",children:b.slice().reverse().join("")})," ",e.jsxs("span",{className:"adder__decimal mono-value",children:["= ",z]})]}),e.jsxs("div",{className:"adder__timing",children:[e.jsx("span",{className:"eyebrow",children:"Simplified gate-delay estimate"})," ",e.jsxs("span",{className:"mono-value",children:["~",C]}),n==="ripple"&&e.jsx("span",{className:"adder__timing-note",children:" — grows with word width"}),n==="lookahead"&&e.jsx("span",{className:"adder__timing-note",children:" — flat, regardless of word width"})]})]}),e.jsx("style",{children:`
        .adder {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }
        .adder__controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.75rem;
        }
        .adder__operand,
        .adder__cin {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .adder__row-label {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--paper-dim);
          width: 2.4em;
        }
        .adder__bits {
          display: flex;
          gap: 0.3rem;
        }
        .adder__bit {
          width: 1.9rem;
          height: 1.9rem;
          border-radius: var(--radius);
          border: 1px solid var(--border-strong);
          background: var(--bg);
          color: var(--paper-dim);
          font-family: var(--font-mono);
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
        }
        .adder__bit[data-on='true'] {
          background: var(--trace-dim);
          border-color: var(--trace);
          color: var(--trace);
        }
        .adder__decimal {
          font-size: 0.78rem;
          color: var(--paper-dim);
        }
        .adder__mode {
          display: flex;
          gap: 0.4rem;
          margin-left: auto;
        }
        .adder__modebtn {
          padding: 0.4rem 0.7rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.03em;
          background: var(--bg);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius);
          color: var(--paper-dim);
          cursor: pointer;
        }
        .adder__modebtn[data-active='true'] {
          background: var(--trace-dim);
          border-color: var(--trace);
          color: var(--trace);
        }

        .adder__chain {
          display: flex;
          align-items: center;
          overflow-x: auto;
          padding-block: 0.5rem;
        }
        .adder__stage {
          display: flex;
          align-items: center;
          flex: 1 0 auto;
        }
        .adder__wire {
          width: 1.5rem;
          height: 2px;
          background: var(--border-strong);
          transition: background 0.2s ease;
        }
        .adder__wire.is-live {
          background: var(--trace);
        }
        .adder__fa {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          padding: 0.7rem 0.8rem;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius);
          background: var(--panel-raised);
          min-width: 5.5rem;
        }
        .adder__fa-label {
          font-size: 0.85rem;
          color: var(--paper);
        }
        .adder__gp,
        .adder__sumbit {
          font-size: 0.72rem;
          color: var(--paper-dim);
        }
        .adder__carrynode {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
          opacity: 0.4;
          transition: opacity 0.2s ease;
        }
        .adder__carrynode.is-settled {
          opacity: 1;
        }
        .adder__carrybit {
          width: 1.7rem;
          height: 1.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border-strong);
          font-size: 0.8rem;
          color: var(--paper-dim);
        }
        .adder__carrybit[data-on='true'] {
          border-color: var(--carry);
          color: var(--carry);
          box-shadow: 0 0 6px var(--carry);
        }
        .adder__carrylabel {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--paper-dim);
        }

        .adder__result {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1rem;
          border-top: 1px solid var(--border);
          padding-top: 1rem;
          font-size: 0.85rem;
        }
        .adder__timing-note {
          color: var(--paper-dim);
          font-size: 0.78rem;
        }

        @media (max-width: 640px) {
          .adder__mode {
            margin-left: 0;
          }
        }
      `})]})}export{M as default};
