"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),gaWrapper=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,e),this.testMode=t.testMode?t.testMode:!1,this.verbose=t.verbose?t.verbose:!1,this.enabled=!1,this.clicked=!1,this.bindings=[],"function"==typeof ga&&(this.enabled=!0);var a=this;$(document).on("touchstart click",function(e){this.clicked||(this.clicked=!0,setTimeout(function(){a.clicked=!1},100),a._click(e))}),$(document).ready(function(){a.refresh()}),this.log("init"),this.testMode&&($("a").attr("href","#"),$("*").on("click",function(e){e.preventDefault(),a.log("clicked on "+e.target+" with classes "+$(e.target).attr("class"))}))}return _createClass(e,[{key:"bind",value:function(e,t){"function"==typeof t&&this.bindings.push({keyword:e,"function":t})}},{key:"refresh",value:function(){$("*[data-ga-bind-label]").each(function(e,t){$(t).find("*[data-ga-label]").each(function(e,a){$(a).attr("data-ga-label").length||$(a).attr("data-ga-label",$(t).attr("data-ga-bind-label"))})}),$("*[data-ga-bind-action]").each(function(e,t){$(t).find("*[data-ga-action]").each(function(e,a){$(a).attr("data-ga-action").length||$(a).attr("data-ga-action",$(t).attr("data-ga-bind-action"))})}),$("*[data-ga-bind-category]").each(function(e,t){$(t).find("*[data-ga-category]").each(function(e,a){$(a).attr("data-ga-category").length||$(a).attr("data-ga-category",$(t).attr("data-ga-bind-category"))})})}},{key:"push",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];if(this.checkGALoaded()){if(!t)return void this._push(category,action,label);for(var a in e)e[a]=this._fillBinding(e[a],t),e[a]||(e[a]=void 0);var n=this._objHasEmptyValue(e,["labelPrefix","categoryPrefix","actionPrefix"]);if(n)return void this.log("push event received but "+n+" is undefined",0);e.category=e.categoryPrefix?e.categoryPrefix+e.category:e.category,e.action=e.actionPrefix?e.actionPrefix+e.action:e.action,e.label=e.labelPrefix?e.labelPrefix+e.label:e.label,this.log("pushed event (category: '"+e.category+"', action: '"+e.action+"', label: '"+e.label+"')"),this.testMode||ga("send","event",e.category,e.action,e.label)}}},{key:"trigger",value:function(e){$(e).click()}},{key:"_click",value:function(e){function t(e,t,n){var i="data-ga-"+e,r=a._hasAttr($(t),i);return r||(r="undefined"!=typeof n?$(t).closest("*["+i+"]"):$(t).closest("*["+i+"]",n)),"undefined"==typeof n||r.length||(r=n),"object"==typeof r&&(r=$(r).attr(i)),r}var a=this,n=$(e.target),i=t("category",n);this.push({label:t("label",n,i),action:t("action",n,i),category:i,labelPrefix:t("label-prefix",n),actionPrefix:t("action-prefix",n),categoryPrefix:t("category-prefix",n)},n)}},{key:"_fillBinding",value:function(e,t){if(!e||"undefined"==typeof e||!e.length)return!1;for(var a in this.bindings)if(e.indexOf("@"+this.bindings[a].keyword)>-1){var n=this.bindings[a]["function"].call(this,t);e=e.replace("@"+this.bindings[a].keyword,n),n||this.log(this.bindings[a].keyword+" bind callback returned an empty string")}return e.indexOf("@")>-1?(this.log("unrecognized binding in "+e+", ignoring",2),!1):e}},{key:"checkGALoaded",value:function(){return"function"==typeof ga?(this.enabled=!0,!0):(this.enabled=!1,this.log("push event received but ga has not been loaded",2),!1)}},{key:"log",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?1:arguments[1];switch(t){case 0:t="WARNING";break;case 1:t="INFO";break;case 2:t="ERROR"}(this.verbose||2==t||0==t)&&console.log("gaw "+t+": "+e)}},{key:"_hasAttr",value:function(e,t){return t=$(e).attr(t),"undefined"!=typeof t&&t!==!1&&t.length?t:!1}},{key:"_objHasEmptyValue",value:function(e,t){var a=!1;for(var n in e){if("object"==typeof t)for(var i in t)if(t[i]==n){a=!0;break}if(a)a=!1;else if("undefined"==typeof e[n]||!e[n].length)return n}return!1}}]),e}();