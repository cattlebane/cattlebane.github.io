(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{512:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return n(8953)}])},4855:function(e,a,n){"use strict";var r=n(5893),t=n(4094),s=n(1844),c=n.n(s);a.Z=function(e){var a=e.basics,n=(a.name,a.label),s=a.image,i=a.headline,l=a.summary;return(0,r.jsx)(t.Z,{className:c().bioCard,children:(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{className:c().headline,children:[(0,r.jsx)("img",{src:s||"",alt:"hero image",style:{width:"100px"}}),(0,r.jsxs)("div",{className:c().copyBlock,children:[(0,r.jsx)("h2",{children:n||""}),(0,r.jsx)("h3",{children:i||""})]})]}),(0,r.jsx)("li",{}),(0,r.jsx)("li",{children:(0,r.jsx)("p",{children:l||""})})]})})}},4094:function(e,a,n){"use strict";var r=n(5893),t=n(6118),s=n.n(t);a.Z=function(e){return(0,r.jsx)("div",{className:"".concat(s().card," ").concat(e.className),children:e.children})}},2292:function(e,a,n){"use strict";var r=n(5893),t=n(7226),s=n.n(t);a.Z=function(e){return(0,r.jsxs)("main",{className:"".concat(s().page," ").concat(e.className),children:[e.title?(0,r.jsx)("h1",{className:s()["page-headline"],children:e.title}):"",e.children]})}},8953:function(e,a,n){"use strict";n.r(a),n.d(a,{default:function(){return j}});var r=n(4051),t=n.n(r),s=n(5893),c=n(9008),i=n.n(c),l=n(7294),o=n(2292),d=n(9669),u=n(4094),h=n(4855),_=n(1844),x=n.n(_),f=n(1403),m=n.n(f);n(7246);function p(e,a,n,r,t,s,c){try{var i=e[s](c),l=i.value}catch(o){return void n(o)}i.done?a(l):Promise.resolve(l).then(r,t)}function j(){var e=(0,l.useContext)(d.Z),a=(0,l.useState)(null),n=a[0],r=a[1],c=(0,l.useState)(null),_=c[0],f=c[1],j=(0,l.useState)(null),v=(j[0],j[1]),g=(0,l.useState)(null),b=g[0],w=g[1],k=(0,l.useState)(null),y=(k[0],k[1]),N=(0,l.useState)(null),C=(N[0],N[1]);return(0,l.useEffect)((function(){console.log("Experience"),console.log(" \xbb userCtx.data:",e.data);if(e.data){var a=e.data.basics,n=(a.name,a.label),c=a.image,i=a.headline,l=a.summary,o=(0,s.jsxs)("ul",{children:[(0,s.jsxs)("li",{className:x().headline,children:[(0,s.jsx)("img",{src:c||"",alt:"hero image",style:{width:"100px"}}),(0,s.jsxs)("div",{className:x().copyBlock,children:[(0,s.jsx)("h2",{children:n||""}),(0,s.jsx)("h3",{children:i||""})]})]}),(0,s.jsx)("li",{}),(0,s.jsx)("li",{children:(0,s.jsx)("p",{children:l||""})})]});C(o);var d=e.data.awards.map((function(e,a){return(0,s.jsxs)("li",{className:m().award,children:[(0,s.jsx)("h3",{children:e.title}),(0,s.jsxs)("h4",{children:[e.awarder," | ",e.fullDate.year]}),(0,s.jsx)("p",{children:e.summary})]},"awards-".concat(a))}));r(d);var u=e.data.interests.map((function(e,a){return(0,s.jsx)("li",{className:m().stackItem,children:e.name},"interests-".concat(a))}));f(u);var h=e.data.languages.map((function(e,a){return(0,s.jsx)("li",{className:m().stackItem,children:e.language},"languages-".concat(a))}));v(h);var _=e.data.skills.map((function(e,a){return(0,s.jsx)("li",{className:m().stackItem,children:e.name},"skills-".concat(a))}));w(_);var j=e.data.volunteer.map((function(e,a){return(0,s.jsx)("li",{children:e.organization},"volunteer-".concat(a))}));y(j)}else{var g=function(){var a,n=(a=t().mark((function a(){var n,r;return t().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("   \xbb getData()"),a.next=3,fetch("https://gitconnected.com/v1/portfolio/cattlebane");case 3:return n=a.sent,a.next=6,n.json();case 6:r=a.sent,console.log("   \xbb data:",r),e.setData(r);case 9:case"end":return a.stop()}}),a)})),function(){var e=this,n=arguments;return new Promise((function(r,t){var s=a.apply(e,n);function c(e){p(s,r,t,c,i,"next",e)}function i(e){p(s,r,t,c,i,"throw",e)}c(void 0)}))});return function(){return n.apply(this,arguments)}}();g()}}),[e.data]),e.data?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i(),{children:(0,s.jsx)("title",{children:"Jacques Altounian - Creative Technologist - About"})}),(0,s.jsx)(o.Z,{title:"",className:m().about,children:(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:e.data?(0,s.jsx)(h.Z,{basics:e.data.basics}):""}),(0,s.jsx)("li",{className:m().section,children:(0,s.jsxs)(u.Z,{children:[(0,s.jsx)("h2",{children:"Awards"}),(0,s.jsx)("ul",{children:n})]})}),(0,s.jsx)("li",{className:"".concat(m().section," ").concat(m().skills),children:(0,s.jsxs)(u.Z,{children:[(0,s.jsx)("h2",{children:"Skills"}),(0,s.jsx)("ul",{children:b})]})}),(0,s.jsx)("li",{className:m().section,children:(0,s.jsxs)(u.Z,{children:[(0,s.jsx)("h2",{children:"My Hobbies"}),(0,s.jsx)("ul",{children:_})]})})]})})]}):(0,s.jsx)("div",{})}},1844:function(e){e.exports={color_primaryLight:"#0071e3",color_primaryDark:"#1d1d1f",color_white:"#fff",bioCard:"bioCard_bioCard__o_OSw",headline:"bioCard_headline__O70Ib",copyBlock:"bioCard_copyBlock__4U8RE"}},6118:function(e){e.exports={color_primaryLight:"#0071e3",color_primaryDark:"#1d1d1f",color_white:"#fff",card:"card_card__H4Twr","unit-nav":"card_unit-nav__MVbKA","unit-header":"card_unit-header__qJ6BV","shape-preview":"card_shape-preview__9ypyh","unit-select":"card_unit-select__g4Jgf","units-container":"card_units-container__ArXOX"}},7226:function(e){e.exports={color_primaryLight:"#0071e3",color_primaryDark:"#1d1d1f",color_white:"#fff",page:"page_page__PBEL7","page-headline":"page_page-headline__FS02K"}},1403:function(e){e.exports={color_primaryLight:"#0071e3",color_primaryDark:"#1d1d1f",color_white:"#fff",about:"about_about__1j_sP",section:"about_section__bpJph",award:"about_award__pMMR0",skills:"about_skills__8_oOz",stackItem:"about_stackItem__XZ_wF"}}},function(e){e.O(0,[774,888,179],(function(){return a=512,e(e.s=a);var a}));var a=e.O();_N_E=a}]);