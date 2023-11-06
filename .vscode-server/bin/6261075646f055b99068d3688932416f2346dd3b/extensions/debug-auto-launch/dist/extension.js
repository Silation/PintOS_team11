(()=>{"use strict";var e={800:(e,a,t)=>{Object.defineProperty(a,"__esModule",{value:!0}),a.config=a.loadMessageBundle=a.localize=a.format=a.setPseudo=a.isPseudo=a.isDefined=a.BundleFormat=a.MessageFormat=void 0;var n,o,r,s=t(926);function i(e){return void 0!==e}function l(e,t){return a.isPseudo&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===t.length?e:e.replace(/\{(\d+)\}/g,(function(e,a){var n=a[0],o=t[n],r=e;return"string"==typeof o?r=o:"number"!=typeof o&&"boolean"!=typeof o&&null!=o||(r=String(o)),r}))}(r=a.MessageFormat||(a.MessageFormat={})).file="file",r.bundle="bundle",r.both="both",(o=a.BundleFormat||(a.BundleFormat={})).standalone="standalone",o.languagePack="languagePack",function(e){e.is=function(e){var a=e;return a&&i(a.key)&&i(a.comment)}}(n||(n={})),a.isDefined=i,a.isPseudo=!1,a.setPseudo=function(e){a.isPseudo=e},a.format=l,a.localize=function(e,a){for(var t=[],n=2;n<arguments.length;n++)t[n-2]=arguments[n];return l(a,t)},a.loadMessageBundle=function(e){return(0,s.default)().loadMessageBundle(e)},a.config=function(e){return(0,s.default)().config(e)}},926:(e,a)=>{var t;function n(){if(void 0===t)throw new Error("No runtime abstraction layer installed");return t}Object.defineProperty(a,"__esModule",{value:!0}),function(e){e.install=function(e){if(void 0===e)throw new Error("No runtime abstraction layer provided");t=e}}(n||(n={})),a.default=n},472:(e,a,t)=>{Object.defineProperty(a,"__esModule",{value:!0}),a.config=a.loadMessageBundle=a.BundleFormat=a.MessageFormat=void 0;var n=t(622),o=t(747),r=t(926),s=t(800),i=t(800);Object.defineProperty(a,"MessageFormat",{enumerable:!0,get:function(){return i.MessageFormat}}),Object.defineProperty(a,"BundleFormat",{enumerable:!0,get:function(){return i.BundleFormat}});var l,c,u=Object.prototype.toString;function d(e){return"[object Number]"===u.call(e)}function f(e){return"[object String]"===u.call(e)}function g(e){return JSON.parse(o.readFileSync(e,"utf8"))}function m(e){return function(a,t){for(var n=[],o=2;o<arguments.length;o++)n[o-2]=arguments[o];return d(a)?a>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: ".concat(new Error("").stack)):(0,s.format)(e[a],n):f(t)?(console.warn("Message ".concat(t," didn't get externalized correctly.")),(0,s.format)(t,n)):void console.error("Broken localize call found. Stacktrace is\n: ".concat(new Error("").stack))}}function p(e,a){return l[e]=a,a}function v(e){try{return function(e){var a=g(n.join(e,"nls.metadata.json")),t=Object.create(null);for(var o in a){var r=a[o];t[o]=r.messages}return t}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function b(e,a){var t;if(!0===c.languagePackSupport&&void 0!==c.cacheRoot&&void 0!==c.languagePackId&&void 0!==c.translationsConfigFile&&void 0!==c.translationsConfig)try{t=function(e,a){var t,r,s,i=n.join(c.cacheRoot,"".concat(e.id,"-").concat(e.hash,".json")),l=!1,u=!1;try{return t=JSON.parse(o.readFileSync(i,{encoding:"utf8",flag:"r"})),r=i,s=new Date,o.utimes(r,s,s,(function(){})),t}catch(e){if("ENOENT"===e.code)u=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: ".concat(e.message,".")),o.unlink(i,(function(e){e&&console.error("Deleting corrupted bundle ".concat(i," failed."))})),l=!0}}if(!(t=function(e,a){var t=c.translationsConfig[e.id];if(t){var o=g(t).contents,r=g(n.join(a,"nls.metadata.json")),s=Object.create(null);for(var i in r){var l=r[i],u=o["".concat(e.outDir,"/").concat(i)];if(u){for(var d=[],m=0;m<l.keys.length;m++){var p=l.keys[m],v=u[f(p)?p:p.key];void 0===v&&(v=l.messages[m]),d.push(v)}s[i]=d}else s[i]=l.messages}return s}}(e,a))||l)return t;if(u)try{o.writeFileSync(i,JSON.stringify(t),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return t;throw e}return t}(e,a)}catch(e){console.log("Load or create bundle failed ",e)}if(!t){if(c.languagePackSupport)return v(a);var r=function(e){for(var a=c.language;a;){var t=n.join(e,"nls.bundle.".concat(a,".json"));if(o.existsSync(t))return t;var r=a.lastIndexOf("-");a=r>0?a.substring(0,r):void 0}if(void 0===a&&(t=n.join(e,"nls.bundle.json"),o.existsSync(t)))return t}(a);if(r)try{return g(r)}catch(e){console.log("Loading in the box message bundle failed.",e)}t=v(a)}return t}function h(e){if(!e)return s.localize;var a=n.extname(e);if(a&&(e=e.substr(0,e.length-a.length)),c.messageFormat===s.MessageFormat.both||c.messageFormat===s.MessageFormat.bundle){var t=function(e){for(var a,t=n.dirname(e);a=n.join(t,"nls.metadata.header.json"),!o.existsSync(a);){var r=n.dirname(t);if(r===t){a=void 0;break}t=r}return a}(e);if(t){var r=n.dirname(t),i=l[r];if(void 0===i)try{var u=JSON.parse(o.readFileSync(t,"utf8"));try{var d=b(u,r);i=p(r,d?{header:u,nlsBundle:d}:null)}catch(e){console.error("Failed to load nls bundle",e),i=p(r,null)}}catch(e){console.error("Failed to read header file",e),i=p(r,null)}if(i){var f=e.substr(r.length+1).replace(/\\/g,"/"),v=i.nlsBundle[f];return void 0===v?(console.error("Messages for file ".concat(e," not found. See console for details.")),function(){return"Messages not found."}):m(v)}}}if(c.messageFormat===s.MessageFormat.both||c.messageFormat===s.MessageFormat.file)try{var h=g(function(e){var a;if(c.cacheLanguageResolution&&a)a=a;else{if(s.isPseudo||!c.language)a=".nls.json";else for(var t=c.language;t;){var n=".nls."+t+".json";if(o.existsSync(e+n)){a=n;break}var r=t.lastIndexOf("-");r>0?t=t.substring(0,r):(a=".nls.json",t=null)}c.cacheLanguageResolution&&(a=a)}return e+a}(e));return Array.isArray(h)?m(h):(0,s.isDefined)(h.messages)&&(0,s.isDefined)(h.keys)?m(h.messages):(console.error("String bundle '".concat(e,"' uses an unsupported format.")),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file ".concat(e)),function(){return"Failed to load message bundle. See console for details."}}function w(e){return e&&(f(e.locale)&&(c.locale=e.locale.toLowerCase(),c.language=c.locale,l=Object.create(null)),void 0!==e.messageFormat&&(c.messageFormat=e.messageFormat),e.bundleFormat===s.BundleFormat.standalone&&!0===c.languagePackSupport&&(c.languagePackSupport=!1)),(0,s.setPseudo)("pseudo"===c.locale),h}!function(){if(c={locale:void 0,language:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:s.MessageFormat.bundle},f(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG),a=void 0;if(e.availableLanguages){var t=e.availableLanguages["*"];f(t)&&(a=t)}if(f(e.locale)&&(c.locale=e.locale.toLowerCase()),void 0===a?c.language=c.locale:"en"!==a&&(c.language=a),function(e){return!0===e||!1===e}(e._languagePackSupport)&&(c.languagePackSupport=e._languagePackSupport),f(e._cacheRoot)&&(c.cacheRoot=e._cacheRoot),f(e._languagePackId)&&(c.languagePackId=e._languagePackId),f(e._translationsConfigFile)){c.translationsConfigFile=e._translationsConfigFile;try{c.translationsConfig=g(c.translationsConfigFile)}catch(a){if(e._corruptedFile){var r=n.dirname(e._corruptedFile);o.exists(r,(function(a){a&&o.writeFile(e._corruptedFile,"corrupted","utf8",(function(e){console.error(e)}))}))}}}}catch(e){}(0,s.setPseudo)("pseudo"===c.locale),l=Object.create(null)}(),a.loadMessageBundle=h,a.config=w,r.default.install(Object.freeze({loadMessageBundle:h,config:w}))},747:e=>{e.exports=require("fs")},631:e=>{e.exports=require("net")},622:e=>{e.exports=require("path")},549:e=>{e.exports=require("vscode")}},a={};function t(n){var o=a[n];if(void 0!==o)return o.exports;var r=a[n]={exports:{}};return e[n](r,r.exports,t),r.exports}var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const a=t(747),o=t(631),r=t(549),s=t(472).loadMessageBundle(t(622).join(__dirname,"extension.ts")),i={disabled:s(0,null),always:s(1,null),smart:s(2,null),onlyWithFlag:s(3,null)},l={disabled:s(4,null),always:s(5,null),smart:s(6,null),onlyWithFlag:s(7,null)},c={disabled:s(8,null),always:s(9,null),smart:s(10,null),onlyWithFlag:s(11,null)},u=s(12,null),d=s(13,null),f=s(14,null),g=s(15,null),m=s(16,null),p="extension.node-debug.toggleAutoAttach",v="jsDebugIpcState",b="debug.javascript",h="autoAttachFilter",w=new Set(["autoAttachSmartPattern",h].map((e=>`debug.javascript.${e}`)));let y,F,S,k=!1;async function j(e,a){const t=r.workspace.getConfiguration(b);var n;const o=(a=a||((n=t.inspect(h))?n.workspaceFolderValue?r.ConfigurationTarget.WorkspaceFolder:n.workspaceValue?r.ConfigurationTarget.Workspace:(n.globalValue,r.ConfigurationTarget.Global):r.ConfigurationTarget.Global))===r.ConfigurationTarget.Global,s=r.window.createQuickPick(),i=x(),m=["always","smart","onlyWithFlag","disabled"].map((e=>({state:e,label:l[e],description:c[e],alwaysShow:!0})));"disabled"!==i&&m.unshift({setTempDisabled:!k,label:k?g:f,alwaysShow:!0}),s.items=m,s.activeItems=k?[m[0]]:s.items.filter((e=>"state"in e&&e.state===i)),s.title=o?d:u,s.buttons=[{iconPath:new r.ThemeIcon(o?"folder":"globe"),tooltip:o?u:d}],s.show();let p=await new Promise((e=>{s.onDidAccept((()=>e(s.selectedItems[0]))),s.onDidHide((()=>e(void 0))),s.onDidTriggerButton((()=>{e({scope:o?r.ConfigurationTarget.Workspace:r.ConfigurationTarget.Global})}))}));if(s.dispose(),p){if("scope"in p)return await j(e,p.scope);"state"in p&&(p.state!==i?t.update(h,p.state,a):k&&(p={setTempDisabled:!1})),"setTempDisabled"in p&&(B(e,i,!0),k=p.setTempDisabled,p.setTempDisabled?await O():await P(e),B(e,i,!1))}}function x(){return r.workspace.getConfiguration(b).get(h)??"disabled"}async function P(e){const a=await async function(e){const a=e.workspaceState.get(v),t=r.extensions.getExtension("ms-vscode.js-debug-nightly")?.extensionPath||r.extensions.getExtension("ms-vscode.js-debug")?.extensionPath,n=function(){const e={},a=r.workspace.getConfiguration(b);for(const t of w)e[t]=a.get(t);return JSON.stringify(e)}();if(a?.jsDebugPath===t&&a?.settingsValue===n)return a.ipcAddress;const o=await r.commands.executeCommand("extension.js-debug.setAutoAttachVariables",a?.ipcAddress);if(!o)return;const s=o.ipcAddress;return await e.workspaceState.update(v,{ipcAddress:s,jsDebugPath:t,settingsValue:n}),s}(e);if(a)return S=C(a).catch((e=>{console.error(e)})),await S}e.activate=function(e){y=Promise.resolve({context:e,state:null}),e.subscriptions.push(r.commands.registerCommand(p,j.bind(null,e))),e.subscriptions.push(r.workspace.onDidChangeConfiguration((e=>{(e.affectsConfiguration(`debug.javascript.${h}`)||[...w].some((a=>e.affectsConfiguration(a))))&&(D("disabled"),D(x()))}))),D(x())},e.deactivate=async function(){await O()};const C=async e=>{try{return await _(e)}catch(t){return await a.promises.unlink(e).catch((()=>{})),await _(e)}},_=e=>new Promise(((a,t)=>{const n=(0,o.createServer)((e=>{const a=[];e.on("data",(async t=>{if(0===t[t.length-1]){a.push(t.slice(0,-1));try{await r.commands.executeCommand("extension.js-debug.autoAttachToProcess",JSON.parse(Buffer.concat(a).toString())),e.write(Buffer.from([0]))}catch(a){e.write(Buffer.from([1])),console.error(a)}}else a.push(t)}))})).on("error",t).listen(e,(()=>a(n)))}));async function O(){const e=await S;e&&await new Promise((a=>e.close(a)))}const M={async disabled(e){await async function(e){(S||await e.workspaceState.get(v))&&(await e.workspaceState.update(v,void 0),await r.commands.executeCommand("extension.js-debug.clearAutoAttachVariables"),await O())}(e)},async onlyWithFlag(e){await P(e)},async smart(e){await P(e)},async always(e){await P(e)}};function B(e,a,t=!1){if("disabled"===a&&!t)return void F?.hide();F||(F=r.window.createStatusBarItem("status.debug.autoAttach",r.StatusBarAlignment.Left),F.name=s(17,null),F.command=p,F.tooltip=s(18,null),e.subscriptions.push(F));let n=t?"$(loading) ":"";n+=k?m:i[a],F.text=n,F.show()}function D(e){y=y.then((async({context:a,state:t})=>e===t?{context:a,state:t}:(null!==t&&B(a,t,!0),await M[e](a),k=!1,B(a,e,!1),{context:a,state:e})))}})();var o=exports;for(var r in n)o[r]=n[r];n.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})})();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/6261075646f055b99068d3688932416f2346dd3b/extensions/debug-auto-launch/dist/extension.js.map