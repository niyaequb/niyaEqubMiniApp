// Custom Flutter web bootstrap.
//
// Flutter generates this file automatically when it is absent. It is checked
// in here for three reasons:
//
//   1. the generated version calls _flutter.loader.load() with no
//      configuration, which makes Flutter take over the whole <body>. This app
//      needs Flutter confined to a phone-width element instead — see the long
//      comment at the top of web/index.html for why that cannot be done from
//      inside the Dart code;
//   2. CanvasKit is pinned to this origin rather than Google's CDN. See
//      CANVASKIT below — that one line is the difference between the app
//      starting and the app never starting;
//   3. it reports start-up progress to the loading screen in index.html
//      (window.niyaBoot), which owns the progress bar, the messages and the
//      handover to the app.
//
// ===========================================================================
// DO NOT WRITE THE TEMPLATE TOKEN NAMES IN A COMMENT IN THIS FILE.
//
// The two double-brace placeholders below are substituted by the Flutter tool
// with the loader implementation and the build config. That substitution is a
// plain text replace over the WHOLE file — it does not know what a JavaScript
// comment is.
//
// An earlier version of this file listed both token names in a comment here,
// as documentation. The tool expanded them in place, so a couple of hundred
// lines of the Flutter loader were pasted after a `//`. The first line was
// commented out and the rest became live, broken code. The browser reported:
//
//     Uncaught SyntaxError: Unexpected identifier 'more'
//
// which points at the comment, not at any code anyone wrote. The app never
// started. If you need to refer to the tokens in prose, name them without the
// braces, as this paragraph does.
// ===========================================================================
//
// WHAT THIS FILE NO LONGER DOES: TAKE THE LOADING SCREEN DOWN
//
// It used to remove the splash as soon as Flutter inserted its element into
// the host, or runApp() resolved. Both happen well before Dart has drawn
// anything - start-up still reads the translations, opens Hive and builds the
// first screen after that - so the splash faded out onto a blank white page,
// and the app's own splash then appeared on top of it: logo, white, logo.
//
// index.html now waits for Dart's own 'niya-first-frame' event, with a
// fallback timer, and does its own timing and error reporting from the first
// paint - which also covers the case where this file is what fails to load.

