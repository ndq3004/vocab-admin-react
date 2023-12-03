(self.webpackChunkadmin_dashboard_template_dashwind=self.webpackChunkadmin_dashboard_template_dashwind||[]).push([[835],{5835:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return j}});var d=t(2791),n=t(9434),i=t(5054),r=t(2982),s=t(885),m=t(9453),o=t.n(m),l=t(6644),c=t.n(l),f=t(2426),h=t.n(f),u=t(5014),g=t(184),y=u.CALENDAR_EVENT_STYLE;var v=function(e){var a=e.calendarEvents,t=e.addNewEvent,n=e.openDayDetail,i=h()().startOf("day"),r=["","col-start-2","col-start-3","col-start-4","col-start-5","col-start-6","col-start-7"],m=(0,d.useState)(h()().startOf("month")),l=(0,s.Z)(m,2),f=l[0],u=l[1],v=(0,d.useState)([]),p=(0,s.Z)(v,2),O=p[0],x=p[1],E=(0,d.useState)((function(){return h()(i).format("MMM-yyyy")})),w=(0,s.Z)(E,2),j=(w[0],w[1]);(0,d.useEffect)((function(){x(a)}),[a]);var T=function(e){var a=O.filter((function(a){return h()(e).isSame(h()(a.startTime),"day")}));if(a.length>2){var t=a.length;(a=a.slice(0,2)).push({title:"".concat(t-2," more"),theme:"MORE"})}return a},b=function(e){return h()(e).month()!=h()(f).month()};return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)("div",{className:"w-full  bg-base-100 p-4 rounded-lg",children:[(0,g.jsxs)("div",{className:"flex items-center justify-between",children:[(0,g.jsxs)("div",{className:"flex  justify-normal gap-2 sm:gap-4",children:[(0,g.jsxs)("p",{className:"font-semibold text-xl w-48",children:[h()(f).format("MMMM yyyy").toString(),(0,g.jsx)("span",{className:"text-xs ml-2 ",children:"Beta"})]}),(0,g.jsx)("button",{className:"btn  btn-square btn-sm btn-ghost",onClick:function(e){var a=h()(f).add(-1,"M").startOf("month");u(a),j(h()(a).format("MMM-yyyy"))},children:(0,g.jsx)(o(),{className:"w-5 h-5"})}),(0,g.jsx)("button",{className:"btn  btn-sm btn-ghost normal-case",onClick:function(e){var a=h()().startOf("month");u(a),j(h()(a).format("MMM-yyyy"))},children:"Current Month"}),(0,g.jsx)("button",{className:"btn btn-square btn-sm btn-ghost",onClick:function(e){var a=h()(f).add(1,"M").startOf("month");u(a),j(h()(a).format("MMM-yyyy"))},children:(0,g.jsx)(c(),{className:"w-5 h-5"})})]}),(0,g.jsx)("div",{children:(0,g.jsx)("button",{className:"btn  btn-sm btn-ghost btn-outline normal-case",onClick:t,children:"Add New Event"})})]}),(0,g.jsx)("div",{className:"my-4 divider"}),(0,g.jsx)("div",{className:"grid grid-cols-7 gap-6 sm:gap-12 place-items-center",children:["sun","mon","tue","wed","thu","fri","sat"].map((function(e,a){return(0,g.jsx)("div",{className:"text-xs capitalize",children:e},a)}))}),(0,g.jsx)("div",{className:"grid grid-cols-7 mt-1  place-items-center",children:function(){for(var e=h()(f).startOf("week"),a=h()(h()(f).endOf("month")).endOf("week"),t=[],d=e;d<=a;)t.push(d.toDate()),d=d.clone().add(1,"d");return t}().map((function(e,a){return(0,g.jsxs)("div",{className:r[h()(e).day().toString()]+" border border-solid w-full h-28  ",children:[(0,g.jsxs)("p",{className:"inline-block flex items-center  justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ".concat((d=e,h()(d).isSame(h()(),"day")&&" bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white")," ").concat(b(e)&&" text-slate-400 dark:text-slate-600"),onClick:function(){return t(e)},children:[" ",h()(e).format("D")]}),T(e).map((function(a,t){return(0,g.jsx)("p",{onClick:function(){return function(e,a){if("MORE"!=a)return 1;var t=O.filter((function(a){return h()(e).isSame(h()(a.startTime),"day")})).map((function(e){return{title:e.title,theme:e.theme}}));n({filteredEvents:t,title:h()(e).format("D MMM YYYY")})}(e,a.theme)},className:"text-xs px-2 mt-1 truncate  ".concat(y[a.theme]||""),children:a.title},t)}))]},a);var d}))})]})})},p=t(1546),O=t(6084),x=t(9313),E=p.CALENDAR_INITIAL_EVENTS;var w=function(){var e=(0,n.I0)(),a=(0,d.useState)(E),t=(0,s.Z)(a,2),m=t[0],o=t[1];return(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(v,{calendarEvents:m,addNewEvent:function(a){var t=E[Math.floor(10*Math.random())],d={title:t.title,theme:t.theme,startTime:h()(a).startOf("day"),endTime:h()(a).endOf("day")};o([].concat((0,r.Z)(m),[d])),e((0,i.c0)({message:"New Event Added!",status:1}))},openDayDetail:function(a){var t=a.filteredEvents,d=a.title;e((0,O.Q3)({header:d,bodyType:x.RIGHT_DRAWER_TYPES.CALENDAR_EVENTS,extraObject:{filteredEvents:t}}))}})})};var j=function(){var e=(0,n.I0)();return(0,d.useEffect)((function(){e((0,i.Iw)({title:"Calendar"}))}),[]),(0,g.jsx)(w,{})}},1546:function(e,a,t){var d=t(2426);e.exports=Object.freeze({CALENDAR_INITIAL_EVENTS:[{title:"Product call",theme:"GREEN",startTime:d().add(-12,"d").startOf("day"),endTime:d().add(-12,"d").endOf("day")},{title:"Meeting with tech team",theme:"PINK",startTime:d().add(-8,"d").startOf("day"),endTime:d().add(-8,"d").endOf("day")},{title:"Meeting with Cristina",theme:"PURPLE",startTime:d().add(-2,"d").startOf("day"),endTime:d().add(-2,"d").endOf("day")},{title:"Meeting with Alex",theme:"BLUE",startTime:d().startOf("day"),endTime:d().endOf("day")},{title:"Product Call",theme:"GREEN",startTime:d().startOf("day"),endTime:d().endOf("day")},{title:"Client Meeting",theme:"PURPLE",startTime:d().startOf("day"),endTime:d().endOf("day")},{title:"Client Meeting",theme:"ORANGE",startTime:d().add(3,"d").startOf("day"),endTime:d().add(3,"d").endOf("day")},{title:"Product meeting",theme:"PINK",startTime:d().add(5,"d").startOf("day"),endTime:d().add(5,"d").endOf("day")},{title:"Sales Meeting",theme:"GREEN",startTime:d().add(8,"d").startOf("day"),endTime:d().add(8,"d").endOf("day")},{title:"Product Meeting",theme:"ORANGE",startTime:d().add(8,"d").startOf("day"),endTime:d().add(8,"d").endOf("day")},{title:"Marketing Meeting",theme:"PINK",startTime:d().add(8,"d").startOf("day"),endTime:d().add(8,"d").endOf("day")},{title:"Client Meeting",theme:"GREEN",startTime:d().add(8,"d").startOf("day"),endTime:d().add(8,"d").endOf("day")},{title:"Sales meeting",theme:"BLUE",startTime:d().add(12,"d").startOf("day"),endTime:d().add(12,"d").endOf("day")},{title:"Client meeting",theme:"PURPLE",startTime:d().add(16,"d").startOf("day"),endTime:d().add(16,"d").endOf("day")}],RECENT_TRANSACTIONS:[{name:"Alex",avatar:"https://reqres.in/img/faces/1-image.jpg",email:"alex@dashwind.com",location:"Paris",amount:100,date:d().endOf("day")},{name:"Ereena",avatar:"https://reqres.in/img/faces/2-image.jpg",email:"ereena@dashwind.com",location:"London",amount:190,date:d().add(-1,"d").endOf("day")},{name:"John",avatar:"https://reqres.in/img/faces/3-image.jpg",email:"jhon@dashwind.com",location:"Canada",amount:112,date:d().add(-1,"d").endOf("day")},{name:"Matrix",avatar:"https://reqres.in/img/faces/4-image.jpg",email:"matrix@dashwind.com",location:"Peru",amount:111,date:d().add(-1,"d").endOf("day")},{name:"Virat",avatar:"https://reqres.in/img/faces/5-image.jpg",email:"virat@dashwind.com",location:"London",amount:190,date:d().add(-2,"d").endOf("day")},{name:"Miya",avatar:"https://reqres.in/img/faces/6-image.jpg",email:"miya@dashwind.com",location:"Paris",amount:230,date:d().add(-2,"d").endOf("day")},{name:"Virat",avatar:"https://reqres.in/img/faces/3-image.jpg",email:"virat@dashwind.com",location:"Canada",amount:331,date:d().add(-2,"d").endOf("day")},{name:"Matrix",avatar:"https://reqres.in/img/faces/1-image.jpg",email:"matrix@dashwind.com",location:"London",amount:581,date:d().add(-2,"d").endOf("day")},{name:"Ereena",avatar:"https://reqres.in/img/faces/3-image.jpg",email:"ereena@dashwind.com",location:"Tokyo",amount:151,date:d().add(-2,"d").endOf("day")},{name:"John",avatar:"https://reqres.in/img/faces/2-image.jpg",email:"jhon@dashwind.com",location:"Paris",amount:91,date:d().add(-2,"d").endOf("day")},{name:"Virat",avatar:"https://reqres.in/img/faces/3-image.jpg",email:"virat@dashwind.com",location:"Canada",amount:161,date:d().add(-3,"d").endOf("day")},{name:"Matrix",avatar:"https://reqres.in/img/faces/4-image.jpg",email:"matrix@dashwind.com",location:"US",amount:121,date:d().add(-3,"d").endOf("day")},{name:"Ereena",avatar:"https://reqres.in/img/faces/6-image.jpg",email:"jhon@dashwind.com",location:"Tokyo",amount:713,date:d().add(-3,"d").endOf("day")},{name:"John",avatar:"https://reqres.in/img/faces/2-image.jpg",email:"ereena@dashwind.com",location:"London",amount:217,date:d().add(-3,"d").endOf("day")},{name:"Virat",avatar:"https://reqres.in/img/faces/3-image.jpg",email:"virat@dashwind.com",location:"Paris",amount:117,date:d().add(-3,"d").endOf("day")},{name:"Miya",avatar:"https://reqres.in/img/faces/7-image.jpg",email:"jhon@dashwind.com",location:"Canada",amount:612,date:d().add(-3,"d").endOf("day")},{name:"Matrix",avatar:"https://reqres.in/img/faces/3-image.jpg",email:"matrix@dashwind.com",location:"London",amount:631,date:d().add(-3,"d").endOf("day")},{name:"Virat",avatar:"https://reqres.in/img/faces/2-image.jpg",email:"ereena@dashwind.com",location:"Tokyo",amount:151,date:d().add(-3,"d").endOf("day")},{name:"Ereena",avatar:"https://reqres.in/img/faces/3-image.jpg",email:"virat@dashwind.com",location:"Paris",amount:617,date:d().add(-3,"d").endOf("day")}]})},9453:function(e,a,t){var d=t(215).default,n=["title","titleId"],i=t(2791);var r=i.forwardRef((function(e,a){var t=e.title,r=e.titleId,s=d(e,n);return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:a,"aria-labelledby":r},s),t?i.createElement("title",{id:r},t):null,i.createElement("path",{fillRule:"evenodd",d:"M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z",clipRule:"evenodd"}))}));e.exports=r},6644:function(e,a,t){var d=t(215).default,n=["title","titleId"],i=t(2791);var r=i.forwardRef((function(e,a){var t=e.title,r=e.titleId,s=d(e,n);return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:a,"aria-labelledby":r},s),t?i.createElement("title",{id:r},t):null,i.createElement("path",{fillRule:"evenodd",d:"M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z",clipRule:"evenodd"}))}));e.exports=r}}]);
//# sourceMappingURL=835.34510cd2.chunk.js.map