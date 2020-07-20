!function n(r,a,o){function u(i,t){if(!a[i]){if(!r[i]){var e="function"==typeof require&&require;if(!t&&e)return e(i,!0);if(d)return d(i,!0);throw new Error("Cannot find module '"+i+"'")}var s=a[i]={exports:{}};r[i][0].call(s.exports,function(t){var e=r[i][1][t];return u(e||t)},s,s.exports,n,r,a,o)}return a[i].exports}for(var d="function"==typeof require&&require,t=0;t<o.length;t++)u(o[t]);return u}({1:[function(t,e,i){"use strict";var r=n(t("dayjs"));t("dayjs/locale/ru");var s=n(t("dayjs/plugin/duration"));function n(t){return t&&t.__esModule?t:{default:t}}function a(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}r.default.locale("ru"),r.default.extend(s.default);new(function(){function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.timerEl=document.getElementById("timer"),this.today=(0,r.default)().format("YYYY-MM-DD"),this.startWeek=(0,r.default)().startOf("week"),this.currentWeekTime=0,this.store=[],this.daysWeek=[],this.showWeekDays(),chrome.storage.sync.get("store",function(t){!chrome.runtime.error&&t.store&&(e.store=t.store),e.showWeekTimes(),e.connect()}),document.getElementsByClassName("prev")[0].addEventListener("click",function(t){e.changeWeek(-7)}),document.getElementsByClassName("next")[0].addEventListener("click",function(t){e.changeWeek(7)})}return function(t,e,i){e&&a(t.prototype,e),i&&a(t,i)}(t,[{key:"showWeekDays",value:function(){for(var t=0;t<7;t++){var e=this.startWeek.clone().add(t,"d");this.daysWeek.push(e.format("YYYY-MM-DD")),this.timerEl.innerHTML+="<div class='day'>"+e.format("dddd")+"<br/>"+e.format("D MMM")+"</div>",this.timerEl.innerHTML+="<div class='time'></div>"}this.timerEl.innerHTML+="<div class='allday'>Всего</div>",this.timerEl.innerHTML+="<div class='time'></div>"}},{key:"showWeekTimes",value:function(){for(var s=this,t=function(e){var t=s.store.findIndex(function(t){return t.date===s.daysWeek[e]});if(-1<t){s.currentWeekTime+=s.store[t].timer;var i=r.default.duration(s.store[t].timer,"seconds");s.showTime(i,e),s.today===s.store[t].date&&(document.getElementsByClassName("day")[e].classList.add("today"),document.getElementsByClassName("time")[e].classList.add("today"))}else s.today===s.daysWeek[e]&&(document.getElementsByClassName("day")[e].classList.add("today"),document.getElementsByClassName("time")[e].classList.add("today"))},e=this.currentWeekTime=0;e<7;e++)t(e);var i=r.default.duration(this.currentWeekTime,"seconds");this.showTime(i,7),this.startTime&&document.getElementsByClassName("today")[0]&&this.startTimer()}},{key:"showTime",value:function(t,e,i){var s=2<arguments.length&&void 0!==i&&i,n=t.hours()+24*t.days(),r=[Math.floor(n/10%10),n%10,Math.floor(t.minutes()/10%10),t.minutes()%10,Math.floor(t.seconds()/10%10),t.seconds()%10],a="";s?(a='<div class="clock anim">',a+='<div class="digit hoursTen" style="animation-delay:-'+(3600*r[1]+60*t.minutes()+t.seconds())+'s">'+this.timerDigits(r[0],6)+"</div>",a+='<div class="digit hours" style="animation-delay:-'+(60*t.minutes()+t.seconds())+'s">'+this.timerDigits(r[1],10)+"</div>",a+="<div>:</div>",a+='<div class="digit minsTen" style="animation-delay:-'+(t.seconds()+60*r[3])+'s">'+this.timerDigits(r[2],6)+"</div>",a+='<div class="digit mins" style="animation-delay:-'+t.seconds()+'s">'+this.timerDigits(r[3],10)+"</div>",a+="<div>:</div>",a+='<div class="digit secsTen" style="animation-delay:-'+r[5]+'s">'+this.timerDigits(r[4],6)+"</div>",a+='<div class="digit secs">'+this.timerDigits(r[5],10)+"</div>"):(a='<div class="clock">',a+='<div class="digit hoursTen">'+r[0]+"</div>",a+='<div class="digit hours">'+r[1]+"</div>",a+="<div>:</div>",a+='<div class="digit minsTen">'+r[2]+"</div>",a+='<div class="digit mins">'+r[3]+"</div>",a+="<div>:</div>",a+='<div class="digit secsTen">'+r[4]+"</div>",a+='<div class="digit secs">'+r[5]+"</div>"),document.getElementsByClassName("time")[e].innerHTML=a}},{key:"timerDigits",value:function(t,e){for(var i="",s=0;s<e;s++){var n=s+t;e<=n&&(n-=e),i+="<div>"+n+"</div>"}return i}},{key:"connect",value:function(){var e=this,t=chrome.extension.connect({name:"start time"});t.postMessage("give me start time"),t.onMessage.addListener(function(t){t&&(e.startTime=t,e.startTimer())})}},{key:"startTimer",value:function(){var e=this,t=this.store.find(function(t){return t.date===e.today}),i=void 0===t?0:t.timer,s=r.default.duration(i,"seconds");this.timerDur=s.add(((new Date).getTime()-this.startTime)/1e3,"s"),this.timerI=(0,r.default)().day()-1;var n=r.default.duration(this.currentWeekTime,"seconds");this.timerDurWeek=n.add(((new Date).getTime()-this.startTime)/1e3,"s"),this.showTime(this.timerDur,this.timerI,!0),this.showTime(this.timerDurWeek,7,!0)}},{key:"changeWeek",value:function(t){clearInterval(this.timerInterval),this.timerEl.innerHTML="",this.startWeek=this.startWeek.add(t,"d"),this.daysWeek=[],this.showWeekDays(),this.showWeekTimes()}}]),t}())},{dayjs:2,"dayjs/locale/ru":3,"dayjs/plugin/duration":4}],2:[function(t,e,i){var s,n;s=this,n=function(){"use strict";function r(t,e,i){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(i)+t}var u="millisecond",l="second",m="minute",y="hour",v="day",$="week",_="month",d="quarter",M="year",n=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,g=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,t={s:r,z:function(t){var e=-t.utcOffset(),i=Math.abs(e),s=Math.floor(i/60),n=i%60;return(e<=0?"+":"-")+r(s,2,"0")+":"+r(n,2,"0")},m:function(t,e){var i=12*(e.year()-t.year())+(e.month()-t.month()),s=t.clone().add(i,_),n=e-s<0,r=t.clone().add(i+(n?-1:1),_);return Number(-(i+(e-s)/(n?s-r:r-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:_,y:M,w:$,d:v,D:"date",h:y,m:m,s:l,ms:u,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},e={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},a="en",o={};o[a]=e;function s(t){return t instanceof f}function h(t,e,i){var s;if(!t)return a;if("string"==typeof t)o[t]&&(s=t),e&&(o[t]=e,s=t);else{var n=t.name;o[n]=t,s=n}return!i&&s&&(a=s),s||!i&&a}function c(t,e){if(s(t))return t.clone();var i="object"==typeof e?e:{};return i.date=t,i.args=arguments,new f(i)}var D=t;D.l=h,D.i=s,D.w=function(t,e){return c(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var i,f=((i=p.prototype).parse=function(t){this.$d=function(t){var e=t.date,i=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(n);if(s)return i?new Date(Date.UTC(s[1],s[2]-1,s[3]||1,s[4]||0,s[5]||0,s[6]||0,s[7]||0)):new Date(s[1],s[2]-1,s[3]||1,s[4]||0,s[5]||0,s[6]||0,s[7]||0)}return new Date(e)}(t),this.init()},i.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},i.$utils=function(){return D},i.isValid=function(){return!("Invalid Date"===this.$d.toString())},i.isSame=function(t,e){var i=c(t);return this.startOf(e)<=i&&i<=this.endOf(e)},i.isAfter=function(t,e){return c(t)<this.startOf(e)},i.isBefore=function(t,e){return this.endOf(e)<c(t)},i.$g=function(t,e,i){return D.u(t)?this[e]:this.set(i,t)},i.year=function(t){return this.$g(t,"$y",M)},i.month=function(t){return this.$g(t,"$M",_)},i.day=function(t){return this.$g(t,"$W",v)},i.date=function(t){return this.$g(t,"$D","date")},i.hour=function(t){return this.$g(t,"$H",y)},i.minute=function(t){return this.$g(t,"$m",m)},i.second=function(t){return this.$g(t,"$s",l)},i.millisecond=function(t){return this.$g(t,"$ms",u)},i.unix=function(){return Math.floor(this.valueOf()/1e3)},i.valueOf=function(){return this.$d.getTime()},i.startOf=function(t,e){function i(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(v)}function s(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)}var n=this,r=!!D.u(e)||e,a=D.p(t),o=this.$W,u=this.$M,d=this.$D,h="set"+(this.$u?"UTC":"");switch(a){case M:return r?i(1,0):i(31,11);case _:return r?i(1,u):i(0,u+1);case $:var c=this.$locale().weekStart||0,f=(o<c?o+7:o)-c;return i(r?d-f:d+(6-f),u);case v:case"date":return s(h+"Hours",0);case y:return s(h+"Minutes",1);case m:return s(h+"Seconds",2);case l:return s(h+"Milliseconds",3);default:return this.clone()}},i.endOf=function(t){return this.startOf(t,!1)},i.$set=function(t,e){var i,s=D.p(t),n="set"+(this.$u?"UTC":""),r=((i={}).day=n+"Date",i.date=n+"Date",i[_]=n+"Month",i[M]=n+"FullYear",i[y]=n+"Hours",i[m]=n+"Minutes",i[l]=n+"Seconds",i[u]=n+"Milliseconds",i)[s],a=s===v?this.$D+(e-this.$W):e;if(s===_||s===M){var o=this.clone().set("date",1);o.$d[r](a),o.init(),this.$d=o.set("date",Math.min(this.$D,o.daysInMonth())).toDate()}else r&&this.$d[r](a);return this.init(),this},i.set=function(t,e){return this.clone().$set(t,e)},i.get=function(t){return this[D.p(t)]()},i.add=function(i,t){var e,s=this;function n(t){var e=c(s);return D.w(e.date(e.date()+Math.round(t*i)),s)}i=Number(i);var r=D.p(t);if(r===_)return this.set(_,this.$M+i);if(r===M)return this.set(M,this.$y+i);if(r===v)return n(1);if(r===$)return n(7);var a=((e={})[m]=6e4,e[y]=36e5,e[l]=1e3,e)[r]||1,o=this.$d.getTime()+i*a;return D.w(o,this)},i.subtract=function(t,e){return this.add(-1*t,e)},i.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";function e(t,e,i,s){return t&&(t[e]||t(n,r))||i[e].substr(0,s)}function i(t){return D.s(o%12||12,t,"0")}var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),a=this.$locale(),o=this.$H,u=this.$m,d=this.$M,h=a.weekdays,c=a.months,f=a.meridiem||function(t,e,i){var s=t<12?"AM":"PM";return i?s.toLowerCase():s},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:d+1,MM:D.s(d+1,2,"0"),MMM:e(a.monthsShort,d,c,3),MMMM:e(c,d),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:e(a.weekdaysMin,this.$W,h,2),ddd:e(a.weekdaysShort,this.$W,h,3),dddd:h[this.$W],H:String(o),HH:D.s(o,2,"0"),h:i(1),hh:i(2),a:f(o,u,!0),A:f(o,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return r.replace(g,function(t,e){return e||l[t]||s.replace(":","")})},i.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},i.diff=function(t,e,i){var s,n=D.p(e),r=c(t),a=6e4*(r.utcOffset()-this.utcOffset()),o=this-r,u=D.m(this,r);return u=((s={})[M]=u/12,s[_]=u,s[d]=u/3,s[$]=(o-a)/6048e5,s.day=(o-a)/864e5,s[y]=o/36e5,s[m]=o/6e4,s[l]=o/1e3,s)[n]||o,i?u:D.a(u)},i.daysInMonth=function(){return this.endOf(_).$D},i.$locale=function(){return o[this.$L]},i.locale=function(t,e){if(!t)return this.$L;var i=this.clone(),s=h(t,e,!0);return s&&(i.$L=s),i},i.clone=function(){return D.w(this.$d,this)},i.toDate=function(){return new Date(this.valueOf())},i.toJSON=function(){return this.isValid()?this.toISOString():null},i.toISOString=function(){return this.$d.toISOString()},i.toString=function(){return this.$d.toUTCString()},p);function p(t){this.$L=this.$L||h(t.locale,null,!0),this.parse(t)}return c.prototype=f.prototype,c.extend=function(t,e){return t(e,f,c),c},c.locale=h,c.isDayjs=s,c.unix=function(t){return c(1e3*t)},c.en=o[a],c.Ls=o,c},"object"==typeof i&&void 0!==e?e.exports=n():"function"==typeof define&&define.amd?define(n):s.dayjs=n()},{}],3:[function(t,e,i){var s,n;s=this,n=function(t){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t;var i="января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),s="январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),n="янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),r="янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"),a=/D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;function e(t,e,i){var s,n;return"m"===i?e?"минута":"минуту":t+" "+(s=+t,n={mm:e?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"}[i].split("_"),s%10==1&&s%100!=11?n[0]:2<=s%10&&s%10<=4&&(s%100<10||20<=s%100)?n[1]:n[2])}function o(t,e){return a.test(e)?i[t.month()]:s[t.month()]}o.s=s,o.f=i;function u(t,e){return a.test(e)?n[t.month()]:r[t.month()]}u.s=r,u.f=n;var d={name:"ru",weekdays:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),weekdaysShort:"вск_пнд_втр_срд_чтв_птн_сбт".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),months:o,monthsShort:u,weekStart:1,formats:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., H:mm",LLLL:"dddd, D MMMM YYYY г., H:mm"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:e,mm:e,h:"час",hh:e,d:"день",dd:e,M:"месяц",MM:e,y:"год",yy:e},ordinal:function(t){return t}};return t.locale(d,null,!0),d},"object"==typeof i&&void 0!==e?e.exports=n(t("dayjs")):"function"==typeof define&&define.amd?define(["dayjs"],n):s.dayjs_locale_ru=n(s.dayjs)},{dayjs:2}],4:[function(t,e,i){var s,n;s=this,n=function(){"use strict";function n(t){return t instanceof h}function r(t,e,i){return new h(t,i,e.$l)}function a(t){return o.p(t)+"s"}var s,o,t,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:31536e6,months:2592e6,days:864e5,hours:36e5,minutes:6e4,seconds:1e3,weeks:6048e5},h=((t=e.prototype).calMilliseconds=function(){var i=this;this.$ms=Object.keys(this.$d).reduce(function(t,e){return t+(i.$d[e]||0)*(d[e]||1)},0)},t.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=Math.floor(t/31536e6),t%=31536e6,this.$d.months=Math.floor(t/2592e6),t%=2592e6,this.$d.days=Math.floor(t/864e5),t%=864e5,this.$d.hours=Math.floor(t/36e5),t%=36e5,this.$d.minutes=Math.floor(t/6e4),t%=6e4,this.$d.seconds=Math.floor(t/1e3),t%=1e3,this.$d.milliseconds=t},t.toISOString=function(){var t=this.$d.years?this.$d.years+"Y":"",e=this.$d.months?this.$d.months+"M":"",i=+this.$d.days||0;this.$d.weeks&&(i+=7*this.$d.weeks);var s=i?i+"D":"",n=this.$d.hours?this.$d.hours+"H":"",r=this.$d.minutes?this.$d.minutes+"M":"",a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=a?a+"S":"",u="P"+t+e+s+(n||r||o?"T":"")+n+r+o;return"P"==u?"P0D":u},t.toJSON=function(){return this.toISOString()},t.as=function(t){return this.$ms/(d[a(t)]||1)},t.get=function(t){var e=this.$ms,i=a(t);return"milliseconds"===i?e%=1e3:e="weeks"===i?Math.floor(e/d[i]):this.$d[i],e},t.add=function(t,e,i){var s;return s=e?t*d[a(e)]:n(t)?t.$ms:r(t,this).$ms,r(this.$ms+s*(i?-1:1),this)},t.subtract=function(t,e){return this.add(t,e,!0)},t.locale=function(t){var e=this.clone();return e.$l=t,e},t.clone=function(){return r(this.$ms,this)},t.humanize=function(t){return s().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},t.milliseconds=function(){return this.get("milliseconds")},t.asMilliseconds=function(){return this.as("milliseconds")},t.seconds=function(){return this.get("seconds")},t.asSeconds=function(){return this.as("seconds")},t.minutes=function(){return this.get("minutes")},t.asMinutes=function(){return this.as("minutes")},t.hours=function(){return this.get("hours")},t.asHours=function(){return this.as("hours")},t.days=function(){return this.get("days")},t.asDays=function(){return this.as("days")},t.weeks=function(){return this.get("weeks")},t.asWeeks=function(){return this.as("weeks")},t.months=function(){return this.get("months")},t.asMonths=function(){return this.as("months")},t.years=function(){return this.get("years")},t.asYears=function(){return this.as("years")},e);function e(e,t,i){var s=this;if(this.$d={},this.$l=i||"en",t)return r(e*d[a(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach(function(t){s.$d[a(t)]=e[t]}),this.calMilliseconds(),this;if("string"==typeof e){var n=e.match(u);if(n)return this.$d.years=n[2],this.$d.months=n[3],this.$d.weeks=n[4],this.$d.days=n[5],this.$d.hours=n[6],this.$d.minutes=n[7],this.$d.seconds=n[8],this.calMilliseconds(),this}return this}return function(t,e,i){o=(s=i)().$utils(),i.duration=function(t,e){return r(t,{},e)},i.isDuration=n}},"object"==typeof i&&void 0!==e?e.exports=n():"function"==typeof define&&define.amd?define(n):s.dayjs_plugin_duration=n()},{}]},{},[1]);