(()=>{var _={blink:!0,gecko:!1,webkit:!1,unknown:!1},K=()=>navigator.vendor==="Google Inc."||navigator.userAgent.includes("Edg/")?"blink":navigator.vendor==="Apple Computer, Inc."?"webkit":navigator.vendor===""&&navigator.userAgent.includes("Firefox")?"gecko":"unknown",C=K(),R=()=>typeof ImageDecoder>"u"?!1:C==="blink",B=()=>typeof Intl.v8BreakIterator<"u"&&typeof Intl.Segmenter<"u",z=()=>{let i=[0,97,115,109,1,0,0,0,1,5,1,95,1,120,0];return WebAssembly.validate(new Uint8Array(i))},M=()=>{let i=document.createElement("canvas");return i.width=1,i.height=1,i.getContext("webgl2")!=null?2:i.getContext("webgl")!=null?1:-1},D=()=>window.chrome&&chrome.runtime&&chrome.runtime.id,w={browserEngine:C,hasImageCodecs:R(),hasChromiumBreakIterators:B(),supportsWasmGC:z(),crossOriginIsolated:window.crossOriginIsolated,webGLVersion:M(),isChromeExtension:D()};function c(...i){return new URL(I(...i),document.baseURI).toString()}function I(...i){return i.filter(e=>!!e).map((e,n)=>n===0?S(e):F(S(e))).filter(e=>e.length).join("/")}function F(i){let e=0;for(;e<i.length&&i.charAt(e)==="/";)e++;return i.substring(e)}function S(i){let e=i.length;for(;e>0&&i.charAt(e-1)==="/";)e--;return i.substring(0,e)}function E(i,e){return i.canvasKitBaseUrl?i.canvasKitBaseUrl:e.engineRevision&&!e.useLocalCanvasKit?I("https://www.gstatic.com/flutter-canvaskit",e.engineRevision):"canvaskit"}var v=class{constructor(){this._scriptLoaded=!1}setTrustedTypesPolicy(e){this._ttPolicy=e}async loadEntrypoint(e){let{entrypointUrl:n=c("main.dart.js"),onEntrypointLoaded:t,nonce:r}=e||{};return this._loadJSEntrypoint(n,t,r)}async load(e,n,t,r,a){a??=l=>{l.initializeEngine(t).then(u=>u.runApp())};let{entrypointBaseUrl:s}=t,{entryPointBaseUrl:o}=t;if(!s&&o&&(console.warn("[deprecated] `entryPointBaseUrl` is deprecated and will be removed in a future release. Use `entrypointBaseUrl` instead."),s=o),e.compileTarget==="dart2wasm")return this._loadWasmEntrypoint(e,n,s,a);{let l=e.mainJsPath??"main.dart.js",u=c(s,l);return this._loadJSEntrypoint(u,a,r)}}didCreateEngineInitializer(e){typeof this._didCreateEngineInitializerResolve=="function"&&(this._didCreateEngineInitializerResolve(e),this._didCreateEngineInitializerResolve=null,delete _flutter.loader.didCreateEngineInitializer),typeof this._onEntrypointLoaded=="function"&&this._onEntrypointLoaded(e)}_loadJSEntrypoint(e,n,t){let r=typeof n=="function";if(!this._scriptLoaded){this._scriptLoaded=!0;let a=this._createScriptTag(e,t);if(r)console.debug("Injecting <script> tag. Using callback."),this._onEntrypointLoaded=n,document.head.append(a);else return new Promise((s,o)=>{console.debug("Injecting <script> tag. Using Promises. Use the callback approach instead!"),this._didCreateEngineInitializerResolve=s,a.addEventListener("error",o),document.head.append(a)})}}async _loadWasmEntrypoint(e,n,t,r){if(!this._scriptLoaded){this._scriptLoaded=!0,this._onEntrypointLoaded=r;let{mainWasmPath:a,jsSupportRuntimePath:s}=e,o=c(t,a),l=c(t,s);this._ttPolicy!=null&&(l=this._ttPolicy.createScriptURL(l));let d=(await import(l)).compileStreaming(fetch(o)),p;e.renderer==="skwasm"?p=(async()=>{let h=await n.skwasm;return window._flutter_skwasmInstance=h,{skwasm:h.wasmExports,skwasmWrapper:h,ffi:{memory:h.wasmMemory}}})():p=Promise.resolve({}),await(await(await d).instantiate(await p,{loadDynamicModule:async(h,j)=>{let A=fetch(c(t,h)),L=c(t,j);this._ttPolicy!=null&&(L=this._ttPolicy.createScriptURL(L));let x=import(L);return[await A,await x]}})).invokeMain()}}_createScriptTag(e,n){let t=document.createElement("script");t.type="application/javascript",n&&(t.nonce=n);let r=e;return this._ttPolicy!=null&&(r=this._ttPolicy.createScriptURL(e)),t.src=r,t}};async function T(i,e,n){if(e<0)return i;let t,r=new Promise((a,s)=>{t=setTimeout(()=>{s(new Error(`${n} took more than ${e}ms to resolve. Moving on.`,{cause:T}))},e)});return Promise.race([i,r]).finally(()=>{clearTimeout(t)})}var g=class{setTrustedTypesPolicy(e){this._ttPolicy=e}loadServiceWorker(e){if(!e||!("serviceWorker"in navigator))return Promise.resolve();let n=()=>{console.warn(`Loading the service worker using Flutter bootstrap is deprecated and will stop working in a future release.
For more details, see: https://github.com/flutter/flutter/issues/156910`)},t=()=>{let{serviceWorkerVersion:r,serviceWorkerUrl:a=c(`flutter_service_worker.js?v=${r}`),timeoutMillis:s=4e3}=e,o=a;this._ttPolicy!=null&&(o=this._ttPolicy.createScriptURL(o));let l=navigator.serviceWorker.register(o).then(u=>this._getNewServiceWorker(u,r)).then(this._waitForServiceWorkerActivation);return T(l,s,"prepareServiceWorker")};return e.serviceWorkerUrl!=null?(n(),t()):navigator.serviceWorker.getRegistration().then(r=>r?t():Promise.resolve())}async _getNewServiceWorker(e,n){if(!e.active&&(e.installing||e.waiting))return console.debug("Installing/Activating first service worker."),e.installing||e.waiting;if(e.active.scriptURL.endsWith(n))return console.debug("Loading from existing service worker."),e.active;{let t=await e.update();return console.debug("Updating service worker."),t.installing||t.waiting||t.active}}async _waitForServiceWorkerActivation(e){if(!e||e.state==="activated")if(e){console.debug("Service worker already active.");return}else throw new Error("Cannot activate a null service worker!");return new Promise((n,t)=>{e.addEventListener("statechange",()=>{e.state==="activated"&&(console.debug("Activated new service worker."),n())})})}};var y=class{constructor(e,n="flutter-js"){let t=e||[/\.js$/,/\.mjs$/];window.trustedTypes&&(this.policy=trustedTypes.createPolicy(n,{createScriptURL:function(r){if(r.startsWith("blob:"))return r;let a=new URL(r,window.location),s=a.pathname.split("/").pop();if(t.some(l=>l.test(s)))return a.toString();console.error("URL rejected by TrustedTypes policy",n,":",r,"(download prevented)")}}))}};var k=i=>{let e=WebAssembly.compileStreaming(fetch(i));return(n,t)=>((async()=>{let r=await e,a=await WebAssembly.instantiate(r,n);t(a,r)})(),{})};var U=(i,e,n,t)=>(window.flutterCanvasKitLoaded=(async()=>{if(window.flutterCanvasKit)return window.flutterCanvasKit;let r=n.hasChromiumBreakIterators&&n.hasImageCodecs;if(!r&&e.canvasKitVariant=="chromium")throw"Chromium CanvasKit variant specifically requested, but unsupported in this browser";let a=r&&e.canvasKitVariant!=="full",s=t;e.canvasKitVariant=="experimentalWebParagraph"?s=c(s,"experimental_webparagraph"):a&&(s=c(s,"chromium"));let o=c(s,"canvaskit.js");i.flutterTT.policy&&(o=i.flutterTT.policy.createScriptURL(o));let l=k(c(s,"canvaskit.wasm")),u=await import(o);return window.flutterCanvasKit=await u.default({instantiateWasm:l}),window.flutterCanvasKit})(),window.flutterCanvasKitLoaded);var W=async(i,e,n,t)=>{let a=!n.hasImageCodecs||!n.hasChromiumBreakIterators?"skwasm_heavy":e.enableWimp?"wimp":"skwasm",s=c(t,`${a}.js`),o=s;i.flutterTT.policy&&(o=i.flutterTT.policy.createScriptURL(o));let l=k(c(t,`${a}.wasm`));return await(await import(o)).default({skwasmSingleThreaded:e.enableWimp||!n.crossOriginIsolated||n.isChromeExtension||e.forceSingleThreadedSkwasm,instantiateWasm:l,locateFile:(d,p)=>d.endsWith(".ww.js")?URL.createObjectURL(new Blob([`
"use strict";

let eventListener;
eventListener = (message) => {
    const pendingMessages = [];
    const data = message.data;
    data["instantiateWasm"] = (info,receiveInstance) => {
        const instance = new WebAssembly.Instance(data["wasm"], info);
        return receiveInstance(instance, data["wasm"])
    };
    import(data.js).then(async (skwasm) => {
        await skwasm.default(data);

        removeEventListener("message", eventListener);
        for (const message of pendingMessages) {
            dispatchEvent(message);
        }
    });
    removeEventListener("message", eventListener);
    eventListener = (message) => {

        pendingMessages.push(message);
    };

    addEventListener("message", eventListener);
};
addEventListener("message", eventListener);
`],{type:"application/javascript"})):c(t,d),mainScriptUrlOrBlob:s})};var P=w.supportsWasmGC,G=P&&w.webGLVersion>0,b=class{async loadEntrypoint(e){let{serviceWorker:n,...t}=e||{},r=new y,a=new g;a.setTrustedTypesPolicy(r.policy),await a.loadServiceWorker(n).catch(o=>{console.warn("Exception while loading service worker:",o)});let s=new v;return s.setTrustedTypesPolicy(r.policy),this.didCreateEngineInitializer=s.didCreateEngineInitializer.bind(s),s.loadEntrypoint(t)}async load({serviceWorkerSettings:e,onEntrypointLoaded:n,nonce:t,config:r}={}){r??={};let a=_flutter.buildConfig;if(!a)throw"FlutterLoader.load requires _flutter.buildConfig to be set";let s=r.wasmAllowList?.[w.browserEngine]??_[w.browserEngine],o=m=>{switch(m){case"skwasm":return G&&s;default:return!0}},l=m=>m.compileTarget==="dart2wasm"&&!P||r.renderer&&r.renderer!=m.renderer?!1:o(m.renderer),u=a.builds.find(l);if(!u)throw"FlutterLoader could not find a build compatible with configuration and environment.";let d={};d.flutterTT=new y,e&&(d.serviceWorkerLoader=new g,d.serviceWorkerLoader.setTrustedTypesPolicy(d.flutterTT.policy),await d.serviceWorkerLoader.loadServiceWorker(e).catch(m=>{console.warn("Exception while loading service worker:",m)}));let p=E(r,a);u.renderer==="canvaskit"?d.canvasKit=U(d,r,w,p):u.renderer==="skwasm"&&(d.skwasm=W(d,r,w,p));let f=new v;return f.setTrustedTypesPolicy(d.flutterTT.policy),this.didCreateEngineInitializer=f.didCreateEngineInitializer.bind(f),f.load(u,d,r,t,n)}};window._flutter||(window._flutter={});window._flutter.loader||(window._flutter.loader=new b);})();
//# sourceMappingURL=flutter.js.map

