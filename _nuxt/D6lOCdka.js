import{$ as e,At as t,C as n,O as r,W as i,X as a,a as o,b as s,it as c,lt as l,w as u,x as d}from"./DsV9iKqx.js";import{a as f,i as p,o as m,s as h}from"./BsqmMsA6.js";import{f as g,h as _,l as v,n as y,o as b,r as x,s as S,t as C,u as ee}from"#entry";var te=Object.create,w=Object.defineProperty,T=Object.getOwnPropertyDescriptor,E=Object.getOwnPropertyNames,D=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty,k=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),A=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var i=E(t),a=0,o=i.length,s;a<o;a++)s=i[a],!O.call(e,s)&&s!==n&&w(e,s,{get:(e=>t[e]).bind(null,s),enumerable:!(r=T(t,s))||r.enumerable});return e},ne=(e,t,n)=>(n=e==null?{}:te(D(e)),A(t||!e||!e.__esModule||!O.call(e,`default`)?w(n,`default`,{value:e,enumerable:!0}):n,e)),j=k(((e,t)=>{t.exports=function(){return typeof Promise==`function`&&Promise.prototype&&Promise.prototype.then}})),M=k((e=>{var t,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(e){if(!e)throw Error(`"version" cannot be null or undefined`);if(e<1||e>40)throw Error(`"version" should be in range from 1 to 40`);return e*4+17},e.getSymbolTotalCodewords=function(e){return n[e]},e.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t},e.setToSJISFunction=function(e){if(typeof e!=`function`)throw Error(`"toSJISFunc" is not a valid function.`);t=e},e.isKanjiModeEnabled=function(){return t!==void 0},e.toSJIS=function(e){return t(e)}})),N=k((e=>{e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`l`:case`low`:return e.L;case`m`:case`medium`:return e.M;case`q`:case`quartile`:return e.Q;case`h`:case`high`:return e.H;default:throw Error(`Unknown EC Level: `+t)}}e.isValid=function(e){return e&&e.bit!==void 0&&e.bit>=0&&e.bit<4},e.from=function(n,r){if(e.isValid(n))return n;try{return t(n)}catch{return r}}})),re=k(((e,t)=>{function n(){this.buffer=[],this.length=0}n.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=n})),ie=k(((e,t)=>{function n(e){if(!e||e<1)throw Error(`BitMatrix size must be defined and greater than 0`);this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}n.prototype.set=function(e,t,n,r){let i=e*this.size+t;this.data[i]=n,r&&(this.reservedBit[i]=!0)},n.prototype.get=function(e,t){return this.data[e*this.size+t]},n.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},n.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=n})),P=k((e=>{var t=M().getSymbolSize;e.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=t(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,a=[r-7];for(let e=1;e<n-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},e.getPositions=function(t){let n=[],r=e.getRowColCoords(t),i=r.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)e===0&&t===0||e===0&&t===i-1||e===i-1&&t===0||n.push([r[e],r[t]]);return n}})),F=k((e=>{var t=M().getSymbolSize,n=7;e.getPositions=function(e){let r=t(e);return[[0,0],[r-n,0],[0,r-n]]}})),I=k((e=>{e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(e){return e!=null&&e!==``&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){let n=e.size,r=0,i=0,a=0,o=null,s=null;for(let c=0;c<n;c++){i=a=0,o=s=null;for(let l=0;l<n;l++){let n=e.get(c,l);n===o?i++:(i>=5&&(r+=t.N1+(i-5)),o=n,i=1),n=e.get(l,c),n===s?a++:(a>=5&&(r+=t.N1+(a-5)),s=n,a=1)}i>=5&&(r+=t.N1+(i-5)),a>=5&&(r+=t.N1+(a-5))}return r},e.getPenaltyN2=function(e){let n=e.size,r=0;for(let t=0;t<n-1;t++)for(let i=0;i<n-1;i++){let n=e.get(t,i)+e.get(t,i+1)+e.get(t+1,i)+e.get(t+1,i+1);(n===4||n===0)&&r++}return r*t.N2},e.getPenaltyN3=function(e){let n=e.size,r=0,i=0,a=0;for(let t=0;t<n;t++){i=a=0;for(let o=0;o<n;o++)i=i<<1&2047|e.get(t,o),o>=10&&(i===1488||i===93)&&r++,a=a<<1&2047|e.get(o,t),o>=10&&(a===1488||a===93)&&r++}return r*t.N3},e.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let t=0;t<r;t++)n+=e.data[t];return Math.abs(Math.ceil(n*100/r/5)-10)*t.N4};function n(t,n,r){switch(t){case e.Patterns.PATTERN000:return(n+r)%2==0;case e.Patterns.PATTERN001:return n%2==0;case e.Patterns.PATTERN010:return r%3==0;case e.Patterns.PATTERN011:return(n+r)%3==0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2==0;case e.Patterns.PATTERN101:return n*r%2+n*r%3==0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2==0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2==0;default:throw Error(`bad maskPattern:`+t)}}e.applyMask=function(e,t){let r=t.size;for(let i=0;i<r;i++)for(let a=0;a<r;a++)t.isReserved(a,i)||t.xor(a,i,n(e,a,i))},e.getBestMask=function(t,n){let r=Object.keys(e.Patterns).length,i=0,a=1/0;for(let o=0;o<r;o++){n(o),e.applyMask(o,t);let r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(o,t),r<a&&(a=r,i=o)}return i}})),L=k((e=>{var t=N(),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(e,r){switch(r){case t.L:return n[(e-1)*4+0];case t.M:return n[(e-1)*4+1];case t.Q:return n[(e-1)*4+2];case t.H:return n[(e-1)*4+3];default:return}},e.getTotalCodewordsCount=function(e,n){switch(n){case t.L:return r[(e-1)*4+0];case t.M:return r[(e-1)*4+1];case t.Q:return r[(e-1)*4+2];case t.H:return r[(e-1)*4+3];default:return}}})),R=k((e=>{var t=new Uint8Array(512),n=new Uint8Array(256);(function(){let e=1;for(let r=0;r<255;r++)t[r]=e,n[e]=r,e<<=1,e&256&&(e^=285);for(let e=255;e<512;e++)t[e]=t[e-255]})(),e.log=function(e){if(e<1)throw Error(`log(`+e+`)`);return n[e]},e.exp=function(e){return t[e]},e.mul=function(e,r){return e===0||r===0?0:t[n[e]+n[r]]}})),z=k((e=>{var t=R();e.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<n.length;a++)r[i+a]^=t.mul(e[i],n[a]);return r},e.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let e=r[0];for(let i=0;i<n.length;i++)r[i]^=t.mul(n[i],e);let i=0;for(;i<r.length&&r[i]===0;)i++;r=r.slice(i)}return r},e.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let i=0;i<n;i++)r=e.mul(r,new Uint8Array([1,t.exp(i)]));return r}})),B=k(((e,t)=>{var n=z();function r(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}r.prototype.initialize=function(e){this.degree=e,this.genPoly=n.generateECPolynomial(this.degree)},r.prototype.encode=function(e){if(!this.genPoly)throw Error(`Encoder not initialized`);let t=new Uint8Array(e.length+this.degree);t.set(e);let r=n.mod(t,this.genPoly),i=this.degree-r.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(r,i),e}return r},t.exports=r})),V=k((e=>{e.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}})),H=k((e=>{var t=`[0-9]+`,n=`[A-Z $%*+\\-./:]+`,r=`(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+`;r=r.replace(/u/g,`\\u`);var i=`(?:(?![A-Z0-9 $%*+\\-./:]|`+r+`)(?:.|[\r
]))+`;e.KANJI=new RegExp(r,`g`),e.BYTE_KANJI=RegExp(`[^A-Z0-9 $%*+\\-./:]+`,`g`),e.BYTE=new RegExp(i,`g`),e.NUMERIC=new RegExp(t,`g`),e.ALPHANUMERIC=new RegExp(n,`g`);var a=RegExp(`^`+r+`$`),o=RegExp(`^[0-9]+$`),s=RegExp(`^[A-Z0-9 $%*+\\-./:]+$`);e.testKanji=function(e){return a.test(e)},e.testNumeric=function(e){return o.test(e)},e.testAlphanumeric=function(e){return s.test(e)}})),U=k((e=>{var t=V(),n=H();e.NUMERIC={id:`Numeric`,bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:`Alphanumeric`,bit:2,ccBits:[9,11,13]},e.BYTE={id:`Byte`,bit:4,ccBits:[8,16,16]},e.KANJI={id:`Kanji`,bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(e,n){if(!e.ccBits)throw Error(`Invalid mode: `+e);if(!t.isValid(n))throw Error(`Invalid version: `+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]},e.getBestModeForData=function(t){return n.testNumeric(t)?e.NUMERIC:n.testAlphanumeric(t)?e.ALPHANUMERIC:n.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(e){if(e&&e.id)return e.id;throw Error(`Invalid mode`)},e.isValid=function(e){return e&&e.bit&&e.ccBits};function r(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`numeric`:return e.NUMERIC;case`alphanumeric`:return e.ALPHANUMERIC;case`kanji`:return e.KANJI;case`byte`:return e.BYTE;default:throw Error(`Unknown mode: `+t)}}e.from=function(t,n){if(e.isValid(t))return t;try{return r(t)}catch{return n}}})),W=k((e=>{var t=M(),n=L(),r=N(),i=U(),a=V(),o=7973,s=t.getBCHDigit(o);function c(t,n,r){for(let i=1;i<=40;i++)if(n<=e.getCapacity(i,r,t))return i}function l(e,t){return i.getCharCountIndicator(e,t)+4}function u(e,t){let n=0;return e.forEach(function(e){let r=l(e.mode,t);n+=r+e.getBitsLength()}),n}function d(t,n){for(let r=1;r<=40;r++)if(u(t,r)<=e.getCapacity(r,n,i.MIXED))return r}e.from=function(e,t){return a.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,r,o){if(!a.isValid(e))throw Error(`Invalid QR Code version`);o===void 0&&(o=i.BYTE);let s=(t.getSymbolTotalCodewords(e)-n.getTotalCodewordsCount(e,r))*8;if(o===i.MIXED)return s;let c=s-l(o,e);switch(o){case i.NUMERIC:return Math.floor(c/10*3);case i.ALPHANUMERIC:return Math.floor(c/11*2);case i.KANJI:return Math.floor(c/13);case i.BYTE:default:return Math.floor(c/8)}},e.getBestVersionForData=function(e,t){let n,i=r.from(t,r.M);if(Array.isArray(e)){if(e.length>1)return d(e,i);if(e.length===0)return 1;n=e[0]}else n=e;return c(n.mode,n.getLength(),i)},e.getEncodedBits=function(e){if(!a.isValid(e)||e<7)throw Error(`Invalid QR Code version`);let n=e<<12;for(;t.getBCHDigit(n)-s>=0;)n^=o<<t.getBCHDigit(n)-s;return e<<12|n}})),G=k((e=>{var t=M(),n=1335,r=21522,i=t.getBCHDigit(n);e.getEncodedBits=function(e,a){let o=e.bit<<3|a,s=o<<10;for(;t.getBCHDigit(s)-i>=0;)s^=n<<t.getBCHDigit(s)-i;return(o<<10|s)^r}})),K=k(((e,t)=>{var n=U();function r(e){this.mode=n.NUMERIC,this.data=e.toString()}r.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t,n,r;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),r=parseInt(n,10),e.put(r,10);let i=this.data.length-t;i>0&&(n=this.data.substr(t),r=parseInt(n,10),e.put(r,i*3+1))},t.exports=r})),q=k(((e,t)=>{var n=U(),r=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`.split(``);function i(e){this.mode=n.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t=0;for(;t+2<=this.data.length;t+=2){let n=r.indexOf(this.data[t])*45;n+=r.indexOf(this.data[t+1]),e.put(n,11)}this.data.length%2&&e.put(r.indexOf(this.data[t]),6)},t.exports=i})),J=k(((e,t)=>{var n=U();function r(e){this.mode=n.BYTE,this.data=typeof e==`string`?new TextEncoder().encode(e):new Uint8Array(e)}r.getBitsLength=function(e){return e*8},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=r})),Y=k(((e,t)=>{var n=U(),r=M();function i(e){this.mode=n.KANJI,this.data=e}i.getBitsLength=function(e){return e*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t=0;for(;t<this.data.length;t++){let n=r.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error(`Invalid SJIS character: `+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}},t.exports=i})),X=k(((e,t)=>{var n={single_source_shortest_paths:function(e,t,r){var i={},a={};a[t]=0;var o=n.PriorityQueue.make();o.push(t,0);for(var s,c,l,u,d,f,p,m,h;!o.empty();)for(l in s=o.pop(),c=s.value,u=s.cost,d=e[c]||{},d)d.hasOwnProperty(l)&&(f=d[l],p=u+f,m=a[l],h=a[l]===void 0,(h||m>p)&&(a[l]=p,o.push(l,p),i[l]=c));if(r!==void 0&&a[r]===void 0){var g=[`Could not find a path from `,t,` to `,r,`.`].join(``);throw Error(g)}return i},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,r){var i=n.single_source_shortest_paths(e,t,r);return n.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(e){var t=n.PriorityQueue,r={},i;for(i in e||={},t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r.queue=[],r.sorter=e.sorter||t.default_sorter,r},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){var n={value:e,cost:t};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t!==void 0&&(t.exports=n)})),Z=k((e=>{var t=U(),n=K(),r=q(),i=J(),a=Y(),o=H(),s=M(),c=X();function l(e){return unescape(encodeURIComponent(e)).length}function u(e,t,n){let r=[],i;for(;(i=e.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:t,length:i[0].length});return r}function d(e){let n=u(o.NUMERIC,t.NUMERIC,e),r=u(o.ALPHANUMERIC,t.ALPHANUMERIC,e),i,a;return s.isKanjiModeEnabled()?(i=u(o.BYTE,t.BYTE,e),a=u(o.KANJI,t.KANJI,e)):(i=u(o.BYTE_KANJI,t.BYTE,e),a=[]),n.concat(r,i,a).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function f(e,o){switch(o){case t.NUMERIC:return n.getBitsLength(e);case t.ALPHANUMERIC:return r.getBitsLength(e);case t.KANJI:return a.getBitsLength(e);case t.BYTE:return i.getBitsLength(e)}}function p(e){return e.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?(e[e.length-1].data+=t.data,e):(e.push(t),e)},[])}function m(e){let n=[];for(let r=0;r<e.length;r++){let i=e[r];switch(i.mode){case t.NUMERIC:n.push([i,{data:i.data,mode:t.ALPHANUMERIC,length:i.length},{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.ALPHANUMERIC:n.push([i,{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.KANJI:n.push([i,{data:i.data,mode:t.BYTE,length:l(i.data)}]);break;case t.BYTE:n.push([{data:i.data,mode:t.BYTE,length:l(i.data)}])}}return n}function h(e,n){let r={},i={start:{}},a=[`start`];for(let o=0;o<e.length;o++){let s=e[o],c=[];for(let e=0;e<s.length;e++){let l=s[e],u=``+o+e;c.push(u),r[u]={node:l,lastCount:0},i[u]={};for(let e=0;e<a.length;e++){let o=a[e];r[o]&&r[o].node.mode===l.mode?(i[o][u]=f(r[o].lastCount+l.length,l.mode)-f(r[o].lastCount,l.mode),r[o].lastCount+=l.length):(r[o]&&(r[o].lastCount=l.length),i[o][u]=f(l.length,l.mode)+4+t.getCharCountIndicator(l.mode,n))}}a=c}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:r}}function g(e,o){let c,l=t.getBestModeForData(e);if(c=t.from(o,l),c!==t.BYTE&&c.bit<l.bit)throw Error(`"`+e+`" cannot be encoded with mode `+t.toString(c)+`.
 Suggested mode is: `+t.toString(l));switch(c===t.KANJI&&!s.isKanjiModeEnabled()&&(c=t.BYTE),c){case t.NUMERIC:return new n(e);case t.ALPHANUMERIC:return new r(e);case t.KANJI:return new a(e);case t.BYTE:return new i(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return typeof t==`string`?e.push(g(t,null)):t.data&&e.push(g(t.data,t.mode)),e},[])},e.fromString=function(t,n){let r=h(m(d(t,s.isKanjiModeEnabled())),n),i=c.find_path(r.map,`start`,`end`),a=[];for(let e=1;e<i.length-1;e++)a.push(r.table[i[e]].node);return e.fromArray(p(a))},e.rawSplit=function(t){return e.fromArray(d(t,s.isKanjiModeEnabled()))}})),Q=k((e=>{var t=M(),n=N(),r=re(),i=ie(),a=P(),o=F(),s=I(),c=L(),l=B(),u=W(),d=G(),f=U(),p=Z();function m(e,t){let n=e.size,r=o.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],a=r[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1||n<=i+t))for(let r=-1;r<=7;r++)a+r<=-1||n<=a+r||(t>=0&&t<=6&&(r===0||r===6)||r>=0&&r<=6&&(t===0||t===6)||t>=2&&t<=4&&r>=2&&r<=4?e.set(i+t,a+r,!0,!0):e.set(i+t,a+r,!1,!0))}}function h(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}function g(e,t){let n=a.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)t===-2||t===2||n===-2||n===2||t===0&&n===0?e.set(r+t,i+n,!0,!0):e.set(r+t,i+n,!1,!0)}}function _(e,t){let n=e.size,r=u.getEncodedBits(t),i,a,o;for(let t=0;t<18;t++)i=Math.floor(t/3),a=t%3+n-8-3,o=(r>>t&1)==1,e.set(i,a,o,!0),e.set(a,i,o,!0)}function v(e,t,n){let r=e.size,i=d.getEncodedBits(t,n),a,o;for(a=0;a<15;a++)o=(i>>a&1)==1,a<6?e.set(a,8,o,!0):a<8?e.set(a+1,8,o,!0):e.set(r-15+a,8,o,!0),a<8?e.set(8,r-a-1,o,!0):a<9?e.set(8,15-a-1+1,o,!0):e.set(8,15-a-1,o,!0);e.set(r-8,8,1,!0)}function y(e,t){let n=e.size,r=-1,i=n-1,a=7,o=0;for(let s=n-1;s>0;s-=2)for(s===6&&s--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,s-n)){let r=!1;o<t.length&&(r=(t[o]>>>a&1)==1),e.set(i,s-n,r),a--,a===-1&&(o++,a=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function b(e,n,i){let a=new r;i.forEach(function(t){a.put(t.mode.bit,4),a.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(a)});let o=(t.getSymbolTotalCodewords(e)-c.getTotalCodewordsCount(e,n))*8;for(a.getLengthInBits()+4<=o&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(0);let s=(o-a.getLengthInBits())/8;for(let e=0;e<s;e++)a.put(e%2?17:236,8);return x(a,e,n)}function x(e,n,r){let i=t.getSymbolTotalCodewords(n),a=i-c.getTotalCodewordsCount(n,r),o=c.getBlocksCount(n,r),s=o-i%o,u=Math.floor(i/o),d=Math.floor(a/o),f=d+1,p=u-d,m=new l(p),h=0,g=Array(o),_=Array(o),v=0,y=new Uint8Array(e.buffer);for(let e=0;e<o;e++){let t=e<s?d:f;g[e]=y.slice(h,h+t),_[e]=m.encode(g[e]),h+=t,v=Math.max(v,t)}let b=new Uint8Array(i),x=0,S,C;for(S=0;S<v;S++)for(C=0;C<o;C++)S<g[C].length&&(b[x++]=g[C][S]);for(S=0;S<p;S++)for(C=0;C<o;C++)b[x++]=_[C][S];return b}function S(e,n,r,a){let o;if(Array.isArray(e))o=p.fromArray(e);else if(typeof e==`string`){let t=n;if(!t){let n=p.rawSplit(e);t=u.getBestVersionForData(n,r)}o=p.fromString(e,t||40)}else throw Error(`Invalid data`);let c=u.getBestVersionForData(o,r);if(!c)throw Error(`The amount of data is too big to be stored in a QR Code`);if(!n)n=c;else if(n<c)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+c+`.
`);let l=b(n,r,o),d=new i(t.getSymbolSize(n));return m(d,n),h(d),g(d,n),v(d,r,0),n>=7&&_(d,n),y(d,l),isNaN(a)&&(a=s.getBestMask(d,v.bind(null,d,r))),s.applyMask(a,d),v(d,r,a),{modules:d,version:n,errorCorrectionLevel:r,maskPattern:a,segments:o}}e.create=function(e,r){if(e===void 0||e===``)throw Error(`No input text`);let i=n.M,a,o;return r!==void 0&&(i=n.from(r.errorCorrectionLevel,n.M),a=u.from(r.version),o=s.from(r.maskPattern),r.toSJISFunc&&t.setToSJISFunction(r.toSJISFunc)),S(e,a,i,o)}})),$=k((e=>{function t(e){if(typeof e==`number`&&(e=e.toString()),typeof e!=`string`)throw Error(`Color should be defined as hex string`);let t=e.slice().replace(`#`,``).split(``);if(t.length<3||t.length===5||t.length>8)throw Error(`Invalid hex color: `+e);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),t.length===6&&t.push(`F`,`F`);let n=parseInt(t.join(``),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:`#`+t.slice(0,6).join(``)}}e.getOptions=function(e){e||={},e.color||(e.color={});let n=e.margin===void 0||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:t(e.color.dark||`#000000ff`),light:t(e.color.light||`#ffffffff`)},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+t.margin*2?t.width/(e+t.margin*2):t.scale},e.getImageWidth=function(t,n){let r=e.getScale(t,n);return Math.floor((t+n.margin*2)*r)},e.qrToImageData=function(t,n,r){let i=n.modules.size,a=n.modules.data,o=e.getScale(i,r),s=Math.floor((i+r.margin*2)*o),c=r.margin*o,l=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let n=0;n<s;n++){let u=(e*s+n)*4,d=r.color.light;if(e>=c&&n>=c&&e<s-c&&n<s-c){let t=Math.floor((e-c)/o),r=Math.floor((n-c)/o);d=l[+!!a[t*i+r]]}t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}})),ae=k((e=>{var t=$();function n(e,t,n){e.clearRect(0,0,t.width,t.height),t.style||={},t.height=n,t.width=n,t.style.height=n+`px`,t.style.width=n+`px`}function r(){try{return document.createElement(`canvas`)}catch{throw Error(`You need to specify a canvas element`)}}e.render=function(e,i,a){let o=a,s=i;o===void 0&&(!i||!i.getContext)&&(o=i,i=void 0),i||(s=r()),o=t.getOptions(o);let c=t.getImageWidth(e.modules.size,o),l=s.getContext(`2d`),u=l.createImageData(c,c);return t.qrToImageData(u.data,e,o),n(l,s,c),l.putImageData(u,0,0),s},e.renderToDataURL=function(t,n,r){let i=r;i===void 0&&(!n||!n.getContext)&&(i=n,n=void 0),i||={};let a=e.render(t,n,i),o=i.type||`image/png`,s=i.rendererOpts||{};return a.toDataURL(o,s.quality)}})),oe=k((e=>{var t=$();function n(e,t){let n=e.a/255,r=t+`="`+e.hex+`"`;return n<1?r+` `+t+`-opacity="`+n.toFixed(2).slice(1)+`"`:r}function r(e,t,n){let r=e+t;return n!==void 0&&(r+=` `+n),r}function i(e,t,n){let i=``,a=0,o=!1,s=0;for(let c=0;c<e.length;c++){let l=Math.floor(c%t),u=Math.floor(c/t);!l&&!o&&(o=!0),e[c]?(s++,c>0&&l>0&&e[c-1]||(i+=o?r(`M`,l+n,.5+u+n):r(`m`,a,0),a=0,o=!1),l+1<t&&e[c+1]||(i+=r(`h`,s),s=0)):a++}return i}e.render=function(e,r,a){let o=t.getOptions(r),s=e.modules.size,c=e.modules.data,l=s+o.margin*2,u=o.color.light.a?`<path `+n(o.color.light,`fill`)+` d="M0 0h`+l+`v`+l+`H0z"/>`:``,d=`<path `+n(o.color.dark,`stroke`)+` d="`+i(c,s,o.margin)+`"/>`,f=`viewBox="0 0 `+l+` `+l+`"`,p=`<svg xmlns="http://www.w3.org/2000/svg" `+(o.width?`width="`+o.width+`" height="`+o.width+`" `:``)+f+` shape-rendering="crispEdges">`+u+d+`</svg>
`;return typeof a==`function`&&a(null,p),p}})),se=ne(k((e=>{var t=j(),n=Q(),r=ae(),i=oe();function a(e,r,i,a,o){let s=[].slice.call(arguments,1),c=s.length,l=typeof s[c-1]==`function`;if(!l&&!t())throw Error(`Callback required as last argument`);if(l){if(c<2)throw Error(`Too few arguments provided`);c===2?(o=i,i=r,r=a=void 0):c===3&&(r.getContext&&o===void 0?(o=a,a=void 0):(o=a,a=i,i=r,r=void 0))}else{if(c<1)throw Error(`Too few arguments provided`);return c===1?(i=r,r=a=void 0):c===2&&!r.getContext&&(a=i,i=r,r=void 0),new Promise(function(t,o){try{t(e(n.create(i,a),r,a))}catch(e){o(e)}})}try{let t=n.create(i,a);o(null,e(t,r,a))}catch(e){o(e)}}e.create=n.create,e.toCanvas=a.bind(null,r.render),e.toDataURL=a.bind(null,r.renderToDataURL),e.toString=a.bind(null,function(e,t,n){return i.render(e,n)})}))()),ce=`/**
 * Scout Report — the Google Apps Script that connects your Google Sheet to
 * the Scout Report phone app.
 *
 * WHAT IT DOES
 *   · Phones send scouting reports here; each pest on a report becomes one row
 *     on the "Reports" tab (one visit = one Report ID across its rows).
 *   · Photos are saved to a "Scouting photos (sheet name)" folder in your
 *     My Drive, and the row gets a link to each one.
 *   · The farms, ranges, locations, crops, pests and dropdown choices live on
 *     the "Setup" tab. The app's Setup page writes them here — or edit that
 *     tab by hand; phones pick up the change the next time they open the app.
 *
 * WHAT IT CAN REACH — deliberately as little as Google allows. The
 * permissions are set in appsscript.json (the app's Setup page gives you that
 * file too):
 *   · "spreadsheets.currentonly" — THIS spreadsheet only, no other sheet.
 *   · "drive.file" — only the photos folder and photos this script creates
 *     itself. It cannot see, open or change any other file in your Drive.
 *   It never deletes anything. It adds rows to "Reports" and rewrites the
 *   "Setup" tab when the lists are saved (that needs the setup password).
 *
 * HOW TO INSTALL (once per sheet — the app's Setup page walks through it)
 *   1. In the sheet: Extensions → Apps Script. Delete what is there, paste
 *      this whole file, click Save.
 *   2. Project Settings (gear) → tick "Show appsscript.json manifest file in
 *      editor". Back in the Editor, open appsscript.json, replace everything
 *      in it with the app's appsscript.json, click Save.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Click Deploy and allow the permissions. Google warns "This app hasn't
 *      been verified" — normal for a script in your own sheet (the developer
 *      it names is you): Advanced → Go to (project) (unsafe) → Allow.
 *      Copy the "Web app URL" (it ends in /exec) into the app's Setup page.
 *   "Anyone" is what lets scouts send reports without a Google sign-in.
 *   Anyone holding the link can add reports and read the Setup lists; only
 *   someone with the setup password can change the lists. Anyone you give
 *   EDIT access to this sheet can also edit this script — keep that list short.
 *
 * SETUP PASSWORD: the first time the app saves the lists, the password typed
 * there becomes the setup password. To reset it: Project Settings (gear) →
 * Script properties → delete SETUP_KEY.
 *
 * After editing this code, publish the change with Deploy → Manage
 * deployments → edit (pencil) → Version: New version → Deploy. The URL stays
 * the same.
 */

var REPORTS = 'Reports';
var SETUP = 'Setup';
var PHOTOS_FOLDER = 'Scouting photos';

var REPORT_HEADERS = ['Received', 'Reported at', 'Report ID', 'Scout', 'Farm', 'Range', 'Location',
  'Crop / plant', 'Pest', 'Severity', 'Distribution', 'Notes', 'Latitude', 'Longitude', 'Photos'];

// Setup tab: Farm | Range | Location together, then one column per list, a
// blank column between. Range may be left blank for a farm with no ranges.
var SETUP_COLS = { farm: 1, range: 2, location: 3, crop: 5, pest: 7, severity: 9, distribution: 11, setting: 13, value: 14 };
var SETUP_WIDTH = 14;
var SETUP_HEADERS = { 1: 'Farm', 2: 'Range', 3: 'Location', 5: 'Crop / plant', 7: 'Pest', 9: 'Severity', 11: 'Distribution', 13: 'Setting', 14: 'Value' };
var SETTINGS = [
  ['title', 'Title'], ['showCrop', 'Show crop'], ['showPhotos', 'Show photos'],
  ['showGps', 'Show GPS'], ['showNotes', 'Show notes'],
];
var DEFAULT_SEVERITY = ['None', 'Low', 'Moderate', 'High'];
var DEFAULT_DISTRIBUTION = ['Single plant', 'Scattered', 'Patches', 'Throughout'];
var NONE_FOUND = '(none found)';

/* ── web app entry points ─────────────────────────────────────────────── */

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.action === 'ping') return json_({ ok: true });
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    return json_({ ok: true, sheetName: ss.getName(), config: readSetup_(ss), hasSetupKey: !!getKey_() });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    lock.waitLock(25000);   // two scouts sending at once must not interleave rows
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (body.action === 'report') return json_(saveReport_(ss, body.report));
    if (body.action === 'setup') return json_(saveSetup_(ss, body.key, body.config));
    if (body.action === 'checkKey') return json_(checkKey_(body.key));
    return json_({ ok: false, error: 'Unknown action.' });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) { /* never acquired */ }
  }
}

