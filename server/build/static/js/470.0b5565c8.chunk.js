(self.webpackChunkadmin_dashboard_template_dashwind=self.webpackChunkadmin_dashboard_template_dashwind||[]).push([[470],{2782:function(e,t,n){"use strict";var r=n(3547),i=n(184);t.Z=function(e){var t=e.title,n=e.children,a=e.topMargin,l=e.TopSideButtons;return(0,i.jsxs)("div",{className:"card w-full p-6 bg-base-100 shadow-xl "+(a||"mt-6"),children:[(0,i.jsxs)(r.Z,{styleClass:l?"inline-block":"",children:[t,l&&(0,i.jsx)("div",{className:"inline-block float-right",children:l})]}),(0,i.jsx)("div",{className:"divider mt-2"}),(0,i.jsx)("div",{className:"h-full w-full pb-6 bg-base-100",children:n})]})}},3547:function(e,t,n){"use strict";var r=n(184);t.Z=function(e){var t=e.styleClass,n=e.children;return(0,r.jsx)("div",{className:"text-xl font-semibold ".concat(t),children:n})}},4470:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return I}});var r=n(2791),i=n(9434),a=n(5054),l=n(1413),s=n(2782),o=n(8060),c=n(9313),d=n(6316),u=(n(2426),n(5217)),h=n.n(u),v=n(4120),m=n.n(v),f=n(6235),b=n.n(f),w=n(1312),x=n.n(w),j=n(3403),p=n.n(j),g=n(9481),k=n.n(g),L=n(3503),E=n.n(L),N=n(184),C=function(e){var t=e.refreshList,n=e.downloadBackup,r=(0,i.I0)();return(0,N.jsxs)("div",{className:"inline-block float-right",children:[(0,N.jsx)("button",{className:"btn btn-ghost",onClick:n,children:(0,N.jsx)(E(),{className:"w-5"})}),(0,N.jsx)("button",{className:"btn btn-ghost",onClick:t,children:(0,N.jsx)(k(),{className:"w-5"})}),(0,N.jsx)("button",{className:"btn px-6 btn-sm normal-case btn-primary",onClick:function(){r((0,o.h7)({title:"Add new vocab",bodyType:c.MODAL_BODY_TYPES.VOCAB_ADD_NEW}))},children:"Add New"})]})};var _=function(){var e=(0,i.v9)((function(e){return e.vocab})).vocabs,t=(0,i.I0)();return(0,r.useEffect)((function(){t((0,d.tn)())}),[]),(0,N.jsx)(s.Z,{title:"Vocab List",topMargin:"mt-2",TopSideButtons:(0,N.jsx)(C,{refreshList:function(){t((0,d.tn)())},downloadBackup:function(){t((0,d.D$)())}}),children:(0,N.jsx)("div",{className:"overflow-x-auto w-full",children:(0,N.jsxs)("table",{className:"table w-full",children:[(0,N.jsx)("thead",{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("th",{children:"Word"}),(0,N.jsx)("th",{children:"Type"}),(0,N.jsx)("th",{children:"meaning"}),(0,N.jsx)("th",{children:"Review count"}),(0,N.jsx)("th",{className:"text-center",children:"View more"}),(0,N.jsx)("th",{})]})}),(0,N.jsx)("tbody",{children:e&&e.length>0&&e.map((function(e,n){return(0,N.jsxs)("tr",{id:e._id,children:[(0,N.jsx)("td",{children:e.word}),(0,N.jsx)("td",{children:e.word_type}),(0,N.jsx)("td",{children:(r=e.meaning,r.length>60?r.slice(0,40)+"...":r)}),(0,N.jsxs)("td",{children:[(0,N.jsx)("span",{className:"mr-2",children:e.review_count}),(0,N.jsx)("button",{className:"btn btn-square btn-ghost w-6",onClick:function(){var n;(n=e)&&t((0,d.gf)({vocabObj:(0,l.Z)((0,l.Z)({},n),{},{review_count:n.review_count-1})}))},children:(0,N.jsx)(x(),{})}),(0,N.jsx)("button",{className:"btn btn-square btn-ghost w-6",onClick:function(){var n;(n=e)&&t((0,d.gf)({vocabObj:(0,l.Z)((0,l.Z)({},n),{},{review_count:n.review_count+1})}))},children:(0,N.jsx)(b(),{})})]}),(0,N.jsx)("td",{className:"text-center",children:(0,N.jsx)("button",{className:"btn btn-square btn-ghost w-6",onClick:function(){return n=e,void t((0,o.h7)({title:"View vocab",bodyType:c.MODAL_BODY_TYPES.VOCAB_VIEW,extraObject:n}));var n},children:(0,N.jsx)(p(),{})})}),(0,N.jsxs)("td",{children:[(0,N.jsx)("button",{className:"btn btn-square btn-ghost",onClick:function(){return n=e,void t((0,o.h7)({title:"Add new vocab",bodyType:c.MODAL_BODY_TYPES.VOCAB_EDIT,extraObject:n}));var n},children:(0,N.jsx)(m(),{className:"w-5"})}),(0,N.jsx)("button",{className:"btn btn-square btn-ghost",onClick:function(){return n=e,void t((0,d.Lo)(n));var n},children:(0,N.jsx)(h(),{className:"w-5"})})]})]},n);var r}))})]})})})};var I=function(){var e=(0,i.I0)();return(0,r.useEffect)((function(){var t=window.screen.width<1250?"Vocabs mobile":"Vocabs";e(e((0,a.Iw)({title:t})))}),[]),(0,N.jsx)(_,{})}},9481:function(e,t,n){var r=n(215).default,i=["title","titleId"],a=n(2791);var l=a.forwardRef((function(e,t){var n=e.title,l=e.titleId,s=r(e,i);return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}))}));e.exports=l},3403:function(e,t,n){var r=n(215).default,i=["title","titleId"],a=n(2791);var l=a.forwardRef((function(e,t){var n=e.title,l=e.titleId,s=r(e,i);return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"}))}));e.exports=l},3503:function(e,t,n){var r=n(215).default,i=["title","titleId"],a=n(2791);var l=a.forwardRef((function(e,t){var n=e.title,l=e.titleId,s=r(e,i);return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"}))}));e.exports=l},1312:function(e,t,n){var r=n(215).default,i=["title","titleId"],a=n(2791);var l=a.forwardRef((function(e,t){var n=e.title,l=e.titleId,s=r(e,i);return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"}))}));e.exports=l},4120:function(e,t,n){var r=n(215).default,i=["title","titleId"],a=n(2791);var l=a.forwardRef((function(e,t){var n=e.title,l=e.titleId,s=r(e,i);return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"}))}));e.exports=l},6235:function(e,t,n){var r=n(215).default,i=["title","titleId"],a=n(2791);var l=a.forwardRef((function(e,t){var n=e.title,l=e.titleId,s=r(e,i);return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"}))}));e.exports=l},5217:function(e,t,n){var r=n(215).default,i=["title","titleId"],a=n(2791);var l=a.forwardRef((function(e,t){var n=e.title,l=e.titleId,s=r(e,i);return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"}))}));e.exports=l}}]);
//# sourceMappingURL=470.0b5565c8.chunk.js.map