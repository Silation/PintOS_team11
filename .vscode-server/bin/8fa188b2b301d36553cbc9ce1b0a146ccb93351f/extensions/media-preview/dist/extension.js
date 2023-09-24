(()=>{"use strict";var e={800:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=t.loadMessageBundle=t.localize=t.format=t.setPseudo=t.isPseudo=t.isDefined=t.BundleFormat=t.MessageFormat=void 0;var s,r,n,o=i(926);function a(e){return void 0!==e}function c(e,i){return t.isPseudo&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===i.length?e:e.replace(/\{(\d+)\}/g,(function(e,t){var s=t[0],r=i[s],n=e;return"string"==typeof r?n=r:"number"!=typeof r&&"boolean"!=typeof r&&null!=r||(n=String(r)),n}))}(n=t.MessageFormat||(t.MessageFormat={})).file="file",n.bundle="bundle",n.both="both",(r=t.BundleFormat||(t.BundleFormat={})).standalone="standalone",r.languagePack="languagePack",function(e){e.is=function(e){var t=e;return t&&a(t.key)&&a(t.comment)}}(s||(s={})),t.isDefined=a,t.isPseudo=!1,t.setPseudo=function(e){t.isPseudo=e},t.format=c,t.localize=function(e,t){for(var i=[],s=2;s<arguments.length;s++)i[s-2]=arguments[s];return c(t,i)},t.loadMessageBundle=function(e){return(0,o.default)().loadMessageBundle(e)},t.config=function(e){return(0,o.default)().config(e)}},926:(e,t)=>{var i;function s(){if(void 0===i)throw new Error("No runtime abstraction layer installed");return i}Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.install=function(e){if(void 0===e)throw new Error("No runtime abstraction layer provided");i=e}}(s||(s={})),t.default=s},472:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=t.loadMessageBundle=t.BundleFormat=t.MessageFormat=void 0;var s=i(622),r=i(747),n=i(926),o=i(800),a=i(800);Object.defineProperty(t,"MessageFormat",{enumerable:!0,get:function(){return a.MessageFormat}}),Object.defineProperty(t,"BundleFormat",{enumerable:!0,get:function(){return a.BundleFormat}});var c,u,l=Object.prototype.toString;function d(e){return"[object Number]"===l.call(e)}function h(e){return"[object String]"===l.call(e)}function v(e){return JSON.parse(r.readFileSync(e,"utf8"))}function g(e){return function(t,i){for(var s=[],r=2;r<arguments.length;r++)s[r-2]=arguments[r];return d(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: ".concat(new Error("").stack)):(0,o.format)(e[t],s):h(i)?(console.warn("Message ".concat(i," didn't get externalized correctly.")),(0,o.format)(i,s)):void console.error("Broken localize call found. Stacktrace is\n: ".concat(new Error("").stack))}}function p(e,t){return c[e]=t,t}function w(e){try{return function(e){var t=v(s.join(e,"nls.metadata.json")),i=Object.create(null);for(var r in t){var n=t[r];i[r]=n.messages}return i}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function m(e,t){var i;if(!0===u.languagePackSupport&&void 0!==u.cacheRoot&&void 0!==u.languagePackId&&void 0!==u.translationsConfigFile&&void 0!==u.translationsConfig)try{i=function(e,t){var i,n,o,a=s.join(u.cacheRoot,"".concat(e.id,"-").concat(e.hash,".json")),c=!1,l=!1;try{return i=JSON.parse(r.readFileSync(a,{encoding:"utf8",flag:"r"})),n=a,o=new Date,r.utimes(n,o,o,(function(){})),i}catch(e){if("ENOENT"===e.code)l=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: ".concat(e.message,".")),r.unlink(a,(function(e){e&&console.error("Deleting corrupted bundle ".concat(a," failed."))})),c=!0}}if(!(i=function(e,t){var i=u.translationsConfig[e.id];if(i){var r=v(i).contents,n=v(s.join(t,"nls.metadata.json")),o=Object.create(null);for(var a in n){var c=n[a],l=r["".concat(e.outDir,"/").concat(a)];if(l){for(var d=[],g=0;g<c.keys.length;g++){var p=c.keys[g],w=l[h(p)?p:p.key];void 0===w&&(w=c.messages[g]),d.push(w)}o[a]=d}else o[a]=c.messages}return o}}(e,t))||c)return i;if(l)try{r.writeFileSync(a,JSON.stringify(i),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return i;throw e}return i}(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!i){if(u.languagePackSupport)return w(t);var n=function(e){for(var t=u.language;t;){var i=s.join(e,"nls.bundle.".concat(t,".json"));if(r.existsSync(i))return i;var n=t.lastIndexOf("-");t=n>0?t.substring(0,n):void 0}if(void 0===t&&(i=s.join(e,"nls.bundle.json"),r.existsSync(i)))return i}(t);if(n)try{return v(n)}catch(e){console.log("Loading in the box message bundle failed.",e)}i=w(t)}return i}function f(e){if(!e)return o.localize;var t=s.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),u.messageFormat===o.MessageFormat.both||u.messageFormat===o.MessageFormat.bundle){var i=function(e){for(var t,i=s.dirname(e);t=s.join(i,"nls.metadata.header.json"),!r.existsSync(t);){var n=s.dirname(i);if(n===i){t=void 0;break}i=n}return t}(e);if(i){var n=s.dirname(i),a=c[n];if(void 0===a)try{var l=JSON.parse(r.readFileSync(i,"utf8"));try{var d=m(l,n);a=p(n,d?{header:l,nlsBundle:d}:null)}catch(e){console.error("Failed to load nls bundle",e),a=p(n,null)}}catch(e){console.error("Failed to read header file",e),a=p(n,null)}if(a){var h=e.substr(n.length+1).replace(/\\/g,"/"),w=a.nlsBundle[h];return void 0===w?(console.error("Messages for file ".concat(e," not found. See console for details.")),function(){return"Messages not found."}):g(w)}}}if(u.messageFormat===o.MessageFormat.both||u.messageFormat===o.MessageFormat.file)try{var f=v(function(e){var t;if(u.cacheLanguageResolution&&t)t=t;else{if(o.isPseudo||!u.language)t=".nls.json";else for(var i=u.language;i;){var s=".nls."+i+".json";if(r.existsSync(e+s)){t=s;break}var n=i.lastIndexOf("-");n>0?i=i.substring(0,n):(t=".nls.json",i=null)}u.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(f)?g(f):(0,o.isDefined)(f.messages)&&(0,o.isDefined)(f.keys)?g(f.messages):(console.error("String bundle '".concat(e,"' uses an unsupported format.")),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file ".concat(e)),function(){return"Failed to load message bundle. See console for details."}}function y(e){return e&&(h(e.locale)&&(u.locale=e.locale.toLowerCase(),u.language=u.locale,c=Object.create(null)),void 0!==e.messageFormat&&(u.messageFormat=e.messageFormat),e.bundleFormat===o.BundleFormat.standalone&&!0===u.languagePackSupport&&(u.languagePackSupport=!1)),(0,o.setPseudo)("pseudo"===u.locale),f}!function(){if(u={locale:void 0,language:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:o.MessageFormat.bundle},h(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG),t=void 0;if(e.availableLanguages){var i=e.availableLanguages["*"];h(i)&&(t=i)}if(h(e.locale)&&(u.locale=e.locale.toLowerCase()),void 0===t?u.language=u.locale:"en"!==t&&(u.language=t),function(e){return!0===e||!1===e}(e._languagePackSupport)&&(u.languagePackSupport=e._languagePackSupport),h(e._cacheRoot)&&(u.cacheRoot=e._cacheRoot),h(e._languagePackId)&&(u.languagePackId=e._languagePackId),h(e._translationsConfigFile)){u.translationsConfigFile=e._translationsConfigFile;try{u.translationsConfig=v(u.translationsConfigFile)}catch(t){if(e._corruptedFile){var n=s.dirname(e._corruptedFile);r.exists(n,(function(t){t&&r.writeFile(e._corruptedFile,"corrupted","utf8",(function(e){console.error(e)}))}))}}}}catch(e){}(0,o.setPseudo)("pseudo"===u.locale),c=Object.create(null)}(),t.loadMessageBundle=f,t.config=y,n.default.install(Object.freeze({loadMessageBundle:f,config:y}))},410:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.registerAudioPreviewSupport=void 0;const s=i(549),r=i(472),n=i(857),o=i(297),a=r.loadMessageBundle(i(622).join(__dirname,"audioPreview.ts"));class c{constructor(e,t){this.extensionRoot=e,this.binarySizeStatusBarEntry=t}async openCustomDocument(e){return{uri:e,dispose:()=>{}}}async resolveCustomEditor(e,t){new u(this.extensionRoot,e.uri,t,this.binarySizeStatusBarEntry)}}c.viewType="vscode.audioPreview";class u extends n.MediaPreview{constructor(e,t,i,s){super(e,t,i,s),this.extensionRoot=e,this._register(i.webview.onDidReceiveMessage((e=>{switch(e.type){case"reopen-as-text":(0,n.reopenAsText)(t,i.viewColumn)}}))),this.updateBinarySize(),this.render(),this.updateState()}async getWebviewContents(){const e=Date.now().toString(),t={src:await this.getResourcePath(this.webviewEditor,this.resource,e)},i=(0,o.getNonce)(),s=this.webviewEditor.webview.cspSource;return`<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\x3c!-- Disable pinch zooming --\x3e\n\t<meta name="viewport"\n\t\tcontent="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">\n\t<title>Audio Preview</title>\n\t<link rel="stylesheet" href="${(0,o.escapeAttribute)(this.extensionResource("media","audioPreview.css"))}" type="text/css" media="screen" nonce="${i}">\n\t<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: ${s}; media-src ${s}; script-src 'nonce-${i}'; style-src ${s} 'nonce-${i}';">\n\t<meta id="settings" data-settings="${(0,o.escapeAttribute)(JSON.stringify(t))}">\n</head>\n<body class="container loading">\n\t<div class="loading-indicator"></div>\n\t<div class="loading-error">\n\t\t<p>${a(0,null)}</p>\n\t\t<a href="#" class="open-file-link">${a(1,null)}</a>\n\t</div>\n\t<script src="${(0,o.escapeAttribute)(this.extensionResource("media","audioPreview.js"))}" nonce="${i}"><\/script>\n</body>\n</html>`}async getResourcePath(e,t,i){return"git"===t.scheme&&0===(await s.workspace.fs.stat(t)).size?null:t.query?e.webview.asWebviewUri(t).toString():e.webview.asWebviewUri(t).with({query:`version=${i}`}).toString()}extensionResource(...e){return this.webviewEditor.webview.asWebviewUri(s.Uri.joinPath(this.extensionRoot,...e))}}t.registerAudioPreviewSupport=function(e,t){const i=new c(e.extensionUri,t);return s.window.registerCustomEditorProvider(c.viewType,i,{supportsMultipleEditorsPerDocument:!0,webviewOptions:{retainContextWhenHidden:!0}})}},971:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BinarySizeStatusBarEntry=void 0;const s=i(549),r=i(472),n=i(979),o=r.loadMessageBundle(i(622).join(__dirname,"binarySizeStatusBarEntry.ts"));class a{static formatSize(e){return e<a.KB?o(0,null,e):e<a.MB?o(1,null,(e/a.KB).toFixed(2)):e<a.GB?o(2,null,(e/a.MB).toFixed(2)):e<a.TB?o(3,null,(e/a.GB).toFixed(2)):o(4,null,(e/a.TB).toFixed(2))}}a.KB=1024,a.MB=a.KB*a.KB,a.GB=a.MB*a.KB,a.TB=a.GB*a.KB;class c extends n.PreviewStatusBarEntry{constructor(){super("status.imagePreview.binarySize",o(5,null),s.StatusBarAlignment.Right,100)}show(e,t){"number"==typeof t?super.showItem(e,a.formatSize(t)):this.hide(e)}}t.BinarySizeStatusBarEntry=c},418:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.registerImagePreviewSupport=t.PreviewManager=void 0;const s=i(549),r=i(472),n=i(857),o=i(297),a=i(533),c=i(287),u=r.loadMessageBundle(i(622).join(__dirname,"imagePreview/index.ts"));class l{constructor(e,t,i,s){this.extensionRoot=e,this.sizeStatusBarEntry=t,this.binarySizeStatusBarEntry=i,this.zoomStatusBarEntry=s,this._previews=new Set}async openCustomDocument(e){return{uri:e,dispose:()=>{}}}async resolveCustomEditor(e,t){const i=new d(this.extensionRoot,e.uri,t,this.sizeStatusBarEntry,this.binarySizeStatusBarEntry,this.zoomStatusBarEntry);this._previews.add(i),this.setActivePreview(i),t.onDidDispose((()=>{this._previews.delete(i)})),t.onDidChangeViewState((()=>{t.active?this.setActivePreview(i):this._activePreview!==i||t.active||this.setActivePreview(void 0)}))}get activePreview(){return this._activePreview}setActivePreview(e){this._activePreview=e}}t.PreviewManager=l,l.viewType="imagePreview.previewEditor";class d extends n.MediaPreview{constructor(e,t,i,s,r,o){super(e,t,i,r),this.extensionRoot=e,this.sizeStatusBarEntry=s,this.zoomStatusBarEntry=o,this.emptyPngDataUri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==",this._register(i.webview.onDidReceiveMessage((e=>{switch(e.type){case"size":this._imageSize=e.value,this.updateState();break;case"zoom":this._imageZoom=e.value,this.updateState();break;case"reopen-as-text":(0,n.reopenAsText)(t,i.viewColumn)}}))),this._register(o.onDidChangeScale((e=>{2===this.previewState&&this.webviewEditor.webview.postMessage({type:"setScale",scale:e.scale})}))),this._register(i.onDidChangeViewState((()=>{this.webviewEditor.webview.postMessage({type:"setActive",value:this.webviewEditor.active})}))),this._register(i.onDidDispose((()=>{2===this.previewState&&(this.sizeStatusBarEntry.hide(this),this.zoomStatusBarEntry.hide(this)),this.previewState=0}))),this.updateBinarySize(),this.render(),this.updateState(),this.webviewEditor.webview.postMessage({type:"setActive",value:this.webviewEditor.active})}dispose(){super.dispose(),this.sizeStatusBarEntry.hide(this),this.zoomStatusBarEntry.hide(this)}zoomIn(){2===this.previewState&&this.webviewEditor.webview.postMessage({type:"zoomIn"})}zoomOut(){2===this.previewState&&this.webviewEditor.webview.postMessage({type:"zoomOut"})}updateState(){super.updateState(),0!==this.previewState&&(this.webviewEditor.active?(this.sizeStatusBarEntry.show(this,this._imageSize||""),this.zoomStatusBarEntry.show(this,this._imageZoom||"fit")):(this.sizeStatusBarEntry.hide(this),this.zoomStatusBarEntry.hide(this)))}async getWebviewContents(){const e=Date.now().toString(),t={src:await this.getResourcePath(this.webviewEditor,this.resource,e)},i=(0,o.getNonce)(),s=this.webviewEditor.webview.cspSource;return`<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\x3c!-- Disable pinch zooming --\x3e\n\t<meta name="viewport"\n\t\tcontent="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">\n\t<title>Image Preview</title>\n\t<link rel="stylesheet" href="${(0,o.escapeAttribute)(this.extensionResource("media","imagePreview.css"))}" type="text/css" media="screen" nonce="${i}">\n\t<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: ${s}; script-src 'nonce-${i}'; style-src ${s} 'nonce-${i}';">\n\t<meta id="image-preview-settings" data-settings="${(0,o.escapeAttribute)(JSON.stringify(t))}">\n</head>\n<body class="container image scale-to-fit loading">\n\t<div class="loading-indicator"></div>\n\t<div class="image-load-error">\n\t\t<p>${u(0,null)}</p>\n\t\t<a href="#" class="open-file-link">${u(1,null)}</a>\n\t</div>\n\t<script src="${(0,o.escapeAttribute)(this.extensionResource("media","imagePreview.js"))}" nonce="${i}"><\/script>\n</body>\n</html>`}async getResourcePath(e,t,i){return"git"===t.scheme&&0===(await s.workspace.fs.stat(t)).size?this.emptyPngDataUri:t.query?e.webview.asWebviewUri(t).toString():e.webview.asWebviewUri(t).with({query:`version=${i}`}).toString()}extensionResource(...e){return this.webviewEditor.webview.asWebviewUri(s.Uri.joinPath(this.extensionRoot,...e))}}t.registerImagePreviewSupport=function(e,t){const i=[],r=new a.SizeStatusBarEntry;i.push(r);const n=new c.ZoomStatusBarEntry;i.push(n);const o=new l(e.extensionUri,r,t,n);return i.push(s.window.registerCustomEditorProvider(l.viewType,o,{supportsMultipleEditorsPerDocument:!0})),i.push(s.commands.registerCommand("imagePreview.zoomIn",(()=>{o.activePreview?.zoomIn()}))),i.push(s.commands.registerCommand("imagePreview.zoomOut",(()=>{o.activePreview?.zoomOut()}))),s.Disposable.from(...i)}},533:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SizeStatusBarEntry=void 0;const s=i(549),r=i(472),n=i(979),o=r.loadMessageBundle(i(622).join(__dirname,"imagePreview/sizeStatusBarEntry.ts"));class a extends n.PreviewStatusBarEntry{constructor(){super("status.imagePreview.size",o(0,null),s.StatusBarAlignment.Right,101)}show(e,t){this.showItem(e,t)}}t.SizeStatusBarEntry=a},287:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ZoomStatusBarEntry=void 0;const s=i(549),r=i(472),n=i(979),o=r.loadMessageBundle(i(622).join(__dirname,"imagePreview/zoomStatusBarEntry.ts")),a="_imagePreview.selectZoomLevel";class c extends n.PreviewStatusBarEntry{constructor(){super("status.imagePreview.zoom",o(0,null),s.StatusBarAlignment.Right,102),this._onDidChangeScale=this._register(new s.EventEmitter),this.onDidChangeScale=this._onDidChangeScale.event,this._register(s.commands.registerCommand(a,(async()=>{const e=[10,5,2,1,.5,.2,"fit"].map((e=>({label:this.zoomLabel(e),scale:e}))),t=await s.window.showQuickPick(e,{placeHolder:o(1,null)});t&&this._onDidChangeScale.fire({scale:t.scale})}))),this.entry.command=a}show(e,t){this.showItem(e,this.zoomLabel(t))}zoomLabel(e){return"fit"===e?o(2,null):`${Math.round(100*e)}%`}}t.ZoomStatusBarEntry=c},857:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MediaPreview=t.reopenAsText=void 0;const s=i(549),r=i(836);t.reopenAsText=function(e,t){s.commands.executeCommand("vscode.openWith",e,"default",t)};class n extends r.Disposable{constructor(e,t,i,r){super(),this.resource=t,this.webviewEditor=i,this.binarySizeStatusBarEntry=r,this.previewState=1;const n=t.with({path:t.path.replace(/\/[^\/]+?\.\w+$/,"/")});i.webview.options={enableScripts:!0,enableForms:!1,localResourceRoots:[n,e]},this._register(i.onDidChangeViewState((()=>{this.updateState()}))),this._register(i.onDidDispose((()=>{this.previewState=0,this.dispose()})));const o=this._register(s.workspace.createFileSystemWatcher(new s.RelativePattern(t,"*")));this._register(o.onDidChange((e=>{e.toString()===this.resource.toString()&&(this.updateBinarySize(),this.render())}))),this._register(o.onDidDelete((e=>{e.toString()===this.resource.toString()&&this.webviewEditor.dispose()})))}dispose(){super.dispose(),this.binarySizeStatusBarEntry.hide(this)}updateBinarySize(){s.workspace.fs.stat(this.resource).then((({size:e})=>{this._binarySize=e,this.updateState()}))}async render(){if(0===this.previewState)return;const e=await this.getWebviewContents();0!==this.previewState&&(this.webviewEditor.webview.html=e)}updateState(){0!==this.previewState&&(this.webviewEditor.active?(this.previewState=2,this.binarySizeStatusBarEntry.show(this,this._binarySize)):(this.binarySizeStatusBarEntry.hide(this),this.previewState=1))}}t.MediaPreview=n},979:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PreviewStatusBarEntry=void 0;const s=i(549),r=i(836);class n extends r.Disposable{constructor(e,t,i,r){super(),this.entry=this._register(s.window.createStatusBarItem(e,i,r)),this.entry.name=t}showItem(e,t){this._showOwner=e,this.entry.text=t,this.entry.show()}hide(e){e===this._showOwner&&(this.entry.hide(),this._showOwner=void 0)}}t.PreviewStatusBarEntry=n},836:(e,t)=>{function i(e){for(;e.length;){const t=e.pop();t&&t.dispose()}}Object.defineProperty(t,"__esModule",{value:!0}),t.Disposable=t.disposeAll=void 0,t.disposeAll=i,t.Disposable=class{constructor(){this._isDisposed=!1,this._disposables=[]}dispose(){this._isDisposed||(this._isDisposed=!0,i(this._disposables))}_register(e){return this._isDisposed?e.dispose():this._disposables.push(e),e}get isDisposed(){return this._isDisposed}}},297:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getNonce=t.escapeAttribute=void 0,t.escapeAttribute=function(e){return e.toString().replace(/"/g,"&quot;")},t.getNonce=function(){let e="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<64;i++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}},257:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.registerVideoPreviewSupport=void 0;const s=i(549),r=i(472),n=i(857),o=i(297),a=r.loadMessageBundle(i(622).join(__dirname,"videoPreview.ts"));class c{constructor(e,t){this.extensionRoot=e,this.binarySizeStatusBarEntry=t}async openCustomDocument(e){return{uri:e,dispose:()=>{}}}async resolveCustomEditor(e,t){new u(this.extensionRoot,e.uri,t,this.binarySizeStatusBarEntry)}}c.viewType="vscode.videoPreview";class u extends n.MediaPreview{constructor(e,t,i,s){super(e,t,i,s),this.extensionRoot=e,this._register(i.webview.onDidReceiveMessage((e=>{switch(e.type){case"reopen-as-text":(0,n.reopenAsText)(t,i.viewColumn)}}))),this.updateBinarySize(),this.render(),this.updateState()}async getWebviewContents(){const e=Date.now().toString(),t={src:await this.getResourcePath(this.webviewEditor,this.resource,e)},i=(0,o.getNonce)(),s=this.webviewEditor.webview.cspSource;return`<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\x3c!-- Disable pinch zooming --\x3e\n\t<meta name="viewport"\n\t\tcontent="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">\n\t<title>Video Preview</title>\n\t<link rel="stylesheet" href="${(0,o.escapeAttribute)(this.extensionResource("media","videoPreview.css"))}" type="text/css" media="screen" nonce="${i}">\n\t<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: ${s}; media-src ${s}; script-src 'nonce-${i}'; style-src ${s} 'nonce-${i}';">\n\t<meta id="settings" data-settings="${(0,o.escapeAttribute)(JSON.stringify(t))}">\n</head>\n<body class="loading">\n\t<div class="loading-indicator"></div>\n\t<div class="loading-error">\n\t\t<p>${a(0,null)}</p>\n\t\t<a href="#" class="open-file-link">${a(1,null)}</a>\n\t</div>\n\t<script src="${(0,o.escapeAttribute)(this.extensionResource("media","videoPreview.js"))}" nonce="${i}"><\/script>\n</body>\n</html>`}async getResourcePath(e,t,i){return"git"===t.scheme&&0===(await s.workspace.fs.stat(t)).size?null:t.query?e.webview.asWebviewUri(t).toString():e.webview.asWebviewUri(t).with({query:`version=${i}`}).toString()}extensionResource(...e){return this.webviewEditor.webview.asWebviewUri(s.Uri.joinPath(this.extensionRoot,...e))}}t.registerVideoPreviewSupport=function(e,t){const i=new c(e.extensionUri,t);return s.window.registerCustomEditorProvider(c.viewType,i,{supportsMultipleEditorsPerDocument:!0,webviewOptions:{retainContextWhenHidden:!0}})}},747:e=>{e.exports=require("fs")},622:e=>{e.exports=require("path")},549:e=>{e.exports=require("vscode")}},t={};function i(s){var r=t[s];if(void 0!==r)return r.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,i),n.exports}var s={};(()=>{var e=s;Object.defineProperty(e,"__esModule",{value:!0}),e.activate=void 0;const t=i(410),r=i(971),n=i(418),o=i(257);e.activate=function(e){const i=new r.BinarySizeStatusBarEntry;e.subscriptions.push(i),e.subscriptions.push((0,n.registerImagePreviewSupport)(e,i)),e.subscriptions.push((0,t.registerAudioPreviewSupport)(e,i)),e.subscriptions.push((0,o.registerVideoPreviewSupport)(e,i))}})();var r=exports;for(var n in s)r[n]=s[n];s.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/8fa188b2b301d36553cbc9ce1b0a146ccb93351f/extensions/media-preview/dist/extension.js.map