/* ── reports ──────────────────────────────────────────────────────────── */

function saveReport_(ss, report) {
  if (!report || !report.id) return { ok: false, error: 'A report needs an id.' };
  var sheet = ensureSheet_(ss, REPORTS, REPORT_HEADERS);
  // A phone that lost its connection mid-send tries again later; the same
  // Report ID must never be written twice.
  if (sheet.getLastRow() > 1) {
    var hit = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).createTextFinder(String(report.id)).matchEntireCell(true).findNext();
    if (hit) return { ok: true, duplicate: true, id: report.id };
  }
  var links = savePhotos_(ss, report);
  var rows = reportRows(report, new Date(), links);
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, REPORT_HEADERS.length).setValues(rows);
  return { ok: true, id: report.id, rows: rows.length, photos: links.length };
}

// Pure: one row per pest line; a visit with nothing found is still one row.
function reportRows(report, received, photoLinks) {
  var lines = (report.lines && report.lines.length) ? report.lines : [{ pest: NONE_FOUND, severity: '', distribution: '' }];
  var at = report.at ? new Date(report.at) : received;
  var photos = (photoLinks || []).join('\\n');
  return lines.map(function (l) {
    return [received, at, safe_(report.id), safe_(report.scout), safe_(report.farm), safe_(report.range), safe_(report.location),
      safe_(report.crop), safe_(l.pest), safe_(l.severity), safe_(l.distribution), safe_(report.notes),
      num_(report.lat), num_(report.lng), photos];
  });
}

