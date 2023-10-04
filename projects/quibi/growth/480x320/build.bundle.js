/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./1-build/480x320/Ad.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./1-build/480x320/Ad.js":
/*!*******************************!*\
  !*** ./1-build/480x320/Ad.js ***!
  \*******************************/
/*! exports provided: Ad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ad", function() { return Ad; });
/* harmony import */ var _common_js_Preflight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @common/js/Preflight.js */ "./1-build/common/js/Preflight.js");
/* harmony import */ var _common_js_Build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common/js/Build.js */ "./1-build/common/js/Build.js");
/* harmony import */ var _common_js_Animation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @common/js/Animation.js */ "./1-build/common/js/Animation.js");
/* harmony import */ var ad_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ad-control */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js");
/* harmony import */ var _common_js_Control_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @common/js/Control.js */ "./1-build/common/js/Control.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");






var Ad =
/*#__PURE__*/
function () {
  function Ad() {}

  // called from index.html onImpression()
  Ad.launch = function launch(binaryAssets) {
    console.log('Ad.launch()');
    ad_control__WEBPACK_IMPORTED_MODULE_3__["Core"].init(binaryAssets).then(function () {
      return _common_js_Preflight_js__WEBPACK_IMPORTED_MODULE_0__["Preflight"].init();
    }).then(function () {
      return ad_control__WEBPACK_IMPORTED_MODULE_3__["Core"].loadDynamic();
    }).then(function () {
      return Ad.prepare();
    })["catch"](function (err) {
      throw err;
    });
  };

  Ad.prepare = function prepare() {
    console.log('Ad.prepare()');
    adData.preloaderScaleTo = 20;
    _common_js_Control_js__WEBPACK_IMPORTED_MODULE_4__["Control"].preMarkup();
    View.main = new _common_js_Build_js__WEBPACK_IMPORTED_MODULE_1__["Main"]({
      endframe: {
        css: {
          clip: 'rect(120px, 270px, 170px, 220px)'
        },
        frame: {
          borderRadius: 28,
          align: {
            x: {
              type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].CENTER,
              offset: -1
            },
            y: {
              type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].CENTER,
              offset: 2
            }
          },
          logo: {
            align: {
              x: {
                type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].RIGHT,
                offset: 6
              },
              y: {
                type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].BOTTOM,
                offset: 25
              }
            }
          },
          copy: {
            header: {
              css: {
                width: 384
              },
              fontSize: 24
            },
            sub: {
              css: {
                width: 384
              },
              fontSize: 17,
              align: {
                x: {
                  type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].LEFT
                }
              }
            },
            align: {
              x: {
                type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].LEFT,
                offset: -34
              },
              y: {
                type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].CENTER,
                against: 150
              }
            }
          }
        },
        cta: {
          css: {
            width: 118,
            height: 29
          },
          align: {
            y: {
              type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].BOTTOM,
              offset: -15
            }
          },
          txt: {
            fontSize: 17
          }
        }
      }
    });
    View.mainBorder = new _common_js_Build_js__WEBPACK_IMPORTED_MODULE_1__["MainBorder"]();
    _common_js_Control_js__WEBPACK_IMPORTED_MODULE_4__["Control"].postMarkup();
    _common_js_Animation_js__WEBPACK_IMPORTED_MODULE_2__["Animation"].start();
  };

  return Ad;
}();
window.Ad = Ad;

/***/ }),

/***/ "./1-build/480x320/images/frame_B.png":
/*!********************************************!*\
  !*** ./1-build/480x320/images/frame_B.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'frame_B'

/***/ }),

/***/ "./1-build/480x320/images/frame_L.png":
/*!********************************************!*\
  !*** ./1-build/480x320/images/frame_L.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'frame_L'

/***/ }),

/***/ "./1-build/480x320/images/frame_R.png":
/*!********************************************!*\
  !*** ./1-build/480x320/images/frame_R.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'frame_R'

/***/ }),

/***/ "./1-build/480x320/images/frame_T.png":
/*!********************************************!*\
  !*** ./1-build/480x320/images/frame_T.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'frame_T'

/***/ }),

/***/ "./1-build/480x320/images/frame_quibiLogo.png":
/*!****************************************************!*\
  !*** ./1-build/480x320/images/frame_quibiLogo.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'frame_quibiLogo'

/***/ }),

/***/ "./1-build/480x320/images/intro_logo.png":
/*!***********************************************!*\
  !*** ./1-build/480x320/images/intro_logo.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'intro_logo'

/***/ }),

/***/ "./1-build/480x320/images/intro_logo_wordmark.png":
/*!********************************************************!*\
  !*** ./1-build/480x320/images/intro_logo_wordmark.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'intro_logo_wordmark'

/***/ }),

/***/ "./1-build/common/fonts/AvertaPE-Black-optimized.woff":
/*!************************************************************!*\
  !*** ./1-build/common/fonts/AvertaPE-Black-optimized.woff ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'AvertaPE-Black-optimized'

/***/ }),

/***/ "./1-build/common/fonts/AvertaPE-Bold-optimized.woff":
/*!***********************************************************!*\
  !*** ./1-build/common/fonts/AvertaPE-Bold-optimized.woff ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'AvertaPE-Bold-optimized'

/***/ }),

/***/ "./1-build/common/fonts/AvertaPE-Regular-optimized.woff":
/*!**************************************************************!*\
  !*** ./1-build/common/fonts/AvertaPE-Regular-optimized.woff ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'AvertaPE-Regular-optimized'

/***/ }),

/***/ "./1-build/common/js/AdData.js":
/*!*************************************!*\
  !*** ./1-build/common/js/AdData.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdData; });
/* harmony import */ var ad_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-control */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/* harmony import */ var _common_fonts_AvertaPE_Black_optimized_woff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @common/fonts/AvertaPE-Black-optimized.woff */ "./1-build/common/fonts/AvertaPE-Black-optimized.woff");
/* harmony import */ var _common_fonts_AvertaPE_Black_optimized_woff__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_common_fonts_AvertaPE_Black_optimized_woff__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_fonts_AvertaPE_Regular_optimized_woff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @common/fonts/AvertaPE-Regular-optimized.woff */ "./1-build/common/fonts/AvertaPE-Regular-optimized.woff");
/* harmony import */ var _common_fonts_AvertaPE_Regular_optimized_woff__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_common_fonts_AvertaPE_Regular_optimized_woff__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_fonts_AvertaPE_Bold_optimized_woff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @common/fonts/AvertaPE-Bold-optimized.woff */ "./1-build/common/fonts/AvertaPE-Bold-optimized.woff");
/* harmony import */ var _common_fonts_AvertaPE_Bold_optimized_woff__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_common_fonts_AvertaPE_Bold_optimized_woff__WEBPACK_IMPORTED_MODULE_4__);





function AdData() {
  var self = this;
  /**
  EXTRACT JSON DATA
  Prepare dynamic data here.
  */

  /**
  DYNAMIC IMAGES
  Dynamically loaded images need to be in their own directory, like "dynamic_images/".
  	Then, you need to add your dynamic image-paths to the load-queue, so that when
  the secondary preload happens, these assets will get loaded. For example:
  	self.theImageName = ImageManager.addToLoad(adParams.imagesPath + 'sample.jpg');
  */

  self.fonts = {
    regular: 'AvertaPE-Regular-optimized',
    black: 'AvertaPE-Black-optimized',
    bold: 'AvertaPE-Bold-optimized'
  };
  self.colors = {
    border: '#7725ff',
    purple: '#7725ff',
    white: '#ffffff',
    black: '#000000'
  }; // Store svg markup for use in all UISvg instances, reduces duplicate code across builds.  See UISvg.

  self.svg = {};
  self.preloaderScaleTo = 14; // ** set in Ad.prepare()

  var imagesPath = 'dynamic_images/'; //adParams.imagesPath

  var shows = adParams.shows;
  self.images = shows.map(function (show) {
    var showImages = {
      hero: show.images.hero ? ad_control__WEBPACK_IMPORTED_MODULE_0__["ImageManager"].addToLoad("" + imagesPath + show.images.hero) : '',
      top: show.images.top ? ad_control__WEBPACK_IMPORTED_MODULE_0__["ImageManager"].addToLoad("" + imagesPath + show.images.top) : '',
      tt: show.images.tt ? ad_control__WEBPACK_IMPORTED_MODULE_0__["ImageManager"].addToLoad("" + imagesPath + show.images.tt) : ''
    };
    return showImages;
  });
  self.copy = ad_utils__WEBPACK_IMPORTED_MODULE_1__["ObjectUtils"].defaults(adParams.copy, {}, true);
  /* self.copy = shows.map(function(show) {
    let showCopy = {
      header: show.copy.header,
      sub: show.copy.sub,
      cta: show.copy.cta
    }
    return showCopy
  }) */

  self.animation = {
    duration: 0.5
  };
}

/***/ }),

/***/ "./1-build/common/js/Animation.js":
/*!****************************************!*\
  !*** ./1-build/common/js/Animation.js ***!
  \****************************************/
/*! exports provided: Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Control */ "./1-build/common/js/Control.js");


var Animation =
/*#__PURE__*/
function () {
  function Animation() {}

  Animation.start = function start() {
    console.log('Animation.start()');
    var T = View.main;
    var delay = 0.1;
    var duration = adData.animation.duration * 0.5; // show the main container

    TweenLite.set(View.main, {
      delay: delay,
      opacity: 1,
      onComplete: global.removePreloader
    });
    TweenLite.to(T.introLogo, duration, {
      delay: delay,
      scale: 0.9,
      ease: Power2.easeInOut
    });
    var totalDelay = 0;

    if (T.endframe.frame) {
      totalDelay = T.endframe.frame.animateIN(delay);
      totalDelay = T.endframe.cta.animateIN(totalDelay);
    } else {
      // ** for mobile horizontal size, need to fade Logo wordmark out before showing endframe
      TweenLite.set(T.endframe, {
        opacity: 0
      });
      TweenLite.to(T.introWordmark, duration, {
        delay: delay,
        opacity: 0,
        ease: Power2.easeInOut
      });
    }

    delay += duration; // ** counts duration of introLogo animation

    TweenLite.set(T.endframe, {
      delay: delay,
      opacity: 1
    });
    TweenLite.to(T.endframe.introCover, duration, {
      delay: delay,
      opacity: 0,
      ease: Power2.easeInOut
    });
    TweenLite.to(T.endframe, duration * 0.75, {
      delay: delay,
      clip: "rect(0px, " + adParams.adWidth + "px, " + adParams.adHeight + "px, 0px)",
      ease: Power2.easeIn
    });
    TweenLite.to(T.introLogo, duration, {
      delay: delay,
      scale: adData.preloaderScaleTo,
      ease: Power2.easeIn
    });

    if (T.endframe.frame) {
      if (T.endframe.hero.height > adParams.adHeight) {
        TweenLite.from([T.endframe.heroTop, T.endframe.hero], duration * 4, {
          delay: delay,
          y: 0,
          ease: Power2.easeOut
        });
        delay += duration * 4;
      }
    } else {
      delay += duration * 0.5; // ** animate the 320x50 animation here
      // ** hero animate in

      if (T.endframe.hero) {
        TweenLite.to(T.endframe.hero, duration * 2, {
          delay: delay,
          y: ad_view__WEBPACK_IMPORTED_MODULE_0__["Align"].get(T.endframe.hero, {
            y: ad_view__WEBPACK_IMPORTED_MODULE_0__["Align"].CENTER
          }).y,
          ease: Power2.easeOut
        }); // delay += duration
        // ** TT animate in

        if (T.endframe.tt) TweenLite.from(T.endframe.tt, duration * 2, {
          delay: delay,
          y: -T.endframe.tt.height,
          ease: Power2.easeOut
        });
        delay += duration; // ** hero long transition

        TweenLite.to(T.endframe.hero, duration * 10, {
          delay: delay,
          y: 0,
          ease: Linear.easeNone
        });
        delay += 2; // ** Hero transition out

        if (T.endframe.tt) TweenLite.to(T.endframe.tt, duration * 2, {
          delay: delay,
          opacity: 0,
          ease: Power2.easeInOut
        });
        TweenLite.to(T.endframe.hero, duration * 2, {
          delay: delay,
          opacity: 0,
          ease: Power2.easeInOut
        });
        delay += duration * 2;
      } // ** transition to sub copy


      if (T.sub) TweenLite.from(T.sub, duration * 2, {
        delay: delay,
        y: -T.sub.height,
        ease: Power2.easeOut
      });
      delay += 2;
      if (T.sub) TweenLite.to(T.sub, duration * 2, {
        delay: delay,
        opacity: 0,
        ease: Power2.easeInOut
      });
      delay += duration * 2; // ** transition to endframe copy

      if (T.endframe.header) TweenLite.from(T.endframe.header, duration * 2, {
        delay: delay,
        y: -adParams.adHeight,
        ease: Power2.easeOut
      });
      if (T.endframe.cta) TweenLite.from(T.endframe.cta, duration * 2, {
        delay: delay,
        y: adParams.adHeight,
        ease: Power2.easeOut
      }); // ** transition in cta if available

      delay += duration;
    }

    if (totalDelay < delay) totalDelay = delay;
    TweenLite.delayedCall(totalDelay, Animation.complete);
  } // IMPORTANT!!! Call this function when your animation is complete!
  ;

  Animation.complete = function complete() {
    console.log('Animation.complete()');
    var T = View.main;
    T.introLogo.hide();
    T.introWordmark.hide();
    T.endframe.introCover.hide();
    _Control__WEBPACK_IMPORTED_MODULE_1__["Control"].enableRollovers();
  };

  return Animation;
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./1-build/common/js/Build.js":
/*!************************************!*\
  !*** ./1-build/common/js/Build.js ***!
  \************************************/
/*! exports provided: Main, MainBorder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainBorder", function() { return MainBorder; });
/* harmony import */ var ad_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-ui */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/index.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/* harmony import */ var ad_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ad-control */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js");
/* harmony import */ var _common_js_Frame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @common/js/Frame */ "./1-build/common/js/Frame.js");
/* harmony import */ var _size_images_intro_logo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @size/images/intro_logo.png */ "./1-build/480x320/images/intro_logo.png");
/* harmony import */ var _size_images_intro_logo_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_size_images_intro_logo_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _size_images_intro_logo_wordmark_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @size/images/intro_logo_wordmark.png */ "./1-build/480x320/images/intro_logo_wordmark.png");
/* harmony import */ var _size_images_intro_logo_wordmark_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_size_images_intro_logo_wordmark_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _size_images_frame_quibiLogo_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @size/images/frame_quibiLogo.png */ "./1-build/480x320/images/frame_quibiLogo.png");
/* harmony import */ var _size_images_frame_quibiLogo_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_size_images_frame_quibiLogo_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _CtaBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CtaBtn */ "./1-build/common/js/CtaBtn.js");









function Main(args) {
  var T = ad_view__WEBPACK_IMPORTED_MODULE_1__["Markup"].get('main');
  ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(T, {
    position: 'absolute',
    width: adParams.adWidth,
    height: adParams.adHeight,
    opacity: 0,
    left: '0px',
    top: '0px',
    overflow: 'hidden',
    userSelect: 'none',
    backgroundColor: adData.colors.purple
  });
  T.introWordmark = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.introWordmark, {
    target: T,
    id: 'introWordmark',
    source: 'intro_logo_wordmark',
    retina: true,
    align: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER
  }, true));
  T.endframe = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIComponent"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.endframe, {
    target: T,
    id: 'endframe',
    css: {
      width: 'inherit',
      height: 'inherit',
      backgroundColor: adData.colors.black
    }
  }, true));

  if (adData.images[0].hero) {
    T.endframe.hero = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
      target: T.endframe,
      id: 'hero',
      source: adData.images[0].hero,
      css: {
        backgroundPosition: 'right',
        backgroundSize: 'cover'
      },
      align: {
        y: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].BOTTOM
      }
    });
  }

  if (adData.images[0].tt && adData.images[0].hero) {
    T.endframe.tt = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
      target: T.endframe,
      id: 'tt',
      source: adData.images[0].tt
    });
  }

  if (args.endframe.frame) {
    T.endframe.frame = new _common_js_Frame__WEBPACK_IMPORTED_MODULE_4__["default"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.endframe.frame, {
      target: T.endframe,
      id: 'endframe_frame',
      align: {
        x: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
        y: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER
      }
    }, true));
    T.endframe.heroTop = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
      target: T.endframe,
      id: 'heroTop',
      source: adData.images[0].top,
      align: {
        y: {
          type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].TOP,
          against: T.endframe.hero
        }
      }
    });
  } else {
    // ** This is mostly for mobile sizes that don't have a frame
    T.sub = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UITextField"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.endframe.sub, {
      target: T,
      id: 'sub',
      css: {
        color: adData.colors.white,
        textShadow: adData.colors.black + " 0px 0px 5px"
      },
      fontSize: 18,
      fontFamily: adData.fonts.black,
      format: ad_ui__WEBPACK_IMPORTED_MODULE_0__["TextFormat"].INLINE_FIT_CLAMP,
      textAlign: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
      text: adData.copy.sub
    }, true));
    T.endframe.header = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UITextField"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.endframe.header, {
      target: T.endframe,
      id: 'header',
      css: {
        color: adData.colors.white,
        textShadow: adData.colors.black + " 0px 0px 5px"
      },
      fontSize: 18,
      fontFamily: adData.fonts.black,
      format: ad_ui__WEBPACK_IMPORTED_MODULE_0__["TextFormat"].INLINE_FIT_CLAMP,
      textAlign: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
      text: adData.copy.header
    }, true));
    T.endframe.logo = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.endframe.logo, {
      target: T.endframe,
      id: 'quibi_logo',
      source: 'frame_quibiLogo',
      retina: true
    }, true));
  }

  if (adData.copy.cta) {
    T.endframe.cta = new _CtaBtn__WEBPACK_IMPORTED_MODULE_8__["default"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.endframe.cta, {
      target: T.endframe,
      align: {
        x: {
          type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER
        },
        y: {
          type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].BOTTOM,
          offset: -23
        }
      }
    }, true)); // ** if header exists, but is not part of Frame, group cta and header for endframe lockup

    if (T.endframe.header) {
      ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].set(T.endframe.cta, {
        x: {
          type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
          against: T.endframe.header
        },
        y: {
          type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].BOTTOM,
          against: T.endframe.header,
          outer: true,
          offset: 3
        }
      });
      T.endframe.ctaLockup = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIGroup"]({
        target: T.endframe,
        id: 'ctaLockup',
        children: [T.endframe.header, T.endframe.cta],
        align: ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.endframe.header.align, {
          x: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
          y: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER
        }, true)
      });
    }
  }

  T.endframe.introCover = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIComponent"]({
    target: T.endframe,
    id: 'introCover',
    css: {
      width: 'inherit',
      height: 'inherit',
      backgroundColor: adData.colors.purple
    }
  });
  T.introLogo = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.introLogo, {
    target: T,
    id: 'introLogo',
    source: 'intro_logo',
    retina: true,
    css: {
      transformOrigin: '50px 47px'
    },
    align: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER
  }, true));
  if (args.introLogo && args.introLogo.transformOrigin) T.introLogo.transformOrigin = args.introLogo.transformOrigin;
  return T;
}
function MainBorder() {
  new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIBorder"]({
    target: View.main,
    size: 1,
    color: adData.colors.border
  });
}

/***/ }),

/***/ "./1-build/common/js/Control.js":
/*!**************************************!*\
  !*** ./1-build/common/js/Control.js ***!
  \**************************************/
/*! exports provided: Control */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Control", function() { return Control; });
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");

var Control =
/*#__PURE__*/
function () {
  function Control() {}

  Control.preMarkup = function preMarkup() {
    console.log('Control.preMarkup()');
  };

  Control.postMarkup = function postMarkup() {
    console.log('Control.postMarkup()'); // listen for default exit

    ad_events__WEBPACK_IMPORTED_MODULE_0__["Gesture"].add(View.main, ad_events__WEBPACK_IMPORTED_MODULE_0__["GestureEvent"].CLICK, Control.handleClick);
    ad_events__WEBPACK_IMPORTED_MODULE_0__["Gesture"].add(View.main, ad_events__WEBPACK_IMPORTED_MODULE_0__["GestureEvent"].OVER, function () {
      adData.rolledOver = true;
    });
    ad_events__WEBPACK_IMPORTED_MODULE_0__["Gesture"].add(View.main, ad_events__WEBPACK_IMPORTED_MODULE_0__["GestureEvent"].OUT, function () {
      adData.rolledOver = false;
    });
  };

  Control.enableRollovers = function enableRollovers() {
    ad_events__WEBPACK_IMPORTED_MODULE_0__["Gesture"].add(View.main, ad_events__WEBPACK_IMPORTED_MODULE_0__["GestureEvent"].OVER, Control.handleOver);
    ad_events__WEBPACK_IMPORTED_MODULE_0__["Gesture"].add(View.main, ad_events__WEBPACK_IMPORTED_MODULE_0__["GestureEvent"].OUT, Control.handleOut);
    if (adData.rolledOver) Control.handleOver();
  };

  Control.handleClick = function handleClick(event) {
    Network.exit(clickTag);
  };

  Control.handleOver = function handleOver(event) {
    if (View.main.endframe.frame) View.main.endframe.frame.onOver();
    if (View.main.endframe.cta) View.main.endframe.cta.onOver();
  };

  Control.handleOut = function handleOut(event) {
    if (View.main.endframe.frame) View.main.endframe.frame.onOut();
    if (View.main.endframe.cta) View.main.endframe.cta.onOut();
  };

  return Control;
}();

/***/ }),

/***/ "./1-build/common/js/CtaBtn.js":
/*!*************************************!*\
  !*** ./1-build/common/js/CtaBtn.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ad_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-ui */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/index.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var CtaBtn =
/*#__PURE__*/
function (_UIButton) {
  _inheritsLoose(CtaBtn, _UIButton);

  function CtaBtn(args) {
    var _this;

    _this = _UIButton.call(this, ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args, {
      id: 'cta',
      css: {
        width: 148,
        height: 29,
        borderRadius: 14,
        overflow: 'hidden' // backgroundColor: adData.colors.white

      }
    }, true)) || this;

    var T = _assertThisInitialized(_this);

    T.out = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIComponent"]({
      target: T,
      id: 'cta_out',
      css: {
        width: 'inherit',
        height: 'inherit',
        backgroundColor: adData.colors.white
      }
    });
    T.txt = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UITextField"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.txt, {
      target: T.out,
      id: 'cta_out_txt',
      css: {
        width: 'inherit',
        height: 'inherit',
        color: adData.colors.black
      },
      fontSize: 18,
      fontFamily: adData.fonts.bold,
      format: ad_ui__WEBPACK_IMPORTED_MODULE_0__["TextFormat"].INLINE_FIT,
      alignText: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
      text: adData.copy.cta
    }, true));
    T.over = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIComponent"]({
      target: T,
      id: 'cta_over',
      css: {
        width: 'inherit',
        height: 'inherit',
        background: "linear-gradient(133deg, #a62cf4 0%, #7725ff 100%)"
      }
    });
    T.txt = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UITextField"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.txt, {
      target: T.over,
      id: 'cta_over_txt',
      css: {
        width: 'inherit',
        height: 'inherit',
        color: adData.colors.white
      },
      fontSize: 18,
      fontFamily: adData.fonts.bold,
      format: ad_ui__WEBPACK_IMPORTED_MODULE_0__["TextFormat"].INLINE_FIT,
      alignText: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
      text: adData.copy.cta
    }, true)); // TweenLite.set(T.over, { clip: `rect( 0px, ${T.over.width}px, 0px, 0px)`, opacity: 0 })

    TweenLite.set(T.over, {
      opacity: 0
    });

    T.animateIN = function (delay) {
      TweenLite.from(T, adData.animation.duration, {
        delay: delay,
        y: '-=10',
        opacity: 0,
        ease: Power2.easeOut
      });
      delay += adData.animation.duration;
      return delay;
    };

    T.onOver = function () {
      // TweenLite.to(T.over, adData.animation.duration * 0.5, { clip: `rect( 0px, ${T.over.width}px, ${T.over.height}px, 0px)`, opacity: 1, ease: Power4.easeOut })
      TweenLite.to(T.over, adData.animation.duration * 0.5, {
        opacity: 1,
        ease: Power4.easeOut
      });
      TweenLite.to(T.out, adData.animation.duration * 0.5, {
        opacity: 0,
        ease: Power2.easeInOut
      });
    };

    T.onOut = function () {
      /* TweenLite.to(T.over, adData.animation.duration * 0.5, {
        clip: `rect( 0px, ${T.over.width}px, 0px, 0px)`,
        opacity: 0,
        ease: Power2.easeInOut
      }) */
      TweenLite.to(T.over, adData.animation.duration * 0.5, {
        opacity: 0,
        ease: Power2.easeInOut
      });
      TweenLite.to(T.out, adData.animation.duration * 0.5, {
        opacity: 1,
        ease: Power2.easeOut
      });
    };

    return T || _assertThisInitialized(_this);
  }

  return CtaBtn;
}(ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIButton"]);

/* harmony default export */ __webpack_exports__["default"] = (CtaBtn);

/***/ }),

/***/ "./1-build/common/js/Frame.js":
/*!************************************!*\
  !*** ./1-build/common/js/Frame.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Frame; });
/* harmony import */ var ad_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-ui */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/index.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
/* harmony import */ var _size_images_frame_T_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @size/images/frame_T.png */ "./1-build/480x320/images/frame_T.png");
/* harmony import */ var _size_images_frame_T_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_size_images_frame_T_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _size_images_frame_B_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @size/images/frame_B.png */ "./1-build/480x320/images/frame_B.png");
/* harmony import */ var _size_images_frame_B_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_size_images_frame_B_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _size_images_frame_L_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @size/images/frame_L.png */ "./1-build/480x320/images/frame_L.png");
/* harmony import */ var _size_images_frame_L_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_size_images_frame_L_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _size_images_frame_R_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @size/images/frame_R.png */ "./1-build/480x320/images/frame_R.png");
/* harmony import */ var _size_images_frame_R_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_size_images_frame_R_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _size_images_frame_quibiLogo_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @size/images/frame_quibiLogo.png */ "./1-build/480x320/images/frame_quibiLogo.png");
/* harmony import */ var _size_images_frame_quibiLogo_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_size_images_frame_quibiLogo_png__WEBPACK_IMPORTED_MODULE_8__);










var Frame = function Frame(args) {
  // super(ObjectUtils.defaults(args, {}, true))
  var T = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIComponent"]({
    target: args.target,
    id: 'frameContainer',
    css: {
      width: 'inherit',
      height: 'inherit'
    }
  });
  T.overlayOpacity = 0.45;
  T.heroOverlay = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIComponent"]({
    target: T,
    id: 'heroOverlay'
  });
  T.hero = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
    target: T,
    id: 'frame_hero',
    source: adData.images[0].hero,
    css: {
      backgroundPosition: 'right',
      backgroundSize: 'auto'
    },
    align: {
      y: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].BOTTOM
    }
  });
  T.left = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
    target: T,
    id: 'frame_left',
    source: 'frame_L'
  });
  T.top = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
    target: T,
    id: 'frame_top',
    source: 'frame_T',
    align: {
      x: {
        type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].RIGHT,
        against: T.left,
        outer: true
      }
    }
  });
  T.right = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
    target: T,
    id: 'frame_right',
    source: 'frame_R',
    align: {
      x: {
        type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].RIGHT,
        against: T.top,
        outer: true
      }
    }
  });
  T.bottom = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"]({
    target: T,
    id: 'frame_bottom',
    source: 'frame_B',
    align: {
      x: {
        type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].RIGHT,
        against: T.left,
        outer: true
      },
      y: {
        type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].BOTTOM,
        against: T.left
      }
    }
  });
  T.frame = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIGroup"]({
    target: T,
    id: 'frame_group',
    children: [T.left, T.top, T.right, T.bottom],
    align: ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.align, {
      x: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
      y: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER
    }, true)
  });
  TweenLite.set(T.hero, {
    width: T.frame.width,
    height: T.frame.height,
    x: T.frame.x,
    y: T.frame.y,
    backgroundPosition: -T.frame.x + "px " + -(T.frame.y - T.hero.y) + "px",
    borderRadius: args.borderRadius,
    overflow: 'hidden'
  });
  TweenLite.set(T.heroOverlay, {
    width: T.frame.width,
    height: T.frame.height,
    x: T.frame.x,
    y: T.frame.y,
    borderRadius: args.borderRadius,
    backgroundColor: adData.colors.black,
    opacity: T.overlayOpacity * 0.5
  });
  T.heroOverlay.scaleTo = T.frame.width / T.frame.height > 1 ? T.height * 1.25 / T.frame.height : T.width * 1.25 / T.frame.width;
  T.hero.hide();
  T.heroOverlay.hide(); // Clamp.set(T, Clamp.XY)
  // Align.set(T, ObjectUtils.defaults(args.align, { x: Align.CENTER, y: Align.CENTER }, true))

  T.logo = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIImage"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.logo, {
    target: T.frame,
    id: 'frame_quibi_logo',
    source: 'frame_quibiLogo',
    retina: true
  }, true));
  /* T.copy = new UIComponent(
  ObjectUtils.defaults(
  args.copy,
  {
  	target: T,
  	id: 'copy'
  },
  true
  )
  ) */

  T.header = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UITextField"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.copy.header, {
    target: T.frame,
    // target: T.copy,
    id: 'header',
    css: {
      color: adData.colors.white,
      textShadow: adData.colors.black + " 0px 0px 5px"
    },
    fontSize: 18,
    fontFamily: adData.fonts.black,
    format: ad_ui__WEBPACK_IMPORTED_MODULE_0__["TextFormat"].INLINE_FIT_CLAMP,
    textAlign: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
    text: adData.copy.header
  }, true));
  T.sub = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UITextField"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.copy.sub, {
    target: T.frame,
    // target: T.copy,
    id: 'sub',
    css: {
      color: adData.colors.white,
      textShadow: adData.colors.black + " 0px 0px 5px"
    },
    fontSize: 13,
    fontFamily: adData.fonts.regular,
    format: ad_ui__WEBPACK_IMPORTED_MODULE_0__["TextFormat"].INLINE_FIT_CLAMP,
    textAlign: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
    // spacing: -0.5,
    text: adData.copy.sub,
    align: {
      x: {
        type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER,
        against: T.header
      },
      y: {
        type: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].BOTTOM,
        against: T.header,
        outer: true
      }
    }
  }, true));
  T.copy = new ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIGroup"](ad_utils__WEBPACK_IMPORTED_MODULE_2__["ObjectUtils"].defaults(args.copy, {
    target: T.frame,
    id: 'copy',
    children: [T.header, T.sub],
    align: {
      x: ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].CENTER
    }
  }, true));
  ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"].disable(T);

  T.animateIN = function (delay) {
    var duration = 1;
    TweenLite.from(T.logo, duration * 0.35, {
      delay: delay,
      scale: 0,
      ease: Power2.easeIn
    });
    delay += duration * 0.35;
    TweenLite.fromTo(T.right, duration / 4, {
      clip: "rect(" + T.right.height + "px, " + T.right.width + "px, " + T.right.height + "px, 0px)"
    }, {
      delay: delay,
      clip: "rect(0px, " + T.right.width + "px, " + T.right.height + "px, 0px)",
      ease: Linear.easeNone
    });
    delay += duration / 4;
    TweenLite.fromTo(T.top, duration / 4, {
      clip: "0px, " + T.top.width + "px, " + T.top.height + "px, " + T.top.width + "px)"
    }, {
      delay: delay,
      clip: "rect(0px, " + T.top.width + "px, " + T.top.height + "px, 0px)",
      ease: Linear.easeNone
    });
    TweenLite.from(T.header, duration * 0.5, {
      delay: delay,
      opacity: 0,
      y: '-=10',
      ease: Power2.easeOut
    });
    TweenLite.from(T.sub, duration * 0.5, {
      delay: delay + 0.2,
      opacity: 0,
      y: '-=10',
      ease: Power2.easeOut
    });
    delay += duration / 4;
    TweenLite.fromTo(T.left, duration / 3 / 2, {
      clip: "0px, " + T.left.width + "px, 0px, 0px)"
    }, {
      delay: delay,
      clip: "rect(0px, " + T.left.width + "px, " + T.left.height + "px, 0px)",
      ease: Linear.easeNone
    });
    delay += duration / 4;
    TweenLite.fromTo(T.bottom, duration / 2, {
      clip: "0px, 0px, " + T.bottom.height + "px, 0px)"
    }, {
      delay: delay,
      clip: "rect(0px, " + T.bottom.width + "px, " + T.bottom.height + "px, 0px)",
      ease: Power2.easeOut
    });
    delay += duration / 3;
    return delay;
  };

  T.onOver = function () {
    T.hero.show();
    T.heroOverlay.show();
    TweenLite.to(T.heroOverlay, adData.animation.duration * 0.5, {
      scale: T.heroOverlay.scaleTo,
      opacity: T.overlayOpacity,
      ease: Power2.easeOut
    });
  };

  T.onOut = function () {
    TweenLite.to(T.heroOverlay, adData.animation.duration * 0.5, {
      scale: 1,
      opacity: T.overlayOpacity * 0.5,
      ease: Power2.easeInOut
    });
  };

  return T;
};



/***/ }),

/***/ "./1-build/common/js/Preflight.js":
/*!****************************************!*\
  !*** ./1-build/common/js/Preflight.js ***!
  \****************************************/
/*! exports provided: Preflight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Preflight", function() { return Preflight; });
/* harmony import */ var _common_js_AdData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @common/js/AdData.js */ "./1-build/common/js/AdData.js");
/* harmony import */ var ad_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-control */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js");


/*-- Red.Imports.head.start --*/

/*-- Red.Imports.head.end --*/

/**
	PRE-FLIGHT		

	Resources that are shared by all the sizes should be loaded here. Boilerplate components 
	like {@link Velvet} & {@link DateManager} can be configured. Runtime JS loads. Etc.

	Once resolved, control moves to AdData.
*/

var Preflight =
/*#__PURE__*/
function () {
  function Preflight() {}

  Preflight.init = function init() {
    var _this = this;

    console.log("Preflight.init()");
    return new Promise(function (resolve, reject) {
      var promises = [// this.loadDynamicJS('define-your-case-id')
      ];
      Promise.all(promises).then(function () {
        _this.addPreloadedImages();

        _this.prepareAdData();
      }).then(function () {
        resolve();
      })["catch"](function (err) {
        reject(err);
      });
    });
  };

  Preflight.addPreloadedImages = function addPreloadedImages() {
    console.log("Preflight.addPreloadedImages()");
    ad_control__WEBPACK_IMPORTED_MODULE_1__["ImageManager"].addToDictionary(assets.preloadedImages);
  };

  Preflight.prepareAdData = function prepareAdData() {
    console.log("Preflight.prepareAdData()");
    global.adData = new _common_js_AdData_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  /**
  Method for loading dynamic, compiled ES6 modules at runtime. This should be threaded into 
  Preflight.init()'s promise chain, as needed.
  	You must:
  	- define THIS_CASE__ID
  	- replace THIS_CASE__ASSET_PATH with a string
  	- handle the implementation of the loaded module.
  */
  ;

  Preflight.loadDynamicJS = function loadDynamicJS(id) {
    return new Promise(function (resolve, reject) {
      switch (id) {
        /*
        case THIS_CASE__ID: // ex: '300x250_Endframe'
        import('THIS_CASE__ASSET_PATH') // ex: '@common/dynamic_js/300x250_Endframe.js'
        .then(module => {
        // example implementation of loaded ES6 module
        global[module.default.name] = module.default
        resolve()
        })
        .catch(err => reject(err))
        break
        */
        default:
          console.log("Common.loadDynamicJS() has no import case for: " + id);
          resolve();
      }
    });
  };

  return Preflight;
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js":
/*!******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js ***!
  \******************************************************************/
/*! exports provided: CssManager, ExpandableDcs, Core, Expandable, ImageManager, SheetManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_CssManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/CssManager.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/CssManager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CssManager", function() { return _lib_CssManager_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _lib_ExpandableDcs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/ExpandableDcs.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/ExpandableDcs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpandableDcs", function() { return _lib_ExpandableDcs_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _lib_Core_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/Core.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/Core.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Core", function() { return _lib_Core_js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _lib_Expandable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/Expandable.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/Expandable.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Expandable", function() { return _lib_Expandable_js__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _lib_ImageManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/ImageManager.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/ImageManager.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ImageManager", function() { return _lib_ImageManager_js__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _lib_SheetManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/SheetManager.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/SheetManager.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "SheetManager", function() { return _lib_SheetManager_js__WEBPACK_IMPORTED_MODULE_5__; });








/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/Core.js":
/*!*********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/Core.js ***!
  \*********************************************************************/
/*! exports provided: init, loadDynamic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDynamic", function() { return loadDynamic; });
/* harmony import */ var ad_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-external */ "./1-build/node_modules/@ff0000-ad-tech/ad-external/index.js");
/* harmony import */ var _CssManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CssManager */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/CssManager.js");
/* harmony import */ var _ImageManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImageManager */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/ImageManager.js");
/**
 * @class Core
 * @desc
 * 	Boilerplate logic that is attempted for all ad templates happens here. The build of an ad should not need to affect this scope.
 * <codeblock>
 * import { Core } from 'ad-control'
 * </codeblock>
 */



/**
 * @memberOf Core
 * @method init
 * @param {(Image|SVGElement)[]} binaryAssets
 * 	Optionally passed in Images/SVGElements containing src and data on base64 images
 * @desc
 * 	This is the first step in the build file. The init() returns a Promise, which allows for chaining of .then() methods.
 * 	For synchronous actions, such as declaring AdData or FtData, simply wrap it in an anonymous function. For asynchronous
 * 	actions, such a inititalizing something with a created callback, this will need to be wrapped in a returned callback.
 * 	This will ensure that the chain will wait for the previous .then() to be fulfilled before moving on.
 * @example
 * Core.init(binaryAssets)
 * 	.then(function() {
 * 		global.adData = new AdData();
 * 	})
 * 	.then(function() {
 * 		return new Promise((resolve, reject) => {
 * 			// pass the resolve as the completed callback
 * 			SomeCustomClass.init(resolve)
 * 		})
 * 	})
 * 	.then(Core.loadDynamic)
 * 	.then(Control.prepareBuild)
 */

function init(binaryAssets) {
  console.log('Core.init()');
  return new Promise(function (resolve, reject) {
    var promises = []; // device

    ad_external__WEBPACK_IMPORTED_MODULE_0__["Device"].init(); // css

    _CssManager__WEBPACK_IMPORTED_MODULE_1__["default"].init(); // fba payload

    _ImageManager__WEBPACK_IMPORTED_MODULE_2__["addToDictionary"](binaryAssets); // async

    Promise.all(promises).then(function () {
      resolve();
    })["catch"](function (err) {
      reject(err);
    });
  });
}
/**
 * @memberOf Core
 * @method loadDynamic
 * @desc
 * 	This is the last step before preparing the build. The loadDynamic() loads all of the images that have been added
 * 	to the ImageLoader. After this method is called from the .then() promise chain, Control.prepareBuild can be
 * 	called as the entire prepare process is now complete when its Promise is fulfilled.
 * @example
 * Core.init(fbaContent)
 * 	.then(function() {
 * 		global.adData = new AdData();
 * 	})
 * 	.then(Core.loadDynamic)
 * 	.then(Control.prepareBuild)
 */

function loadDynamic() {
  console.log('Core.loadDynamic()');
  return new Promise(function (resolve, reject) {
    console.log('\t Core load Image Queue');
    _ImageManager__WEBPACK_IMPORTED_MODULE_2__["load"](resolve, global.failAd);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/CssManager.js":
/*!***************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/CssManager.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ad_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-external */ "./1-build/node_modules/@ff0000-ad-tech/ad-external/index.js");
/* harmony import */ var ad_geom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-geom */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class CssManager
 * @desc
 * This is a css-interface class, which is intended to proxy all css applications. The goal is to accept css in any format( see below ),
 * standardize the keys, conform the values, and rapidly apply the style to the target, specific to the {@link Device} running the ad.<br><br>
 * Generally, you should not need to use this class directly. {@link Styles.setCss} will handle it for you.<br><br>
 * However, if your css is not being correctly managed, the first step in debugging is to use {@link CssManager.setDebugFilter}. Pass the id,
 * as a string, of the misbehaving element to see the exact format of the css being applied to it. You can then locate the problem style, try
 * applying it in the browser inspector. Using this approach you should be able to determine what the correction/exception needs to be.<br><br>
 * Additional debugging output can be switched on using {@link CssManager.setDebugLevel}. Pass a level( 0 is off, 1 is less, 2 is more ). There will be
 * a lot of output, but it is organized and consistent. You should be able to see exactly what is happening to your declarations. <br><br>
 * <b>Types:</b><br>
 * <table>
 * 	<tr><td>CssObject</td>	<td>the literal "css" object that is passed to {@link Markup} as containerData.css on the creation of the element</td></tr>
 * 	<tr><td>CssStyleString</td>	<td>a literal string of any number of css styles, passed to {@link Markup} as containerData.styles on the creation of the element</td></tr>
 * 	<tr><td>CssDeclaration</td>	<td>either an object like "{ position: 'absolute' }" or a string like "background-color: #ff0000;"</td></tr>
 * 	<tr><td>CssKey</td>	<td>ex: in "position: absolute;" the css-key would be "position"</td></tr>
 * 	<tr><td>CssValue</td>	<td>ex: in "position: absolute;" the css-value would be "absolute"</td></tr>
 * 	<tr><td>CssList</td>	<td>a standardized list of objects with Device-specific keys and corresponding values</td></tr>
 * </table>
 * <br>
 * <b>Formats:</b><br>
 * <table>
 * 	<tr><td>Hyphen</td>	<td>ex: 'border-left', '-webkit-clip-path', '-moz-filter'</td></tr>
 * 	<tr><td>Camel</td>	<td>ex: 'borderLeft', 'webkitClipPath', 'moxFilter'</td></tr>
 * 	<tr><td>Alt</td>	<td>this is to handle arbitrary exceptions, like the "bgImage" key on container-data css objects</td></tr>
 * </table>
 * <br>
 * <b>Key Prefixes:</b><br>
 * <table>
 * 	<tr><td>Browser</td>	<td>ex: "-webkit-clip-path" or "webkitClipPath"</td></tr>
 * 	<tr><td>Standard</td>	<td>ex: "clip-path" or "clipPath"</td></tr>
 * </table>
 * <codeblock>
 * import { CssManager } from 'ad-control'
 * </codeblock>
 */



var CssManager = function CssManager() {};

_defineProperty(CssManager, "debug_level1", false);

_defineProperty(CssManager, "debug_level2", false);

_defineProperty(CssManager, "filter", undefined);

_defineProperty(CssManager, "debug_element", undefined);

_defineProperty(CssManager, "debug_css_list", undefined);

_defineProperty(CssManager, "init", function () {
  console.log('CssManager.init()');
  this.generateBrowserKeyDictionary();
});

_defineProperty(CssManager, "setDebugLevel", function (level) {
  var C = this;

  switch (parseInt(level)) {
    case 1:
      C.debug_level1 = true;
      C.debug_level2 = false;
      break;

    case 2:
      C.debug_level1 = true;
      C.debug_level2 = true;
      break;

    default:
      C.debug_level1 = false;
      C.debug_level2 = false;
      break;
  }
});

_defineProperty(CssManager, "setDebugFilter", function (filter) {
  var C = this;
  console.log('CssManager.setDebugFilter(),', filter);
  C.filter = filter;
  C.debug_level1 = true;
});

_defineProperty(CssManager, "ifDebug", function (debugLevel) {
  var C = this;
  if (!C.filter) return C[debugLevel];else if (C.passDebugFilter() && C[debugLevel]) return true;
});

_defineProperty(CssManager, "passDebugFilter", function () {
  var C = this;
  if (C.debug_element) if (C.debug_element.id.indexOf(C.filter) > -1) return true;
  if (C.debug_css_list) for (var i in C.debug_css_list) {
    if (i.indexOf(C.filter) > -1) return true;else if (String(C.debug_css_list[i]).indexOf(C.filter) > -1) return true;
  }
  return false;
});

_defineProperty(CssManager, "generateBrowserKeyDictionary", function () {
  var C = this;
  console.log('CssManager.generateBrowserKeyDictionary()');
  C.deviceKeyDict = {};
  var styles = document.createElement('div').style;

  for (var key in styles) {
    // get prefix
    var prefix = C.getPrefix(key); // key without prefix

    var standardKey = C.standardizeKey(key); //console.log( 'Device.element.style:', key );
    //console.log( ' - standard key:', standardKey );
    // handle exceptions per browser

    switch (ad_external__WEBPACK_IMPORTED_MODULE_0__["Device"].browser) {
      case 'safari':
        // use "webkit" prefix, if that's what was returned
        if (prefix == 'webkit') {
          C.deviceKeyDict[standardKey] = C.prependPrefix('webkit', standardKey);
        } else {
          // standard
          // exclude keys that have a "webkit"-equivalent
          if (!(C.prependPrefix('webkit', standardKey) in styles)) {
            C.deviceKeyDict[standardKey] = standardKey;
          }
        }

        break;

      case 'firefox':
        var mozKey = C.prependPrefix('Moz', standardKey);
        var webkitKey = C.prependPrefix('Webkit', standardKey); // use the no-prefix version, if it exists

        if (standardKey in styles) {
          C.deviceKeyDict[standardKey] = standardKey;
        } else if (prefix == 'moz') {
          // use "Moz" if a "webkit"-equivalent exists
          if (C.camelateKey('webkit-' + standardKey) in styles) {
            C.deviceKeyDict[standardKey] = mozKey;
          }
        } else if (prefix == 'webkit') {
          // note: in FF, there seem to be equivalents for all "webkit" vs. "Webkit" properites, so we use "Webkit" to match "Moz" convention....yah, nevermind.
          // use "webkit" if no "Moz"-equivalent exists
          if (!(mozKey in styles)) {
            C.deviceKeyDict[standardKey] = webkitKey;
          }
        }

        break;

      case 'chrome':
      case 'ie':
      default:
        // use the no-prefix version, if it exists
        if (standardKey in styles) {
          C.deviceKeyDict[standardKey] = standardKey;
        } else if (prefix) {
          // otherwise it's a "prefix"-only type of property
          C.deviceKeyDict[standardKey] = C.prependPrefix(prefix, standardKey);
        }

        break;
    }
  }

  console.log(' KEY DICTIONARY:', C.deviceKeyDict);
});

_defineProperty(CssManager, "apply", function (element, cssList) {
  var C = this;
  C.debug_element = element;
  C.debug_css_list = cssList;
  if (C.ifDebug('debug_level1')) console.log('  CssManager.apply()', element.id); // creates a collection of only the transforms

  var transformList = {};

  for (var key in cssList) {
    // has a non-destructive transform update, as generated by keyFormatExceptions()
    if (key.match(/^transform\(/)) transformList[key] = cssList[key];else {
      // standard css-key
      if (C.ifDebug('debug_level1')) console.log('   ' + key + ': ' + cssList[key] + ';');
      element.style[C.getDeviceKey(key)] = cssList[key];
    }
  } // will apply all transforms at once for correct calculation


  C.applyTransforms(element, transformList);
  if (C.ifDebug('debug_level1')) console.log('\n\n');
  C.debug_element = null;
  C.debug_css_list = null;
});

_defineProperty(CssManager, "conformCssObject", function (cssObject, debugElement) {
  var C = this;
  C.debug_element = debugElement;
  if (C.ifDebug('debug_level1')) console.log('CssManager.conformCssObject()', cssObject);
  var cssList = {};

  if (cssObject) {
    for (var key in cssObject) {
      if (C.ifDebug('debug_level2')) console.log('  PARSE( key: ' + key + ', value: ' + cssObject[key] + ' )');
      var declarations = C.conformKeyValue(key, cssObject[key]);

      for (var i in declarations) {
        if (C.ifDebug('debug_level2')) console.log('    CONFORMED DECLARATION:', declarations[i]);
        cssList[declarations[i][0]] = declarations[i][1];
      }
    }
  }

  C.debug_element = null;
  return cssList;
});

_defineProperty(CssManager, "conformCssString", function (cssString, debugElement) {
  var C = this;
  C.debug_element = debugElement;
  if (C.ifDebug('debug_level1')) console.log(' CssManager.conformCssString()');
  var cssList = {};

  if (cssString) {
    var declarations = cssString.split(/\s*;\s*/);

    for (var key in declarations) {
      if (declarations[key]) {
        var declarationParts = declarations[key].split(/:(.+)?/);
        if (C.ifDebug('debug_level2')) console.log('  PARSE( key: ' + declarationParts[0] + ', value: ' + declarationParts[1] + ' )');
        var conformedDeclarations = C.conformKeyValue(declarationParts[0], declarationParts[1]);

        for (var i in conformedDeclarations) {
          if (C.ifDebug('debug_level2')) console.log('    CONFORMED DECLARATION:', conformedDeclarations[i]);
          cssList[conformedDeclarations[i][0]] = conformedDeclarations[i][1];
        }
      }
    }
  }

  C.debug_element = null;
  return cssList;
});

_defineProperty(CssManager, "conformCssKeyValue", function (key, value) {
  var C = this;
  if (C.ifDebug('debug_level1')) console.log(' CssManager.conformCssKeyValue()');
  var cssObject = {};
  cssObject[key] = value;
  return C.conformCssObject(cssObject);
});

_defineProperty(CssManager, "applyTransforms", function (element, value) {
  var C = this;
  if (C.ifDebug('debug_level1')) console.log('    - CssManager.applyTransforms(), ', value);
  var matrix2D = new ad_geom__WEBPACK_IMPORTED_MODULE_1__["Matrix2D"](); // existing transform

  var existingTransform = element.style[C.getDeviceKey('transform')];
  var matrixMatch = existingTransform.match(/matrix[^\)]+\)/);

  if (matrixMatch) {
    matrix2D.setFromCss(matrixMatch[0]);
    if (C.ifDebug('debug_level2')) console.log('       existing matrix:', matrix2D.data);
  }

  if ('transforms' in element) var transforms = element.transforms;else {
    var transforms = {
      tx: 0,
      ty: 0,
      rz: 0,
      sx: 1,
      sy: 1
    };
  }
  var changed = {};

  for (var key in value) {
    var transformMethod = key.match(/\(\s([^\s]+)/)[1];
    changed[transformMethod] = value[key];
  } // Order matters: rotate, scale, translate
  // first translate the x and y back to zero


  if (changed.tx != undefined) {
    matrix2D.data[2] = 0;
  }

  if (changed.ty != undefined) {
    matrix2D.data[5] = 0;
  }

  if (changed.rz != undefined) {
    var reverse = -transforms.rz;
    matrix2D.rotate(reverse * (Math.PI / 180));
    matrix2D.rotate(changed.rz * (Math.PI / 180));
    transforms.rz = changed.rz;
  }

  if (changed.sx != undefined) {
    var reverse = 1 / transforms.sx;
    matrix2D.scale(reverse, 1);
    matrix2D.scale(changed.sx, 1);
    transforms.sx = changed.sx;
  }

  if (changed.sy != undefined) {
    var reverse = 1 / transforms.sy;
    matrix2D.scale(1, reverse);
    matrix2D.scale(1, changed.sy);
    transforms.sy = changed.sy;
  }

  if (changed.tx != undefined) {
    matrix2D.translate(changed.tx, 0);
    transforms.tx = changed.tx;
  }

  if (changed.ty != undefined) {
    matrix2D.translate(0, changed.ty);
    transforms.ty = changed.ty;
  } // store transforms


  element.transforms = transforms;
  if (C.ifDebug('debug_level2')) console.log('       updated matrix:', matrix2D.data); // apply css matrix

  element.style[C.getDeviceKey('transform')] = matrix2D.getCss();
});

_defineProperty(CssManager, "conformKeyValue", function (key, value) {
  var C = this;
  key = String(key).trim();
  value = String(value).trim();
  var keyAsStandard = C.standardizeKey(key);
  return C.conformValue(keyAsStandard, value);
});

_defineProperty(CssManager, "hasPrefix", function (key) {
  var C = this;
  return key.search(C.matchPrefixRegex()) > -1;
});

_defineProperty(CssManager, "getPrefix", function (key) {
  var C = this;
  var match = key.match(C.matchPrefixRegex());
  return match ? match[1].replace(/-/g, '').toLowerCase() : null;
});

_defineProperty(CssManager, "stripPrefix", function (key) {
  var C = this;
  var keyless = key.replace(C.matchPrefixRegex(), '');
  return keyless.charAt(0).toLowerCase() + keyless.slice(1);
});

_defineProperty(CssManager, "getDeviceKey", function (key) {
  var C = this;
  return key in C.deviceKeyDict ? C.deviceKeyDict[key] : key;
});

_defineProperty(CssManager, "prependPrefix", function (prefix, key) {
  return prefix + key.replace(/^(.)/, function (str) {
    return str.charAt(0).toUpperCase();
  });
});

_defineProperty(CssManager, "standardizeKey", function (key) {
  var C = this;
  key = C.stripPrefix(key); // check if key is an exception

  if (key in C.keyFormatExceptions()) key = C.keyFormatExceptions()[key];else // or procedurally convert to camel
    key = C.camelateKey(key);
  if (C.ifDebug('debug_level2')) console.log('    - result: "' + key + '"');
  return key;
});

_defineProperty(CssManager, "camelateKey", function (key) {
  key = key.replace(/-(.)/g, function (str) {
    return str.charAt(1).toUpperCase();
  });
  return key;
});

_defineProperty(CssManager, "keyFormatExceptions", function () {
  return {
    x: 'transform( tx )',
    translateX: 'transform( tx )',
    y: 'transform( ty )',
    translateY: 'transform( ty )',
    rotate: 'transform( rz )',
    rotation: 'transform( rz )',
    scaleX: 'transform( sx )',
    scaleY: 'transform( sy )',
    scale: 'transform( sx ),transform( sy )'
  };
});

_defineProperty(CssManager, "conformValue", function (key, value) {
  var C = this;
  var conformedValues = [];
  var conformedValue; // look for numeric values

  var hasMultipleValues = value.match(/\s/);
  var numericValue = value.match(C.matchNumberRegex());

  if (!hasMultipleValues && numericValue) {
    if (C.ifDebug('debug_level2')) console.log('   conform value as number');
    conformedValue = Number(numericValue[0]);
    /* get existing unit */

    var unitMatch = value.match(/[^0-9\.]+$/);
    if (unitMatch) conformedValue += unitMatch[0];else
      /* assume default unit */
      switch (key) {
        case 'top':
        case 'right':
        case 'bottom':
        case 'left':
        case 'width':
        case 'height':
        case 'fontSize':
        case 'lineHeight':
        case 'padding':
        case 'margin':
        case 'marginRight':
        case 'marginLeft':
        case 'marginTop':
        case 'marginBottom':
        case 'borderRadius':
        case 'borderWidth':
        case 'letterSpacing':
          conformedValue += 'px';
          break;
      }
  } else if (key == 'backgroundImage') {
    // background images - allows for either a stand-alone URL, or proper css like 'url( "http://example.com/image.jpg" );'
    if (C.ifDebug('debug_level2')) console.log('   conform value as background image');
    value = value.replace(/^url\(\s*['"]*/, '').replace(/['"]*\s*\)$/, '');
    conformedValue = 'url( "' + value + '" )';
  } else if (key == 'transform') {
    // transform-functions - should be split apart so a single matrix function can be written
    //	faster to just specify the transform exactly via css-object keys: x, y, rotate, scaleX, scaleY
    // && Device.browser == 'ie') {
    if (C.ifDebug('debug_level2')) console.log('   convert "transform" functions to individual transforms');
    var functionRegex = /([a-z0-9]+)\(([^\)]+)\)/gi;
    var params;

    while (params = functionRegex.exec(value)) {
      var args = params[2].replace(/\s/g, '').split(',').map(function (value, index, array) {
        return Number(value.match(C.matchNumberRegex())[0]);
      });

      switch (params[1]) {
        case 'translate':
          conformedValues.push(['transform( tx )', args[0]]);
          conformedValues.push(['transform( ty )', args[1]]);
          break;

        case 'translateX':
          conformedValues.push(['transform( tx )', args[0]]);
          break;

        case 'translateY':
          conformedValues.push(['transform( ty )', args[0]]);
          break;

        case 'rotate':
          conformedValues.push(['transform( rz )', args[0]]);
          break;

        case 'scale':
          conformedValues.push(['transform( sx )', args[0]]);
          conformedValues.push(['transform( sy )', args[1]]);
          break;

        case 'scaleX':
          conformedValues.push(['transform( sx )', args[0]]);
          break;

        case 'scaleY':
          conformedValues.push(['transform( sy )', args[0]]);
          break;
      }
    }
  } else {
    // pass through
    if (C.ifDebug('debug_level2')) console.log('   conform value as string');
    conformedValue = value;
  } // create style pair


  if (conformedValue != undefined) {
    if (C.ifDebug('debug_level2')) console.log('    - result: "' + conformedValue + '"'); // split the key will alyways have 1 value, except for scale which has to split to scaleX and scaleY

    var splitKeys = key.split(/\,/);

    for (var i = 0; i < splitKeys.length; i++) {
      conformedValues.push([splitKeys[i], conformedValue]);
    }
  }

  return conformedValues;
});

_defineProperty(CssManager, "matchNumberRegex", function () {
  return /^[+-]?[0-9]*\.?[0-9]+/;
});

_defineProperty(CssManager, "matchPrefixRegex", function () {
  return /^-*(moz-*|webkit-*|ms-*|o-)/i;
});

/* harmony default export */ __webpack_exports__["default"] = (CssManager);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/Expandable.js":
/*!***************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/Expandable.js ***!
  \***************************************************************************/
/*! exports provided: init, collapse, expand, hasUserInteracted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collapse", function() { return collapse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expand", function() { return expand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasUserInteracted", function() { return hasUserInteracted; });
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
/**
 * @class Expandable
 * @description
 * This class controls the expanding and collapsing of expandable units. The animation relys on the properties
 * set in the index. Therefore, the animation has be removed from the build file and handled internally.
 * This class can be extended with {@link ExpandableDcs} when units are used in DoubleClick.
 * <codeblock>
 * import { Expandable } from 'ad-control'
 * </codeblock>
 */


var _arg;

var _afterInitExpanded = true;
var _hasUserInteracted = false;
var extend = {
  init: function init() {},
  collapse: function collapse(gestureEvent) {
    handle.collapseStart();
  },
  expand: function expand(gestureEvent) {
    handle.expandStart();
  },
  collapseComplete: function collapseComplete() {
    handle.collapseComplete();
  },
  expandComplete: function expandComplete() {
    handle.expandComplete();
  }
};
var handle = {
  expandStart: function expandStart(event) {
    fireCallback('expandStart');
    animateExpand();
  },
  expandComplete: function expandComplete(event) {
    fireCallback('expandComplete');
    _hasUserInteracted = _afterInitExpanded;
    _afterInitExpanded = true;
  },
  collapseStart: function collapseStart(event) {
    animateCollapse();
    fireCallback('collapseStart');
    _hasUserInteracted = true;
  },
  collapseComplete: function collapseComplete(event) {
    fireCallback('collapseComplete');
    _hasUserInteracted = true;
  }
};
/**
 * @memberOf Expandable
 * @method init
 * @desc
 * 	This method initializes the class, linking all callbacks and the target being set. This should
 * 	be called Control.postMarkup
 * @example
 * Expandable.init ({
 * 	// required
 * 	target: View.expanded,
 *
 * 	// optional methods called when that event happens
 * 	expandStart: Control.handleExpandStart,
 * 	expandComplete: Control.handleExpandComplete,
 * 	collapseStart: Control.handleCollapseStart,
 * 	collapseComplete: Control.handleCollapseFinish,
 *
 * 	// optionally you can add time values for expanding/collapsing
 * 	expandTime: 0.3,
 * 	collapseTime: 0.3
 * })
 */

function init(arg) {
  _arg = arg || {};
  defaultFalsey(_arg, 'expandTime');
  defaultFalsey(_arg, 'collapseTime');

  if (_arg.extend) {
    extend = _arg.extend;
    extend.init(handle);
  }

  if (adParams.expandable.expanded) {
    _afterInitExpanded = false;
    expand();
  } else {
    animateCollapse(true);
  }
}

function defaultFalsey(obj, key) {
  obj[key] = obj[key] >= 0 ? obj[key] : 0.5;
}
/**
 * @memberOf Expandable
 * @method collapse
 * @desc
 * 	Collapses the View.expand container.
 * @example
 * 	Expandable.collapse()
 */


function collapse(gestureEvent) {
  ad_events__WEBPACK_IMPORTED_MODULE_0__["GestureEvent"].stop(gestureEvent);
  extend.collapse(gestureEvent);
}
/**
 * @memberOf Expandable
 * @method expand
 * @desc
 * 	Expands the View.expand container.
 * @example
 * 	Expandable.expand()
 */

function expand(gestureEvent) {
  ad_events__WEBPACK_IMPORTED_MODULE_0__["GestureEvent"].stop(gestureEvent);
  extend.expand(gestureEvent);
}
/**
 * @memberOf Expandable
 * @method hasUserInteracted
 * @returns {boolean}
 * 	Indicates if the ad has been interacted by the user
 * @example
 * 	console.log(Expandable.hasUserInteracted())
 */

function hasUserInteracted() {
  return _hasUserInteracted;
}

function animateExpand() {
  var param = adParams.expandable;
  TweenLite.to(_arg.target, _arg.expandTime, {
    x: param.expandedX,
    y: param.expandedY,
    width: adParams.adWidth,
    height: adParams.adHeight,
    onComplete: extend.expandComplete
  });
}

function animateCollapse(isInit) {
  var time = isInit ? 0 : _arg.collapseTime;
  var param = adParams.expandable;
  TweenLite.to(_arg.target, time, {
    x: param.collapsedX,
    y: param.collapsedY,
    width: param.collapsedWidth,
    height: param.collapsedHeight,
    onComplete: isInit ? undefined : extend.collapseComplete
  });
}

function fireCallback(name) {
  ;
  (_arg[name] || function () {}).call();
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/ExpandableDcs.js":
/*!******************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/ExpandableDcs.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @class ExpandableDcs
 * @description
 * This is and extension of {@link Expandable} when units are used in DoubleClick. The only difference in the
 * init() method is to pass in this class to the Expandable.init()
 * <codeblock>
 * import { ExpandableDcs } from 'ad-control'
 *
 * Expandable.init ({
 * 	target : View.expanded,
 * 	expandStart: Control.handleExpandStart,
 * 	expandComplete: Control.handleExpandComplete,
 * 	collapseStart: Control.handleCollapseStart,
 * 	collapseComplete: Control.handleCollapseFinish,
 *
 * 	extend: ExpandableDcs
 * })
 * </codeblock>
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init(handle) {
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, handle.expandStart);
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, handle.expandComplete);
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, handle.collapseStart);
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, handle.collapseComplete);

    if (adParams.expandable.expanded) {
      Enabler.setStartExpanded(true);
    }
  },
  collapse: function collapse(gestureEvent) {
    console.log('DCS > collapse()');
    Enabler.requestCollapse();
    if (gestureEvent) Enabler.reportManualClose();
  },
  expand: function expand(gestureEvent) {
    console.log('DCS > expand()');
    Enabler.requestExpand();
  },
  collapseComplete: function collapseComplete() {
    console.log('DCS > collapseComplete()');
    Enabler.finishCollapse();
  },
  expandComplete: function expandComplete() {
    console.log('DCS > expandComplete()');
    Enabler.finishExpand();
  }
});

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/ImageManager.js":
/*!*****************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/ImageManager.js ***!
  \*****************************************************************************/
/*! exports provided: addToLoad, addLoader, get, available, load, addFbaImages, addToDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToLoad", function() { return addToLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLoader", function() { return addLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "available", function() { return available; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFbaImages", function() { return addFbaImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToDictionary", function() { return addToDictionary; });
/* harmony import */ var ad_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-load */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/index.js");
/**
 * @class ImageManager
 * @desc
 * This module is used to add/load/manage all Images.
 * <codeblock>
 * import { ImageManager } from 'ad-control'
 * </codeblock>
 */

var _pendingImages = [];
var _pendingCanvasImages = [];
var _pendingLoaders = [];
var _nextLoadCallback = [];

var _imageManagerLoader;

var _dict = {};
var _isLoading = false;
var _loaderCount = 0;

var _onComplete = function _onComplete() {};

var _onFail = function _onFail() {};
/* ------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
 * @memberOf ImageManager
 * @method addToLoad
 * @param {string} file
 * 	A filename or path
 * @param {object} arg
 * 	Optional. Determines if the image should be loaded with a crossOrigin:'anonymous' for images used in a canvas. An object with one boolean key: forCanvas
 * @desc
 * 	Add an image file-path to be loaded.
 * @example
 * // Add an image from the "images/" folder
 * ImageManager.addToLoad(adParams.imagesPath + 'sample.png')
 *
 * // Add an image full path, and get the result key back
 * var sampleImageId = ImageManager.addToLoad('http://some/full/file/path/sample.png')
 *
 * // Add an image for use with CanvasDrawer, and get the result key back
 * // NOTE: The object must be there or images will error when used in Canvas
 * var sampleImageId = ImageManager.addToLoad('http://some/full/file/path/sample.png', { forCanvas:true })
 *
 * @returns {string}
 * 	An "imageId" which can be used to get an image by its id, see: {@link ImageManager.get}
 */


function addToLoad(file, arg) {
  var id = ad_load__WEBPACK_IMPORTED_MODULE_0__["LoaderUtils"].getFileName(file);

  if (!available(id, true)) {
    var forCanvas = arg && arg.forCanvas == true; //console.log( 'ImageManager.addToLoad(', id, ') forCanvas:', forCanvas )

    forCanvas ? _pendingCanvasImages.push(file) : _pendingImages.push(file);
  }

  return id;
}
/**
 * @memberOf ImageManager
 * @method addLoader
 * @param {Loader} loader
 * 	A {@link Loader}.
 * @desc
 * 	Add a Loader to loaded along with any other queued image requests.
 * @example
 * ImageManager.addLoader(
 * 	new Loader(
 * 		assets.images, {
 * 			name: 'imageLocalLoader',
 * 			prepend: adParams.imagesPath
 * 		}
 * 	)
 * )
 */

function addLoader(loader) {
  _pendingLoaders.push(loader);
}
/**
 * @memberOf ImageManager
 * @method get
 * @param {string} imageId
 * 	A String id of an Image
 * @returns {Image}
 * 	Returns the <<b></b>img> that was created when the requested image was loaded in.
 * @example
 * 	ImageManager.get('sample')
 */

function get(imageId) {
  if (_dict[imageId]) return _dict[imageId];else throw new Error("ImageManager : No image named '" + imageId + "' has been loaded");
}
/**
 * @memberOf ImageManager
 * @method available
 * @param {string} imageId
 * 	A String id of an Image
 * @returns {boolean}
 * 	If an image by the given imageID has been loaded
 * @example
 * 	ImageManager.available('sample')
 */

function available(imageId, internal) {
  var exists = _dict[imageId] != undefined; // if the image we are trying to load already exists

  if (exists) {
    // if this is an internal use - as in, called from I.addToLoad() or addToDictionary()
    if (internal) console.log('ImageManager.available() -->', true, ': Duplicate Image Id "' + imageId + '". One or more images loading in have the same name. Each Image needs a unique file name.');
  } else {
    // if the image doesn't already exist, we only want to know that if it is not from an internal ImageManager method
    // for example: checking to see if an image exists from build.js
    if (!internal) console.log('ImageManager.available() -->', false, ": No image named '" + imageId + "' has been loaded");
  }

  return exists;
}
/**
 * @memberOf ImageManager
 * @method load
 * @param {function} callback
 * 	Callback to execute when all images are loaded.
 * @param {function} onFail
 * 	Optional onFail callback - if not specified a failed load will cause the ad to failover.
 * @desc
 * 	Executes load queue, which, on success, will yield all of the requested images available with {@link ImageManager.get}
 */

function load(callback, onFail) {
  _onFail = onFail || global.failAd;

  if (_isLoading) {
    // set up a wait for the first one to finish
    _nextLoadCallback.push(callback);
  } else {
    _onComplete = [].concat(callback);
    _nextLoadCallback = [];

    var currentPendingImages = _pendingImages.slice();

    _pendingImages = [];
    var imgLoads = currentPendingImages.map(function (img) {
      return new Promise(function (resolve, reject) {
        new ad_load__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"](img, {
          onComplete: function onComplete(event) {
            resolve(event.dataRaw);
          },
          onFail: reject
        }).load();
      });
    });

    var currentPendingCanvasImages = _pendingCanvasImages.slice();

    _pendingCanvasImages = [];
    var canvasImgLoads = currentPendingCanvasImages.map(function (canvasImg) {
      return new Promise(function (resolve, reject) {
        new ad_load__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"](canvasImg, {
          onComplete: function onComplete(event) {
            return resolve(event.dataRaw);
          },
          onFail: reject,
          crossOrigin: 'anonymous'
        }).load();
      });
    });

    var addedLoaderPromises = _pendingLoaders.map(function (loader) {
      return new Promise(function (resolve, reject) {
        var _onComplete = loader.onComplete;
        var _onFail = loader.onFail;

        loader.onComplete = function (event) {
          _onComplete && _onComplete(event);
          resolve(event.dataRaw);
        };

        loader.onFail = function (event) {
          _onFail && _onFail(event);
          reject(event);
        };

        loader.load();
      });
    });

    _isLoading = true;
    Promise.all(imgLoads.concat(canvasImgLoads).concat(addedLoaderPromises)).then(function (imgDataArr) {
      _isLoading = false;
      addToDictionary(imgDataArr);
    })["catch"](function () {
      _isLoading = false;

      _onFail.call();
    });
  }
}
function addFbaImages(target) {
  if (target) addToDictionary(target.getAllContentRaw());
}
/**
 * @memberOf ImageManager
 * @method addToDictionary
 * @desc
 * 	Allows images to be added to the ImageManager's dictionary from external classes. <b>This is not part of the load process, and can only add <i>loaded</i> image content.</b>
 */

function addToDictionary(content) {
  for (var i = 0; i < content.length; i++) {
    if (content[i] instanceof Image || content[i] instanceof SVGElement) {
      var img = content[i];
      if (!available(content[i].id, true)) _dict[img.id] = img;
    }
  }

  console.log('ImageManager:', _dict);

  for (var i = 0; i < _onComplete.length; i++) {
    _onComplete[i].call();
  }

  if (_nextLoadCallback.length > 0) {
    load(_nextLoadCallback);
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/SheetManager.js":
/*!*****************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-control/lib/SheetManager.js ***!
  \*****************************************************************************/
/*! exports provided: createGlobalNode, addClass, removeClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlobalNode", function() { return createGlobalNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/**
 * @class SheetManager
 * @desc
 * Class manages the creation of &lt;style> tags and the addition/removal of classes.
 * <codeblock>
 * import { SheetManager } from 'ad-control'
 * </codeblock>
 */

/**
 * @memberOf SheetManager
 * @method createGlobalNode
 * @param {string} nodeId
 * 	the id of the &lt;style> node written to the &lt;head>
 * @param {string} styles
 * 	selector/CSS string pair as separate parameters, following 'selector', 'css string' pattern,
 * 	or a self-contained CSS style string including selectors, like '.myClass{ color: blue; }'
 * @desc
 * 	Create a new CSS node (class, tag, etc) DEFINITION with submitted styles with selector/CSS string
 * 	pair or a self-contained CSS string including selectors. 

 * @example
 * // selector/CSS string pair
 * SheetManager.createGlobalNode ( 'myFirstStyle', 
 * 	'.class-a', 'position:absolute; width:inherit;'
 * )
 *
 * // or add multiple class declarations to the same node
 * SheetManager.createGlobalNode ( 'mySecondStyle', 
 * 	'.class-b', 'position:absolute;',
 * 	'.class-b-top', 'width:inherit; height:inherit;'
 * )
 *
 * // or have mulitple classes share the same logic
 * SheetManager.createGlobalNode ( 'myThirdStyle', 
 * 	'.class-c, .class-d', 'position:absolute;'
 * )
 * 
 * // add style to a tag globally
 * SheetManager.createGlobalNode ( 'myFourthStyle', 
 * 	'h1', 'position:absolute;'
 * )
 * 
 * // self-contained CSS string
 * var myCssString = '.myClass, h1 { color: blue; margin: 10px; }';
 * SheetManager.createGlobalNode( 'myFifthStyle', myCssString );
 */

function createGlobalNode(nodeId, styles) {
  if (document.getElementById(nodeId)) {
    return;
  }

  var style = document.createElement('style');
  style.type = 'text/css';
  style.id = nodeId; // if only two parameters, assuming styles is CSS string
  // else process as selector/style pair

  var str = arguments.length === 2 ? styles : '';

  if (arguments.length > 2) {
    for (var i = 0; i < arguments.length - 1; i += 2) {
      // strip out all the white space
      var names = arguments[i + 1].replace(/\s*/g, '');
      str += names;
      str += ' { ' + (arguments[i + 2] || '') + ' }\n';
    }
  }

  style.innerHTML = str;
  document.getElementsByTagName('head')[0].appendChild(style);
}
/**
 * @memberOf SheetManager
 * @method addClass
 * @param {string|element} target
 * 	id or element to which css style should be added
 * @param {string} className
 * 	css class association to be added to this target
 * @desc
 * 	Add a CSS class ASSOCIATION to the targeted element.
 */

function addClass(target, className) {
  var element = ad_view__WEBPACK_IMPORTED_MODULE_0__["Markup"].getElement(target); // IE does not support multiple classes being added as arguments, so must loop

  for (var i = 0; i < arguments.length - 1; i++) {
    element.classList.add(arguments[i + 1]);
  }
}
/**
 * @memberOf SheetManager
 * @method removeClass
 * @param {string|element} target
 * 	id or element from which css style should be removed
 * @param {string} className
 * 	css class association to be removed from this target
 * @desc
 * 	Removes a CSS class ASSOCIATION from the targeted element.
 */

function removeClass(target, className) {
  var element = ad_view__WEBPACK_IMPORTED_MODULE_0__["Markup"].getElement(target);
  element.classList.remove(className);
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js":
/*!*****************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js ***!
  \*****************************************************************/
/*! exports provided: Gesture, GestureBase, UIEvent, FrameRate, FrameRateBase, GestureEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_Gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Gesture */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/Gesture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Gesture", function() { return _lib_Gesture__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _lib_GestureBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/GestureBase */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GestureBase", function() { return _lib_GestureBase__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _lib_UIEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/UIEvent */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/UIEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIEvent", function() { return _lib_UIEvent__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _lib_FrameRate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/FrameRate */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/FrameRate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrameRate", function() { return _lib_FrameRate__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _lib_FrameRateBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/FrameRateBase */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/FrameRateBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrameRateBase", function() { return _lib_FrameRateBase__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _lib_GestureEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/GestureEvent */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureEvent.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "GestureEvent", function() { return _lib_GestureEvent__WEBPACK_IMPORTED_MODULE_5__; });








/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/FrameRate.js":
/*!*************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/FrameRate.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrameRateBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrameRateBase */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/FrameRateBase.js");
/* harmony import */ var ad_polyfills_lib_request_animation_frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-polyfills/lib/request-animation-frame */ "./1-build/node_modules/@ff0000-ad-tech/ad-polyfills/lib/request-animation-frame.js");
/* harmony import */ var ad_polyfills_lib_request_animation_frame__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ad_polyfills_lib_request_animation_frame__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
	@npmpackage
	@class FrameRate
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-events">ad-events</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { FrameRate } from 'ad-events'
		</codeblock>
		<br><br>
		
		This module is used for constant consistent updates, akin to ENTER_FRAME in AS3, utilizing requestAnimationFrame at its core. Register a function
		and it will be called on every tick. Optionally, you can register a function with a frame rate value for specific frequency calls.  This is useful
		when working with multiple animation sequences at once.	
	
	@example
		// have any methods			
		function myFunctionA () {
			console.log( 'myFunctionA' );
		}

		function myFunctionB() {
			console.log( 'myFunctionB' );
		}

		function myFunctionC() {
			console.log( 'myFunctionC' );
		}

		// Register any method, anywhere
		FrameRate.register ( this, myFunctionA );
		FrameRate.register ( this, myFunctionB );

		// Register with custom time, say only 7 calls per second
		FrameRate.register ( this, myFunctionC, 7 );

		// Pause the whole engine so no methods are called
		FrameRate.pause();

		// Then start is back up
		FrameRate.resume();

		// or remove a method later
		FrameRate.unregister ( this, myFunctionA );

		// or pause all methods at a specific frame rate
		FrameRate.pause ( 7 ) // this pauses only myFunctionC, but myFunctionB will continue to be called
*/



var FrameRate = function FrameRate() {};

_defineProperty(FrameRate, "_isPaused", true);

_defineProperty(FrameRate, "_isActive", true);

_defineProperty(FrameRate, "_sets", {});

_defineProperty(FrameRate, "_RAF", undefined);

_defineProperty(FrameRate, "register", function (from, handler, fps) {
  var F = FrameRate;
  fps = fps || 30;

  if (!F._sets[fps]) {
    F._sets[fps] = new _FrameRateBase__WEBPACK_IMPORTED_MODULE_0__["default"](fps);
  }

  var pool = F._sets[fps].pool;

  for (var i = 0; i < pool.length; i++) {
    if (pool[i].from === from && pool[i].handler === handler) {
      return;
    }
  }

  pool.push({
    handler: handler,
    from: from
  });
  console.log('pool is now:', pool);
  if (F._isActive) F.resume();
});

_defineProperty(FrameRate, "unregister", function (from, handler, fps) {
  var F = FrameRate; //var handlerString = handler.toString();

  for (var key in F._sets) {
    // if fps is provided, only look in that FrameRateBase for handlers
    if (fps && key != fps) {
      continue;
    } // otherwise, remove all references to that handler


    var pool = F._sets[key].pool;

    for (var i = 0; i < pool.length; i++) {
      //if ( h[i].toString() === handlerString ){
      if (pool[i].from === from && pool[i].handler === handler) {
        pool.splice(i, 1);
        break;
      }
    } // removes the FrameRateBase object with no handlers


    if (pool.length == 0) {
      delete F._sets[key];
    }
  }

  if (Object.keys(F._sets).length === 0) {
    F.pause();
    F._isActive = true;
  }
});

_defineProperty(FrameRate, "pause", function () {
  var F = FrameRate;

  if (arguments.length > 0) {
    for (var i = 0; i < arguments.length; i++) {
      var fpsTarget = i < 0 || arguments.length <= i ? undefined : arguments[i];

      if (F._sets[fpsTarget]) {
        F._sets[fpsTarget]._paused = true;
        F._isPaused = true;
      }
    }

    for (var d in F._sets) {
      if (!F._sets[d]._paused) {
        F._isPaused = false;
        break;
      }
    }
  } else {
    for (var d in F._sets) {
      F._sets[d]._paused = true;
    }

    F._isPaused = true;
  }

  if (F._isPaused) {
    F._isActive = false;
    window.cancelAnimationFrame(F._RAF);
  }
});

_defineProperty(FrameRate, "resume", function () {
  var F = FrameRate;

  var _currentlyRunning = !F._isPaused;

  if (arguments.length > 0) {
    for (var i = 0; i < arguments.length; i++) {
      var fpsTarget = i < 0 || arguments.length <= i ? undefined : arguments[i];

      if (F._sets[fpsTarget]) {
        F._sets[fpsTarget]._paused = false;
        F._isPaused = false;
      }
    }
  } else {
    for (var d in F._sets) {
      F._sets[d]._paused = false;
    }

    F._isPaused = false;
  }

  if (!_currentlyRunning) {
    F._isActive = true;
    F._RAF = window.requestAnimationFrame(F.tick);
  }
});

_defineProperty(FrameRate, "secondsAsFrames", function (sec) {
  return 1 / sec;
});

_defineProperty(FrameRate, "tick", function () {
  var F = FrameRate; //console.log( 'tick' )

  if (!F._isPaused) {
    for (var h in F._sets) {
      F._sets[h].tick();
    } // call tick again


    window.requestAnimationFrame(F.tick);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (FrameRate);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/FrameRateBase.js":
/*!*****************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/FrameRateBase.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Description:
		-- INTERNAL MODULE --
		This module is used exclusively by FrameRate.  When a method is registered, it instantiaties an instance of this module to hold all methods at a 
		specified frames per second.  Every fps gets a new FrameRateBase instance.
	
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function FrameRateBase(fps) {
  var F = this;
  F.pool = [];
  F.fps = fps;
  F._frameTime = Math.floor(1000 / F.fps);
  F._prevTime = 0;
  F._startTime = 0;
  F._nextTime = 0;
  F._maxLag = 400;
  F._shiftLag = 30;
  F._paused = false;
  F._prevCallTime = Date.now();
  F.diffTime = 0;
}

FrameRateBase.prototype = {
  resume: function resume() {
    var F = this;

    if (F._isPaused) {
      F._startTime = Date.now();
      F._prevCallTime = F._startTime;
      F._prevTime = F._startTime;
      F._nextTime = 0;
      F._isPaused = false;
    }
  },
  tick: function tick() {
    var F = this;

    if (!F._paused) {
      var call = false;
      var now = Date.now();
      var diffTime = now - F._prevTime;

      if (diffTime > F._maxLag) {
        console.log('...lag');
        F._startTime += diffTime - F._shiftLag;
      }

      F._prevTime = now; //+= F.diffTime;

      var elapsedTime = F._prevTime - F._startTime;
      var future = elapsedTime - F._nextTime;

      if (future > 0) {
        F._nextTime += future >= F._frameTime ? future : F._frameTime;
        call = true; // calculates the difference only from last call, not last tick

        F.diffTime = now - F._prevCallTime;
        F._prevCallTime = now;
      } // handle the callbacks


      if (call) F.dispatch();
    }
  },
  dispatch: function dispatch() {
    var F = this;

    for (var i = 0; i < F.pool.length; i++) {
      var obj = F.pool[i];
      obj.handler.call(obj.from, this);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (FrameRateBase);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/Gesture.js":
/*!***********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/Gesture.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GestureBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GestureBase */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureBase.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
// TODO - ? remove gestureBase if no events added
// 		- ? total distance

/**
	@npmpackage
	@class Gesture
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-events">ad-events</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Gesture } from 'ad-events'
		</codeblock>
		<br><br>
		
		This module is used for seamless use of Mouse / Touch Events, such as click vs tap, mousedown vs touch down, etc.  
		This class figures which to use and reports custom events.<br><br>
	
		See {@link GestureEvent} for available events.
*/


var Gesture = new function () {
  var G = this;
  var _targets = [];
  var _disableList = [];

  var _eventPass = document.createEventObject != undefined;

  var _eventLooping = false;
  G._kills = {};
  /* ------------------------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  /**
  	@memberOf Gesture
  	@method add | addEventListener
  	@param {element} target
  		The DOM element
  	@param {string} name
  		The event's name as a String or GestureEvent constant
  	@param {function} handler
  		The function to be called on event trigger
  	@desc
  		Registers an event so that the listener receives notification of an event.
  		
  	@example
  		Gesture.addEventListener( myDiv, GestureEvent.CLICK, handleClick );
  		function handleClick( event ) {
  			console.log( 'Click heard' );
  		}					
  */

  G.add = G.addEventListener = function (target, name, handler) {
    var _gestureBase = getGestureBase(target);

    _gestureBase.register(name, handler);

    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(target, 'cursor', 'pointer'); // OVERWRITES mouseChildren(false) of parent

    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(target, 'pointer-events', 'auto');
  };
  /**
  	@memberOf Gesture
  	@method remove | removeEventListener
  	@param {element} target
  		The DOM element
  	@param {string} name
  		The event's name as a String or GestureEvent constant
  	@param {function} handler
  		The function registered for call on event trigger
  	@desc
  		Unregisters an event of notifications.
  		@example
  		Gesture.removeEventListener ( myDiv, GestureEvent.CLICK, handleClick );					
  */


  G.remove = G.removeEventListener = function (target, name, handler) {
    var _gestureBase = getGestureBase(target);

    if (_gestureBase) {
      _gestureBase.unregister(name, handler);

      if (_gestureBase.eventList.length <= 0) {
        ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(target, 'cursor', 'auto');
      }
    }
  };
  /**
  	@memberOf Gesture
  	@method disable
  	@param {element} target
  		The DOM element
  	@desc
  		Disables a DOM element from responding the mouse/touch/gesture events. For bubbling events, such as click, this will disable its children as well.
  	
  	@example	
  		Gesture.disable( myDiv );
  */


  G.disable = function (target) {
    var gestureBase = getGestureBase(target);

    _disableList.push(gestureBase);

    if (_eventPass) {
      gestureBase.register(GestureEvent.CLICK, handlePassThroughClick);
      ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(target, 'cursor', 'auto');
    } else {
      ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(target, 'pointer-events', 'none');
    }
  };
  /**
  	@memberOf Gesture
  	@method disableChildren
  	@param {element} target
  		The DOM element
  	@desc
  		Disables all child DOM elements from responding the mouse/touch/gesture events. For bubbling events, such as click, this is unnecessary
  		@example
  		Gesture.disableChildren ( myDiv );
  */


  G.disableChildren = function (target) {
    setActiveChildren(target, false);
  };
  /**
  	@memberOf Gesture
  	@method enable
  	@param {element} target
  		The DOM element
  	@desc
  		Enables all a DOM element to responding the mouse/touch/gesture events. For bubbling events, such as click, this will enable its children as well.
  		@example
  		Gesture.disable ( myDiv );
  */


  G.enable = function (target) {
    var gestureBase = getGestureBase(target);

    for (var i = 0; i < _disableList.length; i++) {
      if (gestureBase == _disableList[i]) {
        if (_eventPass) {
          gestureBase.unregister(GestureEvent.CLICK, handlePassThroughClick);
        } else {
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(target, 'pointer-events', 'auto');
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(target, 'cursor', 'pointer');
        }

        break;
      }
    }
  };
  /**
  	@memberOf Gesture
  	@method enableChildren
  	@param {element} target
  		The DOM element
  	@desc
  		Enables all child DOM elements to responding the mouse/touch/gesture events. For bubbling events, such as click, this is unnecessary
  		@example
  		Gesture.enableChildren ( myDiv );
  */


  G.enableChildren = function (target) {
    setActiveChildren(target, true);
  };
  /* ------------------------------------------------------------------------------------------------------------- */
  // PRIVATE METHODS


  function getGestureBase(target) {
    var _gestureBase = null;

    for (var i = 0; i < _targets.length; i++) {
      if (_targets[i].elem === target) {
        _gestureBase = _targets[i];
        break;
      }
    }

    if (!_gestureBase) {
      _gestureBase = createGestureBase(target);
    }

    return _gestureBase;
  }

  function createGestureBase(target) {
    var _gestureBase = new _GestureBase__WEBPACK_IMPORTED_MODULE_0__["default"](target);

    _targets.push(_gestureBase);

    return _gestureBase;
  }

  function setActiveChildren(target, active) {
    var gestureBase = getGestureBase(target);

    if (gestureBase.hasActiveChildren != active) {
      gestureBase.hasActiveChildren = active;
      var children = gestureBase.elem.getElementsByTagName('*');

      for (var i = 0; i < children.length; i++) {
        //console.log( typeof children[i], ' ; ', children[i].id )
        // gets only the children, not grand-children
        if (children[i].parentNode == target) {
          active ? G.enable(children[i]) : G.disable(children[i]);
        }
      }
    }
  }

  function getNextLayerElement(target, x, y, list) {
    target.style.visibility = 'hidden';
    list.push(target);
    var elem = document.elementFromPoint(x, y); //console.log( 'elementFromPoint() : ', elem.id );

    for (var i = 0; i < _disableList.length; i++) {
      //console.log( ' => disable list: ', i, ' : ', _disableList[i].elem.id )
      if (_disableList[i].elem == elem) {
        //console.log( '  -^ match so go again')
        return getNextLayerElement(elem, x, y, list);
      }
    }

    return elem;
  }

  function getForwardedTarget(event) {
    var hiddenList = [];
    var el = getNextLayerElement(event.target, event.clientX, event.clientY, hiddenList); //console.log( ' returned element: (', event.clientX, ', ', event.clientY, ') ', el.id )
    //console.log( 'hidden list:')

    for (var i = 0; i < hiddenList.length; i++) {
      //console.log( '  -> ', i, ' ', hiddenList[i].id )
      hiddenList[i].style.visibility = 'visible';
    }

    hiddenList = [];
    event.stopImmediatePropagation(); //console.log( ' - STOP - ')

    return el;
  }
  /* ------------------------------------------------------------------------------------------------------------- */
  // EVENT HANDLERS
  // IE 9 & 10 needs to have events captured and passed to the next layer dom element


  function handlePassThroughClick(event) {
    //console.log( 'pass through:', event )
    var el = getForwardedTarget(event); // IE 9+

    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(event.type, true, false); //console.log( '     # ', el.id, ' is dispatching ' )

    el.dispatchEvent(evt);
  }
}();
/* harmony default export */ __webpack_exports__["default"] = (Gesture);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureBase.js":
/*!***************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureBase.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ad_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-external */ "./1-build/node_modules/@ff0000-ad-tech/ad-external/index.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var _GestureEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GestureEvent */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureEvent.js");
/**
	@npmpackage
	@class GestureBase

	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-events">ad-events</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { GestureBase } from 'ad-events'
		</codeblock>
		<br><br>
		
		-- INTERNAL MODULE --
		This module is used exclusively by Gesture.  When a dom element has an event listener registered, it creates an instance of this module 
		to hold all the event handlers for the dom element.  Every dom element gets a new GestureBase instance. {@link Gesture}
	
*/




var GestureBase =
/*#__PURE__*/
function () {
  function GestureBase(elem) {
    var G = this;
    G.elem = elem;
    G.hasActiveChildren = true;
    G.debug = false;
    G.eventList = [];
    G._isDragEnabled = false; // isDragging also used for swipe event check

    G._isDragging = false;
    G._give = 2; // offset coordinate for element

    G._oX = 0;
    G._oY = 0; // previous coordinates for drag/swipe

    G._p1X = 0;
    G._p1Y = 0;
    G._p2X = 0;
    G._p2Y = 0; // start coordinate

    G._sX = 0;
    G._sY = 0; // velocity

    G._vX = 0;
    G._vY = 0;
    G._cursor = 'mouse';
    G._start = 'down';
    G._end = 'up';
    G.init();
  }

  var _proto = GestureBase.prototype;

  _proto.init = function init() {
    var G = this;
    if (G.debug) console.log('GestureBase.init()');
    G._handleTouchStart = G._handleTouchStart.bind(G);
    G._handleDown = G._handleDown.bind(G);
    G._handleDrag = G._handleDrag.bind(G);
    G._handleUp = G._handleUp.bind(G);
    G._elemAdd = G.elem.addEventListener.bind(G.elem);
    G._elemRemove = G.elem.removeEventListener.bind(G.elem);

    G._reset();
  } // replace addEventListener so can flag the event type
  ;

  _proto.register = function register(name, handler) {
    var G = this;
    if (G.debug) console.log('GestureBase.register(', name, ')');
    G.eventList.push(name);

    G._checkDragEnabled(); // then actually add the listener


    G._elemAdd(name, handler);
  };

  _proto.unregister = function unregister(name, handler) {
    var G = this;
    if (G.debug) console.log('GestureBase.unregister(', name, ')');
    var index = G.eventList.indexOf(name);

    if (index >= 0) {
      G.eventList.splice(index, 1);
    }

    G._checkDragEnabled();

    G._elemRemove(name, handler);
  }
  /* ------------------------------------------------------------------------------------------------------------- */
  // UTILITY
  ;

  _proto._reset = function _reset() {
    var G = this;
    G._cursor = 'mouse';
    G._start = 'down';
    G._end = 'up';
    G.elem.addEventListener('touchstart', G._handleTouchStart); // listen for both touch and mouse, except on iOS devices

    if (ad_external__WEBPACK_IMPORTED_MODULE_0__["Device"].os != 'ios') G.elem.addEventListener('mousedown', G._handleDown);
  };

  _proto._checkDragEnabled = function _checkDragEnabled() {
    var G = this;
    var hasDragEventIndex = G.eventList.join('').indexOf('onDrag'); // check if it is a drag, therefore enabling dragability

    G._isDragEnabled = hasDragEventIndex > -1;
  } // Android stores things like pageX in an array. This scopes the internally used event properly
  ;

  _proto._getEventScope = function _getEventScope(event) {
    //if( this.debug ) console.log( 'GestureBase._getEventScope(), event:', event );
    // check for existence of changedTouches instead
    //return ( Device.os == 'android' && event instanceof TouchEvent ) ? event.changedTouches[0] : event ;
    return event.changedTouches ? event.changedTouches[0] : event;
  }
  /* ------------------------------------------------------------------------------------------------------------- */
  // WINDOW EVENT ENABLE
  ;

  _proto._add = function _add(type, handler) {
    window.addEventListener(this._cursor + type, handler);
  };

  _proto._remove = function _remove(type, handler) {
    window.removeEventListener(this._cursor + type, handler);
  }
  /* ------------------------------------------------------------------------------------------------------------- */
  // HANLDERS
  ;

  _proto._handleDown = function _handleDown(event) {
    var G = this;
    if (G.debug) console.log('GestureBase._handleDown()');
    _GestureEvent__WEBPACK_IMPORTED_MODULE_2__["startPoint"]();
    G.elem.removeEventListener('touchstart', G._handleTouchStart);
    if (ad_external__WEBPACK_IMPORTED_MODULE_0__["Device"].os != 'ios') G.elem.removeEventListener('mousedown', G._handleDown);
    G._isDragging = false;

    G._add(G._end, G._handleUp);

    G._add('move', G._handleDrag);

    var touch = G._getEventScope(event);

    var mouseX = touch.pageX;
    var mouseY = touch.pageY;
    var elemRect = G.elem.getBoundingClientRect();
    var localOffsetX = mouseX - elemRect.left;
    var localOffsetY = mouseY - elemRect.top;
    var localX = G.elem.x || ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].getCss(G.elem, 'x');
    var localY = G.elem.y || ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].getCss(G.elem, 'y');
    var globalOffsetX = elemRect.left - localX;
    var globalOffsetY = elemRect.top - localY;
    G._oX = globalOffsetX + localOffsetX;
    G._oY = globalOffsetY + localOffsetY;
    var elemPositionX = mouseX - G._oX;
    var elemPositionY = mouseY - G._oY; // reset the dragging vars

    G._sX = G._p1X = G._p2X = mouseX;
    G._sY = G._p1Y = G._p2Y = mouseY;
    /*console.log( 
    	'\n\t_handleDown()',
    	'| mouse:', mouseX, mouseY, 
    	'| localOffset:', localOffsetX, localOffsetY,
    	'| local:', localX, localY,
    	'| globalOffset:', globalOffsetX, globalOffsetY,
    	'| totalOffset:', G._oX, G._oY,
    	'| elemPosition:', elemPositionX, elemPositionY,
    	'\n\n'
    )*/

    localCreateEvent('onPress');

    function localCreateEvent(name) {
      if (_GestureEvent__WEBPACK_IMPORTED_MODULE_2__["stopped"](name)) return;
      var newEvent = new _GestureEvent__WEBPACK_IMPORTED_MODULE_2__["Event"](name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY);
      if (G.debug) console.log(' -> dispatch', name);
      G.elem.dispatchEvent(newEvent);
    }
  };

  _proto._handleUp = function _handleUp(event, bypass) {
    var G = this;
    if (G.debug) console.log('GestureBase._handleUp()');

    G._remove(G._end, G._handleUp);

    G._remove('move', G._handleDrag);

    var touch = G._getEventScope(event);

    var mouseX = touch.pageX;
    var mouseY = touch.pageY;
    var elemRect = G.elem.getBoundingClientRect();
    var localOffsetX = mouseX - elemRect.left;
    var localOffsetY = mouseY - elemRect.top;
    var elemPositionX = mouseX - G._oX;
    var elemPositionY = mouseY - G._oY;
    var eventName;

    if (bypass !== true) {
      localCreateEvent('onRelease');
    }

    var offsetTop = elemRect.top + window.pageYOffset;
    var offsetBottom = offsetTop + elemRect.height;
    var offsetLeft = elemRect.left + window.pageXOffset;
    var offsetRight = offsetLeft + elemRect.width;

    if (G._isDragging) {
      if (G._isDragEnabled) {
        G._dragEndOrSwipe('onDragStop');
      }

      console.log('  -> No CLICK Fired, was dragging');
    } else {
      if (mouseX > offsetLeft && mouseX < offsetRight && mouseY > offsetTop && mouseY < offsetBottom) {
        localCreateEvent('onSelect');
      }
    }

    function localCreateEvent(name) {
      if (_GestureEvent__WEBPACK_IMPORTED_MODULE_2__["stopped"](name)) return;
      var newEvent = new _GestureEvent__WEBPACK_IMPORTED_MODULE_2__["Event"](name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY, 0, 0, G._vX, G._vY);
      if (G.debug) console.log(' -> dispatch', name);
      G.elem.dispatchEvent(newEvent);
    }

    if (G._isDragging) {
      G._dragEndOrSwipe('onSwipe');
    }

    G._reset(); // this prevents the second mouse down on Android


    event.preventDefault();
    _GestureEvent__WEBPACK_IMPORTED_MODULE_2__["endPoint"]();
  }
  /* ------------------------------------------------------------------------------------------------------------- */
  // TOUCH BYPASSING
  // This will stop from both touch and mouse events firing, thus doubling every Gesture Event fired.
  ;

  _proto._handleTouchStart = function _handleTouchStart(event) {
    var G = this;
    if (G.debug) console.log('GestureBase._handleTouchStart()'); // Change the native events to listen for the rest of the system

    G._cursor = 'touch';
    G._start = 'start';
    G._end = 'end';

    G._handleDown(event);
  }
  /* ------------------------------------------------------------------------------------------------------------- */
  // DRAG
  ;

  _proto._handleDrag = function _handleDrag(event) {
    var G = this;
    if (G.debug) console.log('GestureBase._handleDrag()');

    var touch = G._getEventScope(event);

    var mouseX = touch.pageX;
    var mouseY = touch.pageY;
    var diffx1 = mouseX - G._p1X;
    var diffx2 = mouseX - G._p2X;
    G._vX = (diffx2 - diffx1) / 2 + diffx1;
    var diffy1 = mouseY - G._p1Y;
    var diffy2 = mouseY - G._p2Y;
    G._vY = (diffy2 - diffy1) / 2 + diffy1;
    var elemPositionX = mouseX - G._oX;
    var elemPositionY = mouseY - G._oY;
    var elemRect = G.elem.getBoundingClientRect();
    var localOffsetX = mouseX - elemRect.left;
    var localOffsetY = mouseY - elemRect.top;
    /*console.log( 
    	'\t_handleDrag()',
    	'| mouse:', mouseX, mouseY, 
    	'| totalOffset:', G._oX, G._oY,
    	'| elemPosition:', elemPositionX, elemPositionY,
    	'| velocity:', G._vX, G._vY,
    	'| distance:', G._p1X - G._sX, G._p1Y - G._sY
    )*/

    var eventName;

    if (G._isDragging) {
      if (G._isDragEnabled) {
        localCreateEvent('onDrag');
      }
    } else {
      // check the inital movement to register as dragging or just a click
      if (Math.abs(G._sX - mouseX) > G._give || Math.abs(G._sY - mouseY) > G._give) {
        G._isDragging = true;

        if (G._isDragEnabled) {
          // dispatch when offset distance is exceeded
          localCreateEvent('onDragStart');
        }
      }
    }

    function localCreateEvent(name) {
      if (_GestureEvent__WEBPACK_IMPORTED_MODULE_2__["stopped"](name)) return;
      var newEvent = new _GestureEvent__WEBPACK_IMPORTED_MODULE_2__["Event"](name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY, G._p1X - G._sX, G._p1Y - G._sY, G._vX, G._vY);
      if (G.debug) console.log(' -> dispatch', name);
      G.elem.dispatchEvent(newEvent);
    }

    G._p2X = G._p1X;
    G._p1X = mouseX;
    G._p2Y = G._p1Y;
    G._p1Y = mouseY;
  }
  /* ------------------------------------------------------------------------------------------------------------- */
  // DRAG END | SWIPE
  ;

  _proto._dragEndOrSwipe = function _dragEndOrSwipe(type) {
    var G = this;
    if (G.debug) console.log('GestureBase._dragEndOrSwipe()', type);
    if (_GestureEvent__WEBPACK_IMPORTED_MODULE_2__["stopped"](name)) return;
    var elemRect = G.elem.getBoundingClientRect();
    var evt = new _GestureEvent__WEBPACK_IMPORTED_MODULE_2__["Event"](type, G._p1X, G._p1Y, G._p1X - elemRect.left, G._p1Y - elemRect.top, G._p1X - G._oX, G._p1Y - G._oY, // since _xp is assigned after moving, must use _p2X
    G._p2X - G._sX, G._p2Y - G._sY, G._vX, G._vY);
    if (G.debug) console.log(' -> dispatch', type);
    G.elem.dispatchEvent(evt);
  };

  return GestureBase;
}();

/* harmony default export */ __webpack_exports__["default"] = (GestureBase);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureEvent.js":
/*!****************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/GestureEvent.js ***!
  \****************************************************************************/
/*! exports provided: Event, stop, stopped, startPoint, endPoint, OVER, OUT, MOVE, PRESS, RELEASE, CLICK, DRAG, DRAG_START, DRAG_STOP, SWIPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop", function() { return stop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopped", function() { return stopped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startPoint", function() { return startPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endPoint", function() { return endPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OVER", function() { return OVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OUT", function() { return OUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE", function() { return MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRESS", function() { return PRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RELEASE", function() { return RELEASE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLICK", function() { return CLICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG", function() { return DRAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_START", function() { return DRAG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_STOP", function() { return DRAG_STOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWIPE", function() { return SWIPE; });
/**
	@npmpackage
	@class GestureEvent
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-events">ad-events</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { GestureEvent } from 'ad-events'
		</codeblock>
		<br><br>
		
		This module has custom events to be used with the Gesture module. {@link Gesture}
*/
var _kills = {};
var _eventLooping = false;
/**
			@memberOf GestureEvent
			@class GestureEvent.Event
			@param {string} name
				The event type name
			@param {number} mouseGlobalX
				The mouse x on the page
			@param {number} mouseGlobalY
				The mouse y on the page
			@param {number} mouseLocalX
				The mouse x relative to the element position
			@param {number} mouseLocalY
				The mouse y relative to the element position
			@param {number} elementX
				The element x position
			@param {number} elementY
				The element y position
			@param {number} distanceX
				The distance moved on the x, only used for drags and swipes
			@param {number} distanceY
				The distance moved on the y, only used for drags and swipes
			@param {number} velocityX
				The distance moved on the x since previous event fired, essentially the speed
			@param {number} velocityY
				The distance moved on the y since previous event fired, essentially the speed
			@desc
				Creates a new CustomEvent with properties assigned to it, accessible fomr the passed through event to the handler
				
			@example
				Gesture.add ( myDiv, GestureEvent.CLICK, handleClick );
				function handleClick( event ) {
					console.log( event )
					console.log( 'global mouse:', event.mouse.global.x, event.mouse.global.y )
					console.log( 'local mouse:', event.mouse.local.x, event.mouse.local.y )
					console.log( 'element:', event.element.x, event.element.y )
				}	
				Gesture.add ( dragDiv, GestureEvent.DRAG, handleDrag );
				function handleDrag( event ) {
					console.log( event )
					console.log( 'element:', event.element.x, event.element.y )
					console.log( 'distance:', event.distance.x, event.distance.y )
					console.log( 'velocity:', event.velocity.x, event.velocity.y )
				}					
		*/

function createEvent(name, mouseGlobalX, mouseGlobalY, mouseLocalX, mouseLocalY, elementX, elementY, distanceX, distanceY, velocityX, velocityY) {
  var E = new CustomEvent(name);
  E.mouse = {
    global: {
      x: mouseGlobalX,
      y: mouseGlobalY
    },
    local: {
      x: mouseLocalX,
      y: mouseLocalY
    }
  };
  E.element = {
    x: elementX || 0,
    y: elementY || 0
  };
  E.distance = {
    x: distanceX || 0,
    y: distanceY || 0
  };
  E.velocity = {
    x: velocityX || 0,
    y: velocityY || 0
  };
  E.direction = {
    x: velocityX > 0 ? 'right' : velocityX < 0 ? 'left' : null,
    y: velocityY > 0 ? 'down' : velocityY < 0 ? 'up' : null
  };
  return E;
}

var Event = createEvent;

function stopBubble(event) {
  if (event) {
    // For IE, it bubbles custom events
    event.stopImmediatePropagation(); // for all other browsers that do not do that

    _kills[event.type] = true; //console.log( '\n\tGestureEvent.stop() of type:', event.type )
  }
}
/**
		@memberOf GestureEvent
		@method stop
		@param {event} event
			The event parameter from the event handler
		@desc
			Stops all future events of the type during the event loop, is a native equivilent to event.stopImmediatePropogation().
			It does NOT remove any listeners, simply stops the event from bubbling up through the chain.
			
		@example
			Gesture.add ( parentDiv, GestureEvent.CLICK, handleParentClick );
			function handleParentClick( event ) {
				// This will not be heard
				console.log( 'parent click heard' )
			}
			
			Gesture.add ( childDiv, GestureEvent.CLICK, handleChildClick );
			function handleChildClick( event ) {
				GestureEvent.stop ( event )
				console.log( 'child click heard' )
			}					
	*/


var stop = stopBubble;

function isStopped(type) {
  return _kills[type] != undefined;
}

var stopped = isStopped; // A flag for the start of the event loop through all bases

function startPoint() {
  if (!_eventLooping) {
    // the end of event loop has been reached, so reset things
    _eventLooping = true;
    _kills = {};
  }
} // A flag to reset any bubble killing

function endPoint() {
  _eventLooping = false;
}
/**	
	@memberOf GestureEvent	
	@const {string} OVER
	@desc
		Represents a 'mouseover', fired on desktop cursor roll over
	@example
		GestureEvent.OVER
*/

var OVER = 'mouseover';
/**	
	@memberOf GestureEvent	
	@const {string} OUT
	@desc
		Represents a 'mouseout', fired on desktop cursor roll out
	@example
		GestureEvent.OUT
*/

var OUT = 'mouseout';
/**	
	@memberOf GestureEvent	
	@const {string} MOVE
	@desc
		Represents a 'mousemove', fired on desktop cursor move
	@example
		GestureEvent.MOVE
*/

var MOVE = 'mousemove';
/**	
	@memberOf GestureEvent	
	@const {string} PRESS
	@desc
		Represents an 'onPress', fired on mousedown / touch start
	@example
		GestureEvent.PRESS
*/

var PRESS = 'onPress';
/**	
	@memberOf GestureEvent	
	@const {string} RELEASE
	@desc
		Represents an 'onRelease', fired on mouseup / touch end
	@example
		GestureEvent.RELEASE
*/

var RELEASE = 'onRelease';
/**	
	@memberOf GestureEvent	
	@const {string} CLICK
	@desc
		Represents a 'click', fired on click / touch end
	@example
		GestureEvent.CLICK
*/

var CLICK = 'onSelect';
/**	
	@memberOf GestureEvent	
	@const {string} DRAG
	@desc
		Represents an 'onDrag', fired after an element is selected and before released. <br>
		Element data objects included: selection position, element position, velocity of move	
	@example
		GestureEvent.DRAG
*/

var DRAG = 'onDrag';
/**	
	@memberOf GestureEvent	
	@const {string} DRAG_START
	@desc
		Represents an 'onDragStart', fired after an element is selected, when first moved and before released. <br>
		Element data objects included: selection position, element position
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.DRAG_START, handleDragStart );
		//
		function handleDragStart ( event ){
			// coordinate position of mouse/touch
			console.log( event.position );

			// coordinate position of target element
			console.log( event.element );
		}
*/

var DRAG_START = 'onDragStart';
/**	
	@memberOf GestureEvent	
	@const {string} DRAG_STOP
	@desc
		Represents an 'onDragStop', fired after an element is selected, moved, then released. <br>
		Element data objects included: selection position, velocity of last move
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.DRAG_STOP, handleDragStop );
		//
		function handleDragStop ( event ){
			// coordinate position of mouse/touch
			console.log( event.position );

			// velocity, ie change in distance, of target element
			console.log( event.velocity );
		}
*/

var DRAG_STOP = 'onDragStop';
/**	
	@memberOf GestureEvent	
	@const {string} SWIPE
	@desc
		Represents an 'onSwipe', fired just after a DRAG_STOP, but different event properties available. <br>
		Element data objects included: direction, distance, velocity
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.SWIPE, handleSwipe );
		//
		function handleSwipe ( event ){
			// direction of swipe, as strings 
			console.log( event.direction );

			// distance covered from down to release
			console.log( event.distance );

			// velocity, aka speed of swipe
			console.log( event.velocity );
		}
*/

var SWIPE = 'onSwipe';

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/UIEvent.js":
/*!***********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-events/lib/UIEvent.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
	@npmpackage
	@class UIEvent
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-events">ad-events</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIEvent } from 'ad-events'
		</codeblock>
		<br><br>
		
		This module has custom events to be used with the <UIComponents>
*/
var _componentEnabled, _sliderUpdate;

var UIEvent = {
  /**	
  	@memberOf UIEvent	
  	@const {string} ENABLED
  	@desc
  		Represents an 'uiComponentEnabled', fired when the enabled state of a <UIComponent> changes; useful when extending a component.
  	@example
  		UIEvent.ENABLED
  */
  ENABLED: 'uiComponentEnabled',

  /**	
  	@memberOf UIEvent	
  	@const {string} RESIZE
  	@desc
  		Description needed_________.
  	@example
  		UIEvent.RESIZE
  */
  RESIZE: 'uiResize',

  /**	
  	@memberOf UIEvent	
  	@const {string} SLIDER_UPDATE
  	@desc
  		Represents an 'uiSliderUpdate', fired when a <UISlider> changes its value.
  	@example
  		UIEvent.SLIDER_UPDATE
  */
  SLIDER_UPDATE: 'uiSliderUpdate',

  get componentEnabled() {
    if (!_componentEnabled) {
      _componentEnabled = new CustomEvent('uiComponentEnabled');
    }

    return _componentEnabled;
  },

  get sliderUpdate() {
    if (!_sliderUpdate) {
      _sliderUpdate = new CustomEvent('uiSliderUpdate');
    }

    return _sliderUpdate;
  }

};
/* harmony default export */ __webpack_exports__["default"] = (UIEvent);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-external/index.js":
/*!*******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-external/index.js ***!
  \*******************************************************************/
/*! exports provided: Device */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_Device_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Device.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-external/lib/Device.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Device", function() { return _lib_Device_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-external/lib/Device.js":
/*!************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-external/lib/Device.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
	@npmpackage
	@class Device
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-external">ad-external</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Device } from 'ad-external'
		</codeblock>
		<br><br>
		
		Global constant that provide information about the Device on which the code is currently executing
*/
var Device =
/*#__PURE__*/
function () {
  function Device() {}

  _createClass(Device, null, [{
    key: "orientation",

    /**	
    	@memberOf Device	
    	@var {string} agentString
    	@desc
    		Current user agent of browser. */

    /**	
    	@memberOf Device	
    	@var {string} brand
    	@desc
    		Brand of device, possible values are: 
    		<code>microsoft</code>, 
    		<code>apple</code>, 
    		<code>android</code>, 
    		<code>rim</code>, 
    		<code>unknown</code>. 
    */

    /**	
    	@memberOf Device	
    	@var {string} product
    	@desc
    		Brand subtype, possible values are: 
    		<code>windows phone</code>, 
    		<code>windows</code>, 
    		<code>iphone</code>, 
    		<code>ipad</code>, 
    		<code>ipod</code>, 
    		<code>mac</code>, 
    		<code>android</code>, 
    		<code>pixel 2</code>, 
    		<code>blackberry</code>. 
    	*/

    /**	
    	@memberOf Device	
    	@var {string} type
    	@desc
    		Device type, possible values are: 
    		<code>mobile</code>, 
    		<code>tablet</code>, 
    		<code>desktop</code>. 
    		<br><br>
    		Windows > 8 currently returns tablet, currently no way to differentiate from desktop. */

    /**	
    	@memberOf Device	
    	@var {string} os
    	@desc
    		Operating system of device. */

    /**	
    	@memberOf Device	
    	@var {string} osVersion
    	@desc
    		Version of operating system of device. */

    /** 	
    	@memberOf Device	
    	@var {string} browser
    	@desc
    		Brand of browser. */

    /**	
    	@memberOf Device	
    	@var {string} browserVersion
    	@desc
    		Version of browser. 
    */

    /**	
    	@memberOf Device	
    	@var {string} pixelRatio
    	@desc
    		Pixel ratio of device viewport. 
    */

    /** ------------------------------------------------------------------------------------------------------------- */
    // GETTERS

    /**	
    	@memberOf Device	
    	@var {string} orientation
    	@desc
    		Orientaion of device viewport: landscape or portrait. 
    */
    get: function get() {
      return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
    /**	
    	@memberOf Device	
    	@var {object} dimensions
    	@property {number} width
    		window inner-width
    	@property {number} height
    		window inner-height
    	@desc
    		The current dimensions of the device's viewport, returns an object with a width and height 
    		value that are direct returns of windowWidth and windowHeight.
    */

  }, {
    key: "dimensions",
    get: function get() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    /** ------------------------------------------------------------------------------------------------------------- */
    // PUBLIC METHODS

    /**	
    	@memberOf Device	
    	@method init
    	@desc
    		Initializes the module, which is called from within the pipeline.
    */

  }]);

  return Device;
}();

_defineProperty(Device, "pixelRatio", window.devicePixelRatio || 'unknown');

_defineProperty(Device, "init", function () {
  console.log('Device.init()');
  var D = this;
  D.agentString = navigator.userAgent;

  D._getType();

  D._getBrandAndOS();

  D._getBrowser();

  if (D.type !== 'desktop' && D.os === 'windows' && D.osVersion <= 8 && D.browser === 'ie' && D.browserVersion < 12) {
    console.log("You appear to be on Windows 7 or 8 using Internet Explorer 11 or under. You also appear to be on a touchscreen device. We will assume you're actually on a desktop, since it's extremely unlikely you're on a tablet or mobile device using this specific operating system and browser.");
    D.type = 'desktop';
  }

  var line = Array(70).join('-');
  var str = '\n' + line; // str += '\n AGENT:\n\n\t' + D.agentString + '\n'
  // str += '\n  Brand:\t\t\t' + D.brand
  // str += '\n  Product:\t\t\t' + D.product
  // str += '\n  Type:\t\t\t\t' + D.type
  // str += '\n  Os:\t\t\t\t' + D.os + ' - ' + D.osVersion
  // str += '\n  Browser:\t\t\t' + D.browser + ' - ' + D.browserVersion
  // str += '\n  Dimensions: \t\t' + D.dimensions.width + 'x' + D.dimensions.height
  // str += '\n  Orientation:\t\t' + D.orientation
  // str += '\n  Pixel Ratio:\t\t' + D.pixelRatio

  for (var property in D) {
    if (D.hasOwnProperty(property) && typeof D[property] !== 'function') {
      str += '\n' + property + ': ' + D[property];
    }
  }

  str += '\n' + line;
  console.log(str);
});

_defineProperty(Device, "_getType", function () {
  var D = this;
  var hasMobile = /(android|mobile)/gi.exec(D.agentString);
  var hasTablet = /(tablet|touch)/gi.exec(D.agentString);
  var hasIPad = /(ipad)/gi.exec(D.agentString);
  D.type = 'desktop';
  if (hasMobile) D.type = 'mobile';
  if (hasTablet) D.type = 'tablet';
  if (hasIPad) D.type = 'tablet';
});

_defineProperty(Device, "_getBrandAndOS", function () {
  var D = this;
  var apple = D.agentString.match(/ip(hone|od|ad)|mac/gi);

  if (apple) {
    D.brand = 'apple';
    D.product = apple[0].toLowerCase();
    var appleOS = /(OS\s)(\X\s|)([\d\.\_]+)/gi.exec(D.agentString);
    D.os = appleOS[2] == '' ? 'ios' : 'osx';
    D.osVersion = appleOS[3].replace(/\_/g, '.');
    return;
  }

  var android = /(android)\/?\s*([0-9\.]+)/gi.exec(D.agentString);

  if (android) {
    D.brand = D.product = D.os = android[1].toLowerCase();

    D._checkForSpecial('product', ['pixel 2'], D.agentString.split('(')[1].split(')')[0]);

    D.osVersion = android[2];
    return;
  }

  var microsoft = /(windows\snt\s|windows\sphone)\/?\s*([0-9\.]+)/gi.exec(D.agentString);

  if (microsoft) {
    D.brand = 'microsoft';
    D.os = 'windows';

    switch (microsoft[2]) {
      case '5.2':
        D.osVersion = 'xp';
        break;

      case '6.0':
        D.osVersion = 'vista';
        break;

      case '6.1':
        D.osVersion = '7';
        break;

      case '6.2':
        D.osVersion = '8';
        break;

      case '6.3':
        D.osVersion = '8.1';
        break;

      case '10.0':
        D.osVersion = '10';
        break;

      default:
        D.osVersion = microsoft[2];
    }

    D.product = microsoft[1].toLowerCase();

    if (D.product.match(/\snt/i)) {
      D.product = 'pc';
    }

    return;
  } // blackberry


  var blackberry = D.agentString.match(/(blackberry|bb10|playbook)/i);

  if (blackberry) {
    D.brand = D.product = D.os = 'blackberry';
    D.osVersion = /(version)\/?\s*([0-9\.]+)/gi.exec(D.agentString)[2];
  }
});

_defineProperty(Device, "_getBrowser", function () {
  var D = this;
  var browserMatches = /(edge(?=\/))\/?\s*([0-9\.]+)/i.exec(D.agentString); // check for edge first
  // if it's not edge, check for other common browsers

  if (!browserMatches) {
    browserMatches = D.agentString.match(/(fban|fbav|opera|chrome|crios|safari|firefox|msie|trident(?=\/))\/?\s*([0-9\.]+)/i);
  } // if we checked for common browsers and got NOTHING in return, let's just use the device's default browser


  if (!browserMatches || browserMatches.length < 3) {
    console.log('we received no browser data, so we are setting it to the default of the device');

    switch (D.os) {
      case 'ios':
        D.browser = 'safari';
        break;

      case 'windows':
        D.browser = 'trident';
        break;

      default:
        D.browser = 'chrome';
        break;
    }

    D.browserVersion = 'os-default';
    return;
  }

  console.log('we received browser data');
  D.browser = browserMatches[1].toLowerCase();
  D.browserVersion = browserMatches[2];

  switch (D.browser) {
    case 'trident':
      // Check for desktop IE 10
      var versionMatch = /\brv:+(\d+)/g.exec(D.agentString);
      if (versionMatch) D.browserVersion = versionMatch[1];

    case 'msie':
      D.browser = 'ie';
      break;

    case 'crios':
      D.browser = 'chrome';
      break;

    case 'safari':
      var versionMatch = D.agentString.match(/\sversion\/([0-9\.]+)\s/i);
      if (versionMatch) D.browserVersion = versionMatch[1];
      break;

    case 'chrome':
      // check for Opera
      var versionMatch = D.agentString.match(/\b(OPR)\/([0-9\.]+)/i);

      if (versionMatch) {
        D.browser = 'opera';
        D.browserVersion = versionMatch[2];
      }

      break;
  }
});

_defineProperty(Device, "_checkForSpecial", function (targetParam, array, focus) {
  var D = this;
  var param;

  for (var i = 0; i < array.length; i++) {
    param = array[i].toLowerCase();

    if (focus.match(new RegExp(param, 'i'))) {
      D[targetParam] = param;
      break;
    }
  }
});

/* harmony default export */ __webpack_exports__["default"] = (Device);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/index.js":
/*!***************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-geom/index.js ***!
  \***************************************************************/
/*! exports provided: cssToData, Matrix2D, Matrix3D, ParentTransform, SimpleNoise2D, Vector2D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_matrixUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/matrixUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/matrixUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cssToData", function() { return _lib_matrixUtils__WEBPACK_IMPORTED_MODULE_0__["cssToData"]; });

/* harmony import */ var _lib_Matrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Matrix2D */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Matrix2D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix2D", function() { return _lib_Matrix2D__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _lib_Matrix3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/Matrix3D */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Matrix3D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix3D", function() { return _lib_Matrix3D__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _lib_ParentTransform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/ParentTransform */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/ParentTransform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParentTransform", function() { return _lib_ParentTransform__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _lib_SimpleNoise2D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/SimpleNoise2D */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/SimpleNoise2D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleNoise2D", function() { return _lib_SimpleNoise2D__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _lib_Vector2D__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/Vector2D */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Vector2D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector2D", function() { return _lib_Vector2D__WEBPACK_IMPORTED_MODULE_5__["default"]; });








/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Matrix2D.js":
/*!**********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Matrix2D.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _matrixUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrixUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/matrixUtils.js");
/**
	@npmpackage
	@class Matrix2D
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-geom">ad-geom</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Matrix2D } from 'ad-geom'
		</codeblock>
		<br><br>
*/
// Version : Mar 17, 2015 2:15 PM

/*
 * TODO - write Documentation
 *		- convert to  a, c, b, d, tx, ty ?
 *		- inverse?
 */


var Matrix2D = function Matrix2D() {
  var M = this; // initial set identity base matrix array to data

  M.identity = new Float32Array([1, 0, 0, 0, 1, 0]);
  M.data = new Float32Array(M.identity);
};

Matrix2D.prototype = {
  clear: function clear() {
    var M = this; //console.log( M.data instanceof Float32Array )
    //M.data.set ( M.identity );

    M.data = new Float32Array(M.identity);
  },
  rotate: function rotate(radians) {
    var M = this; // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    var c = Math.cos(radians).toFixed(15);
    var s = Math.sin(radians).toFixed(15);
    _m[0] = c;
    _m[1] = s;
    _m[3] = -s;
    _m[4] = c; //  cos(rad),  sin(rad), 0,
    //  -sin(rad), cos(rad), 0,
    //  0,         0,        1

    M.multiply(_m, false);
    return M;
  },
  scale: function scale(x, y) {
    var M = this; // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[0] = x;
    _m[4] = y; //  x, 0, 0,
    //  0, y, 0,
    //  0, 0, 1

    M.multiply(_m, false);
    return M;
  },
  skew: function skew(ax, ay) {
    var M = this; // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[1] = Math.tan(ax);
    _m[3] = Math.tan(ay); //  1,       tan(ax), 0,
    //  tan(ay), 1,       0,
    //  0,       0,       1

    M.multiply(_m);
    return M;
  },
  translate: function translate(x, y) {
    var M = this; // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[2] = x || 0;
    _m[5] = y || 0; //  1, 0, x,
    //  0, 1, y,
    //  0, 0, 1

    M.multiply(_m, true);
    return M;
  },
  multiply: function multiply(m, invert) {
    var M = this; // copy the current matrix data into '_c'

    var _copy = new Float32Array(M.data); // translate multiply needs to be inverted, where others do not


    var a = invert ? m : _copy;
    var b = invert ? _copy : m;

    for (var i = 0; i < 6; i++) {
      var k = Math.floor(i / 3) * 3;
      var q = i % 3; //console.log( i, '-', a[_a], b[_b], a[_a+1], b[_b+3], a[_a+2], b[_b+6] )

      M.data[i] = a[k] * b[q] + a[k + 1] * b[q + 3];
    }

    M.data[2] += a[2];
    M.data[5] += a[5]; // a[0] * b[0] + a[1] * b[3] + a[2] * 0
    // a[0] * b[1] + a[1] * b[4] + a[2] * 0
    // a[0] * b[2] + a[1] * b[5] + a[2] * 1
    // a[3] * b[0] + a[4] * b[3] + a[2] * 0
    // a[3] * b[1] + a[4] * b[4] + a[2] * 0
    // a[3] * b[2] + a[4] * b[5] + a[5] * 1
    // 0
    // 0
    // 1
  },
  getCss: function getCss() {
    // a, c, tx
    // b, d, ty
    // 0, 0, 1
    // matrix(a, c, b, d, tx, ty)
    var d = this.data;
    return "matrix(" + d[0] + "," + d[1] + "," + d[3] + "," + d[4] + "," + d[2] + "," + d[5] + ")";
  },
  getX: function getX() {
    return this.data[2];
  },
  getY: function getY() {
    return this.data[5];
  },
  setFromCss: function setFromCss(matrixString) {
    // const cssMatrix = matrixString
    // 	.match(/\(([^\)]+)\)/)[1]
    // 	.replace(/\s/g, '')
    // 	.split(',')
    // 	.map(Number)
    var matrixArray = Object(_matrixUtils__WEBPACK_IMPORTED_MODULE_0__["cssToData"])(matrixString);
    this.setFromArray(matrixArray);
  },
  setFromArray: function setFromArray(matrixArray) {
    this.data = [matrixArray[0], matrixArray[1], matrixArray[4], matrixArray[2], matrixArray[3], matrixArray[5]];
  }
}; //http://www.wikihow.com/Inverse-a-3X3-Matrix

/*function getMatrixInverse (m){	
	var t = [
		m[0], m[3], m[6], 
		m[1], m[4], m[7],
		m[2], m[5], m[8]
	];

	// 0,  1,  2,
	// 3,  4,  5,
	// 6,  7,  8

	// a,  b,  0 
	// c,  d,  0
	// tx, ty, 1
	console.log( m );
	console.log( t );
	
	[
		m[4],	-m[1],	m[1] * m[5] - m[4] * m[2],
		-m[3],	m[0],	(m[0] * m[5] - m[3] * m[2]) * -1,
		0,		0,		m[0] * m[4] - m[3] * m[1]
	]

	var d11 = m[4]
	var d12 = - m[1]
	var d13 = m[1] * m[5] - m[4] * m[2]
	var d21 = - m[3]
	var d22 = m[0]
	var d23 = (m[0] * m[5] - m[3] * m[2]) * -1
	var d31 = 0 
	var d32 = 0
	var d33 = m[0] * m[4] - m[3] * m[1]

	var d11 = t[4]
	var d12 = - t[3]
	var d13 = t[3] * t[7] - t[4] * t[6]
	var d21 = - t[1]
	var d22 = t[0]
	var d23 = (t[0] * t[7] - t[1] * t[6]) * -1
	var d31 = 0 
	var d32 = 0
	var d33 = t[0] * t[4] - t[1] * t[3]

	var d11 = t[4] * t[8] - t[5] * t[7]
	var d12 = (t[3] * t[8] - t[5] * t[6]) * -1
	var d13 = t[3] * t[7] - t[4] * t[6]
	var d21 = (t[1] * t[8] - t[2] * t[7]) * -1
	var d22 = t[0] * t[8] - t[2] * t[6]
	var d23 = (t[0] * t[7] - t[1] * t[6]) * -1
	var d31 = t[1] * t[5] - t[2] * t[4]
	var d32 = (t[0] * t[5] - t[2] * t[3]) * -1
	var d33 = t[0] * t[4] - t[1] * t[3]



	return [ d11, d12, d13, d21, d22, d23, d31, d32, d33 ];
}*/

/* harmony default export */ __webpack_exports__["default"] = (Matrix2D);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Matrix3D.js":
/*!**********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Matrix3D.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _matrixUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrixUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/matrixUtils.js");
/**
	@npmpackage
	@class Matrix3D
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-geom">ad-geom</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Matrix3D } from 'ad-geom'
		</codeblock>
		<br><br>
*/


var Matrix3D = function Matrix3D() {
  var M = this; // initial set identity base matrix array to data

  M.identity = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  M.data = new Float32Array(M.identity);
};

Matrix3D.prototype = {
  clear: function clear() {
    var M = this;
    M.data.set(M.identity);
  },
  rotateX: function rotateX(radians) {
    var M = this;
    var c = Math.cos(radians).toFixed(15);
    var s = Math.sin(radians).toFixed(15); // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[5] = c;
    _m[6] = s;
    _m[9] = -s;
    _m[10] = c; //  1, 0,        0,         0,
    //  0, cos(rad), sin(rad), 0,
    //  0, -sin(rad), cos(rad),  0,
    //  0, 0,        0,         1

    M.multiply(_m);
    return M;
  },
  rotateY: function rotateY(radians) {
    var M = this;
    var c = Math.cos(radians).toFixed(15);
    var s = Math.sin(radians).toFixed(15); // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[0] = c;
    _m[2] = -s;
    _m[8] = s;
    _m[10] = c; //  cos(rad),  0, -sin(rad), 0,
    //  0,         1, 0,        0,
    //  sin(rad), 0, cos(rad), 0,
    //  0,         0, 0,        1

    M.multiply(_m);
    return M;
  },
  rotateZ: function rotateZ(radians) {
    var M = this;
    var c = Math.cos(radians).toFixed(15);
    var s = Math.sin(radians).toFixed(15); // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[0] = c;
    _m[1] = s;
    _m[4] = -s;
    _m[5] = c; //  cos(rad),  sin(rad), 0, 0,
    //  -sin(rad), cos(rad), 0, 0,
    //  0,         0,        1, 0,
    //  0,         0,        0, 1

    M.multiply(_m);
    return M;
  },
  scale: function scale(x, y) {
    var M = this; // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[0] = x;
    _m[5] = y; //  x, 0, 0, 0,
    //  0, y, 0, 0,
    //  0, 0, 1, 0,
    //  0, 0, 0, 1

    M.multiply(_m);
    return M;
  },
  skew: function skew(ax, ay) {
    var M = this; // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[1] = Math.tan(ay) || 0;
    _m[4] = Math.tan(ax) || 0; //  1,       tan(ay), 0, 0,
    //  tan(ax), 1,       0, 0,
    //  0,       0,       1, 0,
    //  0,       0,       0, 1

    M.multiply(_m);
    return M;
  },
  translate: function translate(x, y, z) {
    var M = this; // copy the identity to be modified

    var _m = new Float32Array(M.identity);

    _m[12] = x || 0;
    _m[13] = y || 0;
    _m[14] = z || 0; //  1, 0, 0, 0,
    //  0, 1, 0, 0,
    //  0, 0, 1, 0,
    //  x, y, z, 1

    M.multiply(_m);
    return this;
  },
  multiply: function multiply(m) {
    var M = this; // copy the current matrix data into '_c'

    var _c = new Float32Array(M.data);

    for (var i = 0; i < 15; i++) {
      var q = Math.floor(i / 4) * 4;
      var t = i % 3;

      if ((i - 3) % 4) {
        M.data[i] = _c[q] * m[t] + _c[q + 1] * m[t + 4] + _c[q + 2] * m[t + 8];

        if (i > 11) {
          M.data[i] += m[i];
        }
      } else {
        M.data[i] = 0;
      }
    }

    M.data[15] = 1; // M.data[0] = _c[0] * m[0] + _c[1] * m[4] + _c[2] * m[8]
    // M.data[1] = _c[0] * m[1] + _c[1] * m[5] + _c[2] * m[9]
    // M.data[2] = _c[0] * m[2] + _c[1] * m[6] + _c[2] * m[10]
    // M.data[3] = 0
    // M.data[4] = _c[4] * m[0] + _c[5] * m[4] + _c[6] * m[8]
    // M.data[5] = _c[4] * m[1] + _c[5] * m[5] + _c[6] * m[9]
    // M.data[6] = _c[4] * m[2] + _c[5] * m[6] + _c[6] * m[10]
    // M.data[7] = 0
    // M.data[8] = _c[8] * m[0] + _c[9] * m[4] + _c[10] * m[8]
    // M.data[9] = _c[8] * m[1] + _c[9] * m[5] + _c[10] * m[9]
    // M.data[10] = _c[8] * m[2] + _c[9] * m[6] + _c[10] * m[10]
    // M.data[11] = 0
    // M.data[12] = _c[12] * m[0] + _c[13] * m[4] + _c[14] * m[8] + m[12]
    // M.data[13] = _c[12] * m[1] + _c[13] * m[5] + _c[14] * m[9] + m[13]
    // M.data[14] = _c[12] * m[2] + _c[13] * m[6] + _c[14] * m[10] + m[14]
    // M.data[15] = 1
  },
  getCss: function getCss() {
    return "matrix3d(" + this.data.join(',') + ")";
  },
  getX: function getX() {
    return this.data[12];
  },
  getY: function getY() {
    return this.data[13];
  },
  getZ: function getZ() {
    return this.data[14];
  },
  setFromCss: function setFromCss(matrixString) {
    var matrixArray = Object(_matrixUtils__WEBPACK_IMPORTED_MODULE_0__["cssToData"])(matrixString);
    this.setFromArray(matrixArray);
  },
  setFromArray: function setFromArray(matrixArray) {
    var M = this; // check for transform: translate3d(0px, 45px, -100px) format
    // only happens when only changing Z with no rotation or skew

    if (matrixArray.length === 3) {
      M.translate.apply(M, matrixArray);
    } else {
      M.data = new Float32Array(matrixArray);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Matrix3D);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/ParentTransform.js":
/*!*****************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/ParentTransform.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Matrix2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Matrix2D */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Matrix2D.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/**
	@npmpackage
	@class ParentTransform
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-geom">ad-geom</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { ParentTransform } from 'ad-geom'
		</codeblock>
		<br><br>
*/
// pseudo?
// TODO - change order of translations, possible seperate methods that have indexes which can be a re-orderable aray
//		- convert to prototype pattern for multiple instances?



var ParentTransform = function ParentTransform(arg) {
  var self = this;
  arg = arg || {}
  /* --------------------------------------------------------------------------- */
  // PUBLIC / PASSED-IN VARIABLES
  ;
  self.rotation = arg.rotation || 0, // in degrees, gets converted to radians before passing to Matrix2D
  self.x = arg.x || 0, self.y = arg.y || 0, self.scaleX = arg.scaleX || 1, self.scaleY = arg.scaleY || 1, self.originX = arg.originX || 0, self.originY = arg.originY || 0;
  self.points = arg.points || [];
  /* --------------------------------------------------------------------------- */
  // PUBLIC

  self.calculatedPoints = [];
  /* --------------------------------------------------------------------------- */
  // PRIVATE VARIABLES

  var _matrix = new _Matrix2D__WEBPACK_IMPORTED_MODULE_0__["default"]();

  console.log(_matrix);
  /* --------------------------------------------------------------------------- */
  // PUBLIC METHODS

  self.addPoint = function (toAdd) {
    self.points.push(toAdd);
  };

  self.addPoints = function (toAdd) {
    self.points = self.points.concate(toAdd);
  };

  self.update = function (callback) {
    _matrix.clear();

    _matrix.translate(self.x, self.y);

    _matrix.scale(self.scaleX, self.scaleY);

    _matrix.rotate(ad_utils__WEBPACK_IMPORTED_MODULE_1__["MathUtils"].toRadians(self.rotation));

    self.calculatedPoints = [];

    for (var i = 0; i < this.points.length; i++) {
      var newPt = transformPoint(self.points[i]);
      self.calculatedPoints.push(newPt);
    }

    if (callback) callback(self.calculatedPoints);
    return self.calculatedPoints;
  };
  /* --------------------------------------------------------------------------- */
  // PRIVATE METHODS


  function transformPoint(point) {
    /*console.log( "x:", x, "y:", y )
    console.log( "------------------------")
    console.log( mtx[0], mtx[1], mtx[2] );
    console.log( mtx[3], mtx[4], mtx[5] );
    console.log( 0, 0, 1 );
    console.log( "------------------------")
    */
    var _offSetX = point[0] - self.originX;

    var _offSetY = point[1] - self.originY;

    var _newX = _offSetX * _matrix.data[0] + _offSetY * _matrix.data[3] + _matrix.data[2];

    var _newY = _offSetX * _matrix.data[1] + _offSetY * _matrix.data[4] + _matrix.data[5];

    _newX += self.originX;
    _newY += self.originY;
    return [_newX, _newY];
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ParentTransform);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/SimpleNoise2D.js":
/*!***************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/SimpleNoise2D.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector2D */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Vector2D.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
    @npmpackage
    @class SimpleNoise2D
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-geom">ad-geom</a>
        <br>
		<codeblock>
			// importing into an ES6 class
			import { SimpleNoise2D } from 'ad-geom'
		</codeblock>
		<br><br>
        
        SimpleNoise2D is a workaround for creating 2D noise with lightweight code. 
        It returns a {@link Vector2D} with x and y values between -0.5 - 0.5.
        For a more sophisticated purpose, please use Perline Noise https://github.com/josephg/noisejs
*/


var SimpleNoise2D = function SimpleNoise2D() {};

_defineProperty(SimpleNoise2D, "rx", []);

_defineProperty(SimpleNoise2D, "ry", []);

_defineProperty(SimpleNoise2D, "MAX_VERTICES", 256);

_defineProperty(SimpleNoise2D, "MAX_VERTICES_MASK", 255);

_defineProperty(SimpleNoise2D, "get", function (x, y) {
  return new _Vector2D__WEBPACK_IMPORTED_MODULE_0__["default"](SimpleNoise2D._getVal('x', x), SimpleNoise2D._getVal('y', y));
});

_defineProperty(SimpleNoise2D, "_init", function () {
  for (var i = 0; i < SimpleNoise2D.MAX_VERTICES; ++i) {
    if (i === SimpleNoise2D.MAX_VERTICES - 1) {
      SimpleNoise2D.rx.push(SimpleNoise2D.rx[0]);
      SimpleNoise2D.ry.push(SimpleNoise2D.ry[0]);
    }

    SimpleNoise2D.rx.push(Math.random() - 0.5);
    SimpleNoise2D.ry.push(Math.random() - 0.5);
  }
});

_defineProperty(SimpleNoise2D, "_lerp", function (a, b, t) {
  return a * (1 - t) + b * t;
});

_defineProperty(SimpleNoise2D, "_getVal", function (axis, index) {
  if (SimpleNoise2D.rx.length == 0) SimpleNoise2D._init();
  var vals = axis === 'x' ? SimpleNoise2D.rx : SimpleNoise2D.ry;
  index = index % SimpleNoise2D.MAX_VERTICES;
  var t = index - ~~index;
  var step = t * t * (3 - 2 * t);
  var min = ~~index & SimpleNoise2D.MAX_VERTICES_MASK;
  var max = min + 1 & SimpleNoise2D.MAX_VERTICES_MASK;
  return SimpleNoise2D._lerp(vals[min], vals[max], step);
});

/* harmony default export */ __webpack_exports__["default"] = (SimpleNoise2D);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Vector2D.js":
/*!**********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/Vector2D.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/** 
	@npmpackage
	@class Vector2D
	@param {number} x
	@param {number} y
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-geom">ad-geom</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Vector2D } from 'ad-geom'
		</codeblock>
		<br><br>

		A simple 2D Vector classs 
	@example
		var myVector1 = new Vector2D( 0, 320 );
		var myVector2 = new Vector2D( -3, 5.5 );
*/


var Vector2D =
/*#__PURE__*/
function () {
  function Vector2D(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  /** 
  	@memberOf Vector2D
  	@method add
  	@param {Vector2D} v
  	@returns {Vector2D}
  	@desc
  		Adds another vector to itself
  	@example
          	myVector1.add( myVector2 );
  */


  var _proto = Vector2D.prototype;

  _proto.add = function add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  /** 
  	@memberOf Vector2D
  	@method sub
  	@param {Vector2D} v
  	@returns {Vector2D}
  	@desc
  		Subtracts another vector from itself
  		@example
          	myVector1.sub( myVector2 );
     */
  ;

  _proto.sub = function sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  /** 
  	@memberOf Vector2D
  	@method dist
  	@param {Vector2D} v
  	@returns {number} The distance between two vectors as locations
  	@example
          	var distance = myVector.dist( myVector2 );
     */
  ;

  _proto.dist = function dist(v) {
    var x = this.x - v.x;
    var y = this.y - v.y;
    return Math.sqrt(x * x + y * y);
  }
  /** 
  	@memberOf Vector2D
  	@method mult
  	@param {number} s 
  	@desc
  		Multiplies X and Y of the vector by s
  	@example
          	myVector.mult( 10.3 );
     */
  ;

  _proto.mult = function mult(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }
  /** 
  	@memberOf Vector2D
  	@method div
  	@param {number} s
  	@returns {Vector2D}
  	@desc
  		Divides X and Y of the vector by s
  	@example
          	myVector.div( 2 );
     */
  ;

  _proto.div = function div(s) {
    this.x /= s;
    this.y /= s;
    return this;
  }
  /** 
  	@memberOf Vector2D
  	@method limit
  	@param {number} s
  	@returns {Vector2D}
  	@desc
  		Limits the length of the vector if it's longer than s
  	@example
          	myVector.limit( 18.2 );
     */
  ;

  _proto.limit = function limit(s) {
    var m = this.length();

    if (m > s) {
      this.mult(s / m);
    }

    return this;
  }
  /** 
  	@memberOf Vector2D
  	@method length
  	@returns {number} The length of the vector.
  	@example
          	var length = myVector.length();
     */
  ;

  _proto.length = function length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /** 
  	@memberOf Vector2D
  	@method normalize
  	@returns {Vector2D}
  	@desc
  		Normalizes the vector( ie scale the vector to length of 1 )
  	@example
          	myVector.normalize();
     */
  ;

  _proto.normalize = function normalize() {
    var ratio = 1 / this.length();
    return this.mult(ratio);
  }
  /** 
  	@memberOf Vector2D
  	@method clone
  	@returns {Vector2D}
  	@desc
  		Creates a new Vector2D with and same x and y
  	@example
          	var newVecotor = myVector.clone();
     */
  ;

  _proto.clone = function clone() {
    return new Vector2D(this.x, this.y);
  }
  /** 
  	@memberOf Vector2D
  	@method degreeToVector
  	@returns {Vector2D}
  	@desc
  		Converts a degree 0 - 360 to a normalized vector
  	@example
  	    	var myVecotor = Vector2D.degreeToVector( 45 );
  */
  ;

  Vector2D.degreeToVector = function degreeToVector(d) {
    var theta = ad_utils__WEBPACK_IMPORTED_MODULE_0__["MathUtils"].toRadians(d);
    return new Vector2D(Math.cos(theta), Math.sin(theta));
  }
  /** 
  	@memberOf Vector2D
  	@method random
  	@param {number} degreeIncrement
  		Optional, the degree increment of the random vector, defaults to 0.01
  	@returns {Vector2D}
  	@desc
  		Returns a random normalized vector 
  	@example
  		var myVecotor1 = Vector2D.random();
  		var myVecotor2 = Vector2D.random( 1 );
  */
  ;

  Vector2D.random = function random(degreeIncrement) {
    var inc = degreeIncrement || 0.01;
    return Vector2D.degreeToVector(ad_utils__WEBPACK_IMPORTED_MODULE_0__["MathUtils"].random(0, 360, inc));
  };

  return Vector2D;
}();

/* harmony default export */ __webpack_exports__["default"] = (Vector2D);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/matrixUtils.js":
/*!*************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-geom/lib/matrixUtils.js ***!
  \*************************************************************************/
/*! exports provided: cssToData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssToData", function() { return cssToData; });
function cssToData(matrixString) {
  // |px = checks for transform: translate3d(0px, 45px, -100px) format
  // only happens when only changing Z with no rotation or skew
  // will return only 3 numbers. Matrix3D knows how to consume
  return matrixString.match(/\(([^\)]+)\)/)[1].replace(/\s|px/g, '').split(',').map(Number);
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/index.js":
/*!***************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/index.js ***!
  \***************************************************************/
/*! exports provided: LoaderUtils, ImageLoader, InlineLoader, DataLoader, FontLoader, setTicker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Loader; });
/* harmony import */ var ad_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-global */ "ad-global");
/* harmony import */ var ad_global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ad_global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/mixin/LoaderBase.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderBase.js");
/* harmony import */ var _lib_mixin_LoaderUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/mixin/LoaderUtils.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "LoaderUtils", function() { return _lib_mixin_LoaderUtils_js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _lib_single_ImageLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/single/ImageLoader.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/ImageLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return _lib_single_ImageLoader_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _lib_single_InlineLoader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/single/InlineLoader.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/InlineLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InlineLoader", function() { return _lib_single_InlineLoader_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _lib_single_DataLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/single/DataLoader.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/DataLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataLoader", function() { return _lib_single_DataLoader_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _lib_single_FontLoader_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/single/FontLoader.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/FontLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontLoader", function() { return _lib_single_FontLoader_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _lib_mixin_LoaderTickerMixin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/mixin/LoaderTickerMixin.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderTickerMixin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTicker", function() { return _lib_mixin_LoaderTickerMixin_js__WEBPACK_IMPORTED_MODULE_7__["setTicker"]; });

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @class Loader
 * @param {string|array|Loader} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} prioritize
 * @property {boolean} cacheBuster
 * @property {object} scope
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} prepend
 * 	A file path to be added to all loader targets.
 * @property {function} platformGetUrl
 * 	A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>.
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>jpg</code>, <code>svg</code>.
 * @desc
 * This class is designed to handle all load processes: images, fonts and data, even other Loaders! Below are multiple use case scenarios.
 * <br><br>
 * <b>Single Load:</b>
 * <codeblock>
 * import { Loader } from 'ad-load'
 *
 * var singleLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })
 * singleLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * </codeblock>
 * <br><br>
 * <b>Array of loads from one Constructor:</b>
 * <codeblock>
 * // Array load - you can pass in multiple files on creation of a Loader
 * var arrayLoader = new Loader(['font1.ttf', 'font2.ttf'], { name:'fontLoader', onComplete:handleLoadComplete, prepend:adParams.commonPath + 'fonts/' })
 * arrayLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * </codeblock>
 * <br><br>
 * <b>Complex Load:</b>
 * <codeblock>
 * var myLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })
 *
 * // append to that loader
 * myLoader.add('images/img1.jpg')
 *
 * // append multiple
 * myLoader.add(['images/img2.jpg', 'images/img3.jpg'])
 * myLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log( target.content[0].dataRaw )
 * }
 * </codeblock>
 * <br><br>
 * <b>Nested Loads:</b>
 * <codeblock>
 * // Nested loads - best practice is to make a loader for one file type
 * var masterLoader = new Loader({ name:'master', onComplete:handleAllComplete, onProgress:handleAllProgress, onFail:handleLoadFail, scope:this })
 *
 * // declare a var to reference later, then add it to main loader
 * var _imgLoader = new Loader(['images/img2.jpg', 'images/img3.jpg'], { name:'load_images', prepend:'images/' })
 * masterLoader.add(_imgLoader)
 *
 * // or just add a new loader instance
 * masterLoader.add(
 * 	new Loader(['font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend: 'fonts/' })
 * )
 * masterLoader.add(
 * 	new Loader(['AdData.js', 'Align.js', 'Clamp.js'], { name:'load_js', prepend: 'utils/' })
 * )
 * masterLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * function handleLoadProgress(target) {
 * 	console.log(target.progress, target.rawProgress)
 * }
 * function handleLoadFail(target) {
 * 	console.log(target);
 * }
 * function handleAllComplete(target) {
 * 	var a = target.getLoader(_imgLoader)
 * 	console.log("Loader found by var:", a)
 *
 * 	var b = target.getContent('font1.ttf')
 * 	console.log("Content found by name:", b)
 *
 * 	var c = target.getLoader('load_fonts')
 * 	console.log("Loader found by url:", c)
 * }
 * </codeblock>
 */

/* TODO
	- change getAllContent() to take secret boolean so can call getAllContentRaw(true) for no extra loop
	- ? comment out progress calculations
*/










var Loader =
/*#__PURE__*/
function (_LoaderBase) {
  _inheritsLoose(Loader, _LoaderBase);

  function Loader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _LoaderBase.call.apply(_LoaderBase, [this].concat(args)) || this;
    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

    var L = _assertThisInitialized(_this);

    L._queue = {};
    L._total = 0;
    L._active = false;
    L._startedCount = 0;
    L.prepend = arg.prepend || '';
    L.platformGetUrl = arg.platformGetUrl;
    L.fileType = arg.fileType || null;
    L.content = [];
    L.crossOrigin = arg.crossOrigin || undefined;
    L.add(arguments[0]);
    return _this;
  }
  /* ---------------------------------------------------------------------------------------------------------------- */
  // PUBLIC

  /**
   * @memberOf Loader
   * @method add
   * @param {string|array|Loader} arg
   * 	a file, array of files, or Loader instance
   * @desc
   * 	Add to the load queue: a single or array of files or even another Loader.
   * @example
   * // Single load
   * var imgLoader = new Loader({ name:'img_loader' })
   *
   * // add to that loader
   * imgLoader.add('images/img1.jpg')
   *
   * // add multiple
   * imgLoader.add(['images/img2.jpg', 'images/img3.jpg'])
   *
   * // Nested loads - best practice is to make a loader for one file type
   * var mainLoader = new Loader({ name:'main', onComplete:handleComplete })
   *
   * mainLoader.add(imgLoader)
   *
   * // or just add a new loader instance
   * mainLoader.add(new Loader(['font1.ttf', 'font2.ttf'], { name:'load_fonts' }))
   */


  var _proto = Loader.prototype;

  _proto.add = function add(arg) {
    var L = this;

    if (typeof arg === 'string') {
      // single load as first parameter
      L._addSingleLoad(arg);
    } else if (arg instanceof Array) {
      // first parameter is an Array of urls
      for (var i = 0; i < arg.length; i++) {
        L._addSingleLoad(arg[i]);
      }
    } else if (arg instanceof Loader) {
      if (arg.content && arg.content[0] && arg.content[0].fileType == 'fba') {
        L._addFbaSubLoads(arg.content[0]);
      } else {
        L._addSubLoad(arg);
      }
    }
  }
  /**
   * @memberOf Loader
   * @method load
   * @desc
   * 	Starts the load process.
   * @example
   * // Single load
   * var imgLoader = new Loader({ onComplete:handleComplete })
   * imgLoader.load()
   */
  ;

  _proto.load = function load() {
    var L = this;
    L._active = true;

    if (L._total <= 0) {
      console.log('Loader "' + L.name + '" has NO assets to be loaded.');
    } else {
      var _has = false;
      var _output = '';

      for (var l in L._queue) {
        if (!(L._queue[l] instanceof Loader)) {
          if (!_has) {
            _has = true;
            _output += 'Loader "' + L.name + '" requesting:';
          }

          var fileName = L._queue[l].fileName;
          var extension = L._queue[l].fileType;
          var extensionIndex = fileName.indexOf('.' + extension);
          var fileAndExtension = extensionIndex > -1 ? fileName : fileName + '.' + extension;
          _output += '\n\t -> ' + (L._queue[l].prepend || '') + fileAndExtension;
        }
      }

      if (_has) {
        console.log(_output);
      }
    }

    L._startSingleLoad(0);
  }
  /**
   * @memberOf Loader
   * @method getAllContent
   * @returns {array}
   * 	An array of LoaderData Objects with relevant loading information (like an Event Object).
   * 	Access the loaded content via the property 'dataRaw': an image, raw Json, raw XML, or font name
   * @desc
   * 	Get all loaded content from the Loader and all nested Loaders
   * @example
   *  var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
   *  myLoader.load()
   *
   *  function handleComplete(target) {
   *  	var myContent = target.getAllContent()
   *  	console.log("Content found:", myContent)
   *  }
   */
  ;

  _proto.getAllContent = function getAllContent() {
    var _found = [];

    function searchSubLoader(content) {
      for (var i = 0; i < content.length; i++) {
        //console.log( "   -> sub:", content[i] )
        if (content[i] instanceof Loader) {
          searchSubLoader(content[i].content);
        } else {
          _found.push(content[i]);
        }
      }
    }

    searchSubLoader(this.content);

    if (_found.length < 1) {
      console.log('No Content found');
    }

    return _found;
  }
  /**
   * @memberOf Loader
   * @method getAllContentRaw
   * @returns {array}
   * 	An array of only the raw data: an image, raw Json, raw XML, or font name
   * @desc
   * 	Get all raw loaded content from the Loader and all nested Loaders, no LoaderData Objects
   * @example
   * var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
   * myLoader.load()
   *
   * function handleComplete(target) {
   * 	var myContent = target.getAllContentRaw()
   * 	console.log("Content found:", myContent)
   * }
   */
  ;

  _proto.getAllContentRaw = function getAllContentRaw() {
    var _content = this.getAllContent();

    for (var i = 0; i < _content.length; i++) {
      _content[i] = _content[i].dataRaw;
    }

    return _content;
  }
  /**
   * @memberOf Loader
   * @method getLoader
   * @param {string} id
   * 	the string optionally assigned to the 'name' property or the variable assigned to the Loader instance
   * @returns {Loader}
   * @desc
   * 	Get the Loader instance from the Loader or any nested Loader
   * @example
   * var mainLoader = new Loader({ name:'main', onComplete:handleLoadComplete })
   * mainLoader.add(
   * 	new Loader(['font1.ttf', 'font2.ttf'], { name: 'load_fonts', prepend: 'fonts/' }
   * 	)
   * )
   * mainLoader.add(
   * 	new Loader(['Ad_Data.js', 'NetUtils.js'], { name: 'load_js', prepend: 'utils/' })
   * )
   * mainLoader.load()
   *
   * function handleLoadComplete(target) {
   * 	var fontLoader = target.getLoader('load_fonts')
   * }
   */
  ;

  _proto.getLoader = function getLoader(id) {
    var _found = null;

    function searchSubLoader(content) {
      for (var i = 0; i < content.length; i++) {
        //console.log( "   -> sub:", content[i] )
        if (content[i] instanceof Loader) {
          if (content[i] && (content[i].name === id || content[i] === id)) {
            _found = content[i];
          } else {
            searchSubLoader(content[i].content);
          }
        }
      }
    }

    searchSubLoader(this.content);

    if (!_found) {
      console.log('No Loader found of that name');
    }

    return _found;
  } // -------------------------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  ;

  _proto._addSingleLoad = function _addSingleLoad(url, fileName, fileTypeOverwrite) {
    var L = this; // fileTypeOverwrite can be a string of the explicit file type

    var fileType = fileTypeOverwrite || L.fileType || _lib_mixin_LoaderUtils_js__WEBPACK_IMPORTED_MODULE_2__["getFileType"](url);
    var loaderType;

    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
      case 'svg':
        loaderType = _lib_single_ImageLoader_js__WEBPACK_IMPORTED_MODULE_3__["default"];
        break;

      case 'ttf':
      case 'woff':
        loaderType = _lib_single_FontLoader_js__WEBPACK_IMPORTED_MODULE_6__["default"];
        break;

      case 'json':
      case 'fba':
      case 'bin':
      case 'binary':
      case 'svg+xml':
        loaderType = _lib_single_DataLoader_js__WEBPACK_IMPORTED_MODULE_5__["default"];
        break;

      default:
        loaderType = _lib_single_InlineLoader_js__WEBPACK_IMPORTED_MODULE_4__["default"];
    } // either the data as binary OR the file path and name


    var urlChoice = fileTypeOverwrite ? url : L.prepend + url; // console.log('\t url:', url, '| loaderType:', loaderType)

    var singleLoader = new loaderType(urlChoice, {
      scope: L,
      platformGetUrl: L.platformGetUrl,
      onComplete: L._handleSingleLoadComplete,
      onFail: L._handleFail,
      fileType: fileType,
      cacheBuster: L.cacheBuster,
      crossOrigin: L.crossOrigin
    }); // console.log('\t singleLoader:', singleLoader)
    // from fba, the files are binary, so there is
    // no file name to reference so set it here

    if (fileName) {
      singleLoader.fileName = fileName;
    }

    singleLoader.queueIndex = L._total;
    L._queue[L._total] = singleLoader;
    L._total++; // console.log(L._total, L._queue)
  };

  _proto._addSubLoad = function _addSubLoad(loader) {
    var L = this; //console.log(L.name, '_addSubLoad()')

    loader.onComplete = L._handleSingleLoadComplete.bind(L);
    loader.onProgress = L._handleProgress.bind(L);
    loader.onFail = L._handleFail; //loader.platformGetUrl = L.platformGetUrl;

    loader.queueIndex = L._total;
    L._queue[L._total] = loader;
    L._total++;
  };

  _proto._addFbaSubLoads = function _addFbaSubLoads(loader) {
    var _this2 = this;

    var blobs = Object(ad_global__WEBPACK_IMPORTED_MODULE_0__["fbaDataToBlobs"])(loader.dataRaw);
    blobs.forEach(function (blob) {
      _this2._addSingleLoad(blob.src, blob.path, blob.fileType);
    });
  };

  _proto._startSingleLoad = function _startSingleLoad(i) {
    var L = this;
    var _inst = L._queue[i]; // console.log(L.name, '_startSingleLoad()', 'index:', i, 'total:', L._total)

    if (L._total == 0) {
      // fire a complete because there are no requests
      L._handleComplete();
    } else {
      if (i < L._total) {
        // console.log( L.name, '_startSingleLoad() ->', _inst )
        if (!(_inst instanceof Loader)) {
          //console.log( _inst.name, 'is a subloader' )
          //} else {
          if (i < L._total - 1) {
            L._startLoadTimeOut(++i);
          }
        }

        _inst.load();
      }
    }
  };

  _proto._startLoadTimeOut = function _startLoadTimeOut(i) {
    var L = this;
    setTimeout(function () {
      L._startSingleLoad(i);
    }, 10);
  } // -------------------------------------------------------------------------------------------------------------
  // EVENT HANDLERS
  ;

  _proto._handleSingleLoadComplete = function _handleSingleLoadComplete(target) {
    var L = this; // console.log('_handleSingleLoadComplete(), target:', target)

    L.content[target.queueIndex] = target;
    delete L._queue[target.queueIndex];

    L._handleProgress(); // is a nested Loader


    if (target.url == undefined) {
      //console.log( '"' + L.name + '" nested Loader "' + target.name + '" Complete' );
      if (target.queueIndex < L._total - 1) {
        L._startLoadTimeOut(target.queueIndex + 1);
      }
    }
  };

  _proto._handleProgress = function _handleProgress() {
    var L = this;
    var _length = L.content.length;
    var _count = 0;

    for (var i = 0; i < _length; i++) {
      if (L.content[i]) _count++;
    } // console.log(L.name, '_handleProgress()', '_count:', _count, 'total:', L._total)


    var _consecutive = _count;
    var _subProgress = 0;

    if (_count < L._total && L._queue[_count]) {
      _subProgress = L._queue[_count].progress / L._total || 0;
    }

    L.progress = _consecutive / L._total + _subProgress;
    L.rawProgress = _count / L._total + _subProgress;
    L.onProgress.call(L.scope, L); //console.log( 'progress')

    if (_count >= L._total) {
      //console.log( 'Loader calling _handleComplete()')
      L._handleComplete();
    }
  };

  _proto._handleComplete = function _handleComplete() {
    var L = this; // console.log('Loader "' + L.name + '" is Complete')

    L.onComplete.call(L.scope, L);
  };

  return Loader;
}(_lib_mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_1__["LoaderBase"]);



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderBase.js":
/*!******************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderBase.js ***!
  \******************************************************************************/
/*! exports provided: LoaderBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderBase", function() { return LoaderBase; });
var LoaderBase =
/*#__PURE__*/
function () {
  function LoaderBase() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
    var L = this;

    L.onComplete = arg.onComplete || function () {};

    L.onFail = arg.onFail || function () {};

    L.onProgress = arg.onProgress || function () {};

    L.name = arg.name || '';
    L.scope = arg.scope || L;
    L.dataRaw;
    L.cacheBuster = arg.cacheBuster || false;
    L._failCalled = false;
  }

  var _proto = LoaderBase.prototype;

  _proto._handleFail = function _handleFail() {
    var L = this; // console.log( 'LoaderBase._handleFail()' )

    if (!L._failCalled) {
      L._failCalled = true;
      L.onFail.call(L.scope, L);
      console.log('Loader "' + L.name + '" Fail:', L.url);
    }
  };

  return LoaderBase;
}();

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderSourceMixin.js":
/*!*************************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderSourceMixin.js ***!
  \*************************************************************************************/
/*! exports provided: LoaderSourceMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderSourceMixin", function() { return LoaderSourceMixin; });
/* harmony import */ var _LoaderUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoaderUtils.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderUtils.js");
/* harmony import */ var ad_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-global */ "ad-global");
/* harmony import */ var ad_global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ad_global__WEBPACK_IMPORTED_MODULE_1__);
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var LoaderSourceMixin = function LoaderSourceMixin(superclass) {
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inheritsLoose(_class, _superclass);

      function _class() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _superclass.call.apply(_superclass, [this].concat(args)) || this;
        var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

        var L = _assertThisInitialized(_this);

        L.url = Object(ad_global__WEBPACK_IMPORTED_MODULE_1__["matchProtocolTo"])(arguments[0] || '');

        if (arg.platformGetUrl) {
          L.platformGetUrl = arg.platformGetUrl;
          L.url = arg.platformGetUrl(L.url);
        }

        L.fileName = arg.id === undefined ? _LoaderUtils_js__WEBPACK_IMPORTED_MODULE_0__["getFileName"](L.url) : arg.id;
        L.fileType = arg.fileType || _LoaderUtils_js__WEBPACK_IMPORTED_MODULE_0__["getFileType"](L.url);
        return _this;
      }

      return _class;
    }(superclass)
  );
};

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderTickerMixin.js":
/*!*************************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderTickerMixin.js ***!
  \*************************************************************************************/
/*! exports provided: LoaderTickerMixin, setTicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderTickerMixin", function() { return LoaderTickerMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTicker", function() { return setTicker; });
/* harmony import */ var _LoaderUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoaderUtils.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderUtils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }


var LoaderTickerMixin = function LoaderTickerMixin(superclass) {
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inheritsLoose(_class, _superclass);

      function _class() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _superclass.call.apply(_superclass, [this].concat(args)) || this;
      }

      var _proto = _class.prototype;

      _proto._setTicker = function _setTicker(args) {
        var L = this;
        setTicker({
          content: args.content,
          css: args.css,
          width: args.width,
          font: args.font,
          handleFail: L._handleFail.bind(L),
          handleTickerComplete: L._handleTickerComplete.bind(L)
        });
      };

      _proto._removeTickerNode = function _removeTickerNode(node) {
        node.parentNode.removeChild(node);
      };

      return _class;
    }(superclass)
  );
};
function setTicker(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      content = _ref.content,
      css = _ref.css,
      width = _ref.width,
      font = _ref.font,
      handleFail = _ref.handleFail,
      handleTickerComplete = _ref.handleTickerComplete;

  var node = document.createElement('div');
  node.innerHTML = content;
  node.style.cssText = css || '';
  document.body.appendChild(node);

  var _width = width != undefined ? width : node.offsetWidth;

  node.style.fontFamily = font || '';

  var _timeOut = setTimeout(function () {
    clearInterval(_interval);
    handleFail && handleFail();
  }, 5000);

  var _interval = setInterval(function () {
    if (node.offsetWidth != _width) {
      clearTimeout(_timeOut);
      clearInterval(_interval);
      handleTickerComplete && handleTickerComplete(node);
    }
  }, 10);
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderUtils.js":
/*!*******************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderUtils.js ***!
  \*******************************************************************************/
/*! exports provided: createXMLHttpRequest, getFileName, getFontName, getFileType, getFullUrl, getUrlPrepend, getParamsFromData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createXMLHttpRequest", function() { return createXMLHttpRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileName", function() { return getFileName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFontName", function() { return getFontName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileType", function() { return getFileType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFullUrl", function() { return getFullUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUrlPrepend", function() { return getUrlPrepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParamsFromData", function() { return getParamsFromData; });
/* harmony import */ var ad_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-global */ "ad-global");
/* harmony import */ var ad_global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ad_global__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @class LoaderUtils
 * @desc Various single use utilities for file names & paths, and query manipulations.
 * <codeblock>
 * import { LoaderUtils } from 'ad-load'
 * </codeblock>
 */

/**
 * @memberOf LoaderUtils
 * @method createXMLHttpRequest
 * @return {XMLHttpRequest}
 */

function createXMLHttpRequest() {
  try {
    return new XMLHttpRequest();
  } catch (e) {}

  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {}

  console.warn("XMLHttpRequest not supported");
  return null;
}
/**
 * @memberOf LoaderUtils
 * @method getFileName
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Strips a file path and extension to return the file name
 */

function getFileName(url) {
  var extension = url.lastIndexOf(".");
  var directory = url.lastIndexOf("/") + 1;
  if (directory > extension) extension = undefined;
  return url.substring(directory, extension);
}
/**
 * @memberOf LoaderUtils
 * @method getFontName
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Strips a file path and extension to return the file name
 */

function getFontName(url) {
  return url.substring(url.lastIndexOf("/") + 1, url.indexOf("."));
}
/**
 * @memberOf LoaderUtils
 * @method getFileType
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Determines the file type and returns that
 */

function getFileType(url) {
  url = url || "";

  var _index = url.indexOf("?");

  if (_index > -1) {
    url = url.substr(0, _index);
  }

  var _split = url.match(/[^\\]*\.(\w+)$/);

  var _base64 = url.match(/(?:(?:image)|(?:font))\/(jpeg|jpg|png|gif|svg|ttf|woff)/);

  var _type = _split ? _split[1] : _base64 ? _base64[1] : "unknown";

  return _type;
}
/**
 * @memberOf LoaderUtils
 * @method getFullUrl
 * @param {string} prepend
 * 		The file path
 * @param {string} file
 * 		The file name with extension
 * @param {function} platformGetUrl
 * 		Optional platform specific url formatter
 * @returns {string}
 * 		Determines the full url path to a file by either matching the protocol or
 * 		utilizing a platform tool, such as DoubleClick's <code>Enabler.getUrl</code>
 */

function getFullUrl(prepend, file, platformGetUrl) {
  var _prepend = getUrlPrepend(prepend);

  var _url = Object(ad_global__WEBPACK_IMPORTED_MODULE_0__["matchProtocolTo"])(_prepend + _file);

  if (platformGetUrl) {
    _url = platformGetUrl(_url);
  }

  return url;
}
/**
 * @memberOf LoaderUtils
 * @method getUrlPrepend
 * @param {string} path
 * 		A full file path including the file name
 * @returns {string}
 * 		Removes the file name and extension to retun only the path
 */

function getUrlPrepend(path) {
  return path ? path.replace(/\/?$/, "/") : "";
}
/**
 * @memberOf LoaderUtils
 * @method getParamsFromData
 * @param {string|object} query
 * 		A query string or object of key/value pairs
 * @returns {string}
 * 		Formats a query string and returns it
 */

function getParamsFromData(query) {
  if (typeof query === "string") {
    /*
     * TODO - check the string is formatted correctly?
     */
    return query;
  } else {
    var queryString = "";

    for (var prop in query) {
      console.log("      prop =", prop);
      queryString += prop + "=" + query[prop] + "&";
    }

    return queryString.substr(0, queryString.length - 1);
  }
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/DataLoader.js":
/*!*******************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/DataLoader.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataLoader; });
/* harmony import */ var _mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixin/LoaderBase.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderBase.js");
/* harmony import */ var _mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixin/LoaderSourceMixin.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderSourceMixin.js");
/* harmony import */ var _mixin_LoaderUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mixin/LoaderUtils.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderUtils.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @class DataLoader
 * @param {string} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} query
 * @property {string} name
 * @property {boolean} cacheBuster
 * @property {string} method
 * 	"POST" or "GET"
 * @property {object} scope
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {function} platformGetUrl
 * 	A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>.
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>json</code>, <code>xml</code>, <code>bin</code>.
 * @desc
 * This class is designed to handle a single load via XMLHttpRequest
 */




var DataLoader =
/*#__PURE__*/
function (_LoaderSourceMixin) {
  _inheritsLoose(DataLoader, _LoaderSourceMixin);

  function DataLoader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _LoaderSourceMixin.call.apply(_LoaderSourceMixin, [this].concat(args)) || this;
    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

    var D = _assertThisInitialized(_this);

    D.method = (arg.method || "get").toLowerCase();
    D.query = arg.query || null;
    D.responseType = arg.responseType || null;
    return _this;
  }
  /**
   * @memberOf DataLoader
   * @method load
   * @desc
   * 	Starts the load process.
   * @example
   * // Single load
   * var dataLoader = new DataLoader('data.json', {
   * 	name: 'my-data=loader',
   * 	cacheBuster: true,
   * 	onComplete: handleComplete,
   * 	onFail: handleFail
   * })
   * dataLoader.load()
   *
   * function handleComplete(target) {
   * 	var loadedContent = target.dataRaw
   * }
   * function handleFail(error) {
   * 	// error handle
   * }
   */


  var _proto = DataLoader.prototype;

  _proto.load = function load() {
    var D = this; // console.log('DataLoader "' + D.name + '" requesting:\n\t->', D.url)

    var queryString = null;
    var isPost = D.method === "post";
    D.req = _mixin_LoaderUtils_js__WEBPACK_IMPORTED_MODULE_2__["createXMLHttpRequest"]();
    if (D.responseType != undefined) D.req.responseType = D.responseType;
    var url = D.url;

    if (D.query) {
      queryString = _mixin_LoaderUtils_js__WEBPACK_IMPORTED_MODULE_2__["getParamsFromData"](D.query);
      encodeURIComponent(queryString);

      if (!isPost) {
        url += "?" + queryString;
        queryString = null;
      }
    }

    if (D.cacheBuster) {
      url += D.query && !isPost ? "&" : "?";
      url += "cb=" + new Date().getTime();
    }

    D.req.onreadystatechange = D._handleStateChange.bind(D);
    D.req.open(D.method, url, true); // Set Mime Type
    // NOTE: responseType has to be set AFTER the XmlHttpRequest.open() is called because IE is terrible

    switch (D.fileType) {
      case "xml":
        if (D.req.overrideMimeType) D.req.overrideMimeType("text/xml");
        break;

      case "json":
        if (D.req.overrideMimeType) D.req.overrideMimeType("application/json");
        break;

      case "fba":
      case "bin":
      case "binary":
        D.responseType = D.req.responseType = "arraybuffer"; //D.req.overrideMimeType( 'text/plain charset=x-user-defined' )

        break;
    }

    if (D.method === "post") {
      D.req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }

    D.req.send(queryString);
  };

  _proto._handleStateChange = function _handleStateChange(target) {
    var D = this;

    switch (D.req.readyState) {
      case 3:
        if (this.req.status == 200) {
          D.dataRaw = D.responseType ? D.req.response : D.req.responseText;

          D._handleProgress(D);
        }

        break;

      case 4:
        if (D.req.status == 200) {
          D.dataRaw = D.responseType ? D.req.response : D.req.responseText;

          D._handleComplete(D);
        } else {
          D._handleFail({
            target: target
          });
        }

        break;
    }
  };

  _proto._handleProgress = function _handleProgress() {
    var D = this;
    D.onProgress.call(D.scope, D);
  };

  _proto._handleComplete = function _handleComplete() {
    var D = this; // console.log('DataLoader "' + D.name + '" is Complete')

    D.onComplete.call(D.scope, D);
  };

  return DataLoader;
}(Object(_mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__["LoaderSourceMixin"])(_mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__["LoaderBase"]));



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/FontLoader.js":
/*!*******************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/FontLoader.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FontLoader; });
/* harmony import */ var _mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixin/LoaderBase.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderBase.js");
/* harmony import */ var _mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixin/LoaderSourceMixin.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderSourceMixin.js");
/* harmony import */ var _mixin_LoaderTickerMixin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mixin/LoaderTickerMixin.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderTickerMixin.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @class FontLoader
 * @param {string} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} cacheBuster
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>truetype</code> or <code>woff</code>
 * @desc
 * This class is designed to handle a single load of a font by assigning it to a generated stylesheet
 */




var FontLoader =
/*#__PURE__*/
function (_LoaderSourceMixin) {
  _inheritsLoose(FontLoader, _LoaderSourceMixin);

  function FontLoader() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _LoaderSourceMixin.call.apply(_LoaderSourceMixin, [this].concat(args)) || this;
  }
  /**
   * @memberOf FontLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  var _proto = FontLoader.prototype;

  _proto.load = function load() {
    var F = this; // console.log('FontLoader "' + F.name + '" requesting:\n\t->', F.url)

    F.fileName = F.fileName.split('.')[0];

    if (document.fonts && window.FontFace) {
      var font = new FontFace(F.fileName, "url(" + F.url + ")");
      font.load().then(function (font) {
        document.fonts.add(font);

        F._handleComplete.call(F);
      })["catch"](function (err) {
        console.error("Font (" + F.url + ") failed to load");

        F._handleFail.call(F);
      });
    } else {
      var format = 'truetype';

      if (F.fileType.match(/woff/)) {
        format = F.fileType;
      }

      var assembledFontRule = "@font-face { font-family: '" + F.fileName + "'; src: url(" + F.url + ") format('" + format + "'); }";
      var getSheet = document.getElementById('RED_fontStyleSheet');

      if (getSheet) {
        getSheet.innerHTML += assembledFontRule;
      } else {
        var styleScript = document.createElement('style');
        styleScript.type = 'text/css';
        styleScript.media = 'screen';
        styleScript.id = 'RED_fontStyleSheet';
        styleScript.appendChild(document.createTextNode(assembledFontRule));
        document.getElementsByTagName('head')[0].appendChild(styleScript);
      }

      F._setTicker({
        content: ' !"\\#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~',
        css: 'position:absolute; top:-1000px; font-size:100px; font-family:san-serif; font-variant:normal; font-style:normal; font-weight:normal; letter-spacing:0; white-space:nowrap;',
        font: F.fileName
      });
    }
  };

  _proto._handleTickerComplete = function _handleTickerComplete(node) {
    var F = this; // added timeout to leave a rendered textfield on stage for initial textfields
    // to return proper offsetWidth values

    setTimeout(function () {
      // leave the test textfield temporarily to allow dom
      // to have a reference to rendered characters. hack?
      F._removeTickerNode(node);
    }, 300);

    F._handleComplete();
  };

  _proto._handleComplete = function _handleComplete(event) {
    var F = this; // console.log('FontLoader "' + F.name + '" is Complete')

    F.dataRaw = F.fileName;
    F.onComplete.call(F.scope, F);
  };

  return FontLoader;
}(Object(_mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__["LoaderSourceMixin"])(Object(_mixin_LoaderTickerMixin_js__WEBPACK_IMPORTED_MODULE_2__["LoaderTickerMixin"])(_mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__["LoaderBase"])));



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/ImageLoader.js":
/*!********************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/ImageLoader.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageLoader; });
/* harmony import */ var _mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixin/LoaderBase.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderBase.js");
/* harmony import */ var _mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixin/LoaderSourceMixin.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderSourceMixin.js");
/* harmony import */ var _mixin_LoaderTickerMixin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mixin/LoaderTickerMixin.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderTickerMixin.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @class ImageLoader
 * @param {string} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} cacheBuster
 * @property {boolean} renderOnly
 * 	used when only needing to render, such as writing into the DOM as markup <svg>
 * @property {string} crossOrigin
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>truetype</code> or <code>woff</code>
 * @desc
 * This class is designed to handle a single load of a font by assigning it to a generated stylesheet
 */




var ImageLoader =
/*#__PURE__*/
function (_LoaderSourceMixin) {
  _inheritsLoose(ImageLoader, _LoaderSourceMixin);

  function ImageLoader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _LoaderSourceMixin.call.apply(_LoaderSourceMixin, [this].concat(args)) || this;
    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}; // used when only needing to render, such as writing into the DOM as markup <svg>

    _this.renderOnly = !!arg.renderOnly;
    _this.crossOrigin = arg.crossOrigin;
    return _this;
  }
  /**
   * @memberOf ImageLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  var _proto = ImageLoader.prototype;

  _proto.load = function load() {
    var I = this;

    if (I.renderOnly) {
      I._setTicker({
        content: I.url,
        width: 0
      });
    } else {
      var img = new Image();
      img.id = I.fileName;
      img.crossOrigin = I.crossOrigin;
      img.onload = I._handleComplete.bind(I);
      img.onerror = I._handleFail;
      img.src = I.url;
    }
  };

  _proto._handleComplete = function _handleComplete(event) {
    var I = this; // console.log('ImageLoader "' + I.name + '" is Complete')

    I.dataRaw = event.target;
    I.onComplete.call(I.scope, I);
  };

  return ImageLoader;
}(Object(_mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__["LoaderSourceMixin"])(Object(_mixin_LoaderTickerMixin_js__WEBPACK_IMPORTED_MODULE_2__["LoaderTickerMixin"])(_mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__["LoaderBase"])));



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/InlineLoader.js":
/*!*********************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/single/InlineLoader.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InlineLoader; });
/* harmony import */ var _mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixin/LoaderBase.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderBase.js");
/* harmony import */ var _mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixin/LoaderSourceMixin.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-load/lib/mixin/LoaderSourceMixin.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @class InlineLoader
 * @param {string} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} cacheBuster
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>css</code>, <code>script</code>, <code>html</code>
 * @desc
 * This class is designed to handle a single load a file inlined by writing it to the head
 */



var InlineLoader =
/*#__PURE__*/
function (_LoaderSourceMixin) {
  _inheritsLoose(InlineLoader, _LoaderSourceMixin);

  function InlineLoader() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _LoaderSourceMixin.call.apply(_LoaderSourceMixin, [this].concat(args)) || this;
  }
  /**
   * @memberOf InlineLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  var _proto = InlineLoader.prototype;

  _proto.load = function load() {
    var I = this;
    var elem;

    if (I.fileType == 'css') {
      elem = I._createCssLink();
    } else if (I.fileType == 'html') {
      elem = I._createHtmlLink();
    } else {
      elem = I._createScript();
    }

    elem.charset = 'utf-8';
    elem.onload = I._handleComplete.bind(I);
    elem.onerror = I._handleFail;
    I.fileType == 'css' || I.fileType == 'html' ? elem.href = this.url : elem.src = I.url;
    document.getElementsByTagName('head')[0].appendChild(elem);
  };

  _proto._createCssLink = function _createCssLink() {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.type = 'text/css';
    return elem;
  };

  _proto._createHtmlLink = function _createHtmlLink() {
    var elem = document.createElement('link');
    elem.rel = 'import'; // elem.async = ''

    return elem;
  };

  _proto._createScript = function _createScript() {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    return elem;
  };

  _proto._handleComplete = function _handleComplete(event) {
    var I = this; // console.log('InlineLoader "' + I.name + '" is Complete')

    I.dataRaw = event.target;
    I.onComplete.call(I.scope, I);
  };

  return InlineLoader;
}(Object(_mixin_LoaderSourceMixin_js__WEBPACK_IMPORTED_MODULE_1__["LoaderSourceMixin"])(_mixin_LoaderBase_js__WEBPACK_IMPORTED_MODULE_0__["LoaderBase"]));



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-polyfills/lib/request-animation-frame.js":
/*!******************************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-polyfills/lib/request-animation-frame.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// POLYFILL : check for and/or replace window.requestAnimationFrame
// there is a bug in iOS6 for RAF, so just detect being on it and fall back
var _isiOS6 = /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent);

var _prefix = ['webkit', 'moz'];

for (var i = 0; !window.requestAnimationFrame && i < _prefix.length; i++) {
  window.requestAnimationFrame = window[_prefix[i] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[_prefix[i] + 'CancelAnimationFrame'] || window[_prefix[i] + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame || !window.cancelAnimationFrame || _isiOS6) {
  console.log('PolyFill -> FrameRate');

  window.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 17);
  };

  window.cancelAnimationFrame = clearTimeout;
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/index.js":
/*!*************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/index.js ***!
  \*************************************************************/
/*! exports provided: TextFormat, TextSplitType, UIBorder, UIButton, UICanvas, UIComponent, UIDiv, UIFlex, UIGroup, UIImage, UISlider, UISplitText, UISvg, UITextField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_TextFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/TextFormat */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextFormat.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TextFormat", function() { return _lib_TextFormat__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _lib_TextSplitType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/TextSplitType */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextSplitType.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TextSplitType", function() { return _lib_TextSplitType__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _lib_UIBorder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/UIBorder */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIBorder.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIBorder", function() { return _lib_UIBorder__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _lib_UIButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/UIButton */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIButton", function() { return _lib_UIButton__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _lib_UICanvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/UICanvas */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UICanvas.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UICanvas", function() { return _lib_UICanvas__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _lib_UIComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIComponent", function() { return _lib_UIComponent__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _lib_UIDiv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/UIDiv */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIDiv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIDiv", function() { return _lib_UIDiv__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _lib_UIFlex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/UIFlex */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIFlex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIFlex", function() { return _lib_UIFlex__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _lib_UIGroup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/UIGroup */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIGroup", function() { return _lib_UIGroup__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _lib_UIImage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/UIImage */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIImage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIImage", function() { return _lib_UIImage__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _lib_UISlider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/UISlider */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISlider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UISlider", function() { return _lib_UISlider__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _lib_UISplitText__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/UISplitText */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISplitText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UISplitText", function() { return _lib_UISplitText__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _lib_UISvg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/UISvg */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISvg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UISvg", function() { return _lib_UISvg__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _lib_UITextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/UITextField */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UITextField.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UITextField", function() { return _lib_UITextField__WEBPACK_IMPORTED_MODULE_13__["default"]; });

















/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextFormat.js":
/*!**********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextFormat.js ***!
  \**********************************************************************/
/*! exports provided: INLINE, INLINE_CLAMP, INLINE_FIT, INLINE_FIT_CLAMP, PARAGRAPH, PARAGRAPH_CLAMP, PARAGRAPH_FIT, PARAGRAPH_FIT_CLAMP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INLINE", function() { return INLINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INLINE_CLAMP", function() { return INLINE_CLAMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INLINE_FIT", function() { return INLINE_FIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INLINE_FIT_CLAMP", function() { return INLINE_FIT_CLAMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PARAGRAPH", function() { return PARAGRAPH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PARAGRAPH_CLAMP", function() { return PARAGRAPH_CLAMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PARAGRAPH_FIT", function() { return PARAGRAPH_FIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PARAGRAPH_FIT_CLAMP", function() { return PARAGRAPH_FIT_CLAMP; });
/**
	@npmpackage
	@class TextFormat
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { TextFormat } from 'ad-ui'
		</codeblock>
		<br><br>
		
		Custom constants to identify the layout type for a <UITextField>.  Each type changes the format of how the text content
		is displayed and will run an internal auto size if applicable to the type.
*/

/**
	@memberOf TextFormat
	@const {string} INLINE
	@desc
		UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
		If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
		This does NOT auto size and will overflow horizontally and vertically depending on the width and height.
		<br>
		<img src="../docs_images/textformat/inline.png" />
	@example
		TextFormat.INLINE
*/
var INLINE = 'inline';
/**
	@memberOf TextFormat
	@const {string} INLINE_CLAMP
		UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
		If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
		This does NOT auto size, however it changes the width AND height of the UITextField to clamp to the size of the content.
		<br>
		<img src="../docs_images/textformat/inline_clamp.png" />
	@example
		TextFormat.INLINE_CLAMP
*/

var INLINE_CLAMP = 'inlineClamp';
/**
	@memberOf TextFormat
	@const {string} INLINE_FIT
		UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
		If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
		This DOES auto size and will shrink horizontally and vertically to fit inside the width and height.
		<br>
		<img src="../docs_images/textformat/inline_fit.png" />
	@example
		TextFormat.INLINE_FIT
*/

var INLINE_FIT = 'inlineFit';
/**
	@memberOf TextFormat
	@const {string} INLINE_FIT_CLAMP
		This is a combination that applies TextFormat.INLINE_FIT followed by TextFormat.INLINE_CLAMP
		<br>
		<img src="../docs_images/textformat/inline_fit.png" />
		<br>
		<b>would then become</b>
		<br>
		<img src="../docs_images/textformat/inline_fit_clamp.png" />
	@example
		TextFormat.INLINE_FIT_CLAMP
*/

var INLINE_FIT_CLAMP = 'inlineFitClamp';
/**
	@memberOf TextFormat
	@const {string} PARAGRAPH
		UITextField uses word wrapping to automatically break lines creating a paragraph layout.
		This does NOT auto size and will overflow vertically, just like a webpage.
		<br>
		<img src="../docs_images/textformat/paragraph.png" />
	@example
		TextFormat.PARAGRAPH
*/

var PARAGRAPH = 'paragraph';
/**
	@memberOf TextFormat
	@const {string} PARAGRAPH_CLAMP
		UITextField uses word wrapping to automatically break lines creating a paragraph layout.
		This does NOT auto size and will overflow vertically, just like a webpage. 
		However, while maintaining the defined width, it changes the height of the UITextField to clamp to the size of the content.
		<br>
		<img src="../docs_images/textformat/paragraph_clamp.png" />
	@example
		TextFormat.PARAGRAPH_CLAMP
*/

var PARAGRAPH_CLAMP = 'paragraphClamp';
/**
	@memberOf TextFormat
	@const {string} PARAGRAPH_FIT
		UITextField uses word wrapping to automatically break lines creating a paragraph layout.
		This DOES auto size and will shrink the entire chunk to fit inside the width and height.
		<br>
		<img src="../docs_images/textformat/paragraph_fit.png" />
	@example
		TextFormat.PARAGRAPH_FIT
*/

var PARAGRAPH_FIT = 'paragraphFit';
/**
	@memberOf TextFormat
	@const {string} PARAGRAPH_FIT_CLAMP
		This is a combination that applies TextFormat.PARAGRAPH_FIT followed by TextFormat.PARAGRAPH_CLAMP
		<br>
		<img src="../docs_images/textformat/paragraph_fit.png" />
		<br>
		<b>would then become</b>
		<br>
		<img src="../docs_images/textformat/paragraph_fit_clamp.png" />
	@example
		TextFormat.PARAGRAPH_FIT_CLAMP
*/

var PARAGRAPH_FIT_CLAMP = 'paragraphFitClamp';

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextSplitType.js":
/*!*************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextSplitType.js ***!
  \*************************************************************************/
/*! exports provided: LINES, WORDS, CHARACTERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINES", function() { return LINES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORDS", function() { return WORDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHARACTERS", function() { return CHARACTERS; });
/**
	@npmpackage
	@class TextSplitType
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { TextSplitType } from 'ad-ui'
		</codeblock>
		<br><br>
		
		Constants defining how a {@link UISplitText} should break apart the textfields
		*/

/**
	@memberof TextSplitType
	@const {string} LINES
		Limits the splitting of a {@link UISplitText} to line and words only
		<br><br>
		Functionally identical to TextSplitType.WORDS
	@example
		TextSplitType.LINES
		*/
var LINES = 'lines';
/**
	@memberof TextSplitType
	@const {string} WORDS 
		Limits the splitting of a {@link UISplitText} to line and words only
		<br><br>
		Functionally identical to TextSplitType.LINES
	@example
		TextSplitType.WORDS
		*/

var WORDS = 'words';
/**
	@memberof TextSplitType
	@const {string} CHARACTERS
		Limits the splitting of a {@link UISplitText} to lines, words, and also characters
	@example
		TextSplitType.CHARACTERS
		*/

var CHARACTERS = 'characters';

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIBorder.js":
/*!********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIBorder.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIDiv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIDiv */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIDiv.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
/** 
	@npmpackage
	@class UIBorder
	@param {object} arg
	@property {string} id
		Element id.
	@property {element} target
		DOM Element in which to create this border.
	@property {number} size
		Border thickness.
	@property {string} color
		Hex code representing border color.
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIBorder } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending UIDiv which adds a border to a div.
	@example
		// simple button that passes in an image to the bg and 2 images as the icons for the different states of the button.  Notice no width or height is set.
		var myBorder = new UIBorder({
			id : 'my-border',
			target : View.main,
			size : 1,
			color : '#ff0000'
		})
*/




var UIBorder = function UIBorder(arg) {
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE PROPERTIES
  var _size;

  var _color;
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // MARKUP


  var U = new _UIDiv__WEBPACK_IMPORTED_MODULE_0__["default"](arg);
  ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].addClass(U, 'ui-border');
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // GETTER | SETTTER

  Object.defineProperties(U, {
    /**
    	@memberOf UIBorder
    	@var size
    	@desc
    		Getter|Setter : A Number representing the size of the border in pixels.
    	@example
    		// SET
    		myBorder.size = 4;
    			// GET
    		console.log( myBorder.size )
    */
    size: {
      get: function get() {
        return _size;
      },
      set: function set(value) {
        //console.log( 'UIBorder :: SET -> size =', value );
        if (value != undefined && _size != value) {
          _size = value;
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
            borderWidth: _size
          });
        }
      }
    },

    /**
    	@memberOf UIBorder
    	@var color
    	@desc
    		Getter|Setter : A String representing the color of the border.
    	@example
    		// SET
    		myBorder.color = '#fff000';
    			// GET
    		console.log( myBorder.color )
    */
    color: {
      get: function get() {
        return _color;
      },
      set: function set(value) {
        //console.log( 'UIBorder :: SET -> color =', value )
        if (value && _color != value) {
          _color = value;
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
            borderColor: _color
          });
        }
      }
    }
  });
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  U.toString = function () {
    return '[object UIBorder]';
  };
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // INIT


  ad_events__WEBPACK_IMPORTED_MODULE_2__["Gesture"].disable(U);
  U.color = arg.color;
  U.size = arg.size;
  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UIBorder);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIButton.js":
/*!********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIButton.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony import */ var _UIImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIImage */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIImage.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
/**
	@npmpackage
	@class UIButton
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIButton } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending UIComponent.  It is a DOM element that has a child handling system for toggling the active state.
		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>
		<b>Note:</b><br>
		When adding a bg element or icons, there is no need to set the width and height at the css level. The UIButton will inherit the dimensions
		of the children.  However, if either the width or height is set, that will be the size of the UIButton.  The hit state is the UIButton itself
		so keep in mind that even if the content is very large, if the css sets the width and height to a smaller amount, there will be a small hit area
		for clicks, rollovers and rollouts.
		<br><br>


		<b>Sample 1:</b>
		<codeblock>
			// Create a simple button on the Main container that passes in an image to the bg and 2 images 
			// as the icons for the different states of the button.  Notice no width or height is set.
			T.myButton = new UIButton({
				id : 'my-btn',
				target : T,
				css : {
					x : 30,
					y : 10
				},
				bg : 'btnBg',
				icon : [ 
					'btnPlay',
					'btnPause'
				],
				onClick : handleMyButtonClick
			});

			function handleMyButtonClick ( event ){
				console.log( event.target, 'clicked' )
			}

			// referenced later anywhere outside the class by
			View.main.myButton			
		</codeblock>
		<br><br>


		<b>Sample 2:</b>
		<codeblock>
			// create the same button as above, but more customized images 
			// for the bg and the different states
			T.myButton = new UIButton({
				id : 'my-btn',
				target : T,
				css : {
					x : 30,
					y : 10
				},
				bg : new UIImage({
					source : 'btnBg',
					css : {
						width : 120,
						height : 40,
					}
				}),
				icon : [ 
					new UIImage({
						source : 'btnPause',
						css : {
							x : 20,
							y : 10,
							width : 80,
							height : 20,
							backgroundColor : 'rgba(0,100,100,.5)'
						}
					}),
					new UIImage({
						source : 'btnPause',
						css : {
							x : 20,
							y : 10,
							width : 80,
							height : 20,
							backgroundColor : 'rgba(0,100,100,.5)'
						}
					}) 
				],
				onClick : handleMyButtonClick
			});
		</codeblock>
		<br><br>


		<b>Sample 3:</b><br>
		<codeblock>
			// create a button with a textfield passed in as the icon state of the button
			// also it is aligned inline rather than with Align.set()
			T.myButton = new UIButton({
				id : 'my-btn',
				target : T,
				css : {
					width : 100,
					height : 40,
					backgroundColor : '#ff0000'
				},
				bg : 'btnBg',
				icon: [
					new UITextField ({
						css : {
							width : 150,
							height : 40,
							color : '#ffffff'
						},
						fontSize : 12,
						fontFamily : 'template_font',
						format : TextFormat.INLINE_FIT,
						alignText : Align.CENTER,
						text : 'CLICK FOR MORE'
					})
				],
				align : {
					x : Align.CENTER,
					y : {
						type : Align.BOTTOM,
						offset : -30
					}
				}
				onClick : handleMyButtonClick
			});
		</codeblock>
		<br><br>


		<b>Sample Extension:</b><br>
		<codeblock>
			// When needing to make a custom button, use this template then add code accordingly
			function UIButtonExtend( arg ){

				var U = new UIButton ( arg );

				U._onClick = function ( event ){
					// extended click method
				}

				function handleBaseEnabled ( event ){
					var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
					// handle other listeners
				}

				U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )

				U.enabled = true;

				return U;
			}
		</codeblock>
		<br><br>
*/





var UIButton = function UIButton(arg) {
  arg = arg || {};
  arg.css = arg.css || {};
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // BASE CSS

  ad_view__WEBPACK_IMPORTED_MODULE_2__["Styles"].injectStylesheet('RED_uiButton', '.ui-button', 'position:absolute', '.ui-button-state', 'position: absolute; width:inherit; height:inherit;');
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE PROPERTIES

  var _state = 0;
  var _icon = [];

  var _bg; // this is used by the video components so the icons will force fit inside buttons


  var _containChild = !!arg.containChild;
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // MARKUP


  var U = new _UIComponent__WEBPACK_IMPORTED_MODULE_0__["default"](arg);
  ad_view__WEBPACK_IMPORTED_MODULE_2__["Styles"].addClass(U, 'ui-button');

  if (arg.bg) {
    createChild(arg.bg, false);
  } // called after bg is set to define a width/height for icon align calls


  clampContainer();
  arg.icon = arg.icon || [];

  for (var i = 0; i < arg.icon.length; i++) {
    createChild(arg.icon[i], true);
  } // call again to account for icons


  clampContainer();
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PUBLIC PROPERTIES

  /**
  	@memberOf UIButton
  	@var {boolean} togglable
  		A Boolean to set whether or not the button will toggle between the different states of the button, which switches the 
  		visiblity of the child elements
  */

  U.togglable = arg.icon.length > 1;
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // GETTER | SETTTER

  Object.defineProperties(U, {
    /**
    	@memberOf UIButton
    	@var {element} bg
    	@desc
    		Getter : The bottom most element of a UIButton.  This allows for a background image to be set with a UIImage, or any other 
    		UIComponent natively. It is set in the constructor as the bg: param.  This allows public access to that element to that 
    		element as a getter, without allowing to overwrite the content.
    		<br><br>
    			<b>Example 1</b><br>
    		Internally create a UIImage as the background:<br> 
    		<codeblock>
    			var myButton = new UIButton({
    				bg : 'btnBg'
    			});
    		</codeblock>
    		<br><br>
    		<b>Example 2</b><br>
    	Pass in a UIImage to add custom css to the elements:<br>
    	<codeblock>
    		var myButton = new UIButton({
    			bg : new UIImage({
    				source : 'btnBg',
    				css : {
    					width : 80,
    					height : 20,
    					backgroundColor : 'rgba(0,100,100,.5)'
    				}
    			})
    		});
    	</codeblock>
    	<br><br>
    */
    bg: {
      get: function get() {
        return _bg;
      }
    },

    /**
    	@memberOf UIButton
    	@var {array} icon
    	@desc
    		Getter : An Array of the icons, which are set as an array in the constructor as the icon:[] param.  This allows public access to 
    		those icons as getters, without allowing to overwrite the array content.  When clicking the button, it will auto toggle 
    		between 0 and 1, however this can be set to any other state that is avaiable. When instantiating, pass in the elements as either 
    		strings for the name of images to create UIImages or use other dom elements such as UIComponents to create custom style.
    		<br><br>
    			<b>Example 1</b><br>
    		Internally creates 2 UIImages as the icons, aka states, of the button:<br>
    		<codeblock>
    			var myButton = new UIButton({
    				icon : [ 
    					'btnPlay',
    					'btnPause'
    				]
    			});
    		</codeblock>
    		<br><br>
    			<b>Example 2</b><br>
    		Pass in 2 UIImages as the icons of the button, to add custom css to the elements:<br>
    		<codeblock>
    			var myButton = new UIButton({
    				icon : [ 
    					new UIImage({
    						source : 'btnPause',
    						css : {
    							x : 20,
    							y : 10,
    							width : 80,
    							height : 20,
    							backgroundColor : 'rgba(0,100,100,.5)'
    						}
    					}),
    					new UIImage({
    						source : 'btnPause',
    						css : {
    							x : 20,
    							y : 10,
    							width : 80,
    							height : 20,
    							backgroundColor : 'rgba(0,100,100,.5)'
    						}
    					}) 
    				]
    			});
    		</codeblock>
    		<br><br>
    */
    icon: {
      get: function get() {
        return _icon;
      }
    },

    /**
    	@memberOf UIButton
    	@var {element} state
    	@desc
    		Getter|Setter : A Number representing the index of which icon is being displayed, aka the state of the button.  These are set as an array in 
    		the constructor as the icon:[] param.  When clicking the button, it will auto toggle between 0 and 1, however this can be set to any other state that is avaiable.
    		<br><br>
    	
    		<b>Example</b><br>
    		Internally creates 3 UIImages as the icons of the button, which will toggle between 'btnPlay' and 'btnPause', but can manually set 
    		to show 'btnAlt' by setting state to 2:<br>	
    		<codeblock>
    			var myButton = new UIButton({
    				icon : [ 
    					'btnPlay',
    					'btnPause',
    					'btnAlt'
    				]
    			});
    			myButton.state = 2 	// sets the button to 'btnAlt'
    		</codeblock>
    		<br>
    */
    state: {
      get: function get() {
        return _state;
      },
      set: function set(value) {
        _state = value;

        if (value >= _icon.length) {
          _state = 0;
        }

        for (var i = 0; i < _icon.length; i++) {
          _icon[i].style.visibility = i == _state ? 'visible' : 'hidden';
        }
      }
    }
  });
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  /**
  	@memberOf UIButton
  	@method onClick
  	@desc
  		A Method that will be called on click of the button.  This is set in the constructor or can be manually assigned.
  		It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.CLICK, handleClick );</code>
  */

  U.onClick = arg.onClick || function (event) {} //console.log( 'UIButton.onClick()' )

  /**
  	@memberOf UIButton
  	@method onOver
  	@desc
  		A Method that will be called on roll over of the button.  This is set in the constructor or can be manually assigned.
  		It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.OVER, handleRollOver );</code>
  */
  ;

  U.onOver = arg.onOver || function (event) {} //console.log( 'UIButton.onOver()' )

  /**
  	@memberOf UIButton
  	@method onOut
  	@desc
  		A Method that will be called on roll out of the button.  This is set in the constructor or can be manually assigned.
  		It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.OUT, handleRollOut );</code>
  */
  ;

  U.onOut = arg.onOut || function (event) {} //console.log( 'UIButton.onOut()' )

  /**
  	@memberOf UIButton
  	@method toString
  	@returns {string} [object UIButton]
  	@desc
  		A String representing the object type.
  */
  ;

  U.toString = function () {
    return '[object UIButton]';
  };
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PROTECTED METHODS

  /**	Method: _onClick()
  		Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.
  */


  U._onClick = function (event) {};
  /**	Method: _onOver()
  		Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.
  */


  U._onOver = function (event) {};
  /**	Method: _onOut()
  		Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.
  */


  U._onOut = function (event) {};
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE METHODS


  function createChild(name, isIcon) {
    var elem;
    var id = arg.id + (isIcon ? '-state-' + _icon.length : '-bg');

    if (typeof name == 'string') {
      elem = new _UIImage__WEBPACK_IMPORTED_MODULE_1__["default"]({
        target: U,
        id: id,
        source: name,
        css: _containChild ? {
          width: 'inherit',
          height: 'inherit'
        } : {}
      });
    } else {
      elem = name;
      elem.id = id;
      U.addChild(elem);

      if (/(UITextField)/gi.exec(elem.toString())) {
        elem.resetToDefault();
      }

      elem._initAlign(true);
    }

    if (isIcon) {
      _icon.push(elem);

      ad_view__WEBPACK_IMPORTED_MODULE_2__["Styles"].addClass(elem, 'ui-button-state');
    } else {
      _bg = elem;
    }

    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"].disable(elem);
  }

  function clampContainer() {
    ad_view__WEBPACK_IMPORTED_MODULE_2__["Clamp"].set(U, 'clamp' + (!arg.css.width ? 'X' : '') + (!arg.css.height ? 'Y' : ''), {}, false);
  }
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // EVENT HANDLERS


  function handleClick(event) {
    ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].stop(event);
    if (U.togglable) U.state = Number(!_state);

    U._onClick.call(U, event);

    U.onClick.call(U, event);
  }

  function handleOver(event) {
    U._onOver.call(U, event);

    U.onOver.call(U, event);
  }

  function handleOut(event) {
    U._onOut.call(U, event);

    U.onOut.call(U, event);
  }

  function handleBaseEnabled(event) {
    var listener = U.enabled ? 'addEventListener' : 'removeEventListener';
    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"][listener](U, ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].CLICK, handleClick);
    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"][listener](U, ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].OVER, handleOver);
    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"][listener](U, ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].OUT, handleOut);
  }
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // INIT


  U.addEventListener(ad_events__WEBPACK_IMPORTED_MODULE_3__["UIEvent"].ENABLED, handleBaseEnabled);
  U.enabled = true;
  U.state = arg.state || 0;

  U._initAlign();

  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UIButton);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UICanvas.js":
/*!********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UICanvas.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/**
	@npmpackage
	@class UICanvas
	@param {string} id
	@param {element} target
	@param {object} css
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UICanvas } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  Unlike other UI elements, this creates a DOM &lt;canvas>.
		By extending {@link UIComponent} this has all of its native properties and methods.  See {@link UIComponent} for more info.
	@example
		var myCanvas = new UICanvas({
			id : 'my-btn',
			target : View.main,
			css : {
				x : 15,
				y : 18,
				width : 50,
				height : 20,
				backgroundColor : '#ff0000'
			}
		});
*/


var UICanvas = function UICanvas(arg) {
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // MARKUP
  arg = arg || {};
  var width = arg.css.width;
  var height = arg.css.height;
  delete arg.css.width;
  delete arg.css.height;
  var U = new _UIComponent__WEBPACK_IMPORTED_MODULE_0__["default"](arg, 'canvas');
  U.setAttribute('width', width);
  U.setAttribute('height', height);
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE PROPERTIES

  var _ctx2d = U.getContext('2d');

  var _ctx3d = U.getContext('webgl');
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // GETTER | SETTTER


  Object.defineProperties(U, {
    /**
    	@memberOf UICanvas
    	@var {canvas} context2d
    	@desc
    		Getter : Returns direct access to the canvas context of '2d'.
    	@example
    		console.log( myCanvas.context2d );
    */
    context2d: {
      get: function get() {
        return _ctx2d;
      }
    },

    /**
    	@memberOf UICanvas
    	@var {canvas} context3d
    	@desc
    		Getter : Returns direct access to the canvas context of 'webgl'.
    	@example
    		console.log( myCanvas.context3d );
    */
    context3d: {
      get: function get() {
        return _ctx3d;
      }
    }
  });
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  /**
  	@memberOf UICanvas
  	@method toString
  	@returns {string} [object UICanvas]
  	@desc
  		A String representing the object type.
  */

  U.toString = function () {
    return '[object UICanvas]';
  };
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // INIT


  U._initAlign(true);

  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UICanvas);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js":
/*!***********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIDiv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIDiv */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIDiv.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** 
	@npmpackage
	@class UIComponent
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIComponent } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, which is an extension of a DOM element &lt;div> with extra base functionality.  
		There are inherited properties and methods for enabling, show, hide, etc. It is a base class that can be 
		extended for custom UI elements. 
		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>
			// bare minimum creation - can be added to anything and named later.
			var myBase = new UIComponent();
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// simple creation - no style
			var myBase = new UIComponent({
				target : View.main,
				id : 'my-component'
			});
		</codeblock>
		<br><br>
		

		<b>Sample 3:</b><br>
		<codeblock>
			// create with assigned styles
			var myBase = new UIComponent({
				target : View.main,
				id : 'my-component',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			});
		</codeblock>
		<br><br>


		<b>Sample 4:</b><br>
		<codeblock>
			// create and align the image inline
			var myImage = new UIComponent({
				target : View.main,
				id : 'my-component',
				align : { 
					x:{
						type : Align.RIGHT,
						offset : -10
					},
					y: {
						type : Align.TOP,
						offset : 10
					}	
				}
			});
		</codeblock>
		<br><br>
*/




var UIComponent =
/*#__PURE__*/
function (_UIDiv) {
  _inheritsLoose(UIComponent, _UIDiv);

  function UIComponent(arg, type) {
    var _this;

    var _enabled = true;
    var _showing = true;

    var _typeDef = type || 'div';
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // MARKUP


    arg = arg || {};
    type = _typeDef == 'svg' ? 'div' : type;
    _this = _UIDiv.call(this, arg, type) || this;

    var U = _assertThisInitialized(_this);
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // PROTECTED PROPERTIES


    U._align = arg.align;
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // GETTER | SETTTER

    Object.defineProperties(U, {
      /**
      	@memberOf UIComponent
      	@var {number} x
      		Getter|Setter : A Number representing the x position.  Directly gets/sets the css transform x. 
      	@example
      		// get
      		console.log( myComponent.x );
      				// set
      		myComponent.x = 7;
      */
      x: {
        get: function get() {
          //return +getTransformMatrix()[4]
          return ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].getCss(U, 'x');
        },
        set: function set(value) {
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
            x: value
          });
        }
      },

      /**
      	@memberOf UIComponent
      	@var {number} y
      		Getter|Setter : A Number representing the y position.  Directly gets/sets the css transform y.
      	@example
      		// get
      		console.log( myComponent.y );
      				// set
      		myComponent.y = 14;
      */
      y: {
        get: function get() {
          //return +getTransformMatrix()[5]
          return ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].getCss(U, 'y');
        },
        set: function set(value) {
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
            y: value
          });
        }
      },

      /**
      	@memberOf UIComponent
      	@var {boolean} enabled
      		Getter|Setter : A Boolean to toggle if the Gesture events are active.
      	@example
      		// get
      		console.log( myComponent.enabled );
      				// set
      		myComponent.enabled = true;
      */
      enabled: {
        get: function get() {
          return _enabled;
        },
        set: function set(state) {
          _enabled = state; //U.dispatchEvent ( new CustomEvent( 'uiComponentEnabled' ))

          U.dispatchEvent(ad_events__WEBPACK_IMPORTED_MODULE_2__["UIEvent"].componentEnabled);
        }
      },

      /**
      	@memberOf UIComponent
      	@var {boolean} showing
      		Getter|Setter : A Boolean to check if the component is currently showing. Can NOT be set.
      	@example
      		// get
      		console.log( myComponent.showing );
      */
      showing: {
        get: function get() {
          return _showing;
        },
        set: function set() {
          console.log(':: WARNING ::\n\n\tUIComponent.showing cannot be set.\n\n');
        }
      }
    });

    if (_typeDef != 'canvas' && _typeDef != 'svg') {
      Object.defineProperties(U, {
        /**
        	@memberOf UIComponent
        	@var {number} width
        		Getter|Setter : A Number representing the width of the div.  Directly gets/sets the style css width. 
        	@example
        		// get
        		console.log( myComponent.width );
        				// set
        		myComponent.width = 140;
        */
        width: {
          get: function get() {
            return U.offsetWidth;
          },
          set: function set(value) {
            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
              width: value
            });
            var evt = new CustomEvent(ad_events__WEBPACK_IMPORTED_MODULE_2__["UIEvent"].RESIZE);
            evt.direction = 'width';
            U.dispatchEvent(evt);
          }
        },

        /**
        	@memberOf UIComponent
        	@var {number} height
        		Getter|Setter : A Number representing the height of the div.  Directly gets/sets the style css height.
        	@example
        		// get
        		console.log( myComponent.height );
        				// set
        		myComponent.height = 140;
        */
        height: {
          get: function get() {
            return U.offsetHeight;
          },
          set: function set(value) {
            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
              height: value
            });
            var evt = new CustomEvent(ad_events__WEBPACK_IMPORTED_MODULE_2__["UIEvent"].RESIZE);
            evt.direction = 'height';
            U.dispatchEvent(evt);
          }
        }
      });
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // PUBLIC METHODS

    /**
    	@memberOf UIComponent
    	@method hide
    	@desc
    		Visually removes the component from the DOM by setting its display property to none
    	@example
    		myComponent.hide();
    */


    U.hide = function () {
      U.style.display = 'none';
      _showing = false;
    };
    /**
    	@memberOf UIComponent
    	@method show
    	@desc
    		Visually displays the component in the DOM
    	@example
    		myComponent.show();
    */


    U.show = function () {
      try {
        //console.log( '    try removeProperty()')
        U.style.removeProperty('display');
      } catch (e) {
        //console.log( '    catch display = null' )
        U.style.display = null;
      }

      _showing = true;
    };
    /**
    	@memberOf UIComponent
    	@method setCss
    	@desc
    		Set any of the style properites of the component.  A direct link to Styles.setCss() for convience.
    	@example
    		myComponent.setCss({ 
    			width : 300,
    			height : 150
    		});
    */


    U.setCss = function (args) {
      ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, args);
    };
    /**
    	@memberOf UIComponent
    	@method addChild
    	@desc
    		Add a DOM element to the component.
    	@example
    		myComponent.addChild( myChild );
    */


    U.addChild = function (elem) {
      var child = ad_view__WEBPACK_IMPORTED_MODULE_1__["Markup"].get(elem);
      U.appendChild(child);
      if (elem._align) ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].set(elem, elem._align);
    };
    /**
    	@memberOf UIComponent
    	@method inspect
    	@desc
    		Traces out an object of all the public properties and methods of the component.
    	@example
    		myComponent.inspect();
    */


    U.inspect = function () {
      var o = {};
      var props = Object.getOwnPropertyNames(U);

      for (var i = 0; i < props.length; i++) {
        var val = U[props[i]];
        o[props[i]] = val;
      }

      console.log('\n\t', U.toString(), '\t', U.id, '\n\t', o);
    };
    /**
    	@memberOf UIComponent
    	@method toString
    	@desc
    		A String to represet the object type.
    	@example
    		myComponent.toString();
    */


    U.toString = function () {
      return '[object UIComponent]';
    };
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // PRIVATE METHODS


    U._initAlign = function (parentTriggered) {
      var fire = parentTriggered ? parentTriggered == true : arg.target != undefined;

      if (arg.align && fire) {
        ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].set(U, arg.align);
      }
    };
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // INIT


    U.enabled = true;

    U._initAlign();

    return U || _assertThisInitialized(_this);
  }

  return UIComponent;
}(_UIDiv__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (UIComponent);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIDiv.js":
/*!*****************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIDiv.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/** 
	@npmpackage
	@class UIDiv
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIDiv } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, which is a DOM element <div>, that internally handles assigning the passed in parameters.
		<br><br>  

		<b>Sample 1:</b><br>
		<codeblock>
			// bare minimum creation - can be added to anything and named later.
			var myBase = new UIDiv();
		</codeblock>
		<br><br>


		<b>Sample 1:</b><br>
		<codeblock>
			// simple creation - no style
			// Added to a container, such as Main
			T.myBase = new UIDiv({
				target : T,
				id : 'my-div'
			});
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// create with assigned styles
			var myBase = new UIDiv({
				target : T,
				id : 'my-div',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			});
		</codeblock>
		<br><br>
*/


var UIDiv = function UIDiv(arg, type) {
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // BASE CSS
  ad_view__WEBPACK_IMPORTED_MODULE_0__["Styles"].injectStylesheet('RED_uiElement', '.ui-elem', 'position:absolute;');
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // MARKUP
  // internal pass in other type of element, such as <canvas>

  type = type || 'div';
  var U = document.createElement(type);
  ad_view__WEBPACK_IMPORTED_MODULE_0__["Styles"].addClass(U, 'ui-elem');
  arg = arg || {};
  if (arg.id) U.id = arg.id;
  ad_view__WEBPACK_IMPORTED_MODULE_0__["Styles"].setCss(U, arg.css);

  if (arg.target) {
    var target = ad_view__WEBPACK_IMPORTED_MODULE_0__["Markup"].get(arg.target);
    target.appendChild(U);
  }
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // GETTER | SETTTER

  /**
  		@memberOf UIDiv
  		@var {element} parent
  			Getter : Returns the parent, ie the DOM element this <div> is inside of.
  		@example
  			// get
  			console.log( myImage.source );
  
  			// set
  			myImage.source = 'template_image';
  	*/


  Object.defineProperty(U, 'parent', {
    get: function get() {
      return U.parentNode;
    }
  });
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  /**
  	@memberOf UIDiv
  	@method toString
  	@desc
  		A String to represet the object type.
  	@example
  		myDiv.toString();
  */

  U.toString = function () {
    return '[object UIDiv]';
  };
  /* ------------------------------------------------------------------------------------------------------------------------------- */


  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UIDiv);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIFlex.js":
/*!******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIFlex.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UIFlex; });
/* harmony import */ var ad_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-ui */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/index.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
	@npmpackage
	@class UIFlex
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIFlex } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that has default values for css flexbox. All children's position
		is set to relative, to allow the flexbox to work. The default setup of UIFlex is to make a row, with the content evenly spread with no buffers on 
		the outside, aka space-around. There are setters for the primary orientation css keys. They can be passed in to the constructor or using the seeters.
		They can still be overwritten by simply changing them with {@link Styles.setCss}
		<br><br>
		
		By default, UIFlex has these styles set:<br>
		<codeblock>
			display: flex; 
			flex-wrap: nowrap; 
			justify-content: space-around;
		</codeblock>
		<br><br>

		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>

		For all flexbox options, see https://www.w3schools.com/css/css3_flexbox.asp

		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>			
			var myFlexContainer = new UIFlex({
				target: T,
				css: {
					width: 350,
					height: 100,
					backgroundColor: 'rgba(255,0,0,0.3)'
				},
				// optional
				flexDirection: 'column',
				justifyContent: 'space-between',
				flexWrap: 'wrap'
			})
		</codeblock>

		<b>Sample 2:</b>Replace EndFrame UIComponent with a UIFlex<br>
		<codeblock>
			function EndFrame() {
				var T = new UIFlex({
					id: 'endframe-container',
					target: View.main,
					css: {
						width: 'inherit',
						height: 'inherit'
					}
				})

				return T
			}
		</codeblock>
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */



var UIFlex =
/*#__PURE__*/
function (_UIComponent) {
  _inheritsLoose(UIFlex, _UIComponent);

  function UIFlex(arg) {
    var _this;

    _this = _UIComponent.call(this, arg) || this;

    var T = _assertThisInitialized(_this);

    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].injectStylesheet('RED_flex', '.flex-container', 'display: flex; flex-wrap: nowrap; justify-content: space-around;', '.flex-container > div', 'position: relative;');
    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].addClass(T, 'flex-container');
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // GETTER | SETTTER

    Object.defineProperties(T, {
      /**
      	@memberOf UIFlex
      	@var {string} flexDirection
      	@desc
      		Setter : Changes the direction of the flexbox. Options: 'row', 'column'. Default: 'row'
      	@example		
      		// set
      		myFlexContainer.flexDirection = 'column'
      */
      flexDirection: {
        set: function set(value) {
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(T, {
            'flex-direction': value
          });
        }
      },

      /**
      	@memberOf UIFlex
      	@var {string} justifyContent
      	@desc
      		Setter : Changes the justify layout of the flexbox. Options: 'center', 'flex-start', 'flex-end', 'space-around', 'space-between'. Default: 'space-around'
      	@example		
      		// set
      		myFlexContainer.justifyContent = 'space-between'
      */
      justifyContent: {
        set: function set(value) {
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(T, {
            'justify-content': value
          });
        }
      },

      /**
      	@memberOf UIFlex
      	@var {string} flexWrap
      	@desc
      		Setter : Changes the justify layout of the flexbox. Options: 'nowrap', 'wrap'. Default: 'nowrap'
      	@example		
      		// set
      		myFlexContainer.flexWrap = 'wrap'
      */
      flexWrap: {
        set: function set(value) {
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(T, {
            'flex-wrap': value
          });
        }
      },

      /**
      	@memberOf UIFlex
      	@var {string} alignItems
      	@desc
      		Setter : Changes the item alignment of the flexbox. Options: 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'.
      	@example		
      		// set
      		myFlexContainer.alignItems = 'flex-end'
      */
      alignItems: {
        set: function set(value) {
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(T, {
            'align-items': value
          });
        }
      }
    });
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // INIT

    for (var _i = 0, _arr = ['flexDirection', 'flexWrap', 'justifyContent', 'alignItems']; _i < _arr.length; _i++) {
      var key = _arr[_i];
      if (arg[key]) T[key] = arg[key];
    }

    return T || _assertThisInitialized(_this);
  }

  return UIFlex;
}(ad_ui__WEBPACK_IMPORTED_MODULE_0__["UIComponent"]);



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIGroup.js":
/*!*******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIGroup.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
/** 
	@class UIGroup

	@param {object} arg
		an object containing the arguments for defining / orienting the UIGroup, see Properties for more info:

	@property {element} target
		the DOM element in which to add the UIGroup

	@property {array} children
		an array of DOM elements which will be added

	@property {object} css
		CSS properties to apply to the UIGroup parent container - <b>width and height will be ignored!</b>

	@property {Align} align
		the alignment of the UIGroup parent container

	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">Github repo</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIGroup } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent} and therefor contains all of the native properties and methods of extending {@link UIComponent}.
		<br>It relocates an array of DOM elements into a newly created {@link UIComponent}, allowing for easy creation of lockups.
		<br>Returns a UIComponent
		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>
		// basic creation - add children to a UIGroup.
		let _myLockup = new UIGroup({
			target: View.main,
			children: [myDIV, myTextField, myImage],
		});
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
		// align the UIGroup after creation.
		let _myLockup = new UIGroup({
			target: View.main,
			children: [myDIV, myTextField, myImage],
			align: Align.CENTER,
		});
		</codeblock>
		<br><br>
		

		<b>Sample 3:</b><br>
		<codeblock>
		// give the parent UIGroup a background color - handy for debugging!
		let _myLockup = new UIGroup({
			target: View.main,
			children: [myDIV, myTextField, myImage],
			css:{
				backgroundColor: '#ff0000'
			}
		});
		</codeblock>
		<br><br>
*/




var UIGroup = function UIGroup(arg) {
  // make a parent container to house our incoming children
  var U = new _UIComponent__WEBPACK_IMPORTED_MODULE_0__["default"](arg); // add the children

  var _children = arg.children.slice();

  while (_children.length > 0) {
    var _child = _children.shift();

    if (_child) U.appendChild(_child);
  } // if width or height values were passed in via arg.css, they will get overwritten here


  ad_view__WEBPACK_IMPORTED_MODULE_1__["Clamp"].set(U, ad_view__WEBPACK_IMPORTED_MODULE_1__["Clamp"].XY);
  if (arg.align) ad_view__WEBPACK_IMPORTED_MODULE_1__["Align"].set(U, arg.align);
  ad_events__WEBPACK_IMPORTED_MODULE_2__["Gesture"].disable(U);
  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UIGroup);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIImage.js":
/*!*******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIImage.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony import */ var ad_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-control */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
/**
	@npmpackage
	@class UIImage
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIImage } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that has default values for the background image styles.
		They can still be overwritten by simply changing them with {@link Styles.setCss} or the native {@link UIComponent.setCss} method directly on the UIImage instance.
		<br><br>

		By default, UIImage has these styles set:<br>
		<codeblock>
			background-repeat : no-repeat; 
			background-size : contain;
		</codeblock>
		<br><br>

		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>


		<b>Sample 1:</b><br>
		<codeblock>
			// bare minimum creation - image source is required, but can be added to anything and named later.
			var myImage = new UIImage({
				source : 'template_image'
			});
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// simple creation - no style
			// Added to a container, such as Main
			T.myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image'
			});
		</codeblock>
		<br><br>
		

		<b>Sample 3:</b><br>
		<codeblock>
			// simple creation using a double sized source image
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				retina : true
			});
		</codeblock>
		<br><br>
		

		<b>Sample 4:</b><br>
		<codeblock>
			// create with assigned styles
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			});
		</codeblock>
		<br><br>
		

		<b>Sample 5:</b><br>
		<codeblock>
			// create with only a known height, but maintain the aspect ratio
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				css : {
					width : 120
				},
				aspectRatio : true
			});
		</codeblock>
		<br><br>


		<b>Sample 6:</b><br>
		<codeblock>
			// create and align the image inline
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				align : { 
					x:{
						type : Align.RIGHT,
						offset : -10
					},
					y: {
						type : Align.TOP,
						offset : 10
					}	
				},
				aspectRatio : true
			});
		</codeblock>
		<br><br>
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */





var UIImage = function UIImage(arg) {
  /* TODO
  		- lock aspect ratio (booleam?)
  */

  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // BASE CSS
  ad_view__WEBPACK_IMPORTED_MODULE_2__["Styles"].injectStylesheet('RED_uiImage', '.ui-image', 'background-repeat:no-repeat; background-size:contain;');
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE PROPERTIES

  var _init = true;
  var _source = null;
  var _retina = false;
  var _ratio = 'contain';

  var _aspectRatio = !!arg.aspectRatio;

  var _css = arg.css || {};
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // MARKUP


  if (!arg.source) throw new Error("UIImage : No image source set on '" + arg.id + "'");
  arg.css = arg.css || {};
  var U = new _UIComponent__WEBPACK_IMPORTED_MODULE_0__["default"](arg);
  ad_view__WEBPACK_IMPORTED_MODULE_2__["Styles"].addClass(U, 'ui-image');
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // GETTER | SETTTER

  Object.defineProperties(U, {
    /**
    	@memberOf UIImage
    	@var {string} source
    	@desc
    		Getter|Setter : The Image element id, via {@link ImageManager}, can be changed if need be but best to just make a new UIImage if a new source is needed.
    		Also, use this if you need to access the image for things like getting the original width or height.  
    	@example
    		// get
    		console.log( myImage.source );
    				// set
    		myImage.source = 'template_image';
    */
    source: {
      get: function get() {
        return _source;
      },
      set: function set(value) {
        _source = ad_control__WEBPACK_IMPORTED_MODULE_1__["ImageManager"].get(value);
        U.style.backgroundImage = 'url(' + _source.src + ')';
      }
    },

    /**
    	@memberOf UIImage
    	@var {boolean} retina
    	@desc
    		Getter|Setter : A Boolean to determine if the image source is double the size of the desired width & height. This is only relevant
    		if when creating a new UIImage, you do not proved a width or height value.  If you do, the UIImage will simply be
    		the size provided. 
    	@example
    		// get
    		console.log( myImage.retina );
    				// set
    		myImage.retina = false;
    */
    retina: {
      get: function get() {
        return _retina;
      },
      set: function set(value) {
        _retina = value;
        resize();
      }
    },

    /**
    	@memberOf UIImage
    	@var {string} ratio
    		Getter|Setter : A String to set the background-size property.  Use the {@link Ratio} class for constants that are easier
    		to understand: {@link Ratio.EXACT}, {@link Ratio.FIT}, {@link Ratio.FILL}, {@link Ratio.STRETCH}
    	@example
    		// get
    		console.log( myImage.ratio );
    				// set
    		myImage.ratio = Ratio.FILL;
    */
    ratio: {
      get: function get() {
        return _ratio;
      },
      set: function set(value) {
        _ratio = value;
        U.style.backgroundSize = value;
      }
    },

    /**
    	@memberOf UIImage
    	@var {boolean} aspectRatio
    	@desc
    		Getter|Setter : A Boolean to allow for the size of the element to maintain aspect ratio when either the width or height
    		are changed by directly setting them on the element, ie UIImage.width or UIImage.height.  If using Styles.setCss() this will NOT work.
    	@example
    		// get
    		console.log( myImage.aspectRatio );
    				// set
    		myImage.aspectRatio = true;
    */
    aspectRatio: {
      get: function get() {
        return _aspectRatio;
      },
      set: function set(value) {
        _aspectRatio = value;
        resize();
      }
    }
  });
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  U.toString = function () {
    return '[object UIImage]';
  };
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE METHODS


  function resize(direction) {
    var denominator = _retina ? 2 : 1;
    var ratio = _source.width / _source.height;
    var sourceWidth = arg.css.width || _source.width;
    var sourceHeight = arg.css.height || _source.height;
    var updateWidth = arg.css.width == undefined;
    var updateHeight = arg.css.height == undefined;

    if (!_init) {
      updateWidth = direction == 'height';
      updateHeight = direction == 'width';
      sourceWidth = U.width;
      sourceHeight = U.height;
    }

    if (updateWidth) {
      var width;

      if (_aspectRatio && !updateHeight) {
        width = sourceHeight * ratio;
      } else {
        width = sourceWidth / denominator;
      }

      U.style.width = Math.round(width) + 'px';
    }

    if (updateHeight) {
      var height;

      if (_aspectRatio && !updateWidth) {
        height = sourceWidth / ratio;
      } else {
        height = sourceHeight / denominator;
      }

      U.style.height = Math.round(height) + 'px';
    }
  }
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // EVENT HANDLERS


  function handleResize(event) {
    console.log('handleResize()', event, event.direction);
    resize(event.direction);
  }
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // INIT


  U.addEventListener(ad_events__WEBPACK_IMPORTED_MODULE_3__["UIEvent"].RESIZE, handleResize);
  U.source = arg.source;
  U.retina = !!arg.retina;
  if (arg.ratio) U.ratio = arg.ratio;

  U._initAlign();

  _init = false;
  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UIImage);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISlider.js":
/*!********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISlider.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/* harmony import */ var ad_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ad-events */ "./1-build/node_modules/@ff0000-ad-tech/ad-events/index.js");
/**
	@npmpackage
	@class UISlider
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UISlider } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that has built-in 
		child &lt;div>s to make up a slider, which are all publicly accessible.  The list of child divs are:<br>
		<ul>
		 <li>.bg</li>
		 <li>.loaded</li>
		 <li>.track</li>
		 <li>.handle</li>
		 <li>.hitState</li>
		</ul>
		By extending {@link UIComponent} this has all of its native properties and methods.  See {@link UIComponent} 
		for more info.
		<br><br>

		<b>Sample 1</b><br>
		<codeblock>
			var mySlider = new UISlider({
				id : 'my-slider',
				target : View.main,
				css : {
					x : 0,
					y : 0,
					width : 250,
					height : 20
				},
				bg : {
					height:'30%',
					top:'35%'
				},
				track : {
					height:'30%',
					top:'35%'
				},
				handle : {
					height:'70%',
					top:'15%'
				},

				onUpdate : handleSliderUpdate
			});

			// OR assign it after the fact
			mySlider.onUpdate = handleSliderUpdate

			// OR listen for the event
			mySlider.addEventListener ( UIEvent.SLIDER_UPDATE, handleSliderUpdate );
			function handleSliderUpdate ( event ){
				console.log( mySlider.percent );
			}
		</codeblock>
		<br><br>


		<b>Sample Extension:</b><br>
		<codeblock>
			function UICustomSlider( arg ) {
				var U = new UISlider( arg );
				
				function handleBaseSliderUpdate ( event ){
					console.log( U.percent );
				}

				function handleBaseEnabled ( event ){
					var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
					U [ listener ] ( UIEvent.SLIDER_UPDATE, handleBaseSliderUpdate );
				}

				U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )
				U.enabled = true;

				return U;
			}
		</codeblock>
		<br><br>
*/





var UISlider = function UISlider(arg) {
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // BASE CSS
  ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].injectStylesheet('RED_uiSlider', '.ui-slider', 'position:absolute; width:100%; height:100%;', '.ui-slider-bg, .ui-slider-track, .ui-slider-loaded, .ui-slider-handle, .ui-slider-hitState', 'position:absolute; width:100%; height:inherit;', '.ui-slider-bg', 'background-color: #666666;', '.ui-slider-loaded', 'background-color: #560000; width:0%;', '.ui-slider-track', 'background-color: #cc0000; width:0%;', '.ui-slider-handle', 'background-color: #ffffff; width:5%; left:0%;');
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE PROPERTIES

  var _percent = 0;
  var _dragging = false;
  var _startX = 0;
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // MARKUP

  arg = arg || {};
  var U = new _UIComponent__WEBPACK_IMPORTED_MODULE_0__["default"](arg);
  ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].addClass(U, 'ui-slider');
  var children = ['bg', 'loaded', 'track', 'handle', 'hitState'];
  U.elements = [];

  for (var i = 0; i < children.length; i++) {
    createChild(children[i]);
  }
  /**
  	@memberOf UISlider
  	@var {element} bg
  		A &lt;div> at the bottom most layer, simply the background. 
  	@example
  		// access
  		mySlider.bg
  			// change style:
  		Styles.setCss( mySlider.bg, { backgroundColor: '#ff0000' });
  */

  /**
  	@memberOf UISlider
  	@var {element} loaded
  		A &lt;div> right above the bg element, represents the loaded value when used with loaders such as with progress bars. 
  	@example
  		// access
  		mySlider.loaded
  			// change style:
  		Styles.setCss( mySlider.loaded, { backgroundColor: '#ff0000' });
  */

  /**
  	@memberOf UISlider
  	@var {element} track
  		A &lt;div> right above the loaded element, represents the percentage of the slider.
  	@example
  		// access
  		mySlider.track
  			// change style:
  		Styles.setCss( mySlider.track, { backgroundColor: '#ff0000' });
  */

  /**
  	@memberOf UISlider
  	@var {element} handle
  		A &lt;div> right above the track element, represents the handle at the placement of the percentage of the slider.  Will line up with the track size.
  	@example
  		// access
  		mySlider.handle
  			// change style:
  		Styles.setCss( mySlider.handle, { backgroundColor: '#ff0000' });
  */

  /**
  	@memberOf UISlider
  	@var {element} hitState
  		A &lt;div> at the top most level, represents the hit area for the slider.  Ot is not a graphical element and generally this should not be manipulated.
  	@example
  		mySlider.handle
  */

  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // GETTERS | SETTERS


  Object.defineProperties(U, {
    /**
    	@memberOf UISlider
    	@var {number} percent
    		Getter|Setter : A Number 0-1 representing the percent position. 
    	@example
    		// get
    		mySlider.addEventListener( UIEvent.SLIDER_UPDATE, handleSliderUpdate );
    			function handleSliderUpdate( event ){
    			console.log( mySlider.percent );
    		}
    			// set
    		mySlider.percent = .65;
    */
    percent: {
      get: function get() {
        return _percent;
      },
      set: function set(value) {
        _percent = ad_utils__WEBPACK_IMPORTED_MODULE_2__["MathUtils"].restrict(value, 0, 1);
        U.track.style.width = _percent * 100 + '%';
        U.handle.style.left = getHandlePercent() + '%';
      }
    },

    /**
    	@memberOf UISlider
    	@var {boolean} dragging
    		Getter : A Boolean representing whether or not the slider head is currently dragging. 
    */
    dragging: {
      get: function get() {
        return _dragging;
      }
    }
  });
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  /**
  	@memberOf UISlider
  	@method: onUpdate
  	@desc
  		A Method that will be called on the update of the slider.  This is set in the constructor or can be manually assigned.
  */

  U.onUpdate = arg.onUpdate || function (event) {};
  /**
  	@memberOf UISlider
  	@method: toString
  	@desc
  		A String representing the object type: [object UISlider]
  */


  U.toString = function () {
    return '[object UISlider]';
  };
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PROTECTED METHODS

  /**	Method: _onUpdateslider()
  		Protected Method for INTERNAL use when extending the class. Assign a handler directly to the component instance.
  */


  U._onUpdate = function (event) {};
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // PRIVATE METHODS


  function createChild(name) {
    U[name] = document.createElement('div');
    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].addClass(U[name], 'ui-slider-' + name);
    U[name].id = arg.id + '-' + name;
    if (arg[name]) ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U[name], arg[name]);
    if (arg[name] == false) U[name].style.display = 'none';
    U.appendChild(U[name]);
    U.elements.push(U[name]);
  }

  function positionToPercent(newX) {
    U.percent = newX / U.offsetWidth;
  }

  function getHandlePercent() {
    var thumbHalf = U.handle.offsetWidth / U.offsetWidth / 2;
    var perc = ad_utils__WEBPACK_IMPORTED_MODULE_2__["MathUtils"].restrict(_percent, thumbHalf, 1 - thumbHalf) - thumbHalf;
    return perc * 100;
  }

  function dispatch() {
    // dispatching upward for extended classes such as UIProgress
    U.dispatchEvent(ad_events__WEBPACK_IMPORTED_MODULE_3__["UIEvent"].sliderUpdate);
    U.onUpdate.call(U, ad_events__WEBPACK_IMPORTED_MODULE_3__["UIEvent"].sliderUpdate);

    U._onUpdate.call(U, ad_events__WEBPACK_IMPORTED_MODULE_3__["UIEvent"].sliderUpdate);
  }
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // EVENT HANDLERS


  function handleDown(event) {
    _dragging = true;
    _startX = event.mouse.global.x - event.mouse.local.x;
    positionToPercent(event.mouse.local.x);
    dispatch();
  }

  function handleUp(event) {
    _dragging = false;
  }

  function handleDrag(event) {
    var pos = event.mouse.local.x;

    if (event.mouse.global.x <= _startX) {
      pos = 0;
    }

    positionToPercent(pos);
    dispatch();
  }

  function handleClick(event) {
    // stops a click event from bubbling up
    //event.stopImmediatePropagation();
    ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].stop(event);
  }

  function handleBaseEnabled(event) {
    var listener = U.enabled ? 'addEventListener' : 'removeEventListener';
    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"][listener](U.hitState, ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].PRESS, handleDown);
    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"][listener](U.hitState, ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].RELEASE, handleUp);
    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"][listener](U.hitState, ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].DRAG, handleDrag);
    ad_events__WEBPACK_IMPORTED_MODULE_3__["Gesture"][listener](U.hitState, ad_events__WEBPACK_IMPORTED_MODULE_3__["GestureEvent"].CLICK, handleClick);
  }
  /* ------------------------------------------------------------------------------------------------------------------------------- */
  // INIT


  U.addEventListener(ad_events__WEBPACK_IMPORTED_MODULE_3__["UIEvent"].ENABLED, handleBaseEnabled);
  U.enabled = true;
  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UISlider);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISplitText.js":
/*!***********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISplitText.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UISplitText; });
/* harmony import */ var _UITextField_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UITextField.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UITextField.js");
/* harmony import */ var _UIComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIComponent.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony import */ var _UIGroup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIGroup.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIGroup.js");
/* harmony import */ var _TextFormat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextFormat.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextFormat.js");
/* harmony import */ var _TextSplitType_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TextSplitType.js */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/TextSplitType.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/** 
	@npmpackage
	@class UISplitText

	@param {arg} arg
		The OBJECT containing all of your UITextField and UISplitText arguments

		@property {TextSplitType|string} arg.splitType
			STRING determing if the UISplitText should break a UITextField into individuals words or characters; defaults to TextSplitType.WORDS.

		@property {boolean} arg.allowSpaceOnBreaks
			BOOLEAN determining if a line break should include a space following non-punctuational characters. For example: "word " rather than "word"; defaults to false.
			<br>
			<img src="../docs_images/uisplittext/breakSpace_true.jpg" />
			<br>
			<br>
			<img src="../docs_images/uisplittext/breakSpace_false.jpg" /> 
			<br>

		@property {string} arg.spaceBreakIncludes
			STRING determining what specific characters should be included as part of any line breaks if arg.allowSpaceOnBreaks is set to true; defaults to a-z, A-Z, and 0-9 represented as '[a-z0-9].'
	
		@property {number} arg.splitWordSpacing
			NUMBER by which to multiply the default empty space size used between each word; defaults to a multiple of 1, which is 100% of the default word spacing. <i>Do not confuse this with letter-spacing, which is defined in the <b>spacing</b> property.</i>
		
		@property {number} arg.splitLeading
			NUMBER by which to multiply the default line space value used between each line; defaults to a multiple of 1, which is 100% of the default line spacing. <i>Do not confuse this with line-spacing, which is defined in the <b>leading</b> property.</i>

		@property {boolean} arg.debug
			BOOLEAN for if you want a debug version featuring a background color and an unadulterated and un-split UITextField to compare your UISplitText instance to; defaults to false.

	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UISplitText } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, utilizing {@link UISplitText} and {@link UIComponent}.  By extending {@link UIComponent} this has all of its native properties and methods.  
		See {@link UISplitText} and {@link UIComponent} for more info.
		<br><br>

		It is a DOM {@link UIComponent} element that contains text and handles its styling, layout, and formatting in all the same ways as {@link UITextField}. The difference, however, is the it returns a container with each line, word, or character of text broken into individual {@link UITextField}s.
		<br><br>

		By default, a UISplitText will convert a {@link UITextField} into individual words or letters, and group them into {@link UIComponent}s.
		<br><br>
		<b>For Example:</b>
		<br>setting the splitType to TextSplitType.WORDS will create a {@link UIComponent} per line and a {@link UITextField} per word.
		<br>setting the splitType to TextSplitType.CHARACTERS will create a {@link UIComponent} per line, a {@link UIComponent} per word, and a {@link UITextField} per character.
		<br><br>
		UISplitText returns a {@link UIComponent}, representing the main container of the lines, words, and possibly characters.
		<br>
		This container contains arrays:
		<codeblock>
			// an array of every line of text; each line is a UIComponent
			_mySplitText.lines;

			// an array of every word of text. If arg.splitType === TextSplitType.CHARACTERS, these will be UIComponents, otherwise they are UITextFields
			_mySplitText.words;

			// an array of every character of text; each character is a {@link UITextField}
			_mySplitText.characters;
		</codeblock>
		<br><br>

		<b>Sample:</b><br>
		<codeblock>
			// creates a {@link UITextField} that breaks each character of the text value into its own {@link UITextField}
			T.mySplitText = new UISplitText({
				target : View.main,
				id : 'my-textfield',
				css : {
					x : 50,
					y : 200,
					width : 300,
					height : 90
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.INLINE,
				alignText : Align.CENTER,
				bufferText : {
					top : 1,
					bottom : 1,
					left : 5,
					right : 5
				},
				leading : .8,
				spacing : 2,
				text : 'This is my awesome sentence!',
				splitType: TextSplitType.CHARACTERS
			});

			// tweens the main container for the lines, words, and characters
			TweenLite.from ( View.main.mySplitText.lines[l], 1, {scale: 0 });

			// tweens each LINE of text from an alpha of 0
			for (let l = 0; l < View.main.mySplitText.lines.length; l++){
				TweenLite.from ( View.main.mySplitText.lines[l], 1, {alpha: 0 });
			}

			// tweens each WORD of text from a rotation of 180
			for (let w = 0; w < View.main.mySplitText.words.length; w++){
				TweenLite.from ( View.main.mySplitText.words[w], 1, {rotation: 180 });
			}

			// tweens each CHARACTER of text from a scale of of 2
			for (let c = 0; c < View.main.mySplitText.characters.length; c++){
				TweenLite.from ( View.main.mySplitText.characters[c], 1, {scale: 2 });
			}
		</codeblock>
		<br><br>
		*/








var UISplitText = function UISplitText(arg) {
  // let _buffer = arg.bufferText;
  delete arg.bufferText;

  var _mySplitText;

  arg.text = _mySplitText = arg.text.replace(/<br>/gi, ' <br>');
  var _stringArray = [];
  var _spanEnd = '</span>';

  var _spanIndexStart = _mySplitText.indexOf('<span');

  var _spanIndexEnd = _mySplitText.indexOf(_spanEnd);

  while (_spanIndexStart >= 0) {
    // push anything BEFORE the span into the array
    var _removeStr = _mySplitText.substring(0, _spanIndexStart);

    _stringArray.push(_removeStr); // strip the SPAN out of the text


    _mySplitText = _mySplitText.replace(_removeStr, '');
    _removeStr = _mySplitText.substring(0, _mySplitText.indexOf('>') + 1); // push the text into the array

    _stringArray.push(_removeStr);

    _mySplitText = _mySplitText.replace(_removeStr, '');
    _spanIndexStart = _mySplitText.indexOf('<span');
  }

  _stringArray.push(_mySplitText);

  var _finalArray = [];

  for (var t = 0; t < _stringArray.length; t++) {
    var _temp = _stringArray[t].split(_spanEnd);

    _finalArray.push(_temp[0]);

    if (_temp.length > 1) {
      _finalArray.push(_spanEnd);

      _finalArray.push(_temp[1]);
    }
  } // Now that we have looked at the entire string, make the primary reference UITextField out of it
  // arg.css.backgroundColor = 'blue'


  arg.format = arg.format || _TextFormat_js__WEBPACK_IMPORTED_MODULE_3__["INLINE_CLAMP"];
  arg.id = arg.id || 'text';
  if (arg.format.indexOf('Clamp') < 0) arg.format += 'Clamp';

  var _mainTF = new _UITextField_js__WEBPACK_IMPORTED_MODULE_0__["default"](arg); // delete arg.css.backgroundColor


  if (!arg.text || !arg.text.length) {
    _mainTF.lines = [];
    _mainTF.words = [];
    _mainTF.characters = [];
    return _mainTF;
  }

  var _parsedWords = [];

  for (var _t = 0; _t < _finalArray.length; _t++) {
    var _temp2 = _finalArray[_t].indexOf('span') >= 0 ? [_finalArray[_t]] : _finalArray[_t].split(' ');

    for (var i = 0; i < _temp2.length; i++) {
      if (_temp2[i]) _parsedWords.push(_temp2[i]);
    }
  }

  var _textContainer = new _UIComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    target: arg.target,
    id: arg.id + "_container",
    css: ad_utils__WEBPACK_IMPORTED_MODULE_6__["ObjectUtils"].defaults({
      x: _mainTF.x,
      y: _mainTF.y,
      width: _mainTF.width,
      height: _mainTF.height,
      opacity: 1,
      backgroundColor: arg.debug ? 'purple' : arg.css.backgroundColor || null
    }, arg.css, true)
  });

  _textContainer.appendChild(_mainTF);

  var _prevText;

  var _x = 0;
  var _y = 0;
  var _textLines = {
    line1: {
      width: 0,
      children: []
    }
  };
  var _lineNum = 1; // this creates a placeholder which effectively mimics the sizing of a space
  // a space in UITextField - " " - is equal to null, and renders no sizing information

  arg.text = '||';

  var _spaceTextSingle = new _UITextField_js__WEBPACK_IMPORTED_MODULE_0__["default"](arg);

  arg.text = '| |';

  var _spaceTextDouble = new _UITextField_js__WEBPACK_IMPORTED_MODULE_0__["default"](arg);

  var _spacing = (_spaceTextDouble.width - _spaceTextSingle.width) * (arg.splitWordSpacing || 1); //Math.ceil(_mainTF.fontSize / (3.7 / (arg.padding || arg.spacing || 1)));


  _spaceTextSingle.parent.removeChild(_spaceTextSingle);

  _spaceTextSingle = null;

  _spaceTextDouble.parent.removeChild(_spaceTextDouble);

  _spaceTextDouble = null; // define the arguments for each individual thing we will make

  delete arg.css.overflow;
  var _textArgs = {
    target: _textContainer,
    css: ad_utils__WEBPACK_IMPORTED_MODULE_6__["ObjectUtils"].clone(arg.css),
    format: _TextFormat_js__WEBPACK_IMPORTED_MODULE_3__["INLINE_CLAMP"],
    fontSize: _mainTF.fontSize,
    fontFamily: _mainTF.fontFamily,
    alignText: _mainTF.alignText,
    leading: _mainTF.leading,
    spacing: _mainTF.spacing,
    smoothing: _mainTF.smoothing
  };

  if (arg.debug && _textArgs.css.color) {
    ad_view__WEBPACK_IMPORTED_MODULE_5__["Styles"].setCss(_mainTF, {
      color: ad_utils__WEBPACK_IMPORTED_MODULE_6__["ColorUtils"].invert({
        color: _textArgs.css.color
      })
    });
  }

  var _span;

  var _appendBreakToNext;

  for (var _i = 0; _i < _parsedWords.length; _i++) {
    var _word = _parsedWords[_i];

    var _wordHasBreak = _word.indexOf('<br>') >= 0;

    if (_word === '<br>') {
      _appendBreakToNext = true;
    }

    _word = _word.replace(/<br>/gi, ''); // SOMETHING ABOUT STRIPPING AND REPLACING [LARGE] REMOVES A LINE BREAK;

    if (_word.indexOf('<span') >= 0) {
      _span = _word;
      continue;
    } else if (_word.indexOf('span>') >= 0) {
      _span = null;
      continue;
    }

    if (_word) {
      if (_appendBreakToNext) _wordHasBreak = true;
      _appendBreakToNext = false; // if (_span) _word = _span + _word + _spanEnd;

      var _clone = ad_utils__WEBPACK_IMPORTED_MODULE_6__["ObjectUtils"].clone(_textArgs);

      _clone.css.x = _x;
      _clone.css.y = _y;
      _clone.text = _word;
      _clone.id = "word_" + _word;
      if (_span) _clone.text = _span + _word + _spanEnd;

      var _newWord = new _UITextField_js__WEBPACK_IMPORTED_MODULE_0__["default"](_clone); // _newWord.format = TextFormat.INLINE_CLAMP;


      _newWord.copy = _word;
      _newWord.span = _span; // if our text is a paragraph, we want some line breaks. Do that here.

      if (_wordHasBreak || _mainTF.format.indexOf('paragraph') >= 0 && _newWord.width + _newWord.x > _mainTF.width) {
        _lineNum++;
        _textLines['line' + _lineNum] = {
          width: 0,
          children: []
        };
        _newWord.x = _x = 0;
        _y += _newWord.height;
        _newWord.y = _y;
        _textLines['line' + _lineNum].width = 0;
      } else if (_prevText) {
        ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].set(_newWord, {
          y: {
            type: ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].CENTER,
            against: _prevText
          }
        });
      }

      _x += _newWord.width + _spacing;
      _textLines['line' + _lineNum].width = _newWord.x + _newWord.width;

      _textLines['line' + _lineNum].children.push(_newWord);

      _prevText = _newWord;
    }
  }

  var _newLine;

  var _offset;

  var _prevGroup;

  _textContainer.words = [];
  _textContainer.lines = [];

  for (var line in _textLines) {
    _newLine = _textLines[line];

    for (var _l = 0; _l < _newLine.children.length; _l++) {
      var _child = _newLine.children[_l];

      _textContainer.words.push(_child);

      if (_mainTF.alignText !== ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].LEFT) {
        _offset = _mainTF.width - _newLine.width;
        if (_mainTF.alignText === ad_view__WEBPACK_IMPORTED_MODULE_5__["Align"].CENTER) _offset /= 2;
        _child.x += _offset;
      }
    }

    var _group = new _UIGroup_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      id: "line_" + (_textContainer.lines.length + 1),
      children: _newLine.children,
      target: _textContainer
    });

    if (_prevGroup) _group.y = _prevGroup.y + _prevGroup.height * (arg.splitLeading || 1);
    var _lastChar = _group.childNodes[_group.childNodes.length - 1];
    _lastChar = _lastChar.text.substring(_lastChar.text.length - 1, _lastChar.text.length); // TO-DO
    // make this work on center, left, and right justification - currently only works on right
    // although if it's left, do we really care about empty spaces? To be continued...

    if (arg.allowSpaceOnBreaks && _lastChar.match(new RegExp(arg.spaceBreakIncludes || 'a-z0-9]', 'gi'))) _group.x -= _spacing;

    _textContainer.lines.push(_group);

    _prevGroup = _group;
  }

  var _splitType = arg.splitType || _TextSplitType_js__WEBPACK_IMPORTED_MODULE_4__["WORDS"];

  if (_splitType === _TextSplitType_js__WEBPACK_IMPORTED_MODULE_4__["CHARACTERS"]) {
    _textContainer.characters = [];

    for (var w = 0; w < _textContainer.words.length; w++) {
      var _word2 = _textContainer.words[w];
      var _copy = _word2.copy;

      while (_word2.childNodes.length > 0) {
        _word2.removeChild(_word2.childNodes[0]);
      }

      var _x2 = 0;

      var _newLetter = void 0;

      var _originalW = _word2.width;

      for (var l = 0; l < _copy.length; l++) {
        _textArgs.css.x = _x2;
        _textArgs.css.y = 0;
        _textArgs.target = _word2;
        _textArgs.text = _word2.span ? _word2.span + _copy[l] + _spanEnd : _copy[l];
        _textArgs.id = "letter_" + _copy[l];
        _newLetter = new _UITextField_js__WEBPACK_IMPORTED_MODULE_0__["default"](_textArgs);
        _x2 += _newLetter.width;

        _textContainer.characters.push(_newLetter);
      }

      ad_view__WEBPACK_IMPORTED_MODULE_5__["Clamp"].set(_word2, ad_view__WEBPACK_IMPORTED_MODULE_5__["Clamp"].XY);
      ad_view__WEBPACK_IMPORTED_MODULE_5__["Styles"].setCss(_word2, {
        overflow: 'inherit',
        backgroundColor: null
      });

      if (_originalW < _word2.width && _word2.childNodes.length) {
        var _offset2 = (_word2.width - _originalW) / (_word2.childNodes.length - 1);

        for (l = 1; l < _word2.childNodes.length; l++) {
          _newLetter = _word2.childNodes[l];
          _newLetter.x -= Math.abs(_offset2 * l);
        }
      }
    }

    if (arg.allowSpaceOnBreaks) for (var _l2 = 0; _l2 < _textContainer.lines.length; _l2++) {
      ad_view__WEBPACK_IMPORTED_MODULE_5__["Clamp"].set(_textContainer.lines[_l2], ad_view__WEBPACK_IMPORTED_MODULE_5__["Clamp"].XY);
    }
  }

  if (arg.debug) {
    _mainTF.x = _mainTF.y = 0;
  } else {
    _textContainer.removeChild(_mainTF);

    _mainTF = null;
  }

  ad_view__WEBPACK_IMPORTED_MODULE_5__["Clamp"].set(_textContainer, ad_view__WEBPACK_IMPORTED_MODULE_5__["Clamp"].XY);
  Object.defineProperties(_textContainer, {
    /**
    			@memberOf UISplitText
    			@var {number} wordSpacing
    				READ-ONLY : NUMBER representing how much space exists between each word; affected by arg.splitWordSpacing on instantiation.
    			@example
    				// get
    				console.log( myUISplitText.wordSpacing );
    				//
    				const _word1 = myUISplitText.words[0]
    				const _word2 = myUISplitText.words[1]
    				_word1.x = _word2.x + _word2.width + myUISplitText.wordSpacing
    		*/
    wordSpacing: {
      get: function get() {
        return _spacing;
      }
    }
  });
  return _textContainer;
};



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISvg.js":
/*!*****************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UISvg.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/** 
	@npmpackage
	@class UISvg
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UISvg } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that contains a markup &lt;svg&gt; element
		which allows for vector display, manipulation and animation.  This allows for smaller file sizes with crisp visual aesthetics.
		<br><br>

		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>

		<b>&lt;svg&gt; formatting</b><br>
		Original code from Illustrator:
		<codeblock>
			&lt;?xml version="1.0" encoding="utf-8"?&gt;
			&lt;!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --&gt;
			&lt;svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 130 200" style="enable-background:new 0 0 130 200;" xml:space="preserve"&gt;
				&lt;style type="text/css"&gt;
					.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}
				&lt;/style&gt;
				&lt;path id="XMLID_1" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4
					c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/&gt;
			&lt;/svg&gt;
		</codeblock>
		<br><br>

		Things that are unnecessary:
		<codeblock>
			&lt;?xml version="1.0" encoding="utf-8"?&gt;
			&lt;!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --&gt;
			&lt;svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 style="enable-background:new 0 0 130 200;" xml:space="preserve"&gt;
		</codeblock>
		<br><br>
				
		The only thing that IS necessary in the &lt;svg&gt; node is:
		<codeblock>
			&lt;svg viewBox="0 0 130 200"&gt;
		</codeblock>
		<br><br>
		
		Trimmed down for source:	
		<codeblock>
			&lt;svg viewBox="0 0 130 200"&gt;
				&lt;style type="text/css"&gt;
					.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}
				&lt;/style&gt;
				&lt;path id="XMLID_1" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4
					c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/&gt;
			&lt;/svg&gt;
		</codeblock>
		<br><br>	

		NOTE: Sometimes there will be a width and/or height attribute.  This will overwrite the viewBox and cause display issues. This should be removed
		
		<br><br>
		Convert to string for javascript.  This can be done inline with the UISvg instance, but since vector is scalable and reusable 
		across all sizes, it is a good idea to place this in AdData so that it can be accessed by all builds, classes and instances.
		<codeblock>
			// In AdData
			this.svgSrc = '&lt;svg viewBox="0 0 130 200"&gt;'
						+ '&lt;style type="text/css"&gt;.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}&lt;/style&gt;'
						+ '&lt;path id="XMLID_1" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/&gt;'
						+ '&lt;/svg&gt;'
		</codeblock>
		<br><br>

		Create a UISvg:
		<codeblock>
			var mySvg = new UISvg ({
				id : 'my-svg',
				target : View.main,
				source : adData.svgSrc,
				css : {
					width : 75
				}
			})
		</codeblock>
*/



var UISvg = function UISvg(arg) {
  arg.css = arg.css || {};
  var _source = null;

  var _css = arg.css || {};

  var _ratio = 1;

  var _noWidth = _css.width == undefined;

  var _noHeight = _css.height == undefined;

  if (_noWidth && _noHeight) {
    _css.width = _css.height = 'inherit';
  }

  if (!arg.source) throw new Error("UISvg : No markup source set on '" + arg.id + "'");
  var U = new _UIComponent__WEBPACK_IMPORTED_MODULE_0__["default"](arg, 'svg');
  Object.defineProperties(U, {
    /**
    	@memberOf UISvg
    	@var {string} source
    	@desc
    		Getter|Setter : A string markup of an svg code: which is in an html/xml style format.  Note that when exporting from Illustrator or other
    		programs there is extra bloat code that is not necessary.
    	@example
    		// get
    		console.log(mySvg.source)
    			// set
    		mySvg.source = '<svg viewBox="0 0 130 200">'
    						+ '<style type="text/css">.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}</style>'
    						+ '<path id="XMLID_1_" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/>'
    						+ '</svg>'						
    */
    source: {
      get: function get() {
        return _source;
      },
      set: function set(value) {
        _source = value;
        U.innerHTML = value;
        var svg = U.getElementsByTagName('svg')[0];
        var viewBox = svg.getAttribute('viewBox').split(/\s/g);
        _ratio = +viewBox[2] / +viewBox[3];
      }
    },

    /**
    	@memberOf UISvg
    	@var {number} width
    		Getter|Setter : A Number representing the width of the div.  Directly gets/sets the style css width.
    		<br><span style="color:#ff0000;">WARN:</span> This will change the height as well to maintain aspect ratio of the source 
    	@example
    		// get
    		console.log(mySvg.width)
    			// set
    		mySvg.width = 140
    */
    width: {
      get: function get() {
        return U.offsetWidth;
      },
      set: function set(value) {
        var newHeight = value / _ratio;
        ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
          width: value,
          height: newHeight
        });
      }
    },

    /**
    	@memberOf UISvg
    	@var {number} height
    		Getter|Setter : A Number representing the height of the div.  Directly gets/sets the style css height.
    		<br><span style="color:#ff0000;">WARN:</span> This will change the width as well to maintain aspect ratio of the source 
    	@example
    		// get
    		console.log(mySvg.height)
    			// set
    		mySvg.height = 140
    */
    height: {
      get: function get() {
        return U.offsetHeight;
      },
      set: function set(value) {
        var newWidth = value * _ratio;
        ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
          width: newWidth,
          height: value
        });
      }
    }
  });

  U.toString = function () {
    return '[object UISvg]';
  };

  U.source = arg.source;

  if (_noWidth && _noHeight) {} else if (_noWidth) {
    U.height = _css.height;
  } else if (_noHeight) {
    U.width = _css.width;
  }

  U._initAlign();

  return U;
};

/* harmony default export */ __webpack_exports__["default"] = (UISvg);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UITextField.js":
/*!***********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UITextField.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIComponent */ "./1-build/node_modules/@ff0000-ad-tech/ad-ui/lib/UIComponent.js");
/* harmony import */ var ad_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-view */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js");
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/* harmony import */ var ad_external__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ad-external */ "./1-build/node_modules/@ff0000-ad-tech/ad-external/index.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** 
	@npmpackage
	@class UITextField
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UITextField } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  By extending {@link UIComponent} this has all of its native properties and methods.  
		See {@link UIComponent} for more info.
		<br><br>

		It is a DOM element that contains text and handles its styling, layout, and formatting.  There are multiple format types, which allow for different 
		use cases, whether it be an auto word wrapping paragraph style or rigid lines.  
		<br><br>

		Auto-sizing of font is built into the types, so there is no longer a need to run a secondary method.  Just set that type and it does it automatically.  
		See {@link TextFormat} for more info on each type. 
		<br><br>

		UITextfield works by utilizing native css properties to accomplish things like vertical and horizontal alignment, leading (line spacing),
		and padding. There are getter/setters for display properties so generally speaking, there should not be a need to manually manipulate the css of the content.
		Rather than having multiple nested divs that all must using their width and height to accomplish these, using the native css allows for greater control.  
		<br><br>

		So, UITextField is simply a &lt;div> and a child &lt;span> element that holds the content. That &lt;span> element is relativly placed which is how all the css 
		works, so it is advised against targeting that &lt;span> for any reason.  Use the top level for animation.
		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>
			// creates a textfield on Main container that displays text in a line
			T.myTextField = new UITextField({
				target : T,
				id : 'my-textfield',
				css : {
					x : 50,
					y : 200,
					width : 300,
					height : 90
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.INLINE,
				alignText : Align.CENTER,
				bufferText : {
					top : 1,
					bottom : 1,
					left : 5,
					right : 5
				},
				leading : .8,
				spacing : 2,
				text : 'This is my awesome sentence!'
			});

			// referenced later anywhere outside the class by
			View.main.myTextField
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// creates a textfield that displays text as a paragraph, but resizes to fit the container
			T.myTextField = new UITextField ({
				target : T,
				id : 'my-textfield',
				css : {
					x : 50,
					y : 200,
					width : 200,
					height : 90
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.PARAGRAPH_FIT,
				alignText : Align.LEFT,
				leading : .8,
				text : 'This is my awesome sentence!'
			});
		</codeblock>
		<br><br>


		<b>Sample 3:</b><br>
		<codeblock>
			// creates a textfield and resizes the container to fit the text
			View.main.myTextField = new UITextField ({
				target : View.main,
				id : 'my-textfield',
				css : {
					x : 50,
					y : 200,
					width : 30,
					height : 10
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.INLINE_CLAMP,
				alignText : Align.LEFT,
				leading : .8,
				text : 'This is my awesome sentence!'
			});
		</codeblock>
		<br><br>
*/





var UITextField =
/*#__PURE__*/
function (_UIComponent) {
  _inheritsLoose(UITextField, _UIComponent);

  function UITextField(arg) {
    var _this;

    /* 
    	TODO 
    	- debug - use class
       
       BUGS
    	- 
    		CODE NOTE
    		div {
    			width: 250px;
    			height: 100px;
    			text-align: center;
    			border: 1px solid #123456;
    			font-size: 24px;
    			display: inline-block;
    		}
    			span {
    			display: table-cell;
    			vertical-align: center;
    			height: 100px;
    			width: 250px;
    			line-height: 130%;
    			background-color: rgba(200,0,0,.5);
    		}
    */

    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // BASE CSS
    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].injectStylesheet('RED_uiTextfield', '.ui-textfield', 'position:absolute; white-space:nowrap;', '.smooth-text', '-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;', '.ui-textfield .content', 'position:relative; display:table-cell; cursor:default; pointer-events:none; line-height:100%; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;');
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // PRIVATE PROPERTIES

    var _alignText;

    var _fontSize = 0;
    var _minFontSize = 6;

    var _fontFamily;

    var _format = '';

    var _leading;

    var _spacing;

    var _bufferText = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
    var _text = '';
    var _init = true;

    var _verticalAlign;

    var _smoothing;

    var _defaults = {};
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // MARKUP

    arg = arg || {};
    _this = _UIComponent.call(this, arg) || this;

    var U = _assertThisInitialized(_this);

    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].addClass(U, 'ui-textfield');

    var _content = document.createElement('span');

    ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].addClass(_content, 'content');
    U.appendChild(_content);
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // GETTER | SETTTER

    Object.defineProperties(U, {
      /**
      	@memberOf UITextField
      	@var {string|Align} alignText
      		Getter|Setter : A String, or {@link Align} constant, representing the alignment of the text content inside the UITextField.
      	@example
      		// change the size of the font
      		View.main.myTextField.alignText = Align.BOTTOM_RIGHT;
      			// get the current size of the font
      		console.log( View.main.myTextField.alignText );
      */
      alignText: {
        get: function get() {
          return _alignText;
        },
        set: function set(value) {
          //console.log( 'UITextfield :: SET -> alignText =', value )
          if (value && _alignText != value) {
            _alignText = value;
            var ta = (_alignText.match(/(left|right)/gi) || ['center'])[0].toLowerCase();
            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
              lineHeight: U.height,
              textAlign: ta
            });
            _verticalAlign = (_alignText.match(/(bottom|top)/gi) || ['middle'])[0].toLowerCase();
            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(_content, {
              verticalAlign: _verticalAlign
            });
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {number} fontSize
      		Getter|Setter : A Number representing the current size of the text font. 
      	@example
      		// change the size of the font
      		View.main.myTextField.fontSize = 14
      			// get the current size of the font
      		console.log( View.main.myTextField.fontSize )
      */
      fontSize: {
        get: function get() {
          return _fontSize;
        },
        set: function set(value) {
          if (!isNaN(value) && value > 0) {
            _fontSize = value;
            U.style.fontSize = ~~value + 'px';
            update();
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {number} minFontSize
      		Getter|Setter : A Number representing the minimum size of the text font to avoid resozing down to 0. Default is 1. 
      	@example
      		// change the minimum size of the font
      		View.main.myTextField.minFontSize = 5
      			// get the current minimum size of the font
      		console.log( View.main.myTextField.minFontSize )
      */
      minFontSize: {
        get: function get() {
          return _minFontSize;
        },
        set: function set(value) {
          if (value != undefined && _minFontSize != value) {
            if (value < 1) value = 1;
            _minFontSize = value;
            update();
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {string} fontFamily
      		Getter|Setter : A String representing the current font family being assigned to the text. 
      	@example
      		// change the font 
      		View.main.myTextField.fontFamily = 'Arial'
      			// get the current font
      		console.log( View.main.myTextField.fontFamily )
      */
      fontFamily: {
        get: function get() {
          return _fontFamily;
        },
        set: function set(value) {
          _fontFamily = value;
          U.style.fontFamily = value;
          update();
        }
      },

      /**
      	@memberOf UITextField
      	@var {string|TextFormat} format
      		Getter|Setter : A String, or {@link TextFormat} constant, representing the layout type for the text within the UITextField.  
      		<br><br>
      			This is what defines if the text is either in a line, word wrapped like a paragraph, has auto sizing to the font soze or if the 
      		UITextField is resized to the content.  See {@link TextFormat} for more info.
      	@example
      		View.main.myTextField = new UITextField({
      			target : View.main,
      			id : 'my-textfield',
      			css : {
      				width : 200,
      				height : 90
      			},
      			fontSize : 30,
      			format : TextFormat.INLINE,
      			text : 'This is my awesome sentence!'
      		});
      			// change from an inline to a word warping paragraph style
      		View.main.myTextField.format = TextFormat.PARAGRAPH;
      			// change back to inline with autosizing
      		View.main.myTextField.format = TextFormat.INLINE_FIT;
      			// change back to a word warpping paragraph style that auto sizes the font to fit perfectly
      		View.main.myTextField.format = TextFormat.PARAGRAPH_FIT;
      			// resize the UITextField to fit the size of all the text as inline
      		View.main.myTextField.format = TextFormat.INLINE_CLAMP;
      			// resize the UITextField to fit the size of all the text as a paragraph
      		View.main.myTextField.format = TextFormat.PARAGRAPH_CLAMP;
      */
      format: {
        get: function get() {
          return _format;
        },
        set: function set(value) {
          //console.log( 'UITextfield :: SET -> format =', value )
          if (_format != value) {
            _format = value; // any inline type uses 'nowrap' / any paragraph uses 'normal'

            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
              whiteSpace: /inline/g.exec(_format) != null ? 'nowrap' : 'normal'
            });
            update();
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {number} leading
      		Getter|Setter : A Number representing the percentage of spacing between each line relative to the font size.
      		<br><br>
      			By default, a value of 1 is equal to a default line-height value similar to Photoshop. A value of 0 will have each line on top of each other, 
      		as if it was written over the previous line.  So to create a look that is slightly tighter than default, you would use something like a value of .8 to bring
      		the lines a little closer together. 
      		<br><br>
      			The use of a percentage allows for the font size to change without having to redefine the line-height spacing.
      	@example
      		// change the percentage of spacing between lines relative to the font size
      		View.main.myTextField.leading = .8;
      			// get the current percentage of spacing between lines relative to the font size
      		console.log( View.main.myTextField.leading );
      */
      leading: {
        get: function get() {
          return _leading;
        },
        set: function set(value) {
          //console.log( 'UITextfield :: SET -> leading =', value )
          if (value && _leading != value) {
            _leading = value;
            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(_content, {
              lineHeight: _leading * 100 + '%'
            });
            update();
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {number} spacing
      		Getter|Setter : A Number representing the spacing between each letter.
      	@example
      		// change the spacing between each letter
      		View.main.myTextField.spacing = 3;
      			// get the current letter spacing
      		console.log( View.main.myTextField.spacing );
      */
      spacing: {
        get: function get() {
          return ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].getCss(U, 'letter-spacing') || _spacing;
        },
        set: function set(value) {
          if (value && _spacing != value) {
            _spacing = value;
            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(U, {
              letterSpacing: value
            });
            update();
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {number|array} bufferText
      		Getter|Setter : A Number or Array of Numbers representing the amount of spacing from the edges of the UITextField and the 
      		text content.
      		<br><br>
      			This sets the css margin, but also is used for calculations for auto sized formats.  Setting the margin 
      		manually will cause layout issues as the class does not have those numbers to calculate against.
      	@example
      		// set the padding on all 4 sides uniformly
      		View.main.myTextField.bufferText = 5;
      			// set the padding on top & bottom = 7 and left & right = 5
      		View.main.myTextField.bufferText = [7,5];
      			// set the top = 7, right = 3, bottom = 5, left = 6
      		View.main.myTextField.bufferText = [7,3,5,6];
      			// get the current padding
      		console.log( View.main.myTextField.bufferText );
      */
      bufferText: {
        get: function get() {
          return _bufferText;
        },
        set: function set(value) {
          //console.log( 'UITextfield :: SET -> bufferText =', value )
          if (value && _bufferText != value) {
            var style = '';
            var order = ['top', 'right', 'bottom', 'left'];

            for (var i = 0; i < 4; i++) {
              var prop = order[i];
              var propValue = isNaN(value) ? value[prop] || 0 : value; //console.log( i, prop, propValue, value[prop] )

              _bufferText[prop] = propValue;
              style += propValue + 'px ';
            }

            ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(_content, {
              padding: style
            });
            update();
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {string} text
      		Getter|Setter : A String representing the current String text content. 
      	@example
      		// change the display text
      		View.main.myTextField.text = "Change my text to say this.";
      			// get the current display text
      		console.log( View.main.myTextField.text );
      */
      text: {
        get: function get() {
          return _text;
        },
        set: function set(value) {
          //console.log( 'UITextfield :: SET -> text =', value )
          if (value != undefined && value != '') {
            _text = value;
            U.setDefault('text', value);
            _content.innerHTML = value;
            update();
          }
        }
      },

      /**
      	@memberOf UITextField
      	@var {boolean} smoothing
      		Getter|Setter : A Boolean to add or remove the css smoothing: <code>-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;</code>
      	@example
      		View.main.myTextField.smoothing = false;
      		//
      		// get the current smoothing
      		console.log( View.main.myTextField.smoothing );
      */
      smoothing: {
        get: function get() {
          return _smoothing;
        },
        set: function set(value) {
          _smoothing = value;
          ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"][_smoothing ? 'addClass' : 'removeClass'](_content, 'smooth-text');
        }
      }
      /**
      	@memberOf UITextField
      	@var {boolean} shrinkOnEmpty
      		A Boolean applicable only on instantiation. If set to true, will force the UITextField to a width and height of 0 if the text property is empty or null.
      		This is useful if you're passing in dynamic text values and aligning UITextFields against each other or grouping them into UIGroups.
      		The result is a UITextField that doesn't take up space if it is given no text value.
      	@example
      		// create a UITextField that might be empty, and thus shrink
      		T.myTextField = new UITextField({
      			target : T,
      			id : 'my-textfield',
      			css : {
      				x : 50,
      				y : 200,
      				width : 300,
      				height : 90
      			},
      			fontSize : 30,
      			fontFamily : 'template_font',
      			format : TextFormat.INLINE,
      			alignText : Align.CENTER,
      			bufferText : {
      				top : 1,
      				bottom : 1,
      				left : 5,
      				right : 5
      			},
      			leading : .8,
      			spacing : 2,
      			text : Math.random() < 0.5 ? '' : 'This text is not empty!',
      			shrinkOnEmpty: true
      		});
      			// change the text after the fact
      		T.myTextField.text = 'My UITextField is no longer empty or blank!';
      		T.myTextField.resetToDefault();
      */

    });
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // PUBLIC METHODS

    /**
    	@memberOf UITextField
    	@method resetToDefault
    	@param {args} arguments
    	@desc
    		Change specific properties, or all properties (by passing nothing in) back to their default values, which are initally set to the values passed in upon instantiation
    		of a UITextField. This is useful when reusing a UITextField for multiple inputs, such as with carousels where the content is
    		constantly updating and the carousel scrolls.
    	@example
    		// reset all properties to their default values by passing in no parameters
    		myTextField.resetToDefault();
    		
    		// reset only these two specific properties to their default values by passing in Strings
    		myTextField.resetToDefault( 'leading', 'fontSize' );
    			
    */

    U.resetToDefault = function () {
      _init = true;

      if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
          U[arguments[i]] = _defaults[arguments[i]];
        }
      } else {
        //			console.log( Array(100).join('*') )
        //			console.log( _defaults )
        for (var param in _defaults) {
          // check for the param first, only errors in IE11/Win7
          // also check for undefined becusue only checking the key will be false with a 0 value
          if (U[param] != undefined && param !== 'align') {
            U[param] = _defaults[param];
          }
        }
      }

      _init = false;
      update();
    };
    /**
    	@memberOf UITextField
    	@method setDefault
    	@desc
    		Assign a default value, so that when resetToDefault() is called, it will include this value.
    	@example
    		myTextField.setDefault( 'fontSize', 16 );
    */


    U.setDefault = function (key, value) {
      _defaults[key] = value;
    };

    U.toString = function () {
      return '[object UITextfield]';
    };
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // PRIVATE METHODS


    function initDefaults() {
      for (var a in arg) {
        if (a == 'css') {
          for (var b in arg.css) {
            switch (b) {
              case 'x':
              case 'y':
              case 'width':
              case 'height':
                _defaults[b] = arg.css[b];
                break;
            }
          }
        } else if (a == 'bufferText') {
          _defaults[a] = {};

          for (var prop in _bufferText) {
            _defaults[a][prop] = arg[a][prop] || 0;
          }
        } else {
          _defaults[a] = arg[a];
        }
      } //console.log( 'defaults:', _defaults )


      delete _defaults.target;
      delete _defaults.id;
    }

    function update() {
      if (_init) return;

      switch (_format) {
        case 'paragraphClamp':
        case 'inlineClamp':
          resizeToContent();
          break;
        // FitClamp types are 2 phases, easiest to temp change it, run update twice, and set it back

        case 'inlineFitClamp':
          _format = 'inlineFit';
          autoSizeContent();
          _format = 'inlineClamp';
          resizeToContent();
          _format = 'inlineFitClamp';
          break;

        case 'paragraphFitClamp':
          _format = 'paragraphFit';
          autoSizeContent();
          _format = 'paragraphClamp';
          resizeToContent();
          _format = 'paragraphFitClamp';

        default:
          autoSizeContent();
      }
    }

    function autoSizeContent() {
      //temp set it to default for resizing
      ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(_content, {
        verticalAlign: 'auto',
        height: 'auto',
        width: 'auto'
      });

      if (_format == 'paragraphFit') {
        var tempFontSize = _fontSize; // check the height first to allow for word wrap to fit vertically first

        while (U.scrollHeight > U.offsetHeight) {
          if (tempFontSize <= _minFontSize) break;
          tempFontSize--;
          U.style.fontSize = tempFontSize + 'px';
        } // then, if it is still overspraying horizontally, shrink again to fit


        while (U.scrollWidth > U.offsetWidth) {
          if (tempFontSize <= _minFontSize) break;
          tempFontSize--;
          U.style.fontSize = tempFontSize + 'px';
        }

        _fontSize = tempFontSize;
        U.style.fontSize = _fontSize + 'px';
      } else if (_format == 'inlineFit') {
        // NOTE - IE wont return correct width/height if the font is smaller than the parent, so using large numbers for ratios
        //		- reset the innerHTML after each fontSize change to force a redraw for correct heights on iOS browser
        var parentWidth = U.offsetWidth;
        var parentHeight = U.offsetHeight;
        var large = 243;
        var small = ad_external__WEBPACK_IMPORTED_MODULE_3__["Device"].browser == 'ie' ? 182 : _minFontSize;
        U.style.fontSize = large + 'px';
        _content.innerHTML = _text;
        var largeWidth = _content.offsetWidth;
        var largeHeight = _content.offsetHeight;
        U.style.fontSize = small + 'px';
        _content.innerHTML = _text;
        var smallWidth = _content.offsetWidth;
        var smallHeight = _content.offsetHeight;
        var fontSizeWidth = ad_utils__WEBPACK_IMPORTED_MODULE_2__["MathUtils"].rel(large, small, largeWidth, smallWidth, parentWidth);
        var fontSizeHeight = ad_utils__WEBPACK_IMPORTED_MODULE_2__["MathUtils"].rel(large, small, largeHeight, smallHeight, parentHeight);
        _fontSize = Math.max(_minFontSize, ~~Math.min(_fontSize, Math.min(fontSizeWidth, fontSizeHeight)));
        U.style.fontSize = _fontSize + 'px';
      }

      if (_verticalAlign) {
        ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(_content, {
          verticalAlign: _verticalAlign,
          height: U.offsetHeight - _bufferText.top - _bufferText.bottom,
          width: U.offsetWidth - _bufferText.left - _bufferText.right
        });
      }
    }

    function resizeToContent() {
      // must add 1 for safari & firefox when using paragraph formats
      var offset = /para/g.exec(_format) != null ? 1 : 0;
      U.width = U.width - offset; // set the content width/height for assigning clamp after created with fit

      ad_view__WEBPACK_IMPORTED_MODULE_1__["Styles"].setCss(_content, {
        height: 'auto',
        width: 'auto',
        overflowWarp: 'normal'
      });
      U.width = _content.offsetWidth + offset;
      U.height = _content.offsetHeight;
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // INIT


    U.enabled = true;
    initDefaults();
    U.format = arg.format;
    if (arg.shrinkOnEmpty === true && !arg.text) U.width = U.height = 0;
    U.fontSize = arg.fontSize;
    U.minFontSize = arg.minFontSize;
    U.fontFamily = arg.fontFamily || 'Arial';
    U.alignText = arg.alignText;
    U.bufferText = arg.bufferText;
    U.leading = arg.leading;
    U.spacing = arg.spacing;
    U.smoothing = arg.smoothing != false;
    _init = false;
    U.text = arg.text;

    U._initAlign();

    return U || _assertThisInitialized(_this);
  }

  return UITextField;
}(_UIComponent__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (UITextField);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js":
/*!****************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js ***!
  \****************************************************************/
/*! exports provided: LocationUtils, MotionUtils, ArrayUtils, ColorUtils, DcsUtils, ImageUtils, MathUtils, MonetUtils, ObjectUtils, TextUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_LocationUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/LocationUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/LocationUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocationUtils", function() { return _lib_LocationUtils__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _lib_MotionUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/MotionUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MotionUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MotionUtils", function() { return _lib_MotionUtils__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _lib_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/ArrayUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ArrayUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ArrayUtils", function() { return _lib_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _lib_ColorUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/ColorUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ColorUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ColorUtils", function() { return _lib_ColorUtils__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _lib_DcsUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/DcsUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/DcsUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "DcsUtils", function() { return _lib_DcsUtils__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _lib_ImageUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/ImageUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ImageUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ImageUtils", function() { return _lib_ImageUtils__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _lib_MathUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/MathUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MathUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "MathUtils", function() { return _lib_MathUtils__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _lib_MonetUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/MonetUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MonetUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "MonetUtils", function() { return _lib_MonetUtils__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _lib_ObjectUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/ObjectUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ObjectUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ObjectUtils", function() { return _lib_ObjectUtils__WEBPACK_IMPORTED_MODULE_8__; });
/* harmony import */ var _lib_TextUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/TextUtils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/TextUtils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TextUtils", function() { return _lib_TextUtils__WEBPACK_IMPORTED_MODULE_9__; });


/* NOTE: DON'T import only "default" from ObjectUtils since the default
function is a reserved keyword. Importing into scope will likely cause
issues w/ code using the "default" keyword */











/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ArrayUtils.js":
/*!*************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ArrayUtils.js ***!
  \*************************************************************************/
/*! exports provided: combine, copy, insertAt, removeAt, remove, shuffle, contains */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return combine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertAt", function() { return insertAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAt", function() { return removeAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/**
 * @npmpackage
 * @class ArrayUtils
 * @desc
 * This object contains additional methods for manipulating arrays.<br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <codeblock>
 * import { ArrayUtils } from 'ad-utils'
 * </codeblock>
 */

/** 
 * @memberOf ArrayUtils
 * @method combine
 * @param {array} arr1
 * 	first array
 * @param {array} arr2
 * 	second array appended to the first
 * @desc
 * 	A 'more friendly' concat function.
*/
function combine(arr1, arr2) {
  return arr1.concat(arr2);
}
/** 
 * @memberOf ArrayUtils
 * @method copy
 * @param {array} array
 * 	the array to duplicate
 * @desc
 * 	Creates a unique duplicate of the given array.
*/

function copy(array) {
  return array.slice();
}
/** 
 * @memberOf ArrayUtils
 * @method insertAt
 * @param {array} array
 * 	the array to modify
 * @param {number} index
 * 	the index to insert elements
 * @param {arguments} arguments
 * 	the elements to insert
 * @desc
 * 	Adds elements at a provided index. Returns a new array.
*/

function insertAt(array, index) {
  var a = array.slice(0, index);
  var b = array.slice(index, array.length);
  var args = Array.prototype.slice.call(arguments);
  var values = args.slice(2, args.length);
  return a.concat(values).concat(b);
}
/**
 * @memberOf ArrayUtils
 * @method removeAt
 * @param {array} array
 * 	the array to modify
 * @param {number} index
 * 	the index of the element to remove
 * @desc
 * 	Removes an element at a provided index. Returns a new array.
*/

function removeAt(array, index) {
  var a = copy(array);
  a.splice(index, 1);
  return a;
}
/**
 * @memberOf ArrayUtils
 * @method remove
 * @param {array} array
 * 	the array to modify
 * @param {number|string} item
 * 	the item to remove from the array
 * @desc
 * 	Removes all instances of an element from the given array. Returns a new array.
*/

function remove(array, item) {
  var _returnArray = array.slice();

  while (_returnArray.indexOf(item) >= 0) {
    _returnArray = removeAt(_returnArray, _returnArray.indexOf(item));
  }

  return _returnArray;
}
/**
 * @memberOf ArrayUtils
 * @method shuffle
 * @param {array} array
 * 	the array to modify
 * @desc
 * 	Shuffles the array into a random order.
*/

function shuffle(array) {
  return array.sort(function () {
    return Math.random() < 0.5 ? 1 : -1;
  });
}
/**
 * @memberOf ArrayUtils
 * @method contains
 * @param {array} array
 * 	the array to check
 * @param {number|string} item
 * 	the item to check for in the array
 * @desc
 * 	Determines if a given array contains a given element. Returns a boolean.
*/

function contains(array, item) {
  return array.indexOf(item) >= 0;
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ColorUtils.js":
/*!*************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ColorUtils.js ***!
  \*************************************************************************/
/*! exports provided: toRgba, toRgbaString, hue, saturation, contrast, tint, transform, invert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRgba", function() { return toRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRgbaString", function() { return toRgbaString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hue", function() { return hue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saturation", function() { return saturation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contrast", function() { return contrast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tint", function() { return tint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/**
 * @npmpackage
 * @class ColorUtils
 * @desc
 * This class contains methods for manipulating color.<br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <codeblock>
 * import { ColorUtils } from 'ad-utils'
 * </codeblock>
 */

/**	
 * @memberOf ColorUtils
 * @method toRgba
 * @param {string|object} color
 * 	the color to convert, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @param {number} alpha
 * 	the optional alpha value for the return string: overrides the alpha value of an RGBA color. 
 * 	If undefined, will default to the alpha value of the color.
 * @desc
 * 	Returns an object containing r, g, b, a properties 
*/
function toRgba(color, alpha) {
  switch (typeof color) {
    case 'object':
      color = color || {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      };
      break;

    default:
      // convert from rgb() or rgba() string
      if (color.indexOf('rgb') >= 0) {
        color = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);
        color = {
          r: parseInt(color[0]),
          g: parseInt(color[1]),
          b: parseInt(color[2]),
          a: Number(color[3])
        };
      } else if (color.indexOf('#') >= 0) {
        // convert from HEX
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(color);
        color = result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: result[4] ? Number(result[4], 16) : 1
        } : null;
      } else {
        // given a color name like 'red' or 'green'
        console.log('');
        console.log("ERROR: ColorUtils.toRgba does not accept color names such as '" + color + "'. Use HEX or an RGB/A string or object per documentation");
        console.log("Returning the color '" + color + "' without any alpha");
        console.log('');
        return color;
      }

      break;
  }

  if (!color.a) color.a = 1;
  if (alpha >= 0) color.a = alpha;
  return color;
}
/**	
 * @memberOf ColorUtils
 * @method toRgbaString
 * @param {string|object} color
 * 	the color to convert, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @param {number} alpha
 * 	the optional alpha value for the return string: overrides the alpha value of an RGBA color. If undefined, will default to the alpha value of the color.
 * @desc
 * 	Returns the rgba() string representing a given color and optional alpha
*/

function toRgbaString(color, alpha) {
  var color = toRgba(color, alpha);
  return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
}
/**	
 * @memberOf ColorUtils
 * @method hue
 * @param {object} obj
 * 	an object with paramaters for overall hue shift, see Properties for more info
 * @property {string|object} from
 * 	the source color to hue shift, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @property {string|object} color
 * 	synonymous with the from parameter
 * @property {number} amount
 * 	amount to shift the colors in a range of 0-360
 * @property {string} format
 * 	either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
 * 	an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
 * @desc
 * 	Apply a hue shift to a given color; returns either an 'rgba()' string or an rgba{} object
 * @example
 * // convert to full grayscale
 * ColorUtils.hue({
 * 	from: '#99aa33',
 * 	amount: 66,
 * 	format: 'object'
 * })
 * // returns {r: 51, g: 170, b: 79, a: 1}
*/

function hue(obj) {
  obj = _convert(obj);
  var hsl = rgbToHSL(obj.from);
  hsl.h = (hsl.h + obj.amount) % 360;
  if (hsl.h < 0) hsl.h += 360;

  var returnColors = _hslToRGB(hsl);

  if (obj.from.a >= 0) returnColors.a = obj.from.a;
  return obj.format === 'object' ? returnColors : toRgbaString(returnColors);
}
/**	
 * @memberOf ColorUtils
 * @method saturation
 * @param {object} obj
 * 	an object with paramaters for overall saturation, see Properties for more info
 * @property {string|object} from
 * 	the source color to saturate, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @property {string|object} color
 * 	synonymous with the from parameter
 * @property {number} amount
 * 	the total saturation of the from. 0 = grayscale, 1 = full, original color
 * @property {string} format
 * 	either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
 * 	an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
 * @desc
 * 	Change the color saturation of a given color; returns either an 'rgba()' string or an rgba{} object
 * @example
 * // convert to full grayscale
 * ColorUtils.saturation({
 * 	from: '#99aa33',
 * 	amount: 0,
 * 	format: 'object'
 * });
 * // returns {r: 86, g: 86, b: 86, a: 1}
*/

function saturation(obj) {
  delete obj.to;
  obj = _convert(obj);
  var returnColors = {};

  for (var val in obj.from) {
    var _fromVal = parseInt(obj.from[val]);

    if (val === 'a') {
      returnColors[val] = _fromVal;
    } else {
      // this prevents the entire color from turning a middling gray - rgb(128, 128, 128)
      // doing this check on only the red values is sufficient - we skip this calculation for the other two colors
      if (val === 'r') {
        var _high = 0;
        var _low = 255;

        for (var sub in obj.from) {
          if (parseInt(obj.from[sub]) > _high) _high = parseInt(obj.from[sub]);
          if (parseInt(obj.from[sub]) < _low) _low = parseInt(obj.from[sub]);
        }
      }

      returnColors[val] = Math.round(_fromVal * obj.amount + (1 - obj.amount) * ((_high + _low) / 2));
    }
  }

  return obj.format === 'object' ? returnColors : toRgbaString(returnColors);
}
/**	
 * @memberOf ColorUtils
 * @method contrast
 * @param {object} obj
 * 	an object with paramaters for overall saturation, see Properties for more info
 * @property {string|object} from
 * 	the source color to begin with, represented as a HEX string:"#ff0000", an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.,
 * @property {string|object} color
 * 	synonymous with the from parameter
 * @property {number} amount
 * 	the contrast of the target. 0 = no contrast, 1 = original contrast, >1 = more and more, to infinity and beyond!
 * @property {string|object} format
 * 	either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
 * 	an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
 * @desc
 * 	Change the contrast of the target; returns either an 'rgba()' string or an rgba{} object
 * @example
 * // get your whites whiter and brights brighter
 * ColorUtils.contrast({
 * 	from: '#aa0011'
 * 	amount: 1.3,
 * 	format: 'object'
 * });
 * // returns {r: 221, g: 0, b: 22, a: 1}
*/

function contrast(obj) {
  delete obj.to;
  obj = _convert(obj);
  var returnColors = {};

  for (var val in obj.from) {
    var _fromVal = parseInt(obj.from[val]);

    returnColors[val] = val === 'a' ? _fromVal : Math.round(_fromVal * obj.amount);
  }

  return obj.format === 'object' ? returnColors : toRgbaString(returnColors);
}
/**	
 * @memberOf ColorUtils
 * @method tint
 * @param {object} obj
 * 	an object with paramaters for overall saturation, see Properties for more info
 * @property {string|object} from
 * 	the source color to begin with, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @property {string|object} color
 * 	synonymous with the from parameter
 * @property {string|object} to
 * 	the target color to tint to, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @property {number} amount
 * 	the percentage of color to apply to the target. Defaults to 1, which is 100% color tinting
 * @property {string|object} format
 * 	either 'object' or 'string' - which determines whether to return an 'rgba()' string, 
 * 	or an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
 * @desc
 * 	Tint a color uniformly to a given color; returns either an 'rgba()' string or an rgba{} object
 * @example
 * // tint to green
 * ColorUtils.tint({
 * 	from: '#ffff00',
 * 	to: '#00ff00',
 * 	amount: 1,
 * 	format: 'object'
 * });
 * // returns {r: 0, g: 255, b: 0, a: 1 };
 * 
 * // tint 50% to green
 * ColorUtils.tint({
 * 	from: '#ffff00',
 * 	to: '#00ff00',
 * 	amount: 0.5
 * });
 * // returns 'rgba(128, 128, 0, 1)'
*/

function tint(obj) {
  obj = _convert(obj);
  var returnColors = {};

  for (var val in obj.from) {
    var _fromVal = parseInt(obj.from[val]);

    returnColors[val] = val === 'a' ? _fromVal : Math.round(_fromVal + (parseInt(obj.to[val]) - _fromVal) * obj.amount);
  }

  return obj.format === 'object' ? returnColors : toRgbaString(returnColors);
}
/**	
 * @memberOf ColorUtils
 * @method transform
 * @param {object} obj
 * 	an object with paramaters for overall saturation, see Properties for more info
 * @property {string|object} from
 * 	the source color to begin with, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @property {string|object} color
 * 	synonymous with the from parameter
 * @property {string|object} to
 * 	the target color to transform to, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @property {number} amount
 * 	the percentage of color to apply to the target. Defaults to 1, which is 100% color transform
 * @property {string} format
 * 	either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
 * 	an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
 * @returns {string|object} 
 * 	either an 'rgba()' string or an rgba{} object
 * @desc
 * 	Color Transforms a color to another color by pulling colors out of original source; 
 * @example
 * // remove all colors but greens
 * ColorUtils.transform({
 * 	from: '#ffff00',
 * 	to: '#00ff00',
 * 	amount: 1,
 * 	format: 'object'
 * });
 * // returns {r: 0, g: 255, b: 0, a: 1 };
 *
 * // remove all colors but greens
 * ColorUtils.transform({
 * 	from: '#ffff00',
 * 	to: '#00ff00',
 * 	amount: 1
 * });
 * // returns 'rgba(0, 255, 0, 1)'
*/

function transform(obj) {
  obj = _convert(obj);
  var returnColors = {};

  for (var val in obj.from) {
    var _fromVal = parseInt(obj.from[val]);

    returnColors[val] = val === 'a' ? _fromVal : Math.round(_fromVal - (255 - parseInt(obj.to[val])) * obj.amount);
  }

  return obj.format === 'object' ? returnColors : toRgbaString(returnColors);
}
/**	
 * @memberOf ColorUtils
 * @method invert
 * @param {object} obj
 * 	an object with parameters for overall inversion, see Properties for more info
 * @property {string|object} from
 * 	the color to invert, represented as a HEX string:"#ff0000", 
 * 	an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
 * 	or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
 * @property {string|object} color
 * 	synonymous with the from parameter
 * @property {string} format
 * 	either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
 * 	an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
 * @desc
 * 	Invert the color; returns either an 'rgba()' string or an rgba{} object
 * @example
 * // invert and return result as object
 * ColorUtils.invert({
 * 	color: '#ff0000',
 * 	format: 'object'
 * });
 * // returns {r: 0, g: 255, b: 255, a: 1 };
 *
 * // invert and return result as string
 * ColorUtils.invert({
 * 	color: '#ff0000'
 * });
 * // returns 'rgba(0, 255, 255, 1)'
*/

function invert(obj) {
  delete obj.to;
  delete obj.amount;
  obj = _convert(obj);
  var returnColors = {};

  for (var val in obj.from) {
    var _fromVal = parseInt(obj.from[val]);

    returnColors[val] = val === 'a' ? _fromVal : 255 - _fromVal;
  }

  return obj.format === 'object' ? returnColors : toRgbaString(returnColors);
} // ------------------------------------------------------------------
// PRIVATE FUNCTIONS

function _convert(obj) {
  // if the provided color information is not already in the {r:, g:, b:, a:} object format, we must convert it to that
  obj.from = obj.from || obj.color;
  if (obj.from && typeof obj.from !== 'object') obj.from = toRgba(obj.from);
  if (obj.to && typeof obj.to !== 'object') obj.to = toRgba(obj.to); //

  obj.amount = obj.amount === undefined ? 1 : obj.amount;
  return obj;
}

function rgbToHSL(rgb) {
  var r = rgb.r / 255;
  var g = rgb.g / 255;
  var b = rgb.b / 255;
  var cMax = Math.max(r, g, b);
  var cMin = Math.min(r, g, b);
  var delta = cMax - cMin;
  var l = (cMax + cMin) / 2;
  var h = 0;
  var s = 0;

  if (delta == 0) {
    h = 0;
  } else if (cMax == r) {
    h = 60 * ((g - b) / delta % 6);
  } else if (cMax == g) {
    h = 60 * ((b - r) / delta + 2);
  } else {
    h = 60 * ((r - g) / delta + 4);
  }

  s = delta ? delta / (1 - Math.abs(2 * l - 1)) : 0;
  return {
    h: h,
    s: s,
    l: l
  };
}

function _hslToRGB(hsl) {
  var h = hsl.h / 60;
  var s = hsl.s;
  var l = hsl.l;
  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs(h % 2 - 1));
  var m = l - c / 2;
  var r;
  var g;
  var b;
  h = Math.floor(h);

  switch (h) {
    case 0:
      r = c;
      g = x;
      b = 0;
      break;

    case 1:
      r = x;
      g = c;
      b = 0;
      break;

    case 2:
      r = 0;
      g = c;
      b = x;
      break;

    case 3:
      r = 0;
      g = x;
      b = c;
      break;

    case 4:
      r = x;
      g = 0;
      b = c;
      break;

    case 5:
      r = c;
      g = 0;
      b = x;
  }

  return {
    r: _normalizeRgbValue(r, m),
    g: _normalizeRgbValue(g, m),
    b: _normalizeRgbValue(b, m)
  };
}

function _normalizeRgbValue(color, m) {
  color = Math.floor((color + m) * 255);
  if (color < 0) color = 0;
  return color;
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/DcsUtils.js":
/*!***********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/DcsUtils.js ***!
  \***********************************************************************/
/*! exports provided: counterWithVars, addVideoMetrics, addYouTubeVideoMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "counterWithVars", function() { return counterWithVars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addVideoMetrics", function() { return addVideoMetrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addYouTubeVideoMetrics", function() { return addYouTubeVideoMetrics; });
/**
 * @npmpackage
 * @class DcsUtils
 * @desc
 * Doubleclick Studio utilities. <br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <br>
 * <codeblock>
 * import { DscUtils } from 'ad-utils'
 * </codeblock>
 */
function counterWithVars(str, impression) {
  if (impression) Enabler.reportCustomVariableCount1(str);else Enabler.reportCustomVariableCount2(str);
}
/**
 * @memberOf DcsUtils
 * @method addVideoMetrics
 * @param {VideoPlayer} player
 * 	The video player instance to track
 * @param {string} message
 * 	The message passed as the metric, defaults to 'Video Report 1'
 * @desc
 * 	Adds DoubleClick Tracking metrics to a video player.
 * @example
 * DcsUtils.addVideoMetrics(View.main.videoPlayer, 'Intro Video')
 */

function addVideoMetrics(player, message) {
  Enabler.loadModule(studio.module.ModuleId.VIDEO, function () {
    studio.video.Reporter.attach(message || 'Video Report 1', player.screen != undefined ? player.screen : player);
  });
}
/**
 * @memberOf DcsUtils
 * @method addYouTubeVideoMetrics
 * @param {VideoPlayer} player
 * The YouTubePlayer instance to track
 * @desc
 * Adds DoubleClick Tracking metrics to a YouTube video player.  The Enabler counter calls are added to the
 * index when a YouTubePlayer is added through Ad App.<br>
 * If manually adding a YouTubePlayer/tracking, the required global vars are:<br>
 * <codeblock>
 * var trackVideoPlay = function() {
 * 	Enabler.counter('YTP Video Play', true)
 * }
 * var trackVideoReplay = function() {
 * 	Enabler.counter('YTP Video Replay', true)
 * }
 * var trackVideoPause = function() {
 * 	Enabler.counter('YTP Video Pause', true)
 * }
 * var trackVideoComplete = function() {
 * 	Enabler.counter('YTP Video Complete', true)
 * }
 * </codeblock>
 * @example
 * DcsUtils.addYouTubeVideoMetrics(View.main.mainYouTubePlayer)
 */

function addYouTubeVideoMetrics(player) {
  var p = player.screen;
  p.addEventListener('play', function () {
    player.isReplay ? trackVideoReplay.call() : trackVideoPlay.call();
  });
  p.addEventListener('pause', function () {
    if (!player.complete) {
      trackVideoPause.call();
    }
  });
  p.addEventListener('complete', function () {
    trackVideoComplete.call();
  });
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ImageUtils.js":
/*!*************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ImageUtils.js ***!
  \*************************************************************************/
/*! exports provided: fitImageAtCoordinate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitImageAtCoordinate", function() { return fitImageAtCoordinate; });
/**
 * @npmpackage
 * @class ImageUtils
 * @desc
 * This object contains methods necessary for manipulating images.<br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <br>
 * <codeblock>
 * import { ImageUtils } from 'ad-utils'
 * </codeblock>
 */

/**
 * @memberOf ImageUtils
 * @method fitImageAtCoordinate
 * @param {element} target
 * 	The div with a background image
 * @param {number} originX
 * 	The x position to center on
 * @param {number} originY
 * 	The y position to center on
 * @param {img} source
 * 	Optional pass in a source img tag to skip the need to load to get source data
 * @desc
 * 	Positions a background image to fit the div size while centering around a point.  If the point is beyond the size bounds, it will align to that side.
*/
function fitImageAtCoordinate(target, originX, originY, source) {
  var child;

  if (originX === undefined && originY === undefined) {
    target.style.backgroundPosition = '50% 50%';
  } else {
    if (source) {
      child = source;
      placement();
    } else {
      child = new Image();
      child.onload = placement;
      child.src = target.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    }
  }

  target.style.backgroundSize = 'cover';
  target.style.backgroundRepeat = 'no-repeat';

  function placement() {
    var parent = {
      width: target.offsetWidth,
      height: target.offsetHeight
    };
    var parentAspectRatio = parent.width / parent.height;
    var childAspectRatio = child.width / child.height;

    if (parentAspectRatio > childAspectRatio) {
      // child max fits in horizontal, move y
      fit('width', 'height');
    } else if (parentAspectRatio < childAspectRatio) {
      //  child max fits in vertical, move x
      fit('height', 'width');
    }

    function fit(a, b) {
      // child width is parent height times ratio of child width over child height
      // child height is parent width times ratio of child height over child width
      var childSize = parent[a] * (child[b] / child[a]); // parent to child scale ratio

      var scalePercent = parent[a] / child[a];
      var coord = {
        width: originX || 0,
        height: originY || 0
      }; // parent size, halfed then subtract the scaled coordinate point

      var childMove = parent[b] / 2 - coord[b] * scalePercent; // make sure the image doesn't exceed the bounds

      var maxMove = parent[b] - childSize;
      if (childMove > 0) childMove = 0;else if (childMove < maxMove) childMove = maxMove;
      target.style.backgroundPosition = a === 'height' ? childMove + 'px 0px' : '0px ' + childMove + 'px';
    }
  }
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/LocationUtils.js":
/*!****************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/LocationUtils.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
	@npmpackage
	@class LocationUtils
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { LocationUtils } from 'ad-utils'
		</codeblock>
		<br><br>
		
		This object contains utilities for interfacing with the device's GPS.
*/
var LocationUtils = new function () {
  this.gpsSuccessCallback;
  this.gpsFailCallback;
  /**
  	@memberOf LocationUtils
  	@method getGPSData
  	@param {function} callbackSuccess
  		upon successful acquisition of device location, this funciton is called with global coordinates.
  	@param {function} callbackFail
  		called if the query fails
  	@desc
  		Queries the device for current location. Asyncronous and dependent on user permission, 
  		so callback functions must be used.
  */

  this.getGPSData = function (callbackSuccess, callbackFail) {
    if (navigator.geolocation) {
      LocationUtils.gpsSuccessCallback = callbackSuccess;
      LocationUtils.gpsFailCallback = callbackFail;
      navigator.geolocation.getCurrentPosition(LocationUtils.onLocationRetrieved, LocationUtils.onLocationFailed);
    } else console.log('geolocation not available');
  };

  this.onLocationRetrieved = function (position) {
    LocationUtils.gpsSuccessCallback(position.coords);
  };

  this.onLocationFailed = function (error) {
    console.log('Error retrieving location data');

    switch (error.code) {
      case 0:
        console.log('0 - unknown error');
        break;

      case 1:
        console.log('1 - permission denied');
        break;

      case 2:
        console.log('2 - position unavailable (error response from locaton');
        break;

      case 3:
        console.log('3 - timed out');
        break;
    }

    if (LocationUtils.gpsFailCallback) LocationUtils.gpsFailCallback(error);
  };
}();
/* harmony default export */ __webpack_exports__["default"] = (LocationUtils);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MathUtils.js":
/*!************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MathUtils.js ***!
  \************************************************************************/
/*! exports provided: toRadians, toDegrees, random, randomBoolean, randomWeightedKey, rel, inRange, isNumber, toNumber, restrict, getAnglePoint, getAngle, getDistance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadians", function() { return toRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDegrees", function() { return toDegrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomBoolean", function() { return randomBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomWeightedKey", function() { return randomWeightedKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rel", function() { return rel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inRange", function() { return inRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toNumber", function() { return toNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restrict", function() { return restrict; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnglePoint", function() { return getAnglePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAngle", function() { return getAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistance", function() { return getDistance; });
/**
 * @npmpackage
 * @class MathUtils
 * @desc Common math utilities.	<br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <codeblock>
 * import { MathUtils } from 'ad-utils'
 * </codeblock>
 */

/**
 * @memberOf MathUtils
 * @method toRadians
 * @param {number} degree
 * 		An angle value as a degree
 * @desc
 * 		Converts an angle value from Degrees to Radians.
 */
function toRadians(degree) {
  return Math.PI / 180.0 * degree;
}
/**
 * @memberOf MathUtils
 * @method toDegrees
 * @param {number} radian
 * 		An angle value as a radian
 * @desc
 * 		Converts an angle value from Radians to Degrees.
*/

function toDegrees(radian) {
  return 180.0 / Math.PI * radian;
}
/**
 * @memberOf MathUtils
 * @method random
 * @param {number} a
 * 		the first value to find between
 * @param {number} b
 * 		the second value to find between 
 * @param {number} increment
 * 		optionaly set the increment of the random number. Defaults to 1
 * @desc
 * 		Get a random number between a range of two values, with an option to return to a decimal place. ( Note that
 * 		 due to the inprecision of decimal number calculation in Javascript, you may not get a perfect result when 
 * 		 your increment value is decimal, but the value will be close. A classic Javascript inpreciosn calculation example: 
 * 		 0.1 + 0.2 = 0.30000000000000004 ) 
 * @example
 * MathUtils.random(1, 3, 1)   // returns 1 or 2 or 3
 * MathUtils.random(1, 3, 0.5)  // returns 1, 1.5, 2, 2.5 or 3
 */

function random(a, b, increment) {
  b = b || 0;
  increment = increment != undefined && increment > 0 ? increment : 1;
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  min = Math.ceil(min / increment) * increment;
  max = Math.floor(max / increment) * increment;

  var _num = min + Math.floor(Math.random() * ((max - min + increment) / increment)) / (1 / increment);

  return _num;
}
/**
 * @memberOf MathUtils
 * @method randomBoolean
 * @param {number} weight
 * 		change the outcome probabilty. Greater than .5 more likely true. Defaults to .5
 * @desc
 * 		Randomly returns a true or false;
 */

function randomBoolean(weight) {
  weight = weight || 0.5;
  return Math.random() < weight;
}
function randomWeightedKey(obj) {
  var keys = [];
  var vals = [0];

  for (var param in obj) {
    keys.push(param);
    vals.push(obj[param] + (vals[vals.length - 1] || 0));
  } //console.log(keys)
  //console.log(vals)


  var rand = Math.random().toFixed(2) * 100;

  for (var k = 0; k < vals.length - 1; k++) {
    var isIn = inRange(rand, vals[k], vals[k + 1]); //console.log('\t', k, rand, vals[k], vals[k+1], isIn)

    if (isIn) {
      //  console.log('\t\t', keys[k])
      return keys[k];
    }
  }
}
/**
 * @memberOf MathUtils
 * @method rel
 * @param {number} a0
 * 		the first value to find between
 * @param {number} a1
 * 		the second value to find between
 * @param {number} b0
 * 		the first value to use as relative to a0
 * @param {number} b1
 * 		the second value to use as relative to a1
 * @param {number} bX
 * 		the value between b0 and b1
 * @desc
 * 		Calculates a value between two numbers relative to a value between 2 other numbers.
 * 		Returns The proportion between a0 and a1 relative to the bX proportion between b0 and b1
 * @example
 * MathUtils.rel(0, 1, 10, 20, 15) // 0.5
 * MathUtils.rel(100, 300, 3, 5, 3.5) // 150
 */

function rel(a0, a1, b0, b1, bX) {
  return (bX - b0) / (b1 - b0) * (a1 - a0) + a0;
}
/**
 * @memberOf MathUtils
 * @method inRange
 * @param {number} val
 * 		the number to check
 * @param {number} a
 * 		the first value of the range
 * @param {number} b
 * 		the second value of the range
 * @returns {boolean}
 * @desc
 * 		Checks if a value is in the range of two numbers.
 * @example
 * MathUtils.inRange(5, 1, 10) // true
 * MathUtils.inRange(-5, 1, 10) // false
 */

function inRange(val, a, b) {
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  return val <= max && val >= min;
}
/**
 * @memberOf MathUtils
 * @method isNumber
 * @param {number} num
 * 		the variable to check
 * @desc
 * 		Returns true if the passed var is a number.
 */

function isNumber(num) {
  return !isNaN(num);
}
/**
 * @memberOf MathUtils
 * @method toNumber
 * @param {string} str
 * 		the variable to convert
 * @desc
 * 		Takes a numerical string and converts it to number type.
 */

function toNumber(str) {
  return +str;
}
/**
 * @memberOf MathUtils
 * @method restrict
 * @desc
 * 		Restricts a value to with a range.
 */

function restrict(num, min, max) {
  return Math.max(min, Math.min(max, num));
}
/**
 * @memberOf MathUtils
 * @method getAnglePoint
 * @returns {array}
 * 		containing an [xValue, yValue] given x1, y1, distance from that starting coordinate, 
 * 		and angle (in *radians*) which the new point should be from the starting coordinate
 * @desc
 * 		Assumes original coordinate rotation is 0 radians
 */

function getAnglePoint(x, y, distance, angle) {
  var x = x + Math.cos(angle) * distance;
  var y = y + Math.sin(angle) * distance;
  return [x, y];
}
/**
 * @memberOf MathUtils
 * @method getAngle
 * @retuns {number}
 * 		The angle (in *radians*) between two points given x1, y1, x2, y2
*/

function getAngle(x1, y1, x2, y2) {
  x2 = x2 || 0;
  y2 = y2 || 0;
  return Math.atan2(y2 - y1, x2 - x1);
}
/**
 * @memberOf MathUtils
 * @method getDistance
 * @returns {number}
 * 		The distance between two points given x1, y1, x2, y2
*/

function getDistance(x1, y1, x2, y2) {
  x2 = x2 || 0;
  y2 = y2 || 0;
  return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MonetUtils.js":
/*!*************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MonetUtils.js ***!
  \*************************************************************************/
/*! exports provided: setData, getDataByKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setData", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataByKey", function() { return getDataByKey; });
/**
 * @npmpackage
 * @class MonetUtils
 * @desc
 * Monet utilities.
 * <codeblock>
 * import { MonetUtils } from 'ad-utils'
 * </codeblock>
 */
var _data; // prettier-ignore


var _monetTypes = {
  'text': 'text',
  'number': 'value',
  'image': 'url',
  'video': 'url',
  'url': 'url',
  'bool': 'value'
};
function setData(integrator) {
  var promise = integrator.getMonetData();
  promise.then(function (data) {
    _data = data;
  });
  return promise;
}
function getDataByKey(key) {
  var output;
  var outputType;

  for (var type in _monetTypes) {
    if (_data.rootAssets[type + '.' + key]) {
      outputType = type;
      output = _data.rootAssets[type + '.' + key];
      break;
    }
  }

  return output && output[_monetTypes[outputType]];
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MotionUtils.js":
/*!**************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/MotionUtils.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @npmpackage
 * @class MotionUtils
 * @desc
 * This object is for accessing the mobile/tablet's accelerometer for tilt shifting values<br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <codeblock>
 * import { MotionUtils } from 'ad-utils'
 * </codeblock>
 */
var MotionUtils = function () {
  var ax = 0,
      ay = 0;

  var _zeroX = 0,
      _zeroY = 0,
      _isInit = true,
      _negX,
      _posX,
      _negY,
      _posY,
      _multi = 1,
      _callback;
  /* ----------------------------------------------------------------------------------------------- */
  // PUBLIC METHODS

  /**
   * @memberOf MotionUtils
   * @method setSpeedLimits
   * @param {number} negX
   * 	minimum value returned when tilting left ( will be a negative number )
   * @param {number} posX
   * 	maximum value returned when tilting right ( will be a positive number )
   * @param {number} negY
   * 	minimum value returned when tilting backward ( will be a negative number )
   * @param {number} posY
   * 	maximum value returned when tilting forward ( will be a positive number )
   * @desc
   * 	Set the minimum and maximum values that can be returned
  */


  function setSpeedLimits(negX, posX, negY, posY) {
    _negX = negX;
    _posX = posX;
    _negY = negY;
    _posY = posY;
  }
  /**
   * @memberOf MotionUtils
   * @method setSpeedMultiplier
   * @param {number} multi
   * 	a number to multiply the returned value by. Defaults to 1.
   * @desc
   * 	Set a percentage multiplier to amplify or minimize the returned value.
  */


  function setSpeedMultiplier(multi) {
    _multi = multi <= 0 ? 1 : multi;
  }
  /**
   * @memberOf MotionUtils
   * @method activate
   * @param {function} callback
   * 	a passed in method that will be called every time a device movement is detected.
   * @desc
   * 	Starts the listening for a move of the device
  */


  function activate(callback) {
    _callback = callback;
    window.addEventListener('deviceorientation', onOrientation, false);
  }
  /**
   * @memberOf MotionUtils
   * @method deactivate
   * @desc
   * 	Stops the listening for a move of the device.
   */


  function deactivate() {
    window.removeEventListener('deviceorientation', onOrientation, false);
  }
  /**
   * @memberOf MotionUtils
   * @method callibrate
   * @desc
   * 	Sets the relative zero position to the current orientation of the device.
   */


  function callibrate() {
    _isInit = true;
  }
  /* ----------------------------------------------------------------------------------------------- */
  // EVENT HANDLERS


  function onOrientation(e) {
    switch (window.orientation) {
      case -90:
        // Landscape, right-side down
        ay = e.gamma;
        ax = -e.beta;
        break;

      case 90:
        // Landscape, left-side down
        ay = -e.gamma;
        ax = e.beta;
        break;

      case 180:
        // Upside-down portrait
        ay = -e.beta;
        ax = -e.gamma;
        break;

      default:
        // Portrait
        ay = e.beta;
        ax = e.gamma;
    }

    if (_isInit) {
      _zeroX = ax;
      _zeroY = ay;
      _isInit = false;
    }

    ax -= _zeroX;
    ay -= _zeroY;
    ax *= _multi;
    ay *= _multi;
    if (_negX && ax < _negX) ax = _negX;
    if (_posX && ax > _posX) ax = _posX;
    if (_negY && ay < _negY) ay = _negY;
    if (_posY && ay > _posY) ay = _posY;

    _callback(ax, ay);
  }
  /* ----------------------------------------------------------------------------------------------- */
  // PUBLIC ACCESS


  return {
    ax: ax,
    ay: ay,
    callibrate: callibrate,
    setSpeedLimits: setSpeedLimits,
    setSpeedMultiplier: setSpeedMultiplier,
    activate: activate,
    deactivate: deactivate
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (MotionUtils);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ObjectUtils.js":
/*!**************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/ObjectUtils.js ***!
  \**************************************************************************/
/*! exports provided: clone, defaults, objectifier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaults", function() { return defaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectifier", function() { return objectifier; });
/**
 * @npmpackage
 * @class ObjectUtils
 * @desc
 * Utilities for affecting objects.<br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <codeblock>
 * import { ObjectUtils } from 'ad-utils'
 * </codeblock>
 */

/**
 * @memberOf ObjectUtils
 * @name objectifier
 * @property {function} objectifier.get
 * 	{@link ObjectUtils.get}
 * @property {function} objectifier.set
 * 	{@link ObjectUtils.set}
 * @desc
 * 	This object is parent to a number of utility funcitons
 */
var objectifier = {};
/**
 * @memberOf ObjectUtils
 * @method get
 * @param {string} str
 * 	a data string representing the key of desire property splited by dot. 
 * 	Array index is represented by number. For example, 'myObj.property1.0' means 
 * 	I'm pointing to the [0] element in my propperty1 array inside of myObj. 
 * @param {object} ctxObj
 * 	the context object to find the property under, defaults to window
 * @desc
 * 	Gets a property with a nested property key string.
 * 	<br><br>
 * 	<b>NOTE!!!</b>
 * 	This method is on the {@link ObjectUtils.objectifier} object!

 * @example
 * let myObj = {
 * 	prop1: [ 'a', 'b', 'c' ],
 * 	prop2: {
 * 		string: 'I am prop2',
 * 		func: function() {
 * 			alert('!!')
 * 		}
 * 	}
 * }
 *
 * let val = ObjectUtils.objectifier.get( 'prop1.0', myObj );
 * // your val should be 'a'
 *
 * val = ObjectUtils.objectifier.get( 'prop2.string', myObj );
 * // your val should be 'I am prop2'
 */

objectifier.get = function (str, ctxObj) {
  if (ctxObj === void 0) {
    ctxObj = window;
  }

  var splits = objectifier._getSplits(str).splits;

  return objectifier._getProperty(splits, ctxObj);
};
/**
 * @memberOf ObjectUtils
 * @method set
 * @param {string} str
 * 	a data string representing the key of desire property splited by dot.
 * 	Array index is represented by number. For example, 'myObj.property1.0' means
 * 	I'm pointing to the [0] element in my propperty1 array inside of myObj.
 * @param {any} val
 * 	the value to set for th property
 * @param {object} ctxObj
 * 	the context object to find the property under, defaults to window
 * @desc
 * 	Sets a property value with a nested property key string.
 * 	<br><br>
 * 	<b>NOTE!!!</b>
 * 	This method is on the {@link ObjectUtils.objectifier} object!
 * 	
 * @example
 * //
 * let myObj = {
 * 	prop1: [ 'a', 'b', 'c' ],
 * 	prop2: {
 * 		string: 'I am prop2'
 * 	}
 * };
 * ObjectUtils.objectifier.set( 'prop1.0', 123, myObj );
 * // myObj.prop1[0] is now 123
 * ObjectUtils.objectifier.set( 'prop2.string', 'hello', myObj );
 * // myObj.prop2.string is now 'hello'
*/


objectifier.set = function (str, val, ctxObj) {
  if (ctxObj === void 0) {
    ctxObj = window;
  }

  var splitData = objectifier._getSplits(str, true);

  var result = objectifier._getProperty(splitData.splits, ctxObj);

  result[splitData.lastKey] = val;
}; // objectifier._getSplits and objectifier._getProperty  are used internally for objectifier.get and objectifier.set


objectifier._getSplits = function (str, popLast) {
  var splits = str.split('.');
  var lastKey = popLast ? splits.pop() : null;
  return {
    splits: splits,
    lastKey: lastKey
  };
};

objectifier._getProperty = function (splits, obj) {
  if (obj === void 0) {
    obj = {};
  }

  var result = obj;
  var s;

  for (var i = 0; result && (s = splits[i]); i++) {
    result = s in result ? result[s] : undefined;
  }

  return result;
};
/**
 * @memberOf ObjectUtils
 * @method clone
 * @param {object} obj
 * 	object to clone
 * @returns {object}
 * 	cloned object
 * @desc
 * 	Get a clone of an object without reference.
 * @example
 * let oldObj = {
 * 	a: 1,
 * 	b: 2
 * };
 *
 * let newObj = ObjectUtils.clone( oldObj );
 * 
 * newObj.a = 'xyz';
 * // oldObj.a is still 1
*/


function clone(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return obj;
  }

  var result = obj.constructor();

  for (var key in obj) {
    result[key] = clone(obj[key]);
  }

  return result;
}
/**
 * @memberOf ObjectUtils
 * @method defaults
 * @param {object} obj
 * 	an object contains custom properties to overide default properties
 * @param {object} defaultObj
 * 	an object contains properties to default to
 * @param {boolean} recursive
 * 	flag for if the property check should be executed recursively
 * 	otherwise it will just be one level
 * @desc
 * 	Get an object using an object as a default, when a property doesn't in the object,
 * 	it takes it from the default object if it exists. It also checks nested objects. 
 * 	It is useful for setting up an object to store default values. 
 * @example
 * // our default object as a base set up
 * let defaultObj = {
 *     name: 'Person',
 *     weight: 0,
 *     age: 0,
 *     gender: 'male',
 *     locationDetail: {
 *         state: 'CA',
 *         city: 'Los Angeles'
 *     }
 * };
 * 
 * // the custom object
 * let customObj = {
 *     name: 'Bob',
 *     weight: 140,
 *     age: 30,
 *     locationDetail: {
 *         city: 'Santa Monica',
 *         street: 'Ocean Park'
 *     }
 * };
 * 
 * let result = ObjectUtils.defaults( customObj, defaultObj, true );
 * 
 * // your result object should look like
 * {
 * 	name: 'Bob',
 *     weight: 140,
 *     age: 30,
 *     gender: 'male',
 *     locationDetail: {
 *         state: 'CA',
 *         city: 'Santa Monica',
 *         street: 'Ocean Park'
 *     }
 * }
 * 
 * //if not recursive
 * let result = ObjectUtils.defaults( customObj, defaultObj, false );
 * 
 * // your result object should look like ( notice that it takes the whole locationDetail object )
 * {
 * 	name: 'Bob',
 *     weight: 140,
 *     age: 30,
 *     gender: 'male',
 *     locationDetail: {
 *         city: 'Santa Monica',
 *         street: 'Ocean Park'
 *     }
 * }
 */

function defaults(obj, defaultObj, recursive) {
  if (obj === void 0) {
    obj = {};
  }

  var result = clone(obj);

  for (var key in defaultObj) {
    var item = defaultObj[key];

    if (result[key] === undefined) {
      result[key] = defaultObj[key];
    } else if (recursive) {
      if (Object.prototype.toString.call(item) === '[object Object]') {
        result[key] = defaults(result[key], item, recursive);
      }
    }
  }

  return result;
}



/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/TextUtils.js":
/*!************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-utils/lib/TextUtils.js ***!
  \************************************************************************/
/*! exports provided: addSpaces, getSpecialCharacter, trimStartAndEnd, removeSpaces, pad, injectBreakTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSpaces", function() { return addSpaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSpecialCharacter", function() { return getSpecialCharacter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimStartAndEnd", function() { return trimStartAndEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSpaces", function() { return removeSpaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pad", function() { return pad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectBreakTags", function() { return injectBreakTags; });
/**
 * @class TextUtils
 * @description
 * This object contains methods necessary for manipulating text. <br>
 * Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
 * <codeblock>
 * import { TextUtils } from 'ad-utils'
 * </codeblock>
 */

/**
 * @memberof TextUtils
 * @method addSpaces()
 * @param {Number} numberOfSpaces
 * number of space entities to return
 * @returns {string} Returns the specified number of '&nbsp;' strings.
 */
function addSpaces(numberOfSpaces) {
  var spacingString = '';

  for (var i = 0; i < numberOfSpaces; i++) {
    spacingString += '&nbsp;';
  }

  return spacingString;
}
/**
 * @memberof TextUtils
 * @method getSpecialCharacter()
 * @param {String} requestedCharacter
 * character must match the 'label' key
 * @param {Boolean} isCapital
 * flag to return the entity as capital
 * @returns {string} Returns entity equivilent for specified character.
 */

function getSpecialCharacter(requestedCharacter, isCapital) {
  requestedCharacter = global.proxyStringToLowerCase.apply(requestedCharacter);

  for (var i = 0; i < specialCharacters.length; i++) {
    var currentLabel = global.proxyStringToLowerCase.apply(specialCharacters[i].label);
    if (currentLabel === requestedCharacter) return isCapital ? specialCharacters[i].upperCase : specialCharacters[i].lowerCase;
  }

  return false;
}
var specialCharacters = [{
  label: 'iexcl',
  upperCase: '&#161;',
  lowerCase: '&#161;'
}, {
  label: 'trademark',
  upperCase: '&#153;',
  lowerCase: '&#153;'
}, {
  label: 'copyright',
  upperCase: '&#169;',
  lowerCase: '&#169;'
}, {
  label: 'registered',
  upperCase: '&#174;',
  lowerCase: '&#174;'
}, {
  label: 'nTilde',
  upperCase: '&#209;',
  lowerCase: '&#241;'
}, {
  label: 'aAccent',
  upperCase: '&#193;',
  lowerCase: '&#225;'
}, {
  label: 'eAccent',
  upperCase: '&#201;',
  lowerCase: '&#233;'
}, {
  label: 'iAccent',
  upperCase: '&#205;',
  lowerCase: '&#237;'
}, {
  label: 'oAccent',
  upperCase: '&#211;',
  lowerCase: '&#243;'
}, {
  label: 'uAccent',
  upperCase: '&#218;',
  lowerCase: '&#250;'
}];
/**
 * @memberof TextUtils
 * @method trimStartAndEnd()
 * @param {String} target
 * string to affect
 * @returns {string} Removes white space from the start and end of a string.
 */

function trimStartAndEnd(target) {
  return target ? target.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : '';
}
/**
 * @memberof TextUtils
 * @method removeSpaces()
 * @param {String} str
 * string from which to remove spaces
 * @returns {string} Removes all white space from the string.
 */

function removeSpaces(str) {
  return str.split(' ').join('');
}
/**
 * @memberof TextUtils
 * @method pad()
 * @param {String} _target
 * number to be padded
 * @param {Number} _count
 * expected result length of the numerical string
 * @returns {string} Pads a number with zeros up to the specified number of places.
 */

function pad(_target, _count) {
  var _sign = '';
  if (_target < 0) _sign = '-';
  _target = _target.toString().replace(/\-/, '', _target);

  while (_target.length < _count) {
    _target = '0' + _target;
  }

  return _sign + _target;
}
/**
 * @memberOf TextUtils
 * @method injectBreakTags
 * @param {String} str
 * 		A sentence or long block or copy.
 * @param {Array} indexes
 * 		An array of numbers representing the index of the space to replace with a "<br>" tag
 * @desc
 * 		Adds "<br>" tags to a block of copy and specified indexes. Reading the sentence, starting
 * 		after the first word, that space would be index 0, then next space would be 1, etc.
 */

function injectBreakTags(str, indexes) {
  var split = str.split(/\s/g);
  indexes.sort(function (a, b) {
    return b - a;
  }).forEach(function (val) {
    var before = split.slice(0, val);
    var median = split.slice(val, val + 2).join('<br>');
    var after = split.slice(val + 2);
    split = before.concat(median, after);
  });
  return split.join(' ');
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js":
/*!***************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/index.js ***!
  \***************************************************************/
/*! exports provided: FullScreen, Ratio, Effects, Clamp, Align, Markup, Styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_FullScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/FullScreen */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/FullScreen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FullScreen", function() { return _lib_FullScreen__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _lib_Ratio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Ratio */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Ratio.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Ratio", function() { return _lib_Ratio__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _lib_Effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/Effects */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Effects.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Effects", function() { return _lib_Effects__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _lib_Clamp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/Clamp */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Clamp.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Clamp", function() { return _lib_Clamp__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _lib_Align__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/Align */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Align.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Align", function() { return _lib_Align__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _lib_Styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/Styles */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Styles.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Styles", function() { return _lib_Styles__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _lib_Markup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/Markup */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Markup.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Markup", function() { return _lib_Markup__WEBPACK_IMPORTED_MODULE_6__; });
// export { default as Countdown } from './lib/Countdown'
 // named exports









/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Align.js":
/*!*******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Align.js ***!
  \*******************************************************************/
/*! exports provided: BOTTOM, CENTER, LEFT, RIGHT, TOP, BOTTOM_LEFT, BOTTOM_RIGHT, TOP_LEFT, TOP_RIGHT, get, set, calculate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOTTOM", function() { return BOTTOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CENTER", function() { return CENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT", function() { return LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT", function() { return RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOP", function() { return TOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOTTOM_LEFT", function() { return BOTTOM_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOTTOM_RIGHT", function() { return BOTTOM_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOP_LEFT", function() { return TOP_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOP_RIGHT", function() { return TOP_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculate", function() { return calculate; });
/* harmony import */ var _Markup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Markup */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Markup.js");
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styles */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Styles.js");
/**
	@npmpackage
	@class Align
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-view">ad-view</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Align } from 'ad-view'
		</codeblock>
		<br><br>

		Utility for aligning objects, which works for DOM elements and {@link CanvasDrawer} elements.  The x and y alignments are split up
		into separate assignemnts in one call. There are extra parameters that can be passed into the object to handle more complex logic.
		<br><br>

		<b>Notes:</b>
			<br>
			Align, by default, snaps to a full pixel. To change this, see <b>Sample 3</b> ( snap: false )
			<br><br>

		<b>Sample 1</b>
		<codeblock>
			// simple classic usage
			Align.set(myDiv, Align.LEFT)   // only align left
			Align.set(myDiv, Align.BOTTOM) // only align bottom
			Align.set(myDiv, Align.CENTER) // align both x and y to the center
		</codeblock>
		<br><br>
		
		<b>Sample 2</b>
		<codeblock>
			// simply align the x and y seperately
			Align.set(myDiv, {
				x: Align.RIGHT,
				y: Align.BOTTOM
			})
		</codeblock>
		<br><br>

		<b>Sample 3</b>
		<br>
		<b>'against'</b> is an object to which we align our given object, like making myDiv perfectly centered against myOtherDiv
		<br>
		<b>'against'</b> could also be a number, as in align myDiv centered against adParams.adWidth / 2
		<br>
		<br>
		<b>'outer'</b> is an optional complex parameter which determines how we align to the 'against' object; default to false
		<br>
		If <b>'against'</b> is a number, then <b>'outer'</b> will have no affect.
		<br>
		<br>
		<img src="../docs_images/align/align_c.jpg" />
		<br><br>
		<codeblock>
			// complex alignment, align in relation to another div with an offset shift of 10 pixels, without snapping to a whole pixel
			Align.set(myDiv, {
				x: {
					type: Align.RIGHT,
					against: myOtherDiv,
					offset: 10,
					outer: true
				},
				y: {
					type: Align.BOTTOM,
					offset: 14
				},
				snap: false
			})
		</codeblock>
		<br><br>

		<b>Sample 4</b>
		<codeblock>
			// complex alignment, align in relation to a fixed number with an offset shift of 10 pixels
			Align.set(myDiv, {
				x: {
					type: Align.RIGHT,
					against: 200
					offset: 10,
				},
				y: {
					type: Align.BOTTOM,
					against: 30
					offset: 14
				},
			});
		</codeblock>
		<br><br>

		<b>Sample 5</b>
		<br>
		An Array of items can be passed in to the `source` argument. All items will be individually aligned following the rules passed into the `arg` argument
		<br><br>
		<codeblock>
			// aligns all items to the center
			Align.set([myDiv0, myDiv1, myDiv2], Align.CENTER) 

			// aligns all items to the horizontal center and bottom
			Align.set([myDiv0, myDiv1, myDiv2], {
				x: Align.CENTER,
				y: Align.BOTTOM
			}) 
		</codeblock>
		<br><br>

		<b>Sample 6</b>
		<br>
		The optional keys: <b>'against'</b>, <b>'offset'</b>, and <b>'outer'</b> can be set at the top level to apply to <i>BOTH</i> dirctions as applicable.
		However, if a key is set within <b>'x'</b> or <b>'y'</b>, that will take priority
		<br><br>
		<codeblock>
			// aligns all items to the center of myRefDiv
			Align.set([myDiv0, myDiv1, myDiv2], {
				type: Align.CENTER,
				against: myRefDiv
			}) 

			// Note the against set on the top level then in y:
			// This is NOT good syntax but does technically works...
			Align.set([myDiv0, myDiv1, myDiv2], {
				against: myRefDiv,
				offset: 10
				x: Align.CENTER,
				y: {
					type: Align.BOTTOM,
					against: myOtherDiv
				}
			}) 
			// ...in this case use:
			Align.set([myDiv0, myDiv1, myDiv2], {		
				offset: 10
				x: {
					type: Align.CENTER,
					against: myRefDiv
				},
				y: {
					type: Align.BOTTOM,
					against: myOtherDiv
				}
			}) 
		</codeblock>
		<br><br>
*/


var _rect = [{
  x: 'offsetWidth',
  y: 'offsetHeight',
  parent: 'parentNode'
}, {
  x: 'width',
  y: 'height',
  parent: 'stage'
}];
/**
		@memberof Align
		@const {string} BOTTOM
			Synonymous with "alignBottom" 
	*/

var BOTTOM = 'alignBottom';
/**
	@memberof Align
	@const {string} CENTER
		Synonymous with "alignCenter" 
*/

var CENTER = 'alignCenter';
/**
	@memberof Align
	@const {string} LEFT
		Synonymous with "alignLeft" 
*/

var LEFT = 'alignLeft';
/**
	@memberof Align
	@const {string} RIGHT
		Synonymous with "alignRight" 
*/

var RIGHT = 'alignRight';
/**
	@memberof Align
	@const {string} TOP
		Synonymous with "alignTop" 
*/

var TOP = 'alignTop';
/**
	@memberof Align
	@const {string} BOTTOM_LEFT
		Synonymous with "alignBottomLeft", used for {@link UITextField.alignText} 
*/

var BOTTOM_LEFT = 'alignBottomLeft';
/**
	@memberof Align
	@const {string} BOTTOM_RIGHT
		Synonymous with "alignBottomRight" used for {@link UITextField.alignText} 
*/

var BOTTOM_RIGHT = 'alignBottomRight';
/**
	@memberof Align
	@const {string} TOP_LEFT
		Synonymous with "alignTopLeft" used for {@link UITextField.alignText} 
*/

var TOP_LEFT = 'alignTopLeft';
/**
	@memberof Align
	@const {string} TOP_RIGHT
		Synonymous with "alignTopRight" used for {@link UITextField.alignText} 
*/

var TOP_RIGHT = 'alignTopRight';
/* ------------------------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
		@memberof Align
		@method get
		@desc
			Calculates but does not apply the amount the source element will move horizontally and/or vertically, relative to its parent 
			according to provided mode. The constants allow for picking which coordinate to apply.  
	*/

function get(source, arg) {
  var elem = source.canvas || _Markup__WEBPACK_IMPORTED_MODULE_0__["get"](source);
  var obj = {};
  var snap = arg.snap !== false;
  var sourceRect = isDomElement(source) ? 0 : 1;

  if (typeof arg == 'string') {
    arg = calculate(arg);
  } // check for top level against


  var topAgainst = arg.against;

  if (arg.type) {
    var typeToObj = calculate(arg.type);

    for (var key in typeToObj) {
      if (!arg.hasOwnProperty(key)) {
        arg[key] = typeToObj[key];
      }
    }
  }

  for (var xy in arg) {
    if (xy == 'x' || xy == 'y') {
      var params = arg[xy]; // the x or y is null or undefined, so skip this pass of the loop

      if (!params) continue;

      if (typeof params == 'string') {
        params = {
          type: params
        };
      }

      var against = void 0;
      var againstDimension = void 0;
      var againstX = 0;
      var againstNumber = false;
      var offset = params.offset || arg.offset || 0; // check the outer vs top

      params.outer = params.outer || arg.outer;

      if (params.against !== undefined || topAgainst !== undefined) {
        // console.log('\t params.against:', params.against, topAgainst)
        if (params.against == 0) {
          against = 0;
        } else {
          against = params.against || topAgainst;
        }

        var againstRect = 0; // console.log('\t against:', against)

        if (isDomElement(against)) {
          if (against.canvas) againstRect = 1;else againstX = _Styles__WEBPACK_IMPORTED_MODULE_1__["getCss"](against, xy);
        } else if (typeof against === 'number') {
          againstNumber = true;
          againstX = against;
        } else {
          againstX = against[xy];
          againstRect = 1;
        }

        againstDimension = _rect[againstRect][xy];
        if (params.type === CENTER) params.outer = false;
      } else {
        against = elem[_rect[sourceRect].parent];
        againstDimension = _rect[sourceRect][xy];
      }

      var widthOrHeight = elem[_rect[sourceRect][xy]];

      switch (source._type) {
        case 'arc':
        case 'path':
          if (params.type == CENTER) {
            widthOrHeight = 0;
          } else {
            offset += widthOrHeight / 2;
          }

          break;

        case 'text':
          if (xy === 'x') {
            switch (source.alignText) {
              case 'center':
                widthOrHeight = 0;

              case 'right':
                widthOrHeight *= -1;
            }
          }

          break;
      }

      var pos = calculate(params.type, widthOrHeight, againstNumber ? 0 : against[againstDimension], !againstNumber && !!params.outer);

      if (pos != null) {
        pos += againstX + offset;
        obj[xy] = snap ? Math.round(pos) : pos;
      }
    }
  }

  return obj;
}
/**
		@memberof Align
		@method set
		@desc
			Moves the source element horizontally and/or vertically, relative to its parent according to provided mode. The constants 
			allow for picking which coordinate to apply. Will additionally return the get() value. NOTE: If setting an array, there will NOT be a return
	*/

function set(source, arg) {
  var _sources = Array.isArray(source) ? source : [source];

  var first;

  for (var _iterator = _sources, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _item = _ref;
    var obj = get(_item, arg);

    if (isDomElement(_item)) {
      var elem = _item.canvas || _Markup__WEBPACK_IMPORTED_MODULE_0__["get"](_item);
      _Styles__WEBPACK_IMPORTED_MODULE_1__["setCss"](elem, obj);
    } else {
      for (var prop in obj) {
        _item[prop] = obj[prop];
      }
    }

    if (first == undefined) {
      first = obj;
    }
  }

  if (_sources.length == 1) return first;
}
/* ------------------------------------------------------------------------------------------------------------------------------- */
// PRIVATE METHODS
// used internally by Flipbook

function calculate(mode, source, target, outer) {
  //console.log( 'calculate()', mode, source, target, outer )
  // when only passing a string, this will create {x/y} from string
  var isConvert = arguments.length == 1;

  switch (mode) {
    case 'alignBottom':
      if (outer) source = 0;
      if (!isConvert) return target - source;

    case 'alignTop':
      return isConvert ? {
        y: mode
      } : outer ? -source : 0;

    case 'alignRight':
      if (outer) target += source;
      if (!isConvert) return target - source;

    case 'alignLeft':
      return isConvert ? {
        x: mode
      } : outer ? -source : 0;

    case 'alignCenter':
      if (outer) target = 0;
      return isConvert ? {
        x: mode,
        y: mode
      } : (target - source) / 2;

    default:
      return null;
  }
}
/* ------------------------------------------------------------------------------------------------------------------------------- */
// PRIVATE METHODS

function isDomElement(elem) {
  // console.warn(':: Align :: isDomElement() :: elem =', elem)
  return elem && (elem instanceof HTMLElement || elem.canvas != undefined);
}
/* ------------------------------------------------------------------------------------------------------------------------------- */

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Clamp.js":
/*!*******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Clamp.js ***!
  \*******************************************************************/
/*! exports provided: X, Y, XY, set */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return Y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XY", function() { return XY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Styles */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Styles.js");
/* harmony import */ var _Markup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Markup */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Markup.js");
/**
	@npmpackage
	@class Clamp
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-view">ad-view</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Clamp } from 'ad-view'
		</codeblock>
		<br><br>

		Utility for resizing a DOM element to the size of all its content, sort of like shrink wrapping.
		<br><br>
		
		This will clamp the bounds and potentially move the x and y so that visually the content stays where it is. There is the option to clamp 
		both horizontally and vertically, or you can just do one. Additionally there is a optional object to add some buffer space on any of the sides.

	@example
		// clamp both directions
		Clamp.set( View.main.myDiv, Clamp.XY );
		
		// clamp both directions while adding some buffer padding on each side
		Clamp.set( View.main.myDiv, Clamp.XY, {
			top : 5,
			left : 10,
			bottom : 5,
			right : 10
		});

		// clamp only horizontally and add a buffer padding on the left
		Clamp.set( View.main.myDiv, Clamp.X, {
			left : 10
		});
*/


var _rect = {
  x: ['offsetWidth', 'width', 'left', 'right'],
  y: ['offsetHeight', 'height', 'top', 'bottom']
};
/**
		@memberof Clamp
		@const {string} X
			Synonymous with "clampX" - clamp on the horizontal direction only 
	*/

var X = 'clampX';
/**
	@memberof Clamp
	@const {string} Y
		Synonymous with "clampY" - clamp on the vertical direction only 
*/

var Y = 'clampY';
/**
	@memberof Clamp
	@const {string} XY
		Synonymous with "clampXY" - clamp on all sides 
*/

var XY = 'clampXY';
/* ------------------------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
			@memberof Clamp
			@method set
			@param {element} source
				The DOM element to resize and move.
			@param {string} type
				A String/Constant representing what directions to clamp on.
			@param {object} buffer
				(optional) An Object that has the values to add buffer padding to each side. See properties for more info:
		
				@property {number} buffer.left
					Amount of left padding
				@property {number} buffer.right
					Amount of right padding
				@property {number} buffer.top
					Amount of top padding
				@property {number} buffer.bottom
					Amount of bottom padding
			@desc
				Resizes and moves the source element horizontally and/or vertically, relative to all its children. 
		*/

function set(source, type, buffer, move) {
  var elem = _Markup__WEBPACK_IMPORTED_MODULE_1__["get"](source);
  move = move !== false;
  var children = elem.childNodes;
  var childCoordinates = [];
  var direction = {};
  if (/(x)/gi.exec(type)) direction.x = {};
  if (/(y)/gi.exec(type)) direction.y = {};

  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    childCoordinates[i] = {};

    for (var xy in direction) {
      var xyValue = _Styles__WEBPACK_IMPORTED_MODULE_0__["getCss"](child, xy);
      var whValue = child[_rect[xy][0]];
      var add = xyValue + whValue;
      var xyDirection = direction[xy];

      if (i == 0) {
        xyDirection.min = xyValue;
        xyDirection.max = add;
      }

      if (xyValue < xyDirection.min) xyDirection.min = xyValue;
      if (xyDirection.max < add) xyDirection.max = add;
      childCoordinates[i][xy] = xyValue;
    }
  } // process the optional buffer


  var _buffer = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };

  if (buffer) {
    for (var prop in _buffer) {
      _buffer[prop] = isNaN(buffer) ? buffer[prop] || 0 : buffer;
    }
  } // resize and move the container


  var css = {};

  for (var xy in direction) {
    var d = direction[xy];
    if (move) css[xy] = d.min + _Styles__WEBPACK_IMPORTED_MODULE_0__["getCss"](elem, xy) - _buffer[_rect[xy][2]];
    css[_rect[xy][1]] = d.max - d.min + _buffer[_rect[xy][2]] + _buffer[_rect[xy][3]];
  }

  _Styles__WEBPACK_IMPORTED_MODULE_0__["setCss"](elem, css); // move all the children

  for (i = 0; i < children.length; i++) {
    var child = children[i];
    var css = {};

    for (var xy in direction) {
      css[xy] = childCoordinates[i][xy] - direction[xy].min + _buffer[_rect[xy][2]];
    }

    _Styles__WEBPACK_IMPORTED_MODULE_0__["setCss"](child, css);
  }
}
/* ------------------------------------------------------------------------------------------------------------------------------- */

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Effects.js":
/*!*********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Effects.js ***!
  \*********************************************************************/
/*! exports provided: blur, dropShadow, textDropShadow, glow, linearGradient, radialGradient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blur", function() { return blur; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dropShadow", function() { return dropShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textDropShadow", function() { return textDropShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glow", function() { return glow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linearGradient", function() { return linearGradient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radialGradient", function() { return radialGradient; });
/* harmony import */ var ad_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ad-utils */ "./1-build/node_modules/@ff0000-ad-tech/ad-utils/index.js");
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styles */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Styles.js");
/**
	@npmpackage
	@class Effects
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-view">ad-view</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Effects } from 'ad-view'
		</codeblock>
		<br><br>

		Utilities for adding effects to elements
*/


/* --------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
	@memberof Effects
	@method blur
	@param {object} obj
		object containing blur arguments, see Properties for more info:

		@property {element} obj.target
			dom element
		@property {number} obj.amount
			the level of blurriness
	@desc
		Blurs a dom element.
	
	
	@example
		//
		Effects.blur({
			target: _myDiv,
			amount: 10
		});
*/

function blur(obj) {
  if (obj.amount >= 0) _Styles__WEBPACK_IMPORTED_MODULE_1__["setCss"](obj.target, {
    filter: 'blur(' + obj.amount + 'px)'
  });
}
/**
	@memberof Effects
	@method dropShadow
	@param {object} obj
		object containing drop shadow arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {number} obj.angle
			optional NUMBER IN DEGREES for the angle at which the shadow will project. Defaults to 0.
		@property {number} obj.distance
			optional NUMBER for how far away the shadow will offset. Defaults to 0.
		@property {number} obj.size
			optional NUMBER for shadow radius. Defaults to 0.
		@property {number} obj.spread
			optional NUMBER for how much extra the shadow will increase before it begins its gradient fade. Defaults to 0.
		@property {string|object} obj.color
			optional color of shadow as a HEX STRING :"#ff0000", 
			RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", 
			or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
		@property {number} obj.alpha
			optional NUMBER of shadow opacity, if set will overwrite color.a. Defaults to 1.
		@property {boolean} obj.inner
			optional BOOLEAN to set the shadow as inset. Defaults to false.

	@desc
		Adds a drop shadow to a dom element. Follows the same use specs as Photoshop.
		
	@example
		//
		Effects.dropShadow({
			target:_myDiv,
			angle: 135,
			distance: 50,
			size: 20, 
			spread: 10,
			color: 'rgb(90, 0, 0)',
			alpha: 0.1,
			inner: true
		});
*/

function dropShadow(obj) {
  _Styles__WEBPACK_IMPORTED_MODULE_1__["setCss"](obj.target, {
    boxShadow: createShadow(obj.angle || 0, obj.distance || 0, obj.size || 0, obj.spread || 0, obj.color || '#000000', obj.alpha, obj.inner)
  });
}
/**
	@memberof Effects
	@method textDropShadow
	@param {object} obj
		object containing drop shadow arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {number} obj.angle
			optional NUMBER IN DEGREES for the angle at which the shadow will project. Defaults to 0.
		@property {number} obj.distance
			optional NUMBER for how far away the shadow will offset. Defaults to 0.
		@property {number} obj.size
			optional NUMBER for shadow radius. Defaults to 0.
		@property {string|object} obj.color
			optional color of shadow as a HEX STRING :"#ff0000", 
			RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", 
			or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
		@property {number} obj.alpha
			optional NUMBER of shadow opacity, if set will overwrite color.a. Defaults to 1.

	@desc
		Adds a drop shadow to text within a dom element. Follows the same use specs as Photoshop.
		
	@example
		//
		Effects.textDropShadow({
			target:_myText, 
			angle: 45, 
			distance: 15, 
			size: 1, 
			color: '#ff0000', 
			alpha: 0.5
		});
*/

function textDropShadow(obj) {
  _Styles__WEBPACK_IMPORTED_MODULE_1__["setCss"](obj.target, {
    textShadow: createShadow(obj.angle || 0, obj.distance || 0, obj.size || 0, null, obj.color || '#000000', obj.alpha)
  });
}
/**
	@memberof Effects
	@method glow
	@param {object} obj
		object containing glow arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {number} obj.size
			optional NUMBER for glow radius. Defaults to 0.
		@property {number} obj.spread
			optional NUMBER for how much extra the glow will increase before it begins its gradient fade. Defaults to 0.
		@property {string|object} obj.color
			optional color of glow as a HEX STRING :"#ff0000", 
			RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", 
			or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
		@property {number} obj.alpha
			optional NUMBER of glow opacity, if set will overwrite color.a. Defaults to 1.
		@property {boolean} obj.inner
			optional BOOLEAN to set the glow as inset. Defaults to false.

	@desc
		Adds a glow to a dom element. Follows the same use specs as Photoshop.
		
	@example
		//
		Effects.glow({
			target: _myDiv,
			size: 20, 
			spread: 0,
			color: 'rgb(90, 0, 0)',
			alpha: 0.5,
			inner: true
		});
*/

function glow(obj) {
  obj.angle = 0;
  obj.distance = 0;
  dropShadow(obj);
}
/**
	@memberof Effects
	@method linearGradient
	@param {object} obj
		object containing gradient arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {array} obj.colors
			ARRAY of colors as either a HEX STRING :"#ff0000" or an RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)".
		@property {number} obj.angle
			NUMBER IN DEGREES of angle to draw linear-gradient at. Defaults to 0.
	@desc
		Changes the background of a given dom element to be a linear gradient.
		<br><br>

		<b>Example</b><br>
		Adding a horizontal gradient from red, to blue, fading to a transparent yellow.
		<codeblock>
			Effects.linearGradient({
				target: _myDiv, 
				colors: ['red', 'blue', 'rgba(255, 255, 0, 0.5)'], 
				angle: 90
			});
		</codeblock>
*/

function linearGradient(obj) {
  _Styles__WEBPACK_IMPORTED_MODULE_1__["setCss"](obj.target, {
    background: 'linear-gradient(' + (obj.angle || 0) + 'deg, ' + obj.colors.toString() + ')'
  });
}
/**
	@memberof Effects
	@method radialGradient
	@param {object} obj
		object containing gradient arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {array} obj.colors
			ARRAY of colors as either a HEX STRING :"#ff0000" 
			or an RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)". 
			<br><br>

			To add stops, append a % value to the color string: ["#ff0000 50%, "#00ff00 90%"].
		@property {number} obj.angle
			NUMBER IN DEGREES of angle to draw linear-gradient at. Defaults to 0.
	@desc
		Changes the background of a given dom element to be a radial gradient.
		<br><br>

		<b>Example</b><br>
		Adding a gradient from red to blue, with a very large choke on the blue.
		<codeblock>
			Effects.radialGradient({
				target: _myDiv, 
				colors: ['#ff0000', '#0000ff 10%']
			});
		</codeblock>
*/

function radialGradient(obj) {
  _Styles__WEBPACK_IMPORTED_MODULE_1__["setCss"](obj.target, {
    background: 'radial-gradient(' + obj.colors.toString() + ')'
  });
}
/* --------------------------------------------------------------------------------- */
// PRIVATE METHODS

function createShadow(angle, distance, size, spread, color, alpha, inner) {
  var val = '';
  var deg = angle * -1 + 180;
  var rad = ad_utils__WEBPACK_IMPORTED_MODULE_0__["MathUtils"].toRadians(deg);
  val += (Math.cos(rad) * distance).toFixed(8) + 'px ';
  val += (Math.sin(rad) * distance).toFixed(8) + 'px ';
  val += size + 'px';
  if (spread) val += ' ' + spread + 'px';
  val += ' ' + ad_utils__WEBPACK_IMPORTED_MODULE_0__["ColorUtils"].toRgbaString(color, alpha);
  inner = !!inner;
  if (inner) val += ' inset';
  return val;
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/FullScreen.js":
/*!************************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/FullScreen.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var FullScreen = new function () {
  var F = this;

  F.isFullScreen = function () {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  };

  F.enter = function (elem) {
    if (F.isFullScreen()) return;

    if (elem.requestFullscreen) {
      console.log(' -> requestFullscreen');
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      console.log(' -> msRequestFullscreen');
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      console.log(' -> mozRequestFullScreen');
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      console.log(' -> webkitRequestFullscreen');
      elem.webkitRequestFullscreen();
    }
  };

  F.exit = function () {
    if (!F.isFullScreen()) return;

    if (document.exitFullscreen) {
      console.log(' -> exitFullscreen');
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      console.log(' -> msExitFullscreen');
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      console.log(' -> mozCancelFullScreen');
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      console.log(' -> webkitExitFullscreen');
      document.webkitExitFullscreen();
    }
  };
}();
/* harmony default export */ __webpack_exports__["default"] = (FullScreen);

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Markup.js":
/*!********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Markup.js ***!
  \********************************************************************/
/*! exports provided: get, getElement, removeChildren, addiFrame, addSvg, applyToElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElement", function() { return getElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeChildren", function() { return removeChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addiFrame", function() { return addiFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSvg", function() { return addSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyToElements", function() { return applyToElements; });
/**
	@npmpackage
	@class Markup
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-view">ad-view</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Markup } from 'ad-view'
		</codeblock>
		<br><br>
		
		This object contains utilities relateed to dom elements.
*/

/**
	@memberof Markup
	@method get
	@param {string} selector
		A string selector. It defaults to find the string as an id, or if the string starts with '#'. 
		If starts with '.', it selects by class name. If wrapped with '<>', it selects by tag name.
	@param {element} parent
		Optional parent element to get the element(s) from. Defaults to document.
	@returns {element|HTMLCollection}
		One single element if the selector is an id. With class name or tag name, it returns an HTML collection ( similiar to an array ).
	@desc
		Used to select elements.

	@example
		// get element by its id called 'myId'
		Markup.get( 'myId' );
		
		// same as above
		Markup.get( '#myId' );
		
		// get element by CSS classname 'myClass'
		Markup.get( '.myClass' );
		
		// get elements by tag name 'head'
		Markup.get( '<head>' );
*/
function get(selector, parent) {
  if (typeof selector !== 'string') {
    return selector;
  }

  parent = parent || document;
  selector = selector.trim();

  switch (selector[0]) {
    case '#':
      // id
      return parent.getElementById(selector.slice(1));
      break;

    case '.':
      // class
      return parent.getElementsByClassName(selector.slice(1));
      break;

    case '<':
      // tag
      return parent.getElementsByTagName(selector.slice(1, selector.length - 1));
      break;

    default:
      // default to id for backworad support
      return parent.getElementById(selector);
  }
} // the deprecated syntax 12/28/16

function getElement(selector, parent) {
  return get(selector, parent);
}
/**
	@memberof Markup
	@method removeChildren
	@param {element} _target
		element to be targeted
	@desc
		Removes all the children elements of an element
*/

function removeChildren(_target) {
  var element = get(_target);
  console.log('removeChildren (' + _target + ')');

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
/* 
	To be deprecated after moving addiFrame and addSvg to UIComponent 
*/
// export function applyContainerCss (_element, _containerData) {
// 	if (!_containerData.css) _containerData.css = {};
// 	if (!_containerData.css.position)
// 		_containerData.css.position = 'absolute';
// 	Styles.setCss(_element, _containerData.css);
// 	Styles.setCss(_element, _containerData.styles);
// }

/**	Method: addIframe()
 Deprecated. Add an iframe to the containerData.target, pointing at containerData.source.  */

function addiFrame(_containerData) {
  var element = document.createElement('iFrame');
  element.id = _containerData.id;
  element.width = _containerData.css.width;
  element.height = _containerData.css.height;
  delete _containerData.css.width;
  delete _containerData.css.height; // iframe properties

  element.setAttribute('src', _containerData.source);
  element.setAttribute('frameborder', '0');
  element.setAttribute('scrolling', 'no');
  element.setAttribute('allowfullscreen', '');
  applyContainerCss(element, _containerData);

  _containerData.target.appendChild(element);

  return element;
}
/**	Method: addSvg()
	Deprecated.

	_containerData			- object with the necessary keys for creating an element. */

function addSvg(_containerData) {
  var nameSpace = 'http://www.w3.org/2000/svg';
  var element = document.createElementNS(nameSpace, 'svg');
  element.setAttribute('height', _containerData.height);
  element.setAttribute('width', _containerData.width);
  var path = document.createElementNS(nameSpace, 'path');
  path.setAttribute('d', _containerData.d);
  path.setAttribute('fill', _containerData.fill);

  if (_containerData.stroke != undefined) {
    path.setAttribute('stroke', _containerData.stroke);
  }

  if (_containerData.strokeWidth != undefined) {
    path.setAttribute('stroke-width', _containerData.strokeWidth);
  }

  element.appendChild(path);
  applyContainerCss(element, _containerData);

  _containerData.target.appendChild(element);

  return element;
}
/**
	@memberof Markup
	@method applyToElements
	@param {object} arg
		See properties for more info:
		@property {object} arg.scope
			the scope of this
		@property {function} arg.method
			the function to use
		@property {element|array} arg.element
			the element(s) to apply the method to, can be a single element or an array
		@property {string|number|array|object} arg.methodArg
			the argument to pass to the method function
	@desc
		Apply a method to multiple elements. Currently assuming the method accepts element as the first argument,
		and a second argument as the setting. 

	@example
		var myElements = Markup.get( '.centered-blocks' );
		Markup.applyToElements({
			scope: Align,
			method: Align.set,
			elements: myElements,
			methodArg: { x: Align.CENTER }
		});
*/

function applyToElements(arg) {
  if (arg.elements.length === undefined) {
    // assume it is a single element
    arg.method.call(arg.scope, arg.elements, arg.methodArg);
  } else {
    // assume it is an array/HTML collection
    var i;

    for (i = 0; i < arg.elements.length; i++) {
      var el = arg.elements[i];
      arg.method.call(arg.scope, el, arg.methodArg);
    }
  }
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Ratio.js":
/*!*******************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Ratio.js ***!
  \*******************************************************************/
/*! exports provided: EXACT, FILL, FIT, STRETCH, resize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXACT", function() { return EXACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILL", function() { return FILL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIT", function() { return FIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRETCH", function() { return STRETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resize", function() { return resize; });
/**
	@npmpackage
	@class Ratio
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-view">ad-view</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Ratio } from 'ad-view'
		</codeblock>
		<br><br>
		
		Utilities for different ratio layouts; used by {@link UIImage} and deprecated Flipbook.
*/

/**
	@memberof Ratio
	@const {string} EXACT
		'auto' ~ Images display at the exact height and width of the source 
*/
var EXACT = 'auto';
/**
	@memberof Ratio
	@const {string} FILL
		'cover' ~ Scales the image to fill the target without distortion while maintaining aspect ratio, may cause a crop. 
*/

var FILL = 'cover';
/**
	@memberof Ratio
	@const {string} FIT
		'contain' ~ Scales to fit the full image without distortion while maintaining aspect ratio, may cause negative borders. 
*/

var FIT = 'contain';
/**
	@memberof Ratio
	@const {string} STRETCH
		'100% 100%' ~ Images stretches to fill the target, may cause aspect ratio distortion. 
*/

var STRETCH = '100% 100%';
function resize(mode, source, target, returnObj) {
  mode = mode || EXACT;
  returnObj || (returnObj = {
    width: 0,
    height: 0
  });

  if (mode == EXACT) {
    returnObj.width = source.width;
    returnObj.height = source.height;
  } else if (mode == STRETCH) {
    returnObj.width = target.width;
    returnObj.height = target.height;
  } else {
    var s = source.width / source.height;
    var t = target.width / target.height;
    var a = mode == FILL ? s : t;
    var b = mode == FILL ? t : s;

    if (a < b) {
      returnObj.height = source.height / (source.width / target.width);
      returnObj.width = target.width;
    } else {
      returnObj.width = source.width / (source.height / target.height);
      returnObj.height = target.height;
    }
  }

  return returnObj;
}

/***/ }),

/***/ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Styles.js":
/*!********************************************************************!*\
  !*** ./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Styles.js ***!
  \********************************************************************/
/*! exports provided: setCss, getCss, injectStylesheet, addClass, removeClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCss", function() { return setCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCss", function() { return getCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectStylesheet", function() { return injectStylesheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony import */ var _Markup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Markup */ "./1-build/node_modules/@ff0000-ad-tech/ad-view/lib/Markup.js");
/* harmony import */ var ad_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-control */ "./1-build/node_modules/@ff0000-ad-tech/ad-control/index.js");
/* harmony import */ var ad_geom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ad-geom */ "./1-build/node_modules/@ff0000-ad-tech/ad-geom/index.js");



/**
	@npmpackage
	@class Styles
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-view">ad-view</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Styles } from 'ad-view'
		</codeblock>
		<br><br>
		
		Utilities for CSS style related purposes. 
*/

/**
	@memberof Styles
	@method setCss
	@param {string|element} _target
		id or element to which the style(s) should be applied
	@param {string|object|array} args
		any type of CssDeclaration, an object of key-value pairs, a semicolon separated string of styles, or a separate( key, value )arguments
	@desc
		Sets specified styles on target object.
	@example
		// set multiple styles using a css-string
		Styles.setCss ( myDiv, 'top: 30px; left: 10px' );

		// set multiple styles using a css-object, same as the 'css' property on {@link UIComponent}s
		Styles.setCss ( myDiv, { top:30, left:10 });

		// set a single style, using individual( key, value )args
		Styles.setCss ( myDiv, 'top', 30 );
*/

function setCss(element, args) {
  element = _Markup__WEBPACK_IMPORTED_MODULE_0__["get"](element);
  var cssList = {};

  if (arguments.length > 2) {
    for (var i = 1; i < arguments.length; i += 2) {
      cssList = ad_control__WEBPACK_IMPORTED_MODULE_1__["CssManager"].conformCssKeyValue(arguments[i], arguments[i + 1]);
    }
  } else if (typeof arguments[1] == 'string') {
    cssList = ad_control__WEBPACK_IMPORTED_MODULE_1__["CssManager"].conformCssString(arguments[1], element);
  } else {
    cssList = ad_control__WEBPACK_IMPORTED_MODULE_1__["CssManager"].conformCssObject(arguments[1], element);
  }

  ad_control__WEBPACK_IMPORTED_MODULE_1__["CssManager"].apply(element, cssList);
}
/**
	@memberof Styles
	@method getCss
	@param {string|element} _target
		id or element to which css style should be applied
	@param {string} key
		css key
	@desc
		Gets a specific style for a particular key.
*/

function getCss(element, key) {
  element = _Markup__WEBPACK_IMPORTED_MODULE_0__["get"](element);
  var cssValue;

  if (key === 'x' || key === 'y') {
    var existingTransform = element.style[ad_control__WEBPACK_IMPORTED_MODULE_1__["CssManager"].getDeviceKey('transform')];
    var matrix = new ad_geom__WEBPACK_IMPORTED_MODULE_2__["Matrix2D"]();

    if (existingTransform) {
      var matrixArray = Object(ad_geom__WEBPACK_IMPORTED_MODULE_2__["cssToData"])(existingTransform); // 2d matrix length = 6
      // 3d matrix length = 16
      // translate3d length = 3

      if (matrixArray.length !== 6) {
        matrix = new ad_geom__WEBPACK_IMPORTED_MODULE_2__["Matrix3D"]();
      }

      matrix.setFromArray(matrixArray);
    }

    cssValue = key === 'x' ? matrix.getX() : matrix.getY();
  } else {
    var style = window.getComputedStyle(element, null);
    cssValue = style.getPropertyValue(key).replace(/px/, '');
    if (!isNaN(cssValue)) cssValue = parseInt(cssValue, 10);
  }

  return cssValue;
}
/**
	@memberof Styles
	@method injectStylesheet
	@param {string} nodeId
		the id of the &lt;style> node written to the &lt;head>
	@param {string|object|array} styles
		any type of CssDeclaration: an object of key-value pairs, a semicolon separated string of styles, or a separate( key, value )arguments
	@desc
		Creates a new CSS stylesheet node (class, tag, etc) DEFINITION out of the submitted styles. 

	@example
		// selector/CSS string pair
		Styles.injectStylesheet( 'myFirstStyle', 
			'.class-a', 'position:absolute; width:inherit;'
		)

		// selector/CSS string pair: add multiple class declarations to the same node
		Styles.injectStylesheet( 'mySecondStyle', 
			'.class-b', 'position:absolute;',
			'.class-b-top', 'width:inherit; height:inherit;'
		)

		// selector/CSS string pair:  have mulitple classes share the same logic
		Styles.injectStylesheet( 'myThirdStyle', 
			'.class-c, .class-d', 'position:absolute;'
		)

		// selector/CSS string pair: add style to a tag name globally
		Styles.injectStylesheet( 'myFourthStyle', 
			'h1', 'position:absolute;'
		)

		// self-contained CSS string
		var myCssString = '.myClass, h1 { color: blue; margin: 10px; }';
		Styles.injectStylesheet( 'myFifthStyle', myCssString );
*/

function injectStylesheet(nodeId, styles) {
  if (document.getElementById(nodeId)) {
    return;
  }

  var style = document.createElement('style');
  style.type = 'text/css';
  style.id = nodeId; // if only two parameters, assuming styles is CSS string
  // else process as selector/style pair

  var str = arguments.length === 2 ? styles : '';

  if (arguments.length > 2) {
    for (var i = 0; i < arguments.length - 1; i += 2) {
      // strip out the white space after comma
      var names = arguments[i + 1].replace(/\,\s+/g, ',');
      str += names;
      str += ' { ' + (arguments[i + 2] || '') + ' }\n';
    }
  }

  style.innerHTML = str;
  document.getElementsByTagName('head')[0].appendChild(style);
}
/**
	@memberof Styles
	@method addClass
	@param {string|element} target
		id or element to which css style should be added
	@param {string} className
		css class association to be added to this target
	@desc
		Add a CSS class ASSOCIATION to the targeted element.
*/

function addClass(target, className) {
  var element = _Markup__WEBPACK_IMPORTED_MODULE_0__["get"](target); // IE does not support multiple classes being added as arguments, so must loop

  for (var i = 0; i < arguments.length - 1; i++) {
    element.classList.add(arguments[i + 1]);
  }
}
/**
	@memberof Styles
	@method removeClass
	@param {string|element} target
		id or element from which css style should be removed
	@param {string} className
		css class association to be removed from this target
	@desc
		Removes a CSS class ASSOCIATION from the targeted element.
*/

function removeClass(target, className) {
  var element = _Markup__WEBPACK_IMPORTED_MODULE_0__["get"](target);
  element.classList.remove(className);
}

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "ad-global":
/*!*************************!*\
  !*** external "window" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = window;

/***/ })

/******/ });
//# sourceMappingURL=build.bundle.js.map