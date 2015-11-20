"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),gaWrapper=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,t),this.testMode=e.testMode?e.testMode:!1,this.verbose=e.verbose?e.verbose:!1,this.enabled=!1,this.bindings=[],"function"==typeof ga&&(this.enabled=!0);var a=this;$(document).click(function(t){a._click(t)}),$(document).on("touchstart",function(t){a._click(t)}),$(document).ready(function(){a.refresh()}),this.log("init"),this.testMode&&($("a").attr("href","#"),$("*").on("click",function(t){t.preventDefault(),a.log("clicked on "+t.target)}))}return _createClass(t,[{key:"bind",value:function(t,e){"function"==typeof e&&this.bindings.push({keyword:t,"function":e})}},{key:"refresh",value:function(){$("*[data-ga-bind-label]").each(function(t,e){$(e).find("*[data-ga-label]").each(function(t,a){$(a).attr("data-ga-label").length||$(a).attr("data-ga-label",$(e).attr("data-ga-bind-label"))})}),$("*[data-ga-bind-action]").each(function(t,e){$(e).find("*[data-ga-action]").each(function(t,a){$(a).attr("data-ga-action").length||$(a).attr("data-ga-action",$(e).attr("data-ga-bind-action"))})}),$("*[data-ga-bind-category]").each(function(t,e){$(e).find("*[data-ga-category]").each(function(t,a){$(a).attr("data-ga-category").length||$(a).attr("data-ga-category",$(e).attr("data-ga-bind-category"))})})}},{key:"push",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];if(this.checkGALoaded()){if(!e)return void this._push(category,action,label);t.category=this._fillBinding(t.category,e),t.action=this._fillBinding(t.action,e),t.label=this._fillBinding(t.label,e),t.categoryPrefix=this._fillBinding(t.categoryPrefix),t.actionPrefix=this._fillBinding(t.actionPrefix),t.labelPrefix=this._fillBinding(t.labelPrefix),this._push(t)}}},{key:"_push",value:function(t){if(this.checkGALoaded()){if(!t.category)return void this.log("push event received but category is undefined",0);if(!t.category.length)return void this.log("push event received but category is of length 0",0);if(!t.action)return void this.log("push event received but action is undefined",0);if(!t.action.length)return void this.log("push event received but action is of length 0",0);if(!t.label)return void this.log("push event received but label is undefined",0);if(!t.label.length)return void this.log("push event received but label is of length 0",0);t.category=t.categoryPrefix?t.categoryPrefix+t.category:t.category,t.action=t.actionPrefix?t.actionPrefix+t.action:t.action,t.label=t.labelPrefix?t.labelPrefix+t.label:t.label,this.log("pushed event (category: '"+t.category+"', action: '"+t.action+"', label: '"+t.label+"')"),this.testMode||ga("send","event",t.category,t.action,t.label)}}},{key:"_click",value:function(t){var e=$(t.target),a=this._hasAttr($(e),"data-ga-category"),i=this._hasAttr($(e),"data-ga-label"),n=this._hasAttr($(e),"data-ga-action"),o=this._hasAttr($(e),"data-ga-category-prefix"),r=this._hasAttr($(e),"data-ga-label-prefix"),c=this._hasAttr($(e),"data-ga-action-prefix");a||(a=$(e).closest("*[data-ga-category]")),i||(i=$(e).closest("*[data-ga-label]",a)),n||(n=$(e).closest("*[data-ga-action]",a)),o||(o=$(e).closest("*[data-ga-category-prefix]")),r||(r=$(e).closest("*[data-ga-label-prefix]")),c||(c=$(e).closest("*[data-ga-action-prefix]")),i.length||(i=a),n.length||(n=a),o.length||(o=""),r.length||(r=""),c.length||(c=""),"object"==typeof i&&(i=$(i).attr("data-ga-label")),"object"==typeof n&&(n=$(n).attr("data-ga-action")),"object"==typeof a&&(a=$(a).attr("data-ga-category")),"object"==typeof r&&(r=$(r).attr("data-ga-label-prefix")),"object"==typeof c&&(c=$(c).attr("data-ga-action-prefix")),"object"==typeof o&&(o=$(o).attr("data-ga-category-prefix"));var l={label:i,action:n,category:a,labelPrefix:r,actionPrefix:c,categoryPrefix:o};this.push(l,e)}},{key:"_fillBinding",value:function(t,e){if(!t||"undefined"==typeof t||!t.length)return!1;for(var a in this.bindings)if(t.indexOf("@"+this.bindings[a].keyword)>-1){var i=this.bindings[a]["function"].call(this,e);t=t.replace("@"+this.bindings[a].keyword,i),i||this.log(t+" bind callback returned an empty string")}return t.indexOf("@")>-1?(this.log("unrecognized binding in "+t+", ignoring",2),!1):t}},{key:"checkGALoaded",value:function(){return"function"==typeof ga?(this.enabled=!0,!0):(this.enabled=!1,this.log("push event received but ga has not been loaded",2),!1)}},{key:"log",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?1:arguments[1];switch(e){case 0:e="WARNING";break;case 1:e="INFO";break;case 2:e="ERROR"}(this.verbose||2==e||0==e)&&console.log("gaw "+e+": "+t)}},{key:"_hasAttr",value:function(t,e){return e=$(t).attr(e),"undefined"!=typeof e&&e!==!1?e:!1}}]),t}();