// Photos go through the Drive API service ("Drive", enabled by
// appsscript.json), NOT DriveApp: DriveApp demands the whole-Drive permission,
// while the Drive API works with "drive.file" — only files this script made.
function savePhotos_(ss, report) {
  var photos = report.photos || [];
  if (!photos.length) return [];
  var folderId = photoFolderId_(ss);
  var stamp = String(report.at || '').slice(0, 10);
  return photos.map(function (ph, i) {
    var name = [stamp, report.farm, report.range, report.location, report.id + '-' + (i + 1)].filter(function (x) { return x; }).join(' ') + '.jpg';
    var blob = Utilities.newBlob(Utilities.base64Decode(String(ph.data || '')), ph.type || 'image/jpeg', name);
    var file = Drive.Files.create({ name: name, parents: [folderId] }, blob, { fields: 'id,webViewLink' });
    return file.webViewLink || ('https://drive.google.com/file/d/' + file.id + '/view');
  });
}

// The folder is made once, in My Drive, and remembered by id. With
// "drive.file" the script can't look inside other folders (not even the one
// holding this sheet), so it can't search by name — it keeps the id instead.
// A folder that was deleted or binned is simply made again.
function photoFolderId_(ss) {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('PHOTOS_FOLDER_ID');
  if (id) {
    try {
      var f = Drive.Files.get(id, { fields: 'id,trashed' });
      if (f && !f.trashed) return id;
    } catch (gone) { /* deleted, or no longer ours — make a new one */ }
  }
  var folder = Drive.Files.create({ name: PHOTOS_FOLDER + ' (' + ss.getName() + ')', mimeType: 'application/vnd.google-apps.folder' });
  props.setProperty('PHOTOS_FOLDER_ID', folder.id);
  return folder.id;
}

