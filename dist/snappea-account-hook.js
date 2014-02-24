window.Messenger=function(){function a(a,b){var c="";if(arguments.length<2?c="target error - target and name are both requied":"object"!=typeof a?c="target error - target itself must be window object":"string"!=typeof b&&(c="target error - target name must be string type"),c)throw new Error(c);this.target=a,this.name=b}function b(a,b){this.targets={},this.name=a,this.listenFunc=[],this.initListen(),c=b||c}var c="[PROJECT_NAME]",d="postMessage"in window;return a.prototype.send=d?function(a){this.target.postMessage(c+a,"*")}:function(a){var b=window.navigator[c+this.name];if("function"!=typeof b)throw new Error("target callback function is not defined");b(c+a,window)},b.prototype.addTarget=function(b,c){var d=new a(b,c);this.targets[c]=d},b.prototype.initListen=function(){var a=this,b=function(b){"object"==typeof b&&b.data&&(b=b.data),b=b.slice(c.length);for(var d=0;d<a.listenFunc.length;d++)a.listenFunc[d](b)};d?"addEventListener"in document?window.addEventListener("message",b,!1):"attachEvent"in document&&window.attachEvent("onmessage",b):window.navigator[c+this.name]=b},b.prototype.listen=function(a){this.listenFunc.push(a)},b.prototype.clear=function(){this.listenFunc=[]},b.prototype.send=function(a){var b,c=this.targets;for(b in c)c.hasOwnProperty(b)&&c[b].send(a)},b}(),function(a){var b=a.$,c=a.$.ajax,d=a.$.Deferred;b.ajaxSetup&&b.ajaxSetup({xhrFields:{withCredentials:!0}});var e=".w-account-hook-opened {overflow: hidden;}.w-account-hook-backdrop {background: #4C4C4C;background: url(http://img.wdjimg.com/account/overlay.png);background: rgba(0, 0, 0, .7);bottom: 0;left: 0;opacity: 0;position: fixed;right: 0;top: 0;z-index: 999;-webkit-transition: opacity .15s linear;-moz-transition: opacity .15s linear;-o-transition: opacity .15s linear;transition: opacity .15s linear;}.w-account-hook-backdrop-in {opacity: 1;}.w-account-hook-iframe {border: none;border-radius: 10px;left: 50%;height: 200px;margin: 0 0 0 -208px;position: fixed;top: 10%;width: 434px;-webkit-transform: translate3d(0, -150%, 0);-moz-transform: translate3d(0, -150%, 0);-ms-transform: translate3d(0, -150%, 0);-o-transform: translate3d(0, -150%, 0);transform: translate3d(0, -150%, 0);-webkit-transition: height .3s linear, -webkit-transform .3s ease-in-out;-moz-transition: height .3s linear, -moz-transform .3s ease-in-out;-o-transition: height .3s linear, -o-transform .3s ease-in-out;transition: height .3s linear, transform .3s ease-in-out;}.w-account-hook-iframe-in {-webkit-transform: translate3d(0, 0, 0);-moz-transform: translate3d(0, 0, 0);-ms-transform: translate3d(0, 0, 0);-o-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0);}",f=function(){var a=document.createElement("snappea"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",MSTransition:"msTransitionEnd",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return b[c];return!1}();b.fn.transitionEnd=function(a,c){var d=this,e=!1;return f===!1?(a.call(d),this):(b(this).one(f,function(){e=!0,a.call(d)}),setTimeout(function(){e||a.call(d)},c+200),this)};var g=!!window.OneRingRequest,h=function(a){var b=new d;a=a||{},a.data=a.data||{},a.type=a.type||"get",a.url=a.url||"";var c=a.url,e=function(c){c=JSON.parse(c),c.state_line=c.state_line||c.state_code,console.log("IO - Callback message for '"+a.url+"'",c),b.resolve(c)};switch(a.type.toLowerCase()){case"get":var f,g=[];for(f in a.data)a.data.hasOwnProperty(f)&&g.push(f+"="+window.encodeURIComponent(a.data[f]));g.length>0&&(c=c+"?"+g.join("&")),window.OneRingRequest(a.type,c,null,e);break;case"post":window.OneRingRequest(a.type,c,window.encodeURIComponent(JSON.stringify(a.data)),e)}return console.log("IO - AJAX call: "+a.url,a),b.promise()},i={},j={checkUserLogin:"https://account.wandoujia.com/v4/api/profile"};i.checkAsync=function(a){var b=new d,e={isLoggedIn:!1,data:{}};return c({type:"GET",dataType:"jsonp",url:j.checkUserLogin,data:a||{},success:function(a){0===a.error?(e.isLoggedIn=!0,e.data=a.member,b.resolve(e)):b.reject(e)},error:function(){b.reject(e)}}),b.promise()};var k;b("head").append('<style type="text/css">'+e+"</style>"),i.openAsync=function(c){var e=new d,f={isLoggedIn:!1,data:{}},j="";if(c=c&&c.toLowerCase()||"login",g){switch(c){case"login":j="wdj://account/login.json";break;case"register":j="wdj://account/register.json";break;case"find":j="wdj://account/reset.json";break;case"logout":j="wdj://account/logout.json"}return h({url:j}).then(function(){var a,b=function(a){clearInterval(k),e.resolve(a)};a="logout"!==c?function(){i.checkAsync().then(b)}:function(){i.checkAsync().fail(b)},clearInterval(k),k=setInterval(a,500)}),e.promise()}j="http://www.wandoujia.com/account/?source=web&medium="+encodeURIComponent(location.host+location.pathname)+"&close=1#"+c;var l,m=b("body").addClass("w-account-hook-opened"),n=b("<div>").addClass("w-account-hook-backdrop").appendTo(m),o=b("<iframe>").attr({src:j,frameBorder:0}).addClass("w-account-hook-iframe").appendTo(n);l=n[0].offsetWidth,n.addClass("w-account-hook-backdrop-in");var p=new a.Messenger("parent","Account");p.addTarget(o[0].contentWindow,"iframe");var q=function(){o.removeClass("w-account-hook-iframe-in"),n.removeClass("w-account-hook-backdrop-in").transitionEnd(function(){n.remove()},150),m.removeClass("w-account-hook-opened")},r=!1;return p.listen(function(b){var c=b.split(":"),d=decodeURIComponent(c[1]);switch(c[0]){case"height":navigator.userAgent.toLowerCase().indexOf("msie")>-1&&(d=Number(d)+4),o.css("height",d+"px"),r||o.transitionEnd(function(){o.addClass("w-account-hook-iframe-in"),r=!0},300);break;case"close":q(),e.reject(f);break;case"done":i.checkAsync().always(function(a){q(),e.resolve(a)});break;case"redirect":a.document.location.href=d}}),n.one("click",q),e.promise()},i.redirect=function(a){var b="http://www.wandoujia.com/account/web.html?callback="+encodeURIComponent(location.href)+"#"+a;location.href=b};var l=a.SnapPea||{};l.AccountHook=i,a.SnapPea=l}(this);