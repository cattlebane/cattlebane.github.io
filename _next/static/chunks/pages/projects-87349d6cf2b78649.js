(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[327],{9182:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects",function(){return r(3846)}])},4094:function(e,t,r){"use strict";var n=r(5893),c=r(6118),a=r.n(c);t.Z=function(e){return(0,n.jsx)("div",{className:"".concat(a().card," ").concat(e.className),children:e.children})}},2292:function(e,t,r){"use strict";var n=r(5893),c=r(7226),a=r.n(c);t.Z=function(e){return(0,n.jsxs)("main",{className:"".concat(a().page," ").concat(e.className),children:[e.title?(0,n.jsx)("h1",{className:a()["page-headline"],children:e.title}):"",e.children]})}},3846:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return j}});var n=r(4051),c=r.n(n),a=r(5893),i=r(9008),o=r.n(i),s=(r(5675),r(7294)),l=r(2292),u=r(9669),d=r(4094),p=r(4390),f=r.n(p);function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function m(e,t,r,n,c,a,i){try{var o=e[a](i),s=o.value}catch(l){return void r(l)}o.done?t(s):Promise.resolve(s).then(n,c)}function _(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(){var e=(0,s.useState)(null),t=e[0],r=e[1],n=(0,s.useContext)(u.Z);return(0,s.useEffect)((function(){if(console.log("Projects"),console.log(" \xbb userCtx.data:",n.data),n.data){var e=n.data.projects.map((function(e,t){var r=e.summary.split(","),n=e.libraries.map((function(e){return(0,a.jsx)("li",{className:f().stackItem,children:e},"stack-".concat(e))})),c=e.languages.map((function(e){return(0,a.jsx)("li",{className:f().stackItem,children:e},"stack-".concat(e))})),i=_(n).concat(_(c));return(0,a.jsx)("li",{className:f().projects,children:(0,a.jsx)(d.Z,{children:(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:(0,a.jsx)("h2",{children:e.displayName})}),(0,a.jsx)("li",{children:(0,a.jsxs)("ul",{className:f().mediaList,children:[e.images.map((function(e,r){return(0,a.jsx)("li",{children:(0,a.jsx)("img",{src:e.resolutions.desktop.url,style:{maxWidth:"400px"},alt:""})},"project-".concat(t,"-image-").concat(r))})),e.videos.map((function(e,n){var c=r[n].split("x"),i=c[0]>.8*window.innerWidth?.8*window.innerWidth:c[0],o=i!=c[0]?c[1]*(i/c[0]):c[1];return(0,a.jsx)("li",{children:(0,a.jsx)("iframe",{width:i,height:o,src:"https://www.youtube.com/embed/".concat(e.sourceId),title:"YouTube video player",frameBorder:"0",controls:"0",iv_load_policy:"3",modestBranding:"1",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:"1"})},"project-".concat(t,"-video-").concat(n))}))]})}),(0,a.jsx)("li",{className:f().content,children:e.description}),(0,a.jsxs)("li",{className:f().content,children:[(0,a.jsx)("h4",{children:"Tech Stack"}),(0,a.jsx)("ul",{children:i})]})]})})},"project-".concat(t))}));r(e)}else{var t=function(){var e,t=(e=c().mark((function e(){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("   \xbb getData()"),e.next=3,fetch("https://gitconnected.com/v1/portfolio/cattlebane");case 3:return t=e.sent,e.next=6,t.json();case 6:r=e.sent,console.log("   \xbb data:",r),n.setData(r);case 9:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,c){var a=e.apply(t,r);function i(e){m(a,n,c,i,o,"next",e)}function o(e){m(a,n,c,i,o,"throw",e)}i(void 0)}))});return function(){return t.apply(this,arguments)}}();t()}}),[n.data]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o(),{children:(0,a.jsx)("title",{children:"Jacques Altounian - Creative Technologist - Projects"})}),(0,a.jsx)(l.Z,{children:(0,a.jsx)("ul",{children:t||""})})]})}},6118:function(e){e.exports={color_primaryLight:"#0071e3",color_primaryDark:"#1d1d1f",color_white:"#fff",card:"card_card__H4Twr","unit-nav":"card_unit-nav__MVbKA","unit-header":"card_unit-header__qJ6BV","shape-preview":"card_shape-preview__9ypyh","unit-select":"card_unit-select__g4Jgf","units-container":"card_units-container__ArXOX"}},7226:function(e){e.exports={color_primaryLight:"#0071e3",color_primaryDark:"#1d1d1f",color_white:"#fff",page:"page_page__PBEL7","page-headline":"page_page-headline__FS02K"}},4390:function(e){e.exports={color_primaryLight:"#0071e3",color_primaryDark:"#1d1d1f",color_white:"#fff",projects:"projects_projects__Fth37",content:"projects_content__kVBve",mediaList:"projects_mediaList__4vPhT",stackItem:"projects_stackItem__kIko3"}}},function(e){e.O(0,[675,774,888,179],(function(){return t=9182,e(e.s=t);var t}));var t=e.O();_N_E=t}]);