/* ── setup lists ──────────────────────────────────────────────────────── */

function readSetup_(ss) {
  var sheet = ss.getSheetByName(SETUP);
  if (!sheet || sheet.getLastRow() < 2) return null;
  return setupFromValues(sheet.getRange(1, 1, sheet.getLastRow(), SETUP_WIDTH).getValues());
}

function saveSetup_(ss, key, config) {
  var check = checkKey_(key);
  if (!check.ok) return check;
  if (!getKey_()) setKey_(String(key));   // the first save sets the password
  var values = setupToValues(config || {});
  var sheet = ensureSheet_(ss, SETUP, null);
  sheet.clear();
  sheet.getRange(1, 1, values.length, SETUP_WIDTH).setValues(values);
  sheet.setFrozenRows(1);
  return { ok: true, config: setupFromValues(values) };
}

function checkKey_(key) {
  key = String(key || '');
  if (key.length < 4) return { ok: false, error: 'The setup password needs at least 4 characters.' };
  var stored = getKey_();
  if (stored && stored !== key) return { ok: false, error: 'That is not the setup password for this sheet.' };
  return { ok: true, first: !stored };
}

// Pure: the Setup tab's grid → the app's config.
function setupFromValues(values) {
  var cfg = { title: '', farms: [], crops: [], pests: [], severity: [], distribution: [],
    showCrop: true, showPhotos: true, showGps: true, showNotes: true };
  var farmIx = {};
  var col = function (row, c) { return String(row[c - 1] == null ? '' : row[c - 1]).trim(); };
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var farm = col(row, SETUP_COLS.farm), range = col(row, SETUP_COLS.range), loc = col(row, SETUP_COLS.location);
    if (farm) {
      if (!(farm in farmIx)) { farmIx[farm] = cfg.farms.length; cfg.farms.push({ name: farm, locations: [], ranges: [] }); }
      var f = cfg.farms[farmIx[farm]];
      // A farm's locations either hang straight off it (no Range) or off a Range.
      var into = f.locations;
      if (range) {
        var rg = null;
        for (var k = 0; k < f.ranges.length; k++) if (f.ranges[k].name === range) rg = f.ranges[k];
        if (!rg) { rg = { name: range, locations: [] }; f.ranges.push(rg); }
        into = rg.locations;
      }
      pushUnique_(into, loc);
    }
    pushUnique_(cfg.crops, col(row, SETUP_COLS.crop));
    pushUnique_(cfg.pests, col(row, SETUP_COLS.pest));
    pushUnique_(cfg.severity, col(row, SETUP_COLS.severity));
    pushUnique_(cfg.distribution, col(row, SETUP_COLS.distribution));
    var s = col(row, SETUP_COLS.setting).toLowerCase(), v = col(row, SETUP_COLS.value);
    for (var i = 0; i < SETTINGS.length; i++) {
      if (s !== SETTINGS[i][1].toLowerCase()) continue;
      if (SETTINGS[i][0] === 'title') cfg.title = v;
      else cfg[SETTINGS[i][0]] = !/^(no|false|off|0)$/i.test(v);
    }
  }
  if (!cfg.severity.length) cfg.severity = DEFAULT_SEVERITY.slice();
  if (!cfg.distribution.length) cfg.distribution = DEFAULT_DISTRIBUTION.slice();
  return cfg;
}

