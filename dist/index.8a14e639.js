function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},i={},n=e.parcelRequiree25b;null==n&&((n=function(t){if(t in s)return s[t].exports;if(t in i){var e=i[t];delete i[t];var n={id:t,exports:{}};return s[t]=n,e.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){i[t]=e},e.parcelRequiree25b=n),n.register("3x14q",(function(t,e){var s,i;s=t.exports,i=function(){var t=6e4,e=36e5,s="millisecond",i="second",n="minute",r="hour",o="day",a="week",d="month",u="quarter",h="year",c="date",l="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},y=function(t,e,s){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(s)+t},v={s:y,z:function(t){var e=-t.utcOffset(),s=Math.abs(e),i=Math.floor(s/60),n=s%60;return(e<=0?"+":"-")+y(i,2,"0")+":"+y(n,2,"0")},m:function t(e,s){if(e.date()<s.date())return-t(s,e);var i=12*(s.year()-e.year())+(s.month()-e.month()),n=e.clone().add(i,d),r=s-n<0,o=e.clone().add(i+(r?-1:1),d);return+(-(i+(s-n)/(r?n-o:o-n))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:d,y:h,w:a,d:o,D:c,h:r,m:n,s:i,ms:s,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},M="en",_={};_[M]=$;var g=function(t){return t instanceof T},p=function(t,e,s){var i;if(!t)return M;if("string"==typeof t)_[t]&&(i=t),e&&(_[t]=e,i=t);else{var n=t.name;_[n]=t,i=n}return!s&&i&&(M=i),i||!s&&M},D=function(t,e){if(g(t))return t.clone();var s="object"==typeof e?e:{};return s.date=t,s.args=arguments,new T(s)},w=v;w.l=p,w.i=g,w.w=function(t,e){return D(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var T=function(){function $(t){this.$L=p(t.locale,null,!0),this.parse(t)}var y=$.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,s=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var n=i[2]-1||0,r=(i[7]||"0").substring(0,3);return s?new Date(Date.UTC(i[1],n,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],n,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return w},y.isValid=function(){return!(this.$d.toString()===l)},y.isSame=function(t,e){var s=D(t);return this.startOf(e)<=s&&s<=this.endOf(e)},y.isAfter=function(t,e){return D(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<D(t)},y.$g=function(t,e,s){return w.u(t)?this[e]:this.set(s,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var s=this,u=!!w.u(e)||e,l=w.p(t),f=function(t,e){var i=w.w(s.$u?Date.UTC(s.$y,e,t):new Date(s.$y,e,t),s);return u?i:i.endOf(o)},m=function(t,e){return w.w(s.toDate()[t].apply(s.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),s)},$=this.$W,y=this.$M,v=this.$D,M="set"+(this.$u?"UTC":"");switch(l){case h:return u?f(1,0):f(31,11);case d:return u?f(1,y):f(0,y+1);case a:var _=this.$locale().weekStart||0,g=($<_?$+7:$)-_;return f(u?v-g:v+(6-g),y);case o:case c:return m(M+"Hours",0);case r:return m(M+"Minutes",1);case n:return m(M+"Seconds",2);case i:return m(M+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var a,u=w.p(t),l="set"+(this.$u?"UTC":""),f=(a={},a[o]=l+"Date",a[c]=l+"Date",a[d]=l+"Month",a[h]=l+"FullYear",a[r]=l+"Hours",a[n]=l+"Minutes",a[i]=l+"Seconds",a[s]=l+"Milliseconds",a)[u],m=u===o?this.$D+(e-this.$W):e;if(u===d||u===h){var $=this.clone().set(c,1);$.$d[f](m),$.init(),this.$d=$.set(c,Math.min(this.$D,$.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[w.p(t)]()},y.add=function(s,u){var c,l=this;s=Number(s);var f=w.p(u),m=function(t){var e=D(l);return w.w(e.date(e.date()+Math.round(t*s)),l)};if(f===d)return this.set(d,this.$M+s);if(f===h)return this.set(h,this.$y+s);if(f===o)return m(1);if(f===a)return m(7);var $=(c={},c[n]=t,c[r]=e,c[i]=1e3,c)[f]||1,y=this.$d.getTime()+s*$;return w.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,s=this.$locale();if(!this.isValid())return s.invalidDate||l;var i=t||"YYYY-MM-DDTHH:mm:ssZ",n=w.z(this),r=this.$H,o=this.$m,a=this.$M,d=s.weekdays,u=s.months,h=function(t,s,n,r){return t&&(t[s]||t(e,i))||n[s].substr(0,r)},c=function(t){return w.s(r%12||12,t,"0")},f=s.meridiem||function(t,e,s){var i=t<12?"AM":"PM";return s?i.toLowerCase():i},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:h(s.monthsShort,a,u,3),MMMM:h(u,a),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:h(s.weekdaysMin,this.$W,d,2),ddd:h(s.weekdaysShort,this.$W,d,3),dddd:d[this.$W],H:String(r),HH:w.s(r,2,"0"),h:c(1),hh:c(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:n};return i.replace(m,(function(t,e){return e||$[t]||n.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(s,c,l){var f,m=w.p(c),$=D(s),y=($.utcOffset()-this.utcOffset())*t,v=this-$,M=w.m(this,$);return M=(f={},f[h]=M/12,f[d]=M,f[u]=M/3,f[a]=(v-y)/6048e5,f[o]=(v-y)/864e5,f[r]=v/e,f[n]=v/t,f[i]=v/1e3,f)[m]||v,l?M:w.a(M)},y.daysInMonth=function(){return this.endOf(d).$D},y.$locale=function(){return _[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var s=this.clone(),i=p(t,e,!0);return i&&(s.$L=i),s},y.clone=function(){return w.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},$}(),S=T.prototype;return D.prototype=S,[["$ms",s],["$s",i],["$m",n],["$H",r],["$W",o],["$M",d],["$y",h],["$D",c]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),D.extend=function(t,e){return t.$i||(t(e,T,D),t.$i=!0),D},D.locale=p,D.isDayjs=g,D.unix=function(t){return D(1e3*t)},D.en=_[M],D.Ls=_,D.p={},D},"object"==typeof t.exports?t.exports=i():"function"==typeof define&&define.amd?define(i):(s="undefined"!=typeof globalThis?globalThis:s||self).dayjs=i()}));var r,o,a=n("3x14q"),d={};r=d,o=function(t){var e,s=(e=t)&&"object"==typeof e&&"default"in e?e:{default:e},i="января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),n="январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),r="янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),o="янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"),a=/D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;function d(t,e,s){var i,n;return"m"===s?e?"минута":"минуту":t+" "+(i=+t,n={mm:e?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"}[s].split("_"),i%10==1&&i%100!=11?n[0]:i%10>=2&&i%10<=4&&(i%100<10||i%100>=20)?n[1]:n[2])}var u=function(t,e){return a.test(e)?i[t.month()]:n[t.month()]};u.s=n,u.f=i;var h=function(t,e){return a.test(e)?r[t.month()]:o[t.month()]};h.s=o,h.f=r;var c={name:"ru",weekdays:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),weekdaysShort:"вск_пнд_втр_срд_чтв_птн_сбт".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),months:u,monthsShort:h,weekStart:1,yearStart:4,formats:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., H:mm",LLLL:"dddd, D MMMM YYYY г., H:mm"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:d,mm:d,h:"час",hh:d,d:"день",dd:d,M:"месяц",MM:d,y:"год",yy:d},ordinal:function(t){return t},meridiem:function(t){return t<4?"ночи":t<12?"утра":t<17?"дня":"вечера"}};return s.default.locale(c,null,!0),c},"object"==typeof d?d=o(n("3x14q")):"function"==typeof define&&define.amd?define(["dayjs"],o):(r="undefined"!=typeof globalThis?globalThis:r||self).dayjs_locale_ru=o(r.dayjs);var u={};!function(t,e){"object"==typeof u?u=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_duration=e()}(u,(function(){var t,e,s=1e3,i=6e4,n=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,d=2592e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,h={years:a,months:d,days:r,hours:n,minutes:i,seconds:s,milliseconds:1,weeks:6048e5},c=function(t){return t instanceof M},l=function(t,e,s){return new M(t,s,e.$l)},f=function(t){return e.p(t)+"s"},m=function(t){return t<0},$=function(t){return m(t)?Math.ceil(t):Math.floor(t)},y=function(t){return Math.abs(t)},v=function(t,e){return t?m(t)?{negative:!0,format:""+y(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},M=function(){function m(t,e,s){var i=this;if(this.$d={},this.$l=s,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return l(t*h[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var n=t.match(u);if(n){var r=n.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var y=m.prototype;return y.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,s){return e+(t.$d[s]||0)*h[s]}),0)},y.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=$(t/a),t%=a,this.$d.months=$(t/d),t%=d,this.$d.days=$(t/r),t%=r,this.$d.hours=$(t/n),t%=n,this.$d.minutes=$(t/i),t%=i,this.$d.seconds=$(t/s),t%=s,this.$d.milliseconds=t},y.toISOString=function(){var t=v(this.$d.years,"Y"),e=v(this.$d.months,"M"),s=+this.$d.days||0;this.$d.weeks&&(s+=7*this.$d.weeks);var i=v(s,"D"),n=v(this.$d.hours,"H"),r=v(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=v(o,"S"),d=t.negative||e.negative||i.negative||n.negative||r.negative||a.negative,u=n.format||r.format||a.format?"T":"",h=(d?"-":"")+"P"+t.format+e.format+i.format+u+n.format+r.format+a.format;return"P"===h||"-P"===h?"P0D":h},y.toJSON=function(){return this.toISOString()},y.format=function(t){var s=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return s.replace(o,(function(t,e){return e||String(i[t])}))},y.as=function(t){return this.$ms/h[f(t)]},y.get=function(t){var e=this.$ms,s=f(t);return"milliseconds"===s?e%=1e3:e="weeks"===s?$(e/h[s]):this.$d[s],0===e?0:e},y.add=function(t,e,s){var i;return i=e?t*h[f(e)]:c(t)?t.$ms:l(t,this).$ms,l(this.$ms+i*(s?-1:1),this)},y.subtract=function(t,e){return this.add(t,e,!0)},y.locale=function(t){var e=this.clone();return e.$l=t,e},y.clone=function(){return l(this.$ms,this)},y.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},y.milliseconds=function(){return this.get("milliseconds")},y.asMilliseconds=function(){return this.as("milliseconds")},y.seconds=function(){return this.get("seconds")},y.asSeconds=function(){return this.as("seconds")},y.minutes=function(){return this.get("minutes")},y.asMinutes=function(){return this.as("minutes")},y.hours=function(){return this.get("hours")},y.asHours=function(){return this.as("hours")},y.days=function(){return this.get("days")},y.asDays=function(){return this.as("days")},y.weeks=function(){return this.get("weeks")},y.asWeeks=function(){return this.as("weeks")},y.months=function(){return this.get("months")},y.asMonths=function(){return this.as("months")},y.years=function(){return this.get("years")},y.asYears=function(){return this.as("years")},m}();return function(s,i,n){t=n,e=n().$utils(),n.duration=function(t,e){var s=n.locale();return l(t,{$l:s},e)},n.isDuration=c;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,e){return c(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return c(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}})),t(a).locale("ru"),t(a).extend(t(u));new class{constructor(){this.timerEl=document.getElementById("timer"),this.today=t(a)().format("YYYY-MM-DD"),this.startWeek=t(a)().startOf("week"),this.currentWeekTime=0,this.store=[],this.daysWeek=[],this.showWeekDays(),chrome.storage.local.get(["store"],(({store:t})=>{this.store=t,this.showWeekTimes()})),document.getElementsByClassName("prev")[0].addEventListener("click",(t=>{this.changeWeek(-7)})),document.getElementsByClassName("next")[0].addEventListener("click",(t=>{this.changeWeek(7)}))}showWeekDays(){for(let t=0;t<7;t++){const e=this.startWeek.clone().add(t,"d");this.daysWeek.push(e.format("YYYY-MM-DD")),this.timerEl.innerHTML+="<div class='day'>"+e.format("dddd")+"<br/>"+e.format("D MMM")+"</div>",this.timerEl.innerHTML+="<div class='time'></div>"}this.timerEl.innerHTML+="<div class='allday'>Всего</div>",this.timerEl.innerHTML+="<div class='time'></div>"}showWeekTimes(){this.currentWeekTime=0;for(let e=0;e<7;e++){let s=this.store.findIndex((t=>t.date===this.daysWeek[e]));if(s>-1){this.currentWeekTime+=this.store[s].timer;const i=t(a).duration(this.store[s].timer,"seconds");this.showTime(i,e),this.today===this.store[s].date&&(document.getElementsByClassName("day")[e].classList.add("today"),document.getElementsByClassName("time")[e].classList.add("today"))}else this.today===this.daysWeek[e]&&(document.getElementsByClassName("day")[e].classList.add("today"),document.getElementsByClassName("time")[e].classList.add("today"))}const e=t(a).duration(this.currentWeekTime,"seconds");this.showTime(e,7),chrome.storage.local.get(["startTime"],(({startTime:t})=>{t&&document.getElementsByClassName("today")[0]&&this.startTimer(t)}))}showTime(t,e,s=!1){const i=t.hours()+24*t.days();let n=[Math.floor(i/10%10),i%10,Math.floor(t.minutes()/10%10),t.minutes()%10,Math.floor(t.seconds()/10%10),t.seconds()%10],r="";s?(r='<div class="clock anim">',r+='<div class="digit hoursTen" style="animation-delay:-'+(3600*n[1]+60*t.minutes()+t.seconds())+'s">'+this.timerDigits(n[0],6)+"</div>",r+='<div class="digit hours" style="animation-delay:-'+(60*t.minutes()+t.seconds())+'s">'+this.timerDigits(n[1],10)+"</div>",r+="<div>:</div>",r+='<div class="digit minsTen" style="animation-delay:-'+(t.seconds()+60*n[3])+'s">'+this.timerDigits(n[2],6)+"</div>",r+='<div class="digit mins" style="animation-delay:-'+t.seconds()+'s">'+this.timerDigits(n[3],10)+"</div>",r+="<div>:</div>",r+='<div class="digit secsTen" style="animation-delay:-'+n[5]+'s">'+this.timerDigits(n[4],6)+"</div>",r+='<div class="digit secs">'+this.timerDigits(n[5],10)+"</div>"):(r='<div class="clock">',r+='<div class="digit hoursTen">'+n[0]+"</div>",r+='<div class="digit hours">'+n[1]+"</div>",r+="<div>:</div>",r+='<div class="digit minsTen">'+n[2]+"</div>",r+='<div class="digit mins">'+n[3]+"</div>",r+="<div>:</div>",r+='<div class="digit secsTen">'+n[4]+"</div>",r+='<div class="digit secs">'+n[5]+"</div>"),document.getElementsByClassName("time")[e].innerHTML=r}timerDigits(t,e){let s="";for(let i=0;i<e;i++){let n=i+t;n>=e&&(n-=e),s+="<div>"+n+"</div>"}return s}startTimer(e){const s=this.store.find((t=>t.date===this.today)),i=void 0===s?0:s.timer,n=t(a).duration(i,"seconds");this.timerDur=n.add(((new Date).getTime()-e)/1e3,"s"),this.timerI=0==t(a)().day()?6:t(a)().day()-1;const r=t(a).duration(this.currentWeekTime,"seconds");this.timerDurWeek=r.add(((new Date).getTime()-e)/1e3,"s"),this.showTime(this.timerDur,this.timerI,!0),this.showTime(this.timerDurWeek,7,!0)}changeWeek(t){this.timerEl.innerHTML="",this.startWeek=this.startWeek.add(t,"d"),this.daysWeek=[],this.showWeekDays(),this.showWeekTimes()}};
//# sourceMappingURL=index.8a14e639.js.map