if (!window._flutter) {
  window._flutter = {};
}
_flutter.buildConfig = {"engineRevision":"a10d8ac38de835021c8d2f920dbf50a920ccc030","builds":[{"compileTarget":"dart2js","renderer":"canvaskit","mainJsPath":"main.dart.js"},{}],"useLocalCanvasKit":true};


(function () {
  'use strict';

  // Provided by index.html. Without it - an older index.html still cached
  // next to this newer file, a host that rewrote the page, or its inline
  // script failing - nothing else would ever take the splash down, and the
  // app would run invisibly behind it. So the stand-in does the minimum
  // itself: remove the splash on Dart's first frame, or 12 seconds after
  // Dart has started, or at once if start-up fails.
  var boot = window.niyaBoot || (function () {
    var removed = false;
    function removeSplash() {
      if (removed) return;
      removed = true;
      var splash = document.getElementById('boot-splash');
      if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    }
    window.addEventListener('niya-first-frame', function () {
      requestAnimationFrame(removeSplash);
    });
    return {
      mark: function (step) { if (step === 'start') setTimeout(removeSplash, 12000); },
      fail: function (reason) { console.error('[boot] ' + reason); removeSplash(); },
      reveal: removeSplash
    };
  })();

  var host = document.getElementById('app-frame');

  // Defensive: if the element is missing (an edited index.html, a host that
  // rewrites the document) fall back to letting Flutter own the body. A
  // mis-scaled app is bad; a blank page is worse.
  if (!host) {
    console.warn('[boot] #app-frame not found - falling back to full-page.');
  }

  // --- CANVASKIT -----------------------------------------------------------
  //
  // Flutter's loader defaults the CanvasKit base URL to
  // https://www.gstatic.com/flutter-canvaskit/<engine revision>/ whenever the
  // build config does not say otherwise, and downloads several megabytes of
  // WASM from there before it can paint a single pixel.
  //
  // `flutter build web` copies a complete CanvasKit into the output all the
  // same, so the CDN copy is not saving anything: it is a second origin, on
  // another continent, that the app cannot start without. On an Ethiopian
  // mobile connection that is the difference between seconds and minutes;
  // behind a proxy, a corporate filter, or a bank super-app's WebView, it can
  // simply never arrive.
  //
  // Naming the local copy here removes the dependency outright. deploy.ps1
  // also passes --no-web-resources-cdn, which sets the same thing in the build
  // config; this line is the belt to that pair of braces, and it is what makes
  // an already-published build fixable without a rebuild.
  //
  // KEEP THIS LINE EXACTLY AS IT IS. MiniApp/hosting/publish.sh moves
  // canvaskit/ to a folder named after the engine revision, so browsers can
  // cache it for a year, and rewrites this one assignment to match. It refuses
  // to publish if it cannot find it.
  var CANVASKIT_BASE_URL = 'canvaskit/';

  // --- The host element must have a size before Flutter measures it ---------
  //
  // Flutter takes the FlutterView's size straight from this element's bounding
  // rect, and screenutil scales the entire UI from that. A host of zero height
  // does not produce a small app, it produces a nonsensical one.
  //
  // The CSS in index.html is written so this cannot happen, but "cannot
  // happen" is a statement about browsers we have tested, and this page also
  // runs inside a bank's WebView. If the rect comes back unusable, fall back to
  // pinning the element to the window's own dimensions, which is the one
  // measurement every engine agrees on.
  function ensureHostIsSized() {
    if (!host) return;
    var rect = host.getBoundingClientRect();
    if (rect.width >= 1 && rect.height >= 1) return;

    var w = window.innerWidth || document.documentElement.clientWidth || 0;
    var h = window.innerHeight || document.documentElement.clientHeight || 0;
    if (!w || !h) return;

    console.warn(
      '[boot] host element measured ' + Math.round(rect.width) + 'x' +
      Math.round(rect.height) + ' - pinning to the window instead.'
    );

    var shell = document.getElementById('app-shell');
    if (shell) {
      shell.style.position = 'fixed';
      shell.style.left = '0';
      shell.style.top = '0';
      shell.style.width = w + 'px';
      shell.style.height = h + 'px';
    }
    host.style.height = h + 'px';
  }

  ensureHostIsSized();
  window.addEventListener('resize', ensureHostIsSized);

  // --- Start ------------------------------------------------------------------
  //
  // Progress reported on the way: 'code' when main.dart.js has run, 'engine'
  // when CanvasKit, the fonts and the asset manifest are all in (that is what
  // initializeEngine waits for), 'start' once Dart's main() is running.
  try {
    _flutter.loader.load({
      // Passed here for the default path...
      config: {
        hostElement: host || undefined,
        canvasKitBaseUrl: CANVASKIT_BASE_URL,
      },

      onEntrypointLoaded: async function (engineInitializer) {
        boot.mark('code');
        try {
          ensureHostIsSized();

          // ...and AGAIN here, deliberately. When onEntrypointLoaded is
          // supplied, the loader hands over control before applying `config`
          // to the engine, so the hostElement set above is not forwarded.
          // Omitting it is the easiest way to get a correctly-written frame
          // that Flutter then ignores, rendering full-width anyway.
          var appRunner = await engineInitializer.initializeEngine({
            hostElement: host || undefined,
            canvasKitBaseUrl: CANVASKIT_BASE_URL,
          });
          boot.mark('engine');

          await appRunner.runApp();
          boot.mark('start');
        } catch (e) {
          boot.fail('start-up failed: ' + e);
        }
      },
    });
  } catch (e) {
    boot.fail('loader failed: ' + e);
  }
})();