// Pure: the app's config → the Setup tab's grid (14 columns, header row first).
function setupToValues(cfg) {
  var farmRows = [];
  (cfg.farms || []).forEach(function (f) {
    var ranges = f.ranges || [];
    (f.locations || []).forEach(function (l) { farmRows.push([f.name, '', l]); });
    ranges.forEach(function (rg) {
      var locs = (rg.locations && rg.locations.length) ? rg.locations : [''];
      locs.forEach(function (l) { farmRows.push([f.name, rg.name, l]); });
    });
    if (!(f.locations || []).length && !ranges.length) farmRows.push([f.name, '', '']);
  });
  var settings = SETTINGS.map(function (s) {
    var v = cfg[s[0]];
    return [s[1], s[0] === 'title' ? (v || '') : (v === false ? 'No' : 'Yes')];
  });
  var lists = {};
  lists[SETUP_COLS.crop] = cfg.crops || [];
  lists[SETUP_COLS.pest] = cfg.pests || [];
  lists[SETUP_COLS.severity] = (cfg.severity && cfg.severity.length) ? cfg.severity : DEFAULT_SEVERITY;
  lists[SETUP_COLS.distribution] = (cfg.distribution && cfg.distribution.length) ? cfg.distribution : DEFAULT_DISTRIBUTION;
  var listCols = [SETUP_COLS.crop, SETUP_COLS.pest, SETUP_COLS.severity, SETUP_COLS.distribution];
  var n = farmRows.length;
  n = Math.max(n, settings.length);
  listCols.forEach(function (cc) { n = Math.max(n, lists[cc].length); });
  var out = [];
  var head = [];
  for (var c = 1; c <= SETUP_WIDTH; c++) head.push(SETUP_HEADERS[c] || '');
  out.push(head);
  for (var r = 0; r < n; r++) {
    var row = [];
    for (var k = 0; k < SETUP_WIDTH; k++) row.push('');
    if (farmRows[r]) {
      row[SETUP_COLS.farm - 1] = safe_(farmRows[r][0]);
      row[SETUP_COLS.range - 1] = safe_(farmRows[r][1]);
      row[SETUP_COLS.location - 1] = safe_(farmRows[r][2]);
    }
    listCols.forEach(function (cc) { if (lists[cc][r] != null) row[cc - 1] = safe_(lists[cc][r]); });
    if (settings[r]) { row[SETUP_COLS.setting - 1] = settings[r][0]; row[SETUP_COLS.value - 1] = safe_(settings[r][1]); }
    out.push(row);
  }
  return out;
}

