"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),gaWrapper=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,e),this.prefix=t.prefix?t.prefix:"",this.testMode=t.testMode?t.testMode:!1,this.verbose=t.verbose?t.verbose:!1,this.enabled=!1,this.events=[],this.bindings=[],"function"==typeof ga&&(this.enabled=!0);var n=this;$(document).click(function(e){n._click(e)}),this.log("init"),this.testMode&&$("a").click(function(e){e.preventDefault()})}return _createClass(e,[{key:"register",value:function(e,t,n){"object"==typeof t&&(!("action"in t||"category"in t||"label"in t)||"action"!==e&&"category"!==e&&"label"!==e||"function"!=typeof n||this.events.push({dynamicType:e,match:t,"function":n}))}},{key:"bind",value:function(e,t){"function"==typeof t&&this.bindings.push({keyword:e,"function":t})}},{key:"push",value:function(e,t,n){var i=this,a=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];if(this.checkGALoaded()){if(!a)return void this._push(e,t,n);var s=!1;for(var o in this.events)("action"in this.events[o].match&&t===this.events[o].match.action||"category"in this.events[o].match&&e===this.events[o].match.category||"label"in this.events[o].match&&n===this.events[o].match.label)&&!function(){var c=i;switch(s=!0,i.events[o].dynamicType){case"action":i.events[o]["function"].call(i,t,a,function(t){t&&c._push(e,t,n)});break;case"category":i.events[o]["function"].call(i,e,a,function(e){e&&c._push(e,t,n)});break;case"label":i.events[o]["function"].call(i,n,a,function(n){n&&c._push(e,t,n)});break;default:c._push(e,t,n)}}();e=this._fillBindings(a,e),t=this._fillBindings(a,t),n=this._fillBindings(a,n),s||this._push(e,t,n)}}},{key:"_push",value:function(e,t,n){if(this.checkGALoaded()){if(!e)return void this.log("push event received but category is undefined",0);if(!e.length)return void this.log("push event received but category is of length 0",0);if(!t)return void this.log("push event received but action is undefined",0);if(!t.length)return void this.log("push event received but action is of length 0",0);if(!n)return void this.log("push event received but label is undefined",0);if(!n.length)return void this.log("push event received but label is of length 0",0);this.log("pushed event (category: '"+this.prefix+e+"', action: '"+t+"', label: '"+n+"')"),this.testMode||ga("send","event",this.prefix+e,t,n)}}},{key:"_click",value:function(e){function t(e,t){return t=$(e).attr(t),"undefined"!=typeof t&&t!==!1?t:!1}var n=$(e.target),i=t($(n),"data-ga-category"),a=t($(n),"data-ga-label"),s=t($(n),"data-ga-action");i||(i=$(n).closest("*[data-ga-category]")),a||(a=$(n).closest("*[data-ga-label]",i)),s||(s=$(n).closest("*[data-ga-action]",i)),a.length||(a=i),s.length||(s=i),"object"==typeof a&&(a=$(a).attr("data-ga-label")),"object"==typeof s&&(s=$(s).attr("data-ga-action")),"object"==typeof i&&(i=$(i).attr("data-ga-category")),this.push(i,s,a,n)}},{key:"_fillBindings",value:function(e,t){if(!t||!e)return!1;for(var n in this.bindings)t.indexOf("{{"+this.bindings[n].keyword+"}}")>-1&&(console.log(this.bindings[n]["function"].call(this,e)),t=t.replace("{{"+this.bindings[n].keyword+"}}",this.bindings[n]["function"].call(this,e)));return t.indexOf("{{")>-1&&t.indexOf("}}")>-1&&this.log("unrecognized binding in "+t+", ignoring",2),t}},{key:"checkGALoaded",value:function(){return"function"==typeof ga?(this.enabled=!0,!0):(this.enabled=!1,this.log("push event received but ga has not been loaded",2),!1)}},{key:"log",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?1:arguments[1];switch(t){case 0:t="WARNING";break;case 1:t="INFO";break;case 2:t="ERROR"}(this.verbose||2==t||0==t)&&console.log("gaw "+t+": "+e)}},{key:"prefix",set:function(e){this._prefix=e?e+"-":""},get:function(){return this._prefix}}]),e}();