/* ── small helpers ────────────────────────────────────────────────────── */

function ensureSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

// Anything typed that starts like a formula is written as text, never run.
function safe_(v) {
  var s = v == null ? '' : String(v).slice(0, 2000);
  return /^[=+\\-@]/.test(s) ? "'" + s : s;
}
function num_(v) { var n = Number(v); return (v === '' || v == null || isNaN(n)) ? '' : n; }
function pushUnique_(list, v) { if (v && list.indexOf(v) < 0) list.push(v); }
function getKey_() { return PropertiesService.getScriptProperties().getProperty('SETUP_KEY') || ''; }
function setKey_(k) { PropertiesService.getScriptProperties().setProperty('SETUP_KEY', k); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
`,le=`{
  "timeZone": "America/New_York",
  "runtimeVersion": "V8",
  "exceptionLogging": "STACKDRIVER",
  "dependencies": {
    "enabledAdvancedServices": [
      { "userSymbol": "Drive", "serviceId": "drive", "version": "v3" }
    ]
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/drive.file"
  ],
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  }
}
`,ue={class:`stack setup`},de={key:0,class:`notice`},fe={class:`panel stack`},pe={class:`steps-list`,type:`a`},me={class:`row`},he={class:`script-box`},ge={class:`script-box`},_e={class:`warn-box`},ve={class:`steps-list`},ye={class:`panel stack`},be={class:`field`},xe=[`placeholder`,`onKeydown`],Se={class:`row`},Ce=[`disabled`],we={key:0,class:`small`},Te={key:0,class:`notice notice-alert`,style:{margin:`0`}},Ee={class:`panel stack`},De={key:0,class:`small muted`,style:{margin:`0`}},Oe={class:`field`},ke={class:`field`},Ae={class:`field-label`},je={class:`muted`},Me={class:`muted`},Ne={class:`linkish small upload`},Pe={class:`grid2`},Fe={class:`field`},Ie={class:`field-label`},Le={class:`muted`},Re=[`placeholder`],ze={class:`linkish small upload`},Be={class:`field`},Ve={class:`field-label`},He={class:`muted`},Ue=[`placeholder`],We={class:`linkish small upload`},Ge={class:`field`},Ke={class:`field-label`},qe={class:`field`},Je={class:`field-label`},Ye={class:`muted`},Xe={key:1,class:`notice notice-alert`,style:{margin:`0`}},Ze={class:`field`},Qe={class:`field-label`},$e={class:`chips`},et={class:`chip check-chip`},tt={class:`chip check-chip`},nt={class:`chip check-chip`},rt={class:`chip check-chip`},it={class:`panel stack`},at={class:`field`},ot={class:`muted`},st=[`disabled`],ct={key:0,class:`notice notice-supply`,style:{margin:`0`}},lt={key:1,class:`notice notice-alert`,style:{margin:`0`}},ut={key:1,class:`panel stack`},dt={class:`small muted`,style:{margin:`0`}},ft=[`src`],pt={class:`share-url`},mt={class:`row`},ht=[`href`],gt={__name:`setup`,setup(te){let{t:w,conn:T,sheetName:E,config:D,demo:O,connect:k,disconnect:A,saveSetup:ne,setDemo:j}=C(),M=c(``);async function N(e,t){try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement(`textarea`);t.value=e,document.body.appendChild(t),t.select(),document.execCommand(`copy`),t.remove()}M.value=t,setTimeout(()=>{M.value===t&&(M.value=``)},2500)}let re=()=>N(ce,`script`),ie=()=>N(le,`manifest`),P=c(``),F=c(``),I=c(!1);a(T,e=>{e&&!P.value&&(P.value=e.url)},{immediate:!0});async function L(){F.value=``,I.value=!0;try{await k(P.value),z()}catch(e){F.value=e.message}finally{I.value=!1}}let R=c({title:``,farms:``,crops:``,pests:``,severity:``,distribution:``,showCrop:!0,showPhotos:!0,showGps:!0,showNotes:!0});function z(){let e=D.value;e&&(R.value={title:e.title||``,farms:y(e.farms),crops:x(e.crops),pests:x(e.pests),severity:x(e.severity),distribution:x(e.distribution),showCrop:e.showCrop!==!1,showPhotos:e.showPhotos!==!1,showGps:e.showGps!==!1,showNotes:e.showNotes!==!1})}a(D,(e,t)=>{e&&!t&&z()},{immediate:!0}),R.value.severity||(R.value.severity=`None
Low
Moderate
High`,R.value.distribution=`Single plant
Scattered
Patches
Throughout`);let B=s(()=>({title:R.value.title.trim(),farms:b(R.value.farms),crops:S(R.value.crops),pests:S(R.value.pests),severity:S(R.value.severity),distribution:S(R.value.distribution),showCrop:R.value.showCrop,showPhotos:R.value.showPhotos,showGps:R.value.showGps,showNotes:R.value.showNotes})),V=s(()=>({farms:B.value.farms.length,ranges:B.value.farms.reduce((e,t)=>e+t.ranges.length,0),locations:B.value.farms.reduce((e,t)=>e+t.locations.length+t.ranges.reduce((e,t)=>e+t.locations.length,0),0),crops:B.value.crops.length,pests:B.value.pests.length})),H=c(``);async function U(e,t){H.value=``;let n=e.target.files?.[0];if(e.target.value=``,n)try{let e=await _(()=>import(`./BKER4Xe2.js`),[],import.meta.url),r=e.read(await n.arrayBuffer(),{type:`array`}),i=e.utils.sheet_to_json(r.Sheets[r.SheetNames[0]],{header:1,blankrows:!1,defval:``}),a=t===`farms`?v(i):ee(i);R.value[t]=[R.value[t].trim(),a].filter(Boolean).join(`
`)}catch{H.value=`Could not read that file — use an Excel (.xlsx) or CSV file.`}}let W=c(``),G=c(``),K=c(!1),q=c(!1);async function J(){G.value=``,K.value=!1,q.value=!0;try{await ne(W.value,B.value),K.value=!0,z()}catch(e){G.value=e.message}finally{q.value=!1}}let Y=o().app.baseURL||`/`,X=s(()=>T.value?location.origin+Y+`?`+g(T.value):``),Z=c(``);a(X,async e=>{Z.value=e?await se.toDataURL(e,{margin:2,width:480,errorCorrectionLevel:`M`}):``},{immediate:!0});let Q=c(!1);async function $(){try{await navigator.clipboard.writeText(X.value),Q.value=!0,setTimeout(()=>{Q.value=!1},2500)}catch{}}let ae=!!navigator.share,oe=()=>navigator.share({title:w(`app`),text:E.value,url:X.value}).catch(()=>{});return(a,o)=>(i(),u(`div`,ue,[d(`h1`,null,t(l(w)(`setupTitle`)),1),l(O)?(i(),u(`p`,de,[r(t(l(w)(`demoSetup`))+` `,1),d(`button`,{class:`linkish`,onClick:o[0]||=e=>l(j)(!1)},t(l(w)(`demoOff`)),1)])):n(``,!0),d(`section`,fe,[d(`h2`,null,t(l(w)(`s1`)),1),d(`ol`,pe,[d(`li`,null,t(l(w)(`s1a`)),1),d(`li`,null,t(l(w)(`s1b`)),1),d(`li`,null,t(l(w)(`s1c`)),1),d(`li`,null,t(l(w)(`s1d`)),1),d(`li`,null,t(l(w)(`s1e`)),1),d(`li`,null,t(l(w)(`s1f`)),1)]),d(`div`,me,[d(`button`,{class:`btn btn-primary`,"data-copy":`script`,onClick:re},t(M.value===`script`?l(w)(`copied`):`1 · `+l(w)(`copyScript`)),1),d(`button`,{class:`btn btn-primary`,"data-copy":`manifest`,onClick:ie},t(M.value===`manifest`?l(w)(`copied`):`2 · `+l(w)(`copyManifest`)),1),o[17]||=d(`a`,{class:`btn`,href:`https://sheets.new`,target:`_blank`,rel:`noopener`},`sheets.new ↗`,-1)]),d(`details`,he,[d(`summary`,null,t(l(w)(`showScript`)),1),d(`pre`,null,t(l(ce)),1)]),d(`details`,ge,[d(`summary`,null,t(l(w)(`showManifest`)),1),d(`pre`,null,t(l(le)),1)]),d(`div`,_e,[d(`h3`,null,t(l(w)(`warnTitle`)),1),d(`ul`,ve,[d(`li`,null,t(l(w)(`warn1`)),1),d(`li`,null,t(l(w)(`warn2`)),1),d(`li`,null,t(l(w)(`warn3`)),1),d(`li`,null,t(l(w)(`warn4`)),1)])])]),d(`section`,ye,[d(`h2`,null,t(l(w)(`s2`)),1),d(`label`,be,[d(`span`,null,t(l(w)(`webAppUrl`)),1),e(d(`input`,{"onUpdate:modelValue":o[1]||=e=>P.value=e,type:`url`,placeholder:l(w)(`urlPh`),autocomplete:`off`,onKeydown:m(h(L,[`prevent`]),[`enter`])},null,40,xe),[[f,P.value]])]),d(`div`,Se,[d(`button`,{class:`btn btn-primary`,disabled:I.value||!P.value.trim(),onClick:L},t(I.value?`…`:l(w)(`connect`)),9,Ce),l(T)&&l(E)?(i(),u(`span`,we,[r(`✓ `+t(l(w)(`connectedOk`))+` `,1),d(`b`,null,t(l(E)),1)])):n(``,!0)]),F.value?(i(),u(`p`,Te,t(F.value),1)):n(``,!0),l(T)?(i(),u(`button`,{key:1,class:`linkish small`,style:{"align-self":`flex-start`},onClick:o[2]||=e=>{l(A)(),P.value=``}},t(l(w)(`disconnect`)),1)):n(``,!0)]),d(`section`,Ee,[d(`h2`,null,t(l(w)(`s3`)),1),l(T)&&l(D)?(i(),u(`p`,De,t(l(w)(`listsFromSheet`)),1)):n(``,!0),d(`label`,Oe,[d(`span`,null,t(l(w)(`title`)),1),e(d(`input`,{"onUpdate:modelValue":o[3]||=e=>R.value.title=e,type:`text`,placeholder:`Sample Nursery scouting`},null,512),[[f,R.value.title]])]),d(`div`,ke,[d(`span`,Ae,[r(t(l(w)(`farm`))+` + `+t(l(w)(`range`))+` + `+t(l(w)(`location`))+` `,1),d(`small`,je,`· `+t(V.value.farms)+` / `+t(V.value.ranges)+` / `+t(V.value.locations),1)]),d(`small`,Me,t(l(w)(`farmsHelp`)),1),e(d(`textarea`,{"onUpdate:modelValue":o[4]||=e=>R.value.farms=e,rows:`7`,placeholder:`Home farm | House 1
Home farm | House 2
North field | Range 1 | Block A
North field | Range 1 | Block B
North field | Range 2 | Block C`},null,512),[[f,R.value.farms]]),d(`label`,Ne,[r(t(l(w)(`upload`)),1),d(`input`,{type:`file`,accept:`.xlsx,.xls,.csv,.txt`,hidden:``,onChange:o[5]||=e=>U(e,`farms`)},null,32)])]),d(`div`,Pe,[d(`div`,Fe,[d(`span`,Ie,[r(t(l(w)(`pest`))+` `,1),d(`small`,Le,`· `+t(V.value.pests),1)]),e(d(`textarea`,{"onUpdate:modelValue":o[6]||=e=>R.value.pests=e,rows:`7`,placeholder:l(w)(`oneLine`)},null,8,Re),[[f,R.value.pests]]),d(`label`,ze,[r(t(l(w)(`upload`)),1),d(`input`,{type:`file`,accept:`.xlsx,.xls,.csv,.txt`,hidden:``,onChange:o[7]||=e=>U(e,`pests`)},null,32)])]),d(`div`,Be,[d(`span`,Ve,[r(t(l(w)(`crop`))+` `,1),d(`small`,He,`· `+t(V.value.crops),1)]),e(d(`textarea`,{"onUpdate:modelValue":o[8]||=e=>R.value.crops=e,rows:`7`,placeholder:l(w)(`oneLine`)},null,8,Ue),[[f,R.value.crops]]),d(`label`,We,[r(t(l(w)(`upload`)),1),d(`input`,{type:`file`,accept:`.xlsx,.xls,.csv,.txt`,hidden:``,onChange:o[9]||=e=>U(e,`crops`)},null,32)])]),d(`div`,Ge,[d(`span`,Ke,t(l(w)(`severity`)),1),e(d(`textarea`,{"onUpdate:modelValue":o[10]||=e=>R.value.severity=e,rows:`4`},null,512),[[f,R.value.severity]])]),d(`div`,qe,[d(`span`,Je,t(l(w)(`distribution`)),1),e(d(`textarea`,{"onUpdate:modelValue":o[11]||=e=>R.value.distribution=e,rows:`4`},null,512),[[f,R.value.distribution]])])]),d(`small`,Ye,t(l(w)(`uploadHelp`)),1),H.value?(i(),u(`p`,Xe,t(H.value),1)):n(``,!0),d(`div`,Ze,[d(`span`,Qe,t(l(w)(`showFields`)),1),d(`div`,$e,[d(`label`,et,[e(d(`input`,{"onUpdate:modelValue":o[12]||=e=>R.value.showCrop=e,type:`checkbox`},null,512),[[p,R.value.showCrop]]),r(` `+t(l(w)(`showCrop`)),1)]),d(`label`,tt,[e(d(`input`,{"onUpdate:modelValue":o[13]||=e=>R.value.showPhotos=e,type:`checkbox`},null,512),[[p,R.value.showPhotos]]),r(` `+t(l(w)(`showPhotos`)),1)]),d(`label`,nt,[e(d(`input`,{"onUpdate:modelValue":o[14]||=e=>R.value.showGps=e,type:`checkbox`},null,512),[[p,R.value.showGps]]),r(` `+t(l(w)(`showGps`)),1)]),d(`label`,rt,[e(d(`input`,{"onUpdate:modelValue":o[15]||=e=>R.value.showNotes=e,type:`checkbox`},null,512),[[p,R.value.showNotes]]),r(` `+t(l(w)(`showNotes`)),1)])])])]),d(`section`,it,[d(`h2`,null,t(l(w)(`s4`)),1),d(`label`,at,[d(`span`,null,t(l(w)(`password`)),1),e(d(`input`,{"onUpdate:modelValue":o[16]||=e=>W.value=e,type:`password`,autocomplete:`new-password`},null,512),[[f,W.value]]),d(`small`,ot,t(l(w)(`passwordHelp`)),1)]),d(`button`,{class:`btn btn-primary`,disabled:!l(T)||q.value||W.value.length<4,style:{"align-self":`flex-start`},onClick:J},t(q.value?`…`:l(w)(`save`)),9,st),K.value?(i(),u(`p`,ct,t(l(w)(`saved`)),1)):n(``,!0),G.value?(i(),u(`p`,lt,t(G.value),1)):n(``,!0)]),l(T)?(i(),u(`section`,ut,[d(`h2`,null,t(l(w)(`s5`)),1),d(`p`,dt,t(l(w)(`shareHelp`)),1),Z.value?(i(),u(`img`,{key:0,src:Z.value,alt:`QR code`,class:`qr`},null,8,ft)):n(``,!0),d(`code`,pt,t(X.value),1),d(`div`,mt,[d(`button`,{class:`btn btn-primary`,onClick:$},t(Q.value?l(w)(`copied`):l(w)(`copyLink`)),1),l(ae)?(i(),u(`button`,{key:0,class:`btn`,onClick:oe},t(l(w)(`shareBtn`)),1)):n(``,!0),Z.value?(i(),u(`a`,{key:1,class:`btn`,href:Z.value,download:`scout-report-qr.png`},`⬇ QR`,8,ht)):n(``,!0)])])):n(``,!0)]))}};export{gt as default};