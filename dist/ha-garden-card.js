function e(e,t,o,i){var n,s=arguments.length,a=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,o,a):n(t,o))||a);return s>3&&a&&Object.defineProperty(t,o,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new s(o,e,i)},r=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",y=u.reactiveElementPolyfillSupport,v=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},b=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const s=i?.call(this);n?.call(this,t),this.requestUpdate(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(o)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:_).toAttribute(t,o.type);this._$Em=e,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=i;const s=n.fromAttribute(t,e.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(e,t,o,i=!1,n){if(void 0!==e){const s=this.constructor;if(!1===i&&(n=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??b)(n,t)||o.useDefault&&o.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:n},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==n||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,y?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,z=e=>e,C=$.trustedTypes,k=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,E=`<${P}>`,M=document,Z=()=>M.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,O=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,F=/"/g,H=/^(?:script|style|textarea|title)$/i,j=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),B=j(1),V=j(2),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),X=new WeakMap,Y=M.createTreeWalker(M,129);function G(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const J=(e,t)=>{const o=e.length-1,i=[];let n,s=2===t?"<svg>":3===t?"<math>":"",a=T;for(let t=0;t<o;t++){const o=e[t];let r,l,c=-1,d=0;for(;d<o.length&&(a.lastIndex=d,l=a.exec(o),null!==l);)d=a.lastIndex,a===T?"!--"===l[1]?a=N:void 0!==l[1]?a=D:void 0!==l[2]?(H.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=O):void 0!==l[3]&&(a=O):a===O?">"===l[0]?(a=n??T,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?O:'"'===l[3]?F:I):a===F||a===I?a=O:a===N||a===D?a=T:(a=O,n=void 0);const h=a===O&&e[t+1].startsWith("/>")?" ":"";s+=a===T?o+E:c>=0?(i.push(r),o.slice(0,c)+A+o.slice(c)+S+h):o+S+(-2===c?t:h)}return[G(e,s+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class K{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,s=0;const a=e.length-1,r=this.parts,[l,c]=J(e,t);if(this.el=K.createElement(l,o),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Y.nextNode())&&r.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(A)){const t=c[s++],o=i.getAttribute(e).split(S),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:n,name:a[2],strings:o,ctor:"."===a[1]?ie:"?"===a[1]?ne:"@"===a[1]?se:oe}),i.removeAttribute(e)}else e.startsWith(S)&&(r.push({type:6,index:n}),i.removeAttribute(e));if(H.test(i.tagName)){const e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=C?C.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],Z()),Y.nextNode(),r.push({type:2,index:++n});i.append(e[t],Z())}}}else if(8===i.nodeType)if(i.data===P)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(S,e+1));)r.push({type:7,index:n}),e+=S.length-1}n++}}static createElement(e,t){const o=M.createElement("template");return o.innerHTML=e,o}}function Q(e,t,o=e,i){if(t===q)return t;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const s=L(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(e),n._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(t=Q(e,n._$AS(e,t.values),n,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);Y.currentNode=i;let n=Y.nextNode(),s=0,a=0,r=o[0];for(;void 0!==r;){if(s===r.index){let t;2===r.type?t=new te(n,n.nextSibling,this,e):1===r.type?t=new r.ctor(n,r.name,r.strings,this,e):6===r.type&&(t=new ae(n,this,e)),this._$AV.push(t),r=o[++a]}s!==r?.index&&(n=Y.nextNode(),s++)}return Y.currentNode=M,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),L(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=K.createElement(G(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=X.get(e.strings);return void 0===t&&X.set(e.strings,t=new K(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new te(this.O(Z()),this.O(Z()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=z(e).nextSibling;z(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=W}_$AI(e,t=this,o,i){const n=this.strings;let s=!1;if(void 0===n)e=Q(this,e,t,0),s=!L(e)||e!==this._$AH&&e!==q,s&&(this._$AH=e);else{const i=e;let a,r;for(e=n[0],a=0;a<n.length-1;a++)r=Q(this,i[o+a],t,a),r===q&&(r=this._$AH[a]),s||=!L(r)||r!==this._$AH[a],r===W?e=W:e!==W&&(e+=(r??"")+n[a+1]),this._$AH[a]=r}s&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ne extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends oe{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===q)return;const o=this._$AH,i=e===W&&o!==W||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==W&&(o===W||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const re=$.litHtmlPolyfillSupport;re?.(K,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ce extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let n=i._$litPart$;if(void 0===n){const e=o?.renderBefore??null;i._$litPart$=n=new te(t.insertBefore(Z(),e),e,void 0,o??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");const he=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b},ge=(e=pe,t,o)=>{const{kind:i,metadata:n}=o;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),"accessor"===i){const{name:i}=o;return{set(o){const n=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,n,e,!0,o)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];t.call(this,o),this.requestUpdate(i,n,e,!0,o)}}throw Error("Unsupported decorator location: "+i)};function ue(e){return(t,o)=>"object"==typeof o?ge(e,t,o):((e,t,o)=>{const i=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),i?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function fe(e){return ue({...e,state:!0,attribute:!1})}const me=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ye=/^(switch|valve|input_boolean)\..+$/;function ve(e){const t=e.name||e.id||"unnamed";if(!e.id)throw new Error(`Zone '${t}' is missing an id`);if(!e.name)throw new Error(`Zone '${e.id}' is missing a name`);if(e.entity&&!ye.test(e.entity))throw new Error(`Zone '${t}' has invalid entity '${e.entity}'. Must be switch.*, valve.*, or input_boolean.*`);if(!e.color)throw new Error(`Zone '${t}' is missing a color`);if(!me.test(e.color))throw new Error(`Zone '${t}' has invalid color format`);if(e.polygon){if(!Array.isArray(e.polygon))throw new Error(`Zone '${t}' has invalid polygon coordinates`);if(e.polygon.length>0&&e.polygon.length<3)throw new Error(`Zone '${t}' polygon must have at least 3 points`);for(const o of e.polygon)if(!Array.isArray(o)||2!==o.length||"number"!=typeof o[0]||"number"!=typeof o[1]||o[0]<0||o[0]>100||o[1]<0||o[1]>100)throw new Error(`Zone '${t}' has invalid polygon coordinates`)}}let _e=class extends ce{constructor(){super(...arguments),this.zones=[]}render(){return this.image?this._renderImageWithOverlay():this._renderListLayout()}_renderImageWithOverlay(){const e=this._computeZoneRenderData();return B`
      <div class="image-container">
        <img src="${this.image}" alt="Garden" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${e.map(e=>B`
              <polygon
                class="zone-polygon ${e.isActive?"zone-polygon--active":""} ${e.isUnavailable?"zone-polygon--unavailable":""}"
                points="${e.points}"
                fill="${e.isUnavailable?"#9e9e9e":e.color}"
                opacity="${e.opacity}"
                data-zone-id="${e.id}"
                @click="${()=>this._handleZoneTap(e.id)}"
              />
            `)}
        </svg>
      </div>
    `}_renderListLayout(){const e=this._computeZoneRenderData();return 0===e.length?W:B`
      <div class="zone-list">
        ${e.map(e=>B`
            <div
              class="zone-list-item ${e.isActive?"zone-list-item--active":""} ${e.isUnavailable?"zone-list-item--unavailable":""}"
              @click="${()=>this._handleZoneTap(e.id)}"
            >
              <span
                class="zone-color-dot"
                style="background-color: ${e.isUnavailable?"#9e9e9e":e.color}"
              ></span>
              <span class="zone-name">${e.name}</span>
              <span class="zone-status">
                ${e.isUnavailable?"Unavailable":e.isActive?"Active":"Off"}
              </span>
            </div>
          `)}
      </div>
    `}_computeZoneRenderData(){return this.zones.map(e=>{const t=e.entity?this.hass?.states[e.entity]:void 0,o=t?.state??"unavailable",i="on"===o,n="unavailable"===o||"unknown"===o||!t,s=(e.polygon||[]).map(([e,t])=>`${e},${t}`).join(" ");let a;return a=n?.4:i?.5:.3,{id:e.id,name:e.name,color:e.color,points:s,opacity:a,isActive:i,isUnavailable:n}})}_handleZoneTap(e){const t=this.zones.find(t=>t.id===e);if(!t)return;const o=t.entity?this.hass?.states[t.entity]:void 0,i=o?.state??"unavailable";"unavailable"!==i&&"unknown"!==i&&this.dispatchEvent(new CustomEvent("zone-tap",{detail:{zoneId:e},bubbles:!0,composed:!0}))}};_e.styles=a`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    .image-container {
      position: relative;
      width: 100%;
      line-height: 0;
    }

    .image-container img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: var(--ha-card-border-radius, 12px);
      object-fit: cover;
    }

    .image-container svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--ha-card-border-radius, 12px);
    }

    .zone-polygon {
      cursor: pointer;
      transition: opacity 200ms ease-in-out;
    }

    .zone-polygon:hover {
      opacity: 0.6 !important;
    }

    .zone-polygon--active {
      animation: pulse-opacity 2s ease-in-out infinite;
    }

    .zone-polygon--unavailable {
      cursor: not-allowed;
    }

    @keyframes pulse-opacity {
      0%,
      100% {
        opacity: 0.5;
      }
      50% {
        opacity: 0.7;
      }
    }

    /* List layout fallback when no image is configured */
    .zone-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
    }

    .zone-list-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      transition: background 200ms ease;
      min-height: 44px;
      min-width: 44px;
    }

    .zone-list-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .zone-list-item--active {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 0 8px var(--primary-color, #03a9f4);
    }

    .zone-list-item--unavailable {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .zone-color-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .zone-name {
      font-size: 14px;
      color: var(--primary-text-color, #212121);
    }

    .zone-status {
      margin-left: auto;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }
  `,e([ue({attribute:!1})],_e.prototype,"zones",void 0),e([ue({attribute:!1})],_e.prototype,"hass",void 0),e([ue({type:String})],_e.prototype,"image",void 0),_e=e([he("garden-image-layer")],_e);let be=class extends ce{get _entityState(){if(!this.hass||!this.zone||!this.zone.entity)return"unavailable";const e=this.hass.states[this.zone.entity];return e?.state??"unavailable"}get _isActive(){return"on"===this._entityState||"open"===this._entityState}get _isUnavailable(){const e=this._entityState;return"unavailable"===e||"unknown"===e}get _statusText(){return this._isUnavailable?"Unavailable":this._isActive?"Active":"Idle"}render(){if(!this.zone)return W;const e=this._isActive,t=this._isUnavailable,o=this.zone.color||"#4CAF50";return B`
      <div
        class="zone-control ${e?"zone-control--active":""} ${t?"zone-control--unavailable":""}"
        style="--zone-color: ${o}"
      >
        <span
          class="status-indicator ${e?"status-indicator--active":""} ${t?"status-indicator--unavailable":""}"
          style="background-color: ${t?"#9e9e9e":e?o:"#bdbdbd"}; color: ${o}"
        ></span>

        <div class="zone-info">
          <div class="zone-name">${this.zone.name}</div>
          <div class="zone-status-text">${this._statusText}</div>
        </div>

        <div class="zone-actions">
          ${e?B`
                <button
                  class="zone-btn zone-btn--stop"
                  ?disabled=${t}
                  @click=${this._handleStop}
                  aria-label="Stop ${this.zone.name}"
                >
                  Stop
                </button>
              `:B`
                <button
                  class="zone-btn zone-btn--start"
                  ?disabled=${t}
                  @click=${this._handleStart}
                  aria-label="Start ${this.zone.name}"
                >
                  Start
                </button>
              `}
        </div>

        ${e&&this.zone.countdown_entity?this._renderProgressBar():W}
      </div>
    `}_renderProgressBar(){if(!this.hass||!this.zone||!this.zone.countdown_entity)return W;const e=this.hass.states[this.zone.countdown_entity];if(!e||"unavailable"===e.state)return W;const t=parseFloat(e.state);if(isNaN(t))return W;let o=t;if(this.zone.duration_entity){const e=this.hass.states[this.zone.duration_entity];if(e){const t=parseFloat(e.state);!isNaN(t)&&t>0&&(o=60*t)}}if(o<=0)return W;const i=function(e,t){if(t<=0)return 0;const o=(t-e)/t*100;return Math.min(100,Math.max(0,o))}(t,o),n=function(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${(t%60).toString().padStart(2,"0")}`}(t),s=this.zone.color||"#4CAF50";return B`
      <div class="progress-section">
        <div class="progress-track">
          <div class="progress-fill" style="width: ${i}%; background-color: ${s}"></div>
        </div>
        <span class="remaining-time">${n}</span>
      </div>
    `}async _handleStart(){if(!this.hass||!this.zone||!this.zone.entity||this._isUnavailable)return;const{domain:e,service:t}=function(e){switch(e.split(".")[0]){case"valve":return{domain:"valve",service:"open"};case"input_boolean":return{domain:"homeassistant",service:"turn_on"};default:return{domain:"switch",service:"turn_on"}}}(this.zone.entity);await this.hass.callService(e,t,{entity_id:this.zone.entity})}async _handleStop(){if(!this.hass||!this.zone||!this.zone.entity||this._isUnavailable)return;const{domain:e,service:t}=function(e){switch(e.split(".")[0]){case"valve":return{domain:"valve",service:"close"};case"input_boolean":return{domain:"homeassistant",service:"turn_off"};default:return{domain:"switch",service:"turn_off"}}}(this.zone.entity);await this.hass.callService(e,t,{entity_id:this.zone.entity})}};be.styles=a`
    :host {
      display: block;
    }

    .zone-control {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: box-shadow 200ms ease, opacity 200ms ease,
        border-color 200ms ease;
      flex-wrap: wrap;
    }

    .zone-control--active {
      border-color: var(--zone-color, var(--primary-color, #03a9f4));
      box-shadow: 0 0 12px var(--zone-color, var(--primary-color, #03a9f4));
    }

    .zone-control--unavailable {
      opacity: 0.5;
    }

    .zone-control--unavailable::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 12px;
      background: rgba(158, 158, 158, 0.15);
      pointer-events: none;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
      transition: background-color 200ms ease, box-shadow 200ms ease;
    }

    .status-indicator--active {
      box-shadow: 0 0 6px currentColor;
    }

    .status-indicator--unavailable {
      background-color: #9e9e9e !important;
    }

    .zone-info {
      flex: 1;
      min-width: 0;
    }

    .zone-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .zone-status-text {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      margin-top: 2px;
    }

    .zone-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .zone-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 200ms ease, transform 100ms ease;
      -webkit-tap-highlight-color: transparent;
    }

    .zone-btn:active {
      transform: scale(0.95);
    }

    .zone-btn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      transform: none;
    }

    .zone-btn--start {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }

    .zone-btn--start:hover:not(:disabled) {
      background: var(--primary-color, #0288d1);
      filter: brightness(1.1);
    }

    .zone-btn--stop {
      background: var(--error-color, #f44336);
      color: #fff;
    }

    .zone-btn--stop:hover:not(:disabled) {
      background: var(--error-color, #d32f2f);
      filter: brightness(1.1);
    }

    .progress-section {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .progress-track {
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 1s linear;
    }

    .remaining-time {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      min-width: 36px;
      text-align: right;
    }
  `,e([ue({attribute:!1})],be.prototype,"zone",void 0),e([ue({attribute:!1})],be.prototype,"hass",void 0),be=e([he("zone-control")],be);let we=class extends ce{constructor(){super(...arguments),this.zones=[],this.columns=1}render(){if(!this.zones||0===this.zones.length)return W;const e=`grid-template-columns: repeat(${this.columns}, 1fr)`;return B`
      <div class="zone-panel" style="${e}">
        ${this.zones.map(e=>B`
            <zone-control .zone=${e} .hass=${this.hass}></zone-control>
          `)}
      </div>
    `}};we.styles=a`
    :host {
      display: block;
    }

    .zone-panel {
      display: grid;
      gap: 8px;
    }
  `,e([ue({attribute:!1})],we.prototype,"zones",void 0),e([ue({attribute:!1})],we.prototype,"hass",void 0),e([ue({type:Number})],we.prototype,"columns",void 0),we=e([he("zone-control-panel")],we);let xe=class extends ce{get _entityState(){if(!this.hass||!this.config)return"unavailable";const e=this.hass.states[this.config.entity];return e?.state??"unavailable"}get _activity(){return function(e){switch(e){case"mowing":return"mowing";case"docked":return"docked";case"paused":return"paused";case"returning":return"returning";case"error":return"error";default:return"unknown"}}(this._entityState)}get _batteryLevel(){if(!this.hass||!this.config?.battery_entity)return null;const e=this.hass.states[this.config.battery_entity];if(!e||"unavailable"===e.state||"unknown"===e.state)return null;const t=parseFloat(e.state);return isNaN(t)?null:Math.max(0,Math.min(100,t))}get _errorDescription(){if("error"!==this._activity)return null;if(!this.hass||!this.config)return null;const e=this.hass.states[this.config.entity];if(!e)return null;const t=e.attributes.error;return"string"==typeof t?t:null}get _isUnavailable(){const e=this._entityState;return"unavailable"===e||"unknown"===e}render(){if(!this.config)return W;const e=this._activity,t=this._batteryLevel,o=this._errorDescription,i=this._isUnavailable,n=function(e){switch(e){case"mowing":return"Mowing";case"docked":return"Docked";case"paused":return"Paused";case"returning":return"Returning";case"error":return"Error";default:return"Unknown"}}(e),s=null===(a=t)?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M12,11 L12,14 M12,17 L12,17.5":a>75?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,7 L15,7 L15,20 L9,20 Z":a>=25?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,13 L15,13 L15,20 L9,20 Z":"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,17 L15,17 L15,20 L9,20 Z";var a;const r=function(e){return null===e?"unknown":e>75?"full":e>=25?"medium":"low"}(t);return B`
      <div class="mower-panel ${i?"mower-panel--unavailable":""}">
        <div class="mower-header">
          <div class="mower-icon-container ${"error"===e?"mower-icon-container--error":""} ${"mowing"===e?"mower-icon-container--mowing":""}">
            <ha-icon icon="${"error"===e?"mdi:alert":"mdi:robot-mower"}" class="mower-icon"></ha-icon>
          </div>

          <div class="mower-info">
            <div class="mower-activity">${n}</div>
            ${null!==t?B`
                  <div class="mower-battery">
                    <svg class="battery-icon battery-icon--${r}" viewBox="0 0 24 24">
                      <path d="${s}" />
                    </svg>
                    <span>${t}%</span>
                  </div>
                `:W}
          </div>
        </div>

        ${"error"===e&&o?B`
              <div class="mower-error">
                <svg class="error-icon" viewBox="0 0 24 24">
                  <path d="M1,21 L12,2 L23,21 Z M13,18 L11,18 L11,16 L13,16 Z M13,14 L11,14 L11,10 L13,10 Z" />
                </svg>
                <span class="error-text">${o}</span>
              </div>
            `:W}

        <div class="mower-controls">
          <button
            class="mower-btn mower-btn--start"
            ?disabled=${i}
            @click=${this._handleStart}
            aria-label="Start mowing"
          >
            Start
          </button>
          <button
            class="mower-btn mower-btn--pause"
            ?disabled=${i}
            @click=${this._handlePause}
            aria-label="Pause mower"
          >
            Pause
          </button>
          <button
            class="mower-btn mower-btn--dock"
            ?disabled=${i}
            @click=${this._handleDock}
            aria-label="Dock mower"
          >
            Dock
          </button>
        </div>
      </div>
    `}async _handleStart(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","start_mowing",{entity_id:this.config.entity})}async _handlePause(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","pause",{entity_id:this.config.entity})}async _handleDock(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","dock",{entity_id:this.config.entity})}};function $e(e){if(!e||""===e.trim())return null;const t=new Date(e);return isNaN(t.getTime())?null:t}function ze(e){return`${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}`}xe.styles=a`
    :host {
      display: block;
    }

    .mower-panel {
      padding: 16px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: opacity 200ms ease;
    }

    .mower-panel--unavailable {
      opacity: 0.5;
    }

    .mower-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .mower-icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #4CAF50);
      flex-shrink: 0;
    }

    .mower-icon-container--error {
      background: var(--error-color, #f44336);
    }

    .mower-icon-container--mowing {
      animation: mower-pulse 1.5s ease-in-out infinite;
    }

    @keyframes mower-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 var(--primary-color, rgba(76, 175, 80, 0.4));
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 12px 4px var(--primary-color, rgba(76, 175, 80, 0.2));
      }
    }

    .mower-icon {
      --mdc-icon-size: 24px;
      color: #fff;
    }

    .mower-icon--mowing {
      animation: mower-spin 2s linear infinite;
    }

    @keyframes mower-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .mower-info {
      flex: 1;
      min-width: 0;
    }

    .mower-activity {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }

    .mower-battery {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      margin-top: 2px;
    }

    .battery-icon {
      width: 16px;
      height: 16px;
    }

    .battery-icon--full {
      fill: var(--success-color, #4CAF50);
    }

    .battery-icon--medium {
      fill: var(--warning-color, #FF9800);
    }

    .battery-icon--low {
      fill: var(--error-color, #f44336);
    }

    .battery-icon--unknown {
      fill: var(--secondary-text-color, #727272);
    }

    .mower-error {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      margin-bottom: 12px;
      border-radius: 8px;
      background: rgba(244, 67, 54, 0.1);
      border: 1px solid var(--error-color, #f44336);
    }

    .error-icon {
      width: 20px;
      height: 20px;
      fill: var(--error-color, #f44336);
      flex-shrink: 0;
    }

    .error-text {
      font-size: 12px;
      color: var(--error-color, #f44336);
      font-weight: 500;
    }

    .mower-controls {
      display: flex;
      gap: 8px;
    }

    .mower-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 44px;
      min-height: 44px;
      padding: 10px 12px;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 200ms ease, transform 100ms ease;
      -webkit-tap-highlight-color: transparent;
    }

    .mower-btn:active {
      transform: scale(0.95);
    }

    .mower-btn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      transform: none;
    }

    .mower-btn--start {
      background: var(--primary-color, #4CAF50);
      color: #fff;
    }

    .mower-btn--start:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    .mower-btn--dock {
      background: var(--secondary-text-color, #727272);
      color: #fff;
    }

    .mower-btn--dock:hover:not(:disabled) {
      filter: brightness(1.2);
    }

    .mower-btn--pause {
      background: var(--warning-color, #FF9800);
      color: #fff;
    }

    .mower-btn--pause:hover:not(:disabled) {
      filter: brightness(1.1);
    }
  `,e([ue({attribute:!1})],xe.prototype,"config",void 0),e([ue({attribute:!1})],xe.prototype,"hass",void 0),xe=e([he("mower-panel")],xe);let Ce=class extends ce{constructor(){super(...arguments),this.zones=[]}render(){const e=this._getScheduledZones();return 0===e.length?W:B`
      <div class="schedule-badges">
        ${e.map(({zone:e,nextTime:t})=>this._renderBadge(e,t))}
      </div>
    `}_renderBadge(e,t){return t?B`
        <div class="schedule-badge" title="${e.name}: Next run at ${t}">
          <span class="schedule-badge__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
            </svg>
          </span>
          <span>Next: ${t}</span>
        </div>
      `:B`
      <div class="schedule-badge schedule-badge--no-schedule" title="${e.name}: No schedule configured">
        <span>No schedule</span>
      </div>
    `}_getScheduledZones(){return this.zones.filter(e=>e.schedule_entity).map(e=>{const t=this.hass?.states[e.schedule_entity],o=function(e){if(!e)return null;if("unavailable"===e.state||"unknown"===e.state)return null;const t=e.attributes.next_run;if(t&&"string"==typeof t){const e=$e(t);if(e)return ze(e)}const o=$e(e.state);return o?ze(o):null}(t);return{zone:e,nextTime:o}})}};Ce.styles=a`
    :host {
      display: block;
    }

    .schedule-badges {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .schedule-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 12px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
      line-height: 1.4;
      width: fit-content;
    }

    .schedule-badge__icon {
      display: inline-flex;
      align-items: center;
    }

    .schedule-badge__icon svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
    }

    .schedule-badge--no-schedule {
      opacity: 0.7;
      font-style: italic;
    }
  `,e([ue({attribute:!1})],Ce.prototype,"zones",void 0),e([ue({attribute:!1})],Ce.prototype,"hass",void 0),Ce=e([he("schedule-view")],Ce);const ke=a`
  /* Water animation overlay container */
  .water-animation-overlay {
    will-change: opacity;
    pointer-events: none;
    transition: opacity 500ms ease-out;
    opacity: 0;
  }

  .water-animation-overlay--active {
    opacity: 1;
    animation: water-pulse 2s ease-in-out infinite;
    animation-delay: 0ms;
  }

  .water-animation-overlay--deactivating {
    opacity: 0;
    transition: opacity 500ms ease-out;
  }

  /* Primary pulse animation - opacity pulsing for water spray effect */
  @keyframes water-pulse {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.75;
    }
    100% {
      opacity: 0.4;
    }
  }

  /* Particle drift animation for SVG pattern circles */
  @keyframes water-particle-drift {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0.6;
    }
    25% {
      opacity: 0.9;
    }
    50% {
      transform: translateY(2px) translateX(1px);
      opacity: 0.7;
    }
    75% {
      opacity: 0.85;
    }
    100% {
      transform: translateY(0) translateX(0);
      opacity: 0.6;
    }
  }

  /* Secondary particle animation with offset timing */
  @keyframes water-particle-drift-alt {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0.5;
    }
    33% {
      transform: translateY(-1px) translateX(1.5px);
      opacity: 0.8;
    }
    66% {
      transform: translateY(1px) translateX(-0.5px);
      opacity: 0.6;
    }
    100% {
      transform: translateY(0) translateX(0);
      opacity: 0.5;
    }
  }

  /* Shimmer effect for the overall water overlay */
  @keyframes water-shimmer {
    0% {
      opacity: 0.3;
    }
    30% {
      opacity: 0.55;
    }
    60% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.3;
    }
  }
`;let Ae=class extends ce{constructor(){super(...arguments),this.zones=[]}render(){const e=this.zones.filter(e=>e.isActive);return 0===e.length?W:B`
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          ${e.map(e=>this._renderPatternDef(e))}
        </defs>
        ${e.map(e=>this._renderZoneAnimation(e))}
      </svg>
    `}_renderPatternDef(e){const t=`water-pattern-${e.id}`;return V`
      <pattern
        id="${t}"
        x="0"
        y="0"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(15)"
      >
        <!-- Primary particles -->
        <circle
          class="water-pattern-particle"
          cx="2"
          cy="2"
          r="0.8"
          fill="#ffffff"
          opacity="0.7"
        />
        <circle
          class="water-pattern-particle--alt"
          cx="6"
          cy="5"
          r="0.6"
          fill="#ffffff"
          opacity="0.5"
        />
        <!-- Secondary particles for density -->
        <circle
          class="water-pattern-particle"
          cx="4"
          cy="7"
          r="0.5"
          fill="#ffffff"
          opacity="0.4"
        />
        <circle
          class="water-pattern-particle--alt"
          cx="7"
          cy="1"
          r="0.4"
          fill="#ffffff"
          opacity="0.6"
        />
      </pattern>
    `}_renderZoneAnimation(e){const t=`water-pattern-${e.id}`,o=e.isActive?"water-zone-group water-zone-group--active":"water-zone-group water-zone-group--inactive";return V`
      <g class="${o}">
        <!-- Base color fill with low opacity for glow effect -->
        <polygon
          points="${e.points}"
          fill="${e.color}"
          opacity="0.2"
        />
        <!-- Pattern overlay for particle effect -->
        <polygon
          points="${e.points}"
          fill="url(#${t})"
          opacity="0.6"
        />
      </g>
    `}};Ae.styles=[ke,a`
      :host {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .water-pattern-particle {
        animation: water-particle-drift 3s ease-in-out infinite;
      }

      .water-pattern-particle--alt {
        animation: water-particle-drift-alt 2.5s ease-in-out infinite;
      }

      .water-zone-group {
        will-change: opacity;
        transition: opacity 500ms ease-out;
      }

      .water-zone-group--active {
        animation: water-pulse 2s ease-in-out infinite;
        animation-delay: 0ms;
      }

      .water-zone-group--inactive {
        opacity: 0;
      }
    `],e([ue({attribute:!1})],Ae.prototype,"zones",void 0),Ae=e([he("water-animation")],Ae);let Se=class extends ce{constructor(){super(...arguments),this.active=!1,this.zone=[],this.icon="mdi:robot-mower",this._x=50,this._y=50,this._targetX=50,this._targetY=50,this._animFrame=null,this._tick=()=>{if(!this.active)return;const e=this._targetX-this._x,t=this._targetY-this._y,o=Math.sqrt(e*e+t*t);o<1?this._pickNewTarget():(this._x+=e/o*.08,this._y+=t/o*.08),this.requestUpdate(),this._animFrame=requestAnimationFrame(this._tick)}}connectedCallback(){super.connectedCallback(),this.active&&this._startAnimation()}disconnectedCallback(){super.disconnectedCallback(),this._stopAnimation()}updated(e){e.has("active")&&(this.active?this._startAnimation():this._stopAnimation())}_startAnimation(){this._animFrame||(this.zone.length>=3?(this._x=this.zone.reduce((e,[t])=>e+t,0)/this.zone.length,this._y=this.zone.reduce((e,[,t])=>e+t,0)/this.zone.length):(this._x=50,this._y=50),this._pickNewTarget(),this._tick())}_stopAnimation(){this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null)}_pickNewTarget(){if(this.zone.length>=3){const e=Math.min(...this.zone.map(([e])=>e)),t=Math.max(...this.zone.map(([e])=>e)),o=Math.min(...this.zone.map(([,e])=>e)),i=Math.max(...this.zone.map(([,e])=>e));this._targetX=e+Math.random()*(t-e),this._targetY=o+Math.random()*(i-o)}else this._targetX=20+60*Math.random(),this._targetY=20+60*Math.random()}render(){return this.active?B`
      <div class="device-icon" style="left: ${this._x}%; top: ${this._y}%;">
        <ha-icon icon="${this.icon}"></ha-icon>
      </div>
    `:W}};Se.styles=a`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 8;
    }

    .device-icon {
      position: absolute;
      transform: translate(-50%, -50%);
    }

    .device-icon ha-icon {
      --mdc-icon-size: 24px;
      color: #ffffff;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
    }
  `,e([ue({type:Boolean})],Se.prototype,"active",void 0),e([ue({attribute:!1})],Se.prototype,"zone",void 0),e([ue({type:String})],Se.prototype,"icon",void 0),e([fe()],Se.prototype,"_x",void 0),e([fe()],Se.prototype,"_y",void 0),Se=e([he("mower-animation")],Se);const Pe={low:20,high:40};let Ee=class extends ce{render(){if(!this.sensor||!this.hass)return W;const e=this.hass.states[this.sensor.entity],t=e?.state??"?",o=e?.attributes?.unit_of_measurement??"",[i,n]=this.sensor.position,s=parseFloat(t),a=this.sensor.thresholds??Pe,r=isNaN(s)?"#9e9e9e":function(e,t){return e>t.high?"#4CAF50":e>=t.low?"#FFC107":"#F44336"}(s,a);return this.style.left=`${i}%`,this.style.top=`${n}%`,B`
      <div class="badge" style="border-color: ${r}; color: ${r};">
        ${this.sensor.icon?B`<ha-icon icon="${this.sensor.icon}" style="color: ${r};"></ha-icon>`:W}
        <span class="value">${t}${o}</span>
      </div>
    `}};function Me(e,t,o,i){return[Math.min(100,Math.max(0,e/o*100)),Math.min(100,Math.max(0,t/i*100))]}Ee.styles=a`
    :host {
      display: block;
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px 3px 5px;
      background: rgba(0, 0, 0, 0.62);
      border-radius: 999px;
      border: 1.5px solid;
      white-space: nowrap;
      backdrop-filter: blur(4px);
    }

    ha-icon {
      --mdc-icon-size: 14px;
      flex-shrink: 0;
    }

    .value {
      font-size: 12px;
      font-weight: 600;
      color: #fff;
      line-height: 1;
    }
  `,e([ue({attribute:!1})],Ee.prototype,"sensor",void 0),e([ue({attribute:!1})],Ee.prototype,"hass",void 0),Ee=e([he("sensor-badge")],Ee);let Ze=class extends ce{constructor(){super(...arguments),this.image="",this.existingZones=[],this.polygon=[],this.color="#03a9f4",this._isClosed=!1,this._draggingIndex=null,this._validationMessage="",this._longPressTimer=null,this._didDrag=!1,this._pendingPosition=null}disconnectedCallback(){super.disconnectedCallback(),this._clearLongPress()}render(){return this.image?B`
      <div class="zone-editor">
        <div class="canvas-container"
          @click=${this._handleCanvasClick}
          @pointermove=${this._handlePointerMove}
          @pointerup=${this._handlePointerUp}
          @contextmenu=${this._handleContextMenu}
        >
          <img
            src="${this.image}"
            alt="Garden"
            class="garden-image"
            @load=${this._handleImageLoad}
          />

          <!-- Other zones overlay (reference) -->
          ${this.existingZones.filter(e=>e.polygon&&e.polygon.length>=3).map(e=>{const t=e.polygon.reduce((e,[t])=>e+t,0)/e.polygon.length,o=e.polygon.reduce((e,[,t])=>e+t,0)/e.polygon.length;return B`
              <div class="existing-zone-fill" style="clip-path: polygon(${e.polygon.map(([e,t])=>`${e}% ${t}%`).join(", ")}); background-color: ${e.color||"#888"};"></div>
              <span class="existing-zone-label" style="left: ${t}%; top: ${o}%;">${e.name}</span>
            `})}

          <!-- Current zone fill overlay -->
          ${this.polygon.length>=3?B`
            <div class="zone-fill" style="clip-path: polygon(${this.polygon.map(([e,t])=>`${e}% ${t}%`).join(", ")})"></div>
          `:W}

          <!-- Lines between vertices -->
          ${this._renderLines()}

          <!-- Vertices as HTML elements -->
          ${this._renderVerticesAsHtml()}
        </div>

        <!-- Controls -->
        <div class="editor-controls">
          ${this._isClosed?B`
                <span class="status-text">✓ Polygon complete (${this.polygon.length} points)</span>
                <button class="btn btn-secondary" @click=${this._handleReset}>
                  Reset
                </button>
              `:B`
                <span class="status-text">
                  ${0===this.polygon.length?"Click on the image to add points":`${this.polygon.length} point${1!==this.polygon.length?"s":""} — click first point or Confirm to close`}
                </span>
                ${this.polygon.length>0?B`<button class="btn btn-danger" @click=${this._handleRemoveLastPoint}>
                      Undo
                    </button>`:W}
                <button class="btn btn-primary" @click=${this._handleConfirm}>
                  Confirm
                </button>
              `}
          ${this._validationMessage?B`<span class="validation-message">${this._validationMessage}</span>`:W}
        </div>
      </div>
    `:B`
        <div class="no-image">
          <p>Configure an image URL first</p>
        </div>
      `}_renderExistingZones(){return this.existingZones.map(e=>B`
        <g class="existing-zone">
          <polygon
            points="${(e.polygon||[]).map(([e,t])=>`${e}%,${t}%`).join(" ")}"
            fill="${e.color}"
            opacity="0.25"
            stroke="${e.color}"
            stroke-width="0.3"
            stroke-dasharray="1,1"
          />
          ${this._renderZoneLabel(e)}
        </g>
      `)}_renderZoneLabel(e){if(!e.polygon||e.polygon.length<3)return W;const t=e.polygon.reduce((e,[t])=>e+t,0)/e.polygon.length,o=e.polygon.reduce((e,[,t])=>e+t,0)/e.polygon.length;return B`
      <text
        x="${t}"
        y="${o}"
        text-anchor="middle"
        dominant-baseline="middle"
        class="zone-label"
        fill="${e.color}"
      >
        ${e.name}
      </text>
    `}_renderCurrentPolygon(){if(this.polygon.length<2)return this.polygon.length,W;if(this._isClosed){const e=this.polygon.map(([e,t])=>`${e}%,${t}%`).join(" ");return B`
        <polygon
          points="${e}"
          fill="rgba(3, 169, 244, 0.3)"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linejoin="round"
        />
      `}const e=this.polygon.map(([e,t])=>`${e}%,${t}%`).join(" "),t=[...this.polygon,this.polygon[0]].map(([e,t])=>`${e}%,${t}%`).join(" ");return B`
      <!-- Semi-transparent fill preview -->
      <polygon
        points="${t}"
        fill="rgba(3, 169, 244, 0.25)"
        stroke="none"
      />
      <!-- Visible stroke for the drawn lines -->
      <polyline
        points="${e}"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `}_renderVerticesAsHtml(){return this.polygon.map(([e,t],o)=>{const i=0===o&&!this._isClosed&&this.polygon.length>2,n=this._draggingIndex===o;return B`
          <div
            class="vertex-dot ${i?"vertex-dot--first":""} ${n?"vertex-dot--dragging":""}"
            style="left: ${e}%; top: ${t}%;"
            data-index="${o}"
            @pointerdown=${e=>this._handleVertexPointerDown(e,o)}
            @contextmenu=${e=>this._handleVertexContextMenu(e,o)}
          >
            ${W}
          </div>
        `})}_renderLines(){if(this.polygon.length<2)return W;const e=[],t=this.polygon.length>=3?[...this.polygon,this.polygon[0]]:this.polygon;for(let o=0;o<t.length-1;o++){const[i,n]=t[o],[s,a]=t[o+1];e.push(B`
        <svg class="line-svg" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;">
          <line
            x1="${i}%" y1="${n}%"
            x2="${s}%" y2="${a}%"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      `)}return e}_handleImageLoad(){this.requestUpdate()}_handleCanvasClick(e){if(this._didDrag)return void(this._didDrag=!1);if(null!==this._draggingIndex)return;if(this._isClosed)return;const t=e.target;if(t.closest(".vertex-dot")||t.closest(".line-svg"))return;const o=this.renderRoot.querySelector(".canvas-container");if(!o)return;const i=o.getBoundingClientRect(),n=e.clientX-i.left,s=e.clientY-i.top,[a,r]=Me(n,s,i.width,i.height);if(this.polygon.length>2){const[e,t]=this.polygon[0];if(Math.sqrt((a-e)**2+(r-t)**2)<=3)return void this._closePolygon()}this._clearValidationMessage();const l=[...this.polygon,[a,r]];this.polygon=l,this._dispatchPolygonChanged()}_handleVertexPointerDown(e,t){e.preventDefault(),e.stopPropagation(),this._draggingIndex=t,this._didDrag=!1}_handlePointerMove(e){if(null===this._draggingIndex)return;this._didDrag=!0;const t=this.renderRoot.querySelector(".canvas-container");if(!t)return;const o=t.getBoundingClientRect(),i=e.clientX-o.left,n=e.clientY-o.top,[s,a]=Me(i,n,o.width,o.height),r=this.renderRoot.querySelectorAll(".vertex-dot")[this._draggingIndex];r&&(r.style.left=`${s}%`,r.style.top=`${a}%`),this._pendingPosition=[s,a]}_handlePointerUp(e){if(null!==this._draggingIndex){if(this._didDrag&&this._pendingPosition){const e=[...this.polygon];e[this._draggingIndex]=this._pendingPosition,this.polygon=e,this._dispatchPolygonChanged()}this._draggingIndex=null,this._pendingPosition=null}}_handleContextMenu(e){e.preventDefault()}_handleVertexContextMenu(e,t){e.preventDefault(),e.stopPropagation(),this._deleteVertex(t)}_handleRemoveLastPoint(){0!==this.polygon.length&&(this.polygon=this.polygon.slice(0,-1),this._clearValidationMessage(),this._dispatchPolygonChanged())}_handleConfirm(){this.polygon.length<3?this._validationMessage="A zone needs at least 3 points":this._closePolygon()}_handleReset(){this.polygon=[],this._isClosed=!1,this._clearValidationMessage(),this._dispatchPolygonChanged()}_closePolygon(){this._isClosed=!0,this._clearValidationMessage(),this._dispatchPolygonComplete()}_deleteVertex(e){if(0===this.polygon.length)return;const t=this.polygon.filter((t,o)=>o!==e);this.polygon=t,this._isClosed&&t.length<3&&(this._isClosed=!1),this._dispatchPolygonChanged()}_clearLongPress(){null!==this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=null)}_clearValidationMessage(){this._validationMessage=""}_dispatchPolygonChanged(){this.dispatchEvent(new CustomEvent("polygon-changed",{detail:{polygon:[...this.polygon]},bubbles:!0,composed:!0}))}_dispatchPolygonComplete(){this.dispatchEvent(new CustomEvent("polygon-complete",{detail:{polygon:[...this.polygon]},bubbles:!0,composed:!0}))}};Ze.styles=a`
    :host {
      display: block;
    }

    .zone-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .no-image {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color, #727272);
      border: 2px dashed var(--divider-color, #e0e0e0);
      border-radius: 12px;
    }

    .no-image p {
      margin: 0;
      font-size: 14px;
    }

    /* Canvas container: image + SVG overlay */
    .canvas-container {
      position: relative;
      width: 100%;
      line-height: 0;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid var(--divider-color, #e0e0e0);
      cursor: crosshair;
    }

    .garden-image {
      width: 100%;
      height: auto;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
    }

    .drawing-svg {
      display: none;
    }

    .zone-fill {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(3, 169, 244, 0.45);
      pointer-events: none;
      z-index: 5;
    }

    .existing-zone-fill {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.9;
      pointer-events: none;
      z-index: 4;
    }

    .existing-zone-label {
      position: absolute;
      transform: translate(-50%, -50%);
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.7);
      pointer-events: none;
      z-index: 5;
      white-space: nowrap;
    }

    .line-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 6;
      overflow: visible;
    }

    /* Existing zone polygons (reference) */
    .existing-zone polygon {
      pointer-events: none;
    }

    .zone-label {
      font-size: 3px;
      font-weight: 500;
      pointer-events: none;
      user-select: none;
    }

    /* Vertex dots (HTML positioned elements) */
    .vertex-dot {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #03a9f4;
      transform: translate(-50%, -50%);
      cursor: grab;
      z-index: 10;
      box-shadow: 0 1px 4px rgba(0,0,0,0.5);
      transition: transform 150ms ease, box-shadow 150ms ease;
    }

    .vertex-dot:hover {
      transform: translate(-50%, -50%) scale(1.5);
      box-shadow: 0 2px 8px rgba(0,0,0,0.6);
    }

    .vertex-dot--first {
      background: #ff5722;
      border-color: #ffffff;
      width: 10px;
      height: 10px;
      cursor: pointer;
    }

    .vertex-dot--first:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }

    .vertex-dot--dragging {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.4);
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    }

    .vertex-label {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: #ff5722;
      font-weight: 600;
      white-space: nowrap;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    /* Editor controls bar */
    .editor-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      flex-wrap: wrap;
    }

    .status-text {
      font-size: 13px;
      color: var(--secondary-text-color, #727272);
      flex: 1;
      min-width: 0;
    }

    .validation-message {
      font-size: 12px;
      color: var(--error-color, #db4437);
      width: 100%;
      margin-top: 4px;
    }

    /* Buttons */
    .btn {
      padding: 6px 16px;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      min-height: 36px;
      min-width: 44px;
      transition: background 150ms ease, opacity 150ms ease;
      white-space: nowrap;
    }

    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
    }

    .btn-primary:hover {
      opacity: 0.85;
    }

    .btn-secondary {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #212121);
    }

    .btn-secondary:hover {
      background: var(--divider-color, #e0e0e0);
    }

    .btn-danger {
      background: rgba(244, 67, 54, 0.1);
      color: #f44336;
      border: 1px solid #f44336;
    }

    .btn-danger:hover {
      background: rgba(244, 67, 54, 0.2);
    }
  `,e([ue({type:String})],Ze.prototype,"image",void 0),e([ue({attribute:!1})],Ze.prototype,"existingZones",void 0),e([ue({attribute:!1})],Ze.prototype,"polygon",void 0),e([ue({type:String})],Ze.prototype,"color",void 0),e([fe()],Ze.prototype,"_isClosed",void 0),e([fe()],Ze.prototype,"_draggingIndex",void 0),e([fe()],Ze.prototype,"_validationMessage",void 0),Ze=e([he("zone-editor")],Ze);(async()=>{const e=await(window.loadCardHelpers?.());e&&await e.createCardElement({type:"entities",entities:[]})})();let Le=class extends ce{constructor(){super(...arguments),this._editingPolygonIndex=null,this._editingMowerZone=!1,this._editingPoolZone=!1,this._editingSensorIndex=null}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this.requestUpdate()}_dispatchConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_handleTitleChange(e){const t=e.target;this._dispatchConfigChanged({...this._config,title:t.value})}_handleImageChange(e){const t=e.target;this._dispatchConfigChanged({...this._config,image:t.value})}_handleAddZone(){const e={id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}),name:`Zone ${this._config.zones.length+1}`,entity:"",color:"#4CAF50",polygon:[]};this._dispatchConfigChanged({...this._config,zones:[...this._config.zones,e]})}_handleRemoveZone(e){const t=[...this._config.zones];t.splice(e,1),this._dispatchConfigChanged({...this._config,zones:t})}_handleMoveZoneUp(e){if(e<=0)return;const t=[...this._config.zones];[t[e-1],t[e]]=[t[e],t[e-1]],this._dispatchConfigChanged({...this._config,zones:t})}_handleMoveZoneDown(e){if(e>=this._config.zones.length-1)return;const t=[...this._config.zones];[t[e],t[e+1]]=[t[e+1],t[e]],this._dispatchConfigChanged({...this._config,zones:t})}_handleZoneNameChange(e,t){const o=t.target,i=[...this._config.zones];i[e]={...i[e],name:o.value},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],entity:o},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneColorChange(e,t){const o=t.target,i=[...this._config.zones];i[e]={...i[e],color:o.value},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneDurationEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],duration_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneCountdownEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],countdown_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneScheduleEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],schedule_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleEditPolygon(e){this._editingPolygonIndex=this._editingPolygonIndex===e?null:e}_handlePolygonChanged(e,t){const o=t.detail?.polygon||[],i=[...this._config.zones||[]];i[e]={...i[e],polygon:o},this._dispatchConfigChanged({...this._config,zones:i})}_handlePolygonComplete(e,t){const o=t.detail?.polygon||[],i=[...this._config.zones||[]];i[e]={...i[e],polygon:o},this._dispatchConfigChanged({...this._config,zones:i}),this._editingPolygonIndex=null}_handleEditMowerZone(){this._editingMowerZone=!this._editingMowerZone}_handleMowerZoneChanged(e){const t=e.detail?.polygon||[],o={...this._config.mower||{entity:""},zone:t};this._dispatchConfigChanged({...this._config,mower:o})}_handleMowerZoneComplete(e){const t=e.detail?.polygon||[],o={...this._config.mower||{entity:""},zone:t};this._dispatchConfigChanged({...this._config,mower:o}),this._editingMowerZone=!1}_handlePoolEntityChange(e){const t=e.detail?.value??"";if(!t){const{pool:e,...t}=this._config;return void this._dispatchConfigChanged(t)}const o={...this._config.pool||{entity:""},entity:t};this._dispatchConfigChanged({...this._config,pool:o})}_handleEditPoolZone(){this._editingPoolZone=!this._editingPoolZone}_handlePoolZoneChanged(e){const t=e.detail?.polygon||[],o={...this._config.pool||{entity:""},zone:t};this._dispatchConfigChanged({...this._config,pool:o})}_handlePoolZoneComplete(e){const t=e.detail?.polygon||[],o={...this._config.pool||{entity:""},zone:t};this._dispatchConfigChanged({...this._config,pool:o}),this._editingPoolZone=!1}_handleMowerEntityChange(e){const t=e.detail?.value??"";if(!t){const{mower:e,...t}=this._config;return void this._dispatchConfigChanged(t)}const o={...this._config.mower||{entity:""},entity:t};this._dispatchConfigChanged({...this._config,mower:o})}_handleMowerBatteryEntityChange(e){const t=e.detail?.value??"";if(!this._config.mower)return;const o={...this._config.mower,battery_entity:t||void 0};this._dispatchConfigChanged({...this._config,mower:o})}_handleAddSensor(){const e=[...this._config.sensors||[],{entity:"",position:[50,50]}];this._dispatchConfigChanged({...this._config,sensors:e}),this._editingSensorIndex=e.length-1}_handleRemoveSensor(e){const t=[...this._config.sensors||[]];t.splice(e,1),this._editingSensorIndex===e&&(this._editingSensorIndex=null),this._dispatchConfigChanged({...this._config,sensors:t.length?t:void 0})}_handleSensorFieldChange(e,t,o){const i=[...this._config.sensors||[]];i[e]={...i[e],[t]:o||void 0},"entity"===t&&(i[e].entity=o),this._dispatchConfigChanged({...this._config,sensors:i})}_handleSensorThresholdChange(e,t,o){const i=parseFloat(o.target.value),n=[...this._config.sensors||[]],s=n[e].thresholds??{low:20,high:40};n[e]={...n[e],thresholds:{...s,[t]:isNaN(i)?s[t]:i}},this._dispatchConfigChanged({...this._config,sensors:n})}_handleSensorPositionPick(e,t){const o=t.currentTarget.closest(".sensor-picker-container");if(!o)return;const i=o.getBoundingClientRect(),n=Math.round((t.clientX-i.left)/i.width*100),s=Math.round((t.clientY-i.top)/i.height*100),a=[...this._config.sensors||[]];a[e]={...a[e],position:[n,s]},this._dispatchConfigChanged({...this._config,sensors:a})}render(){if(!this._config)return W;return B`
      <div class="editor">
        <ha-form
          .hass=${this._hass}
          .data=${this._config}
          .schema=${[{name:"title",selector:{text:{}},label:"Card Title"},{name:"image",selector:{text:{}},label:"Image URL (e.g. /local/garden.png)"},{name:"layout",selector:{select:{options:["","compact","medium","wide"],mode:"dropdown"}},label:"Layout (optional)"},{name:"zones_columns",selector:{number:{min:1,max:6,mode:"box"}},label:"Zone Columns"}]}
          .computeLabel=${e=>e.label||e.name}
          @value-changed=${this._handleFormChanged}
        ></ha-form>

        <h3 class="section-title">🤖 Robot Mower (optional)</h3>
        <ha-form
          .hass=${this._hass}
          .data=${this._config.mower||{}}
          .schema=${[{name:"entity",selector:{entity:{domain:"lawn_mower"}},label:"Mower Entity"},{name:"battery_entity",selector:{entity:{domain:"sensor"}},label:"Battery Sensor (optional)"}]}
          .computeLabel=${e=>e.label||e.name}
          @value-changed=${this._handleMowerFormChanged}
        ></ha-form>
        ${this._config.mower?.entity?B`
          <div class="field">
            <div class="polygon-status">
              ${this._config.mower?.zone&&this._config.mower.zone.length>=3?B`<span class="polygon-info">✓ ${this._config.mower.zone.length} points</span>`:B`<span class="polygon-info polygon-info--empty">No mower zone</span>`}
              <button class="btn-draw" @click=${this._handleEditMowerZone}>
                ${this._editingMowerZone?"Close":"Draw Mower Zone"}
              </button>
            </div>
            ${this._editingMowerZone?B`
              <zone-editor
                .image=${this._config.image||""}
                .existingZones=${this._config.zones||[]}
                .polygon=${this._config.mower?.zone||[]}
                @polygon-changed=${this._handleMowerZoneChanged}
                @polygon-complete=${this._handleMowerZoneComplete}
              ></zone-editor>
            `:W}
          </div>
        `:W}

        <h3 class="section-title">🏊 Pool Cleaner (optional)</h3>
        <ha-form
          .hass=${this._hass}
          .data=${this._config.pool||{}}
          .schema=${[{name:"entity",selector:{entity:{domain:["switch","vacuum","input_boolean"]}},label:"Pool Cleaner Entity"}]}
          .computeLabel=${e=>e.label||e.name}
          @value-changed=${this._handlePoolFormChanged}
        ></ha-form>
        ${this._config.pool?.entity?B`
          <div class="field">
            <div class="polygon-status">
              ${this._config.pool?.zone&&this._config.pool.zone.length>=3?B`<span class="polygon-info">✓ ${this._config.pool.zone.length} points</span>`:B`<span class="polygon-info polygon-info--empty">No pool zone</span>`}
              <button class="btn-draw" @click=${this._handleEditPoolZone}>
                ${this._editingPoolZone?"Close":"Draw Pool Zone"}
              </button>
            </div>
            ${this._editingPoolZone?B`
              <zone-editor
                .image=${this._config.image||""}
                .existingZones=${this._config.zones||[]}
                .polygon=${this._config.pool?.zone||[]}
                @polygon-changed=${this._handlePoolZoneChanged}
                @polygon-complete=${this._handlePoolZoneComplete}
              ></zone-editor>
            `:W}
          </div>
        `:W}

        ${this._renderZonesSection()}
        ${this._renderSensorsSection()}
      </div>
    `}_handleFormChanged(e){e.stopPropagation();const t={...this._config,...e.detail.value};this._dispatchConfigChanged(t)}_handleMowerFormChanged(e){e.stopPropagation();const t=e.detail.value;if(t.entity){const e={...this._config.mower||{entity:""},...t};this._dispatchConfigChanged({...this._config,mower:e})}else{const{mower:e,...t}=this._config;this._dispatchConfigChanged(t)}}_handlePoolFormChanged(e){e.stopPropagation();const t=e.detail.value;if(t.entity){const e={...this._config.pool||{entity:""},...t};this._dispatchConfigChanged({...this._config,pool:e})}else{const{pool:e,...t}=this._config;this._dispatchConfigChanged(t)}}_renderGeneralSection(){return B`
      <div class="section">
        <h3 class="section-title">General</h3>
        <div class="field">
          <label class="field-label">Title</label>
          <input
            type="text"
            .value=${this._config.title||""}
            @input=${this._handleTitleChange}
            placeholder="My Garden"
            class="text-input"
          />
        </div>
        <div class="field">
          <label class="field-label">Image URL</label>
          <input
            type="text"
            .value=${this._config.image||""}
            @input=${this._handleImageChange}
            placeholder="/local/garden.jpg"
            class="text-input"
          />
        </div>
      </div>
    `}_renderZonesSection(){const e=!this._config.zones||0===this._config.zones.length;return B`
      <div class="section">
        <div class="section-header">
          <h3 class="section-title">Zones</h3>
          <button class="add-button" @click=${this._handleAddZone}>
            + Add Zone
          </button>
        </div>

        ${e?B`<div class="warning">
              ⚠️ At least one zone is required for the card to work.
            </div>`:W}

        <div class="zone-list">
          ${(this._config.zones||[]).map((e,t)=>this._renderZoneEntry(e,t))}
        </div>
      </div>
    `}_renderZoneEntry(e,t){const o=0===t,i=t===(this._config.zones||[]).length-1;return B`
      <div class="zone-entry">
        <div class="zone-header">
          <span class="zone-number">${t+1}</span>
          <span class="zone-name-display">${e.name||"Unnamed"}</span>
          <div class="zone-actions">
            <button
              class="icon-button"
              @click=${()=>this._handleMoveZoneUp(t)}
              ?disabled=${o}
              title="Move up"
            >
              ▲
            </button>
            <button
              class="icon-button"
              @click=${()=>this._handleMoveZoneDown(t)}
              ?disabled=${i}
              title="Move down"
            >
              ▼
            </button>
            <button
              class="icon-button remove-button"
              @click=${()=>this._handleRemoveZone(t)}
              title="Remove zone"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="zone-fields">
          <div class="field">
            <label class="field-label">Name</label>
            <input
              type="text"
              .value=${e.name||""}
              @input=${e=>this._handleZoneNameChange(t,e)}
              placeholder="Zone name"
              class="text-input"
            />
          </div>

          <div class="field">
            <label class="field-label">Entity (switch/valve)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${e.entity||""}
              .includeDomains=${["switch","valve","input_boolean"]}
              @value-changed=${e=>this._handleZoneEntityChange(t,e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Color</label>
            <div class="color-picker-row">
              <input
                type="color"
                .value=${e.color||"#4CAF50"}
                @input=${e=>this._handleZoneColorChange(t,e)}
                class="color-input"
              />
              <span class="color-value">${e.color||"#4CAF50"}</span>
            </div>
          </div>

          <div class="field">
            <label class="field-label">Duration Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${e.duration_entity||""}
              .includeDomains=${["number"]}
              @value-changed=${e=>this._handleZoneDurationEntityChange(t,e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Countdown Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${e.countdown_entity||""}
              .includeDomains=${["sensor"]}
              @value-changed=${e=>this._handleZoneCountdownEntityChange(t,e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Schedule Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${e.schedule_entity||""}
              .includeDomains=${["input_datetime","schedule","sensor"]}
              @value-changed=${e=>this._handleZoneScheduleEntityChange(t,e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Zone Shape</label>
            <div class="polygon-status">
              ${e.polygon&&e.polygon.length>=3?B`<span class="polygon-info">✓ ${e.polygon.length} points defined</span>`:B`<span class="polygon-info polygon-info--empty">No shape defined</span>`}
              <button
                class="btn-draw"
                @click=${()=>this._handleEditPolygon(t)}
              >
                ${this._editingPolygonIndex===t?"Close Editor":"Draw Zone"}
              </button>
            </div>
            ${this._editingPolygonIndex===t?B`
                  <zone-editor
                    .image=${this._config.image||""}
                    .existingZones=${(this._config.zones||[]).filter((e,o)=>o!==t)}
                    .polygon=${e.polygon||[]}
                    .color=${e.color||"#4CAF50"}
                    @polygon-changed=${e=>this._handlePolygonChanged(t,e)}
                    @polygon-complete=${e=>this._handlePolygonComplete(t,e)}
                  ></zone-editor>
                `:W}
          </div>
        </div>
      </div>
    `}_renderSensorsSection(){const e=this._config.sensors||[];return B`
      <div class="section">
        <div class="section-header">
          <h3 class="section-title">🌡️ Sensor Badges (optional)</h3>
          <button class="add-button" @click=${this._handleAddSensor}>+ Add Sensor</button>
        </div>
        <div class="zone-list">
          ${e.map((e,t)=>B`
            <div class="zone-entry">
              <div class="zone-header">
                <span class="zone-number">${t+1}</span>
                <span class="zone-name-display">${e.name||e.entity||"New Sensor"}</span>
                <div class="zone-actions">
                  <button class="icon-button remove-button" @click=${()=>this._handleRemoveSensor(t)} title="Remove">✕</button>
                </div>
              </div>
              <div class="zone-fields">
                <div class="field">
                  <label class="field-label">Entity</label>
                  <ha-entity-picker
                    .hass=${this._hass}
                    .value=${e.entity||""}
                    .includeDomains=${["sensor"]}
                    @value-changed=${e=>this._handleSensorFieldChange(t,"entity",e.detail?.value??"")}
                    allow-custom-entity
                  ></ha-entity-picker>
                </div>
                <div class="field">
                  <label class="field-label">Name (optional)</label>
                  <input type="text" class="text-input" .value=${e.name||""}
                    @input=${e=>this._handleSensorFieldChange(t,"name",e.target.value)}
                    placeholder="e.g. Soil Moisture" />
                </div>
                <div class="field">
                  <label class="field-label">Icon (optional, e.g. mdi:water-percent)</label>
                  <input type="text" class="text-input" .value=${e.icon||""}
                    @input=${e=>this._handleSensorFieldChange(t,"icon",e.target.value)}
                    placeholder="mdi:water-percent" />
                </div>
                <div class="field">
                  <label class="field-label">
                    Position — ${e.position[0]}%, ${e.position[1]}%
                    ${this._config.image?B`
                      <button class="btn-draw" style="margin-left:8px;"
                        @click=${()=>{this._editingSensorIndex=this._editingSensorIndex===t?null:t}}>
                        ${this._editingSensorIndex===t?"Close Picker":"Pick on Image"}
                      </button>`:W}
                  </label>
                  <div class="sensor-position-inputs">
                    <label class="field-label" style="margin:0;">X%</label>
                    <input type="number" class="text-input" style="width:70px;" min="0" max="100"
                      .value=${String(e.position[0])}
                      @input=${o=>{const i=parseInt(o.target.value);isNaN(i)||this._handleSensorFieldChange(t,"position",[i,e.position[1]])}} />
                    <label class="field-label" style="margin:0;">Y%</label>
                    <input type="number" class="text-input" style="width:70px;" min="0" max="100"
                      .value=${String(e.position[1])}
                      @input=${o=>{const i=parseInt(o.target.value);isNaN(i)||this._handleSensorFieldChange(t,"position",[e.position[0],i])}} />
                  </div>
                  ${this._editingSensorIndex===t&&this._config.image?B`
                    <div class="sensor-picker-container" @click=${e=>this._handleSensorPositionPick(t,e)}>
                      <img src="${this._config.image}" alt="Garden" style="width:100%;display:block;pointer-events:none;" />
                      <div class="sensor-pick-dot" style="left:${e.position[0]}%;top:${e.position[1]}%;"></div>
                      <div class="sensor-pick-hint">Click to set position</div>
                    </div>
                  `:W}
                </div>
                <div class="field">
                  <label class="field-label">Color Thresholds (for numeric sensors)</label>
                  <div class="sensor-position-inputs">
                    <label class="field-label" style="margin:0;">🔴 Low &lt;</label>
                    <input type="number" class="text-input" style="width:70px;"
                      .value=${String(e.thresholds?.low??20)}
                      @input=${e=>this._handleSensorThresholdChange(t,"low",e)} />
                    <label class="field-label" style="margin:0;">🟡→🟢 High &gt;</label>
                    <input type="number" class="text-input" style="width:70px;"
                      .value=${String(e.thresholds?.high??40)}
                      @input=${e=>this._handleSensorThresholdChange(t,"high",e)} />
                  </div>
                </div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `}_renderMowerSection(){return B`
      <div class="section">
        <h3 class="section-title">🤖 Robot Mower (optional)</h3>
        <div class="field">
          <label class="field-label">Mower Entity</label>
          <ha-entity-picker
            .hass=${this._hass}
            .value=${this._config.mower?.entity||""}
            .includeDomains=${["lawn_mower"]}
            @value-changed=${this._handleMowerEntityChange}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        ${this._config.mower?.entity?B`
              <div class="field">
                <label class="field-label">Battery Sensor (optional)</label>
                <ha-entity-picker
                  .hass=${this._hass}
                  .value=${this._config.mower?.battery_entity||""}
                  .includeDomains=${["sensor"]}
                  @value-changed=${this._handleMowerBatteryEntityChange}
                  allow-custom-entity
                ></ha-entity-picker>
              </div>

              <div class="field">
                <label class="field-label">Mower Zone</label>
                <div class="polygon-status">
                  ${this._config.mower?.zone&&this._config.mower.zone.length>=3?B`<span class="polygon-info">✓ ${this._config.mower.zone.length} points defined</span>`:B`<span class="polygon-info polygon-info--empty">No mower zone defined</span>`}
                  <button
                    class="btn-draw"
                    @click=${this._handleEditMowerZone}
                  >
                    ${this._editingMowerZone?"Close Editor":"Draw Mower Zone"}
                  </button>
                </div>
                ${this._editingMowerZone?B`
                      <zone-editor
                        .image=${this._config.image||""}
                        .existingZones=${this._config.zones||[]}
                        .polygon=${this._config.mower?.zone||[]}
                        @polygon-changed=${this._handleMowerZoneChanged}
                        @polygon-complete=${this._handleMowerZoneComplete}
                      ></zone-editor>
                    `:W}
              </div>
            `:W}
      </div>
    `}_renderPoolSection(){return B`
      <div class="section">
        <h3 class="section-title">🏊 Pool Cleaner (optional)</h3>
        <div class="field">
          <label class="field-label">Pool Cleaner Entity</label>
          <ha-entity-picker
            .hass=${this._hass}
            .value=${this._config.pool?.entity||""}
            .includeDomains=${["switch","vacuum","input_boolean"]}
            @value-changed=${this._handlePoolEntityChange}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        ${this._config.pool?.entity?B`
              <div class="field">
                <label class="field-label">Pool Zone</label>
                <div class="polygon-status">
                  ${this._config.pool?.zone&&this._config.pool.zone.length>=3?B`<span class="polygon-info">✓ ${this._config.pool.zone.length} points defined</span>`:B`<span class="polygon-info polygon-info--empty">No pool zone defined</span>`}
                  <button
                    class="btn-draw"
                    @click=${this._handleEditPoolZone}
                  >
                    ${this._editingPoolZone?"Close Editor":"Draw Pool Zone"}
                  </button>
                </div>
                ${this._editingPoolZone?B`
                      <zone-editor
                        .image=${this._config.image||""}
                        .existingZones=${this._config.zones||[]}
                        .polygon=${this._config.pool?.zone||[]}
                        @polygon-changed=${this._handlePoolZoneChanged}
                        @polygon-complete=${this._handlePoolZoneComplete}
                      ></zone-editor>
                    `:W}
              </div>
            `:W}
      </div>
    `}};Le.styles=a`
    .editor {
      padding: 16px;
      font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
    }

    .section {
      margin-bottom: 24px;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 12px 0;
      color: var(--primary-text-color, #212121);
    }

    .section-header .section-title {
      margin-bottom: 0;
    }

    .field {
      margin-bottom: 12px;
    }

    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #727272);
      margin-bottom: 4px;
    }

    .text-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 14px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-sizing: border-box;
      outline: none;
      transition: border-color 200ms ease;
    }

    .text-input:focus {
      border-color: var(--primary-color, #03a9f4);
    }

    .text-input::placeholder {
      color: var(--secondary-text-color, #727272);
      opacity: 0.6;
    }

    .add-button {
      padding: 6px 12px;
      border: none;
      border-radius: 8px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 200ms ease;
    }

    .add-button:hover {
      opacity: 0.85;
    }

    .warning {
      padding: 12px;
      border-radius: 8px;
      background: #fff3cd;
      color: #856404;
      font-size: 13px;
      margin-bottom: 12px;
    }

    .zone-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .zone-entry {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      overflow: hidden;
    }

    .zone-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--secondary-background-color, #f5f5f5);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .zone-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .zone-name-display {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .zone-actions {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .icon-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 12px;
      cursor: pointer;
      transition: background 200ms ease, color 200ms ease;
    }

    .icon-button:hover:not([disabled]) {
      background: var(--divider-color, #e0e0e0);
      color: var(--primary-text-color, #212121);
    }

    .icon-button[disabled] {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .icon-button.remove-button:hover:not([disabled]) {
      background: #ffebee;
      color: #c62828;
    }

    .zone-fields {
      padding: 12px;
    }

    .color-picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-input {
      width: 44px;
      height: 44px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 2px;
      cursor: pointer;
      background: transparent;
    }

    .color-value {
      font-size: 13px;
      font-family: monospace;
      color: var(--secondary-text-color, #727272);
    }

    ha-entity-picker {
      display: block;
      width: 100%;
    }

    .polygon-status {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .polygon-info {
      font-size: 13px;
      color: var(--primary-text-color, #212121);
      flex: 1;
    }

    .polygon-info--empty {
      color: var(--secondary-text-color, #727272);
      font-style: italic;
    }

    .btn-draw {
      padding: 6px 12px;
      border: 1px solid var(--primary-color, #03a9f4);
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 200ms ease;
      white-space: nowrap;
    }

    .btn-draw:hover {
      background: rgba(3, 169, 244, 0.1);
    }

    zone-editor {
      margin-top: 8px;
    }

    .sensor-position-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .sensor-picker-container {
      position: relative;
      margin-top: 8px;
      border-radius: 8px;
      overflow: hidden;
      cursor: crosshair;
      border: 2px dashed var(--primary-color, #03a9f4);
    }

    .sensor-pick-dot {
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      border: 2px solid #fff;
      transform: translate(-50%, -50%);
      box-shadow: 0 1px 4px rgba(0,0,0,0.5);
      pointer-events: none;
    }

    .sensor-pick-hint {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.6);
      color: #fff;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      pointer-events: none;
      white-space: nowrap;
    }
  `,e([fe()],Le.prototype,"_config",void 0),e([fe()],Le.prototype,"_hass",void 0),e([fe()],Le.prototype,"_editingPolygonIndex",void 0),e([fe()],Le.prototype,"_editingMowerZone",void 0),e([fe()],Le.prototype,"_editingPoolZone",void 0),e([fe()],Le.prototype,"_editingSensorIndex",void 0),Le=e([he("ha-garden-card-editor")],Le);let Ue=class extends ce{constructor(){super(...arguments),this._activeZone=null,this._cardWidth=0,this._relevantEntities=new Set}static getConfigElement(){return document.createElement("ha-garden-card-editor")}static getStubConfig(){return{type:"custom:ha-garden-card",title:"My Garden",zones:[{id:"zone_1",name:"Zone 1",entity:"switch.irrigation_zone_1",color:"#4CAF50",polygon:[[10,10],[40,10],[40,40],[10,40]]}]}}setConfig(e){!function(e){if(!e)throw new Error("Configuration is required");if(e.zones&&Array.isArray(e.zones))for(const t of e.zones)ve(t)}(e),this._config=e,this._relevantEntities=function(e){const t=new Set;for(const o of e.zones||[])o.entity&&t.add(o.entity),o.duration_entity&&t.add(o.duration_entity),o.countdown_entity&&t.add(o.countdown_entity),o.schedule_entity&&t.add(o.schedule_entity);e.mower&&(t.add(e.mower.entity),e.mower.battery_entity&&t.add(e.mower.battery_entity)),e.pool&&t.add(e.pool.entity);for(const o of e.sensors||[])t.add(o.entity);return t}(e)}getCardSize(){if(!this._config)return 3;let e=3;return e+=Math.ceil((this._config.zones||[]).length/2),this._config.mower&&(e+=2),e}set hass(e){const t=this._hass;if(!t)return this._hass=e,void this.requestUpdate();let o=!1;for(const i of this._relevantEntities){if(t.states[i]!==e.states[i]){o=!0;break}}t.themes?.darkMode!==e.themes?.darkMode&&(o=!0),this._hass=e,o&&this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._attachResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this._detachResizeObserver()}_attachResizeObserver(){this._resizeObserver=new ResizeObserver(e=>{for(const t of e){const e=t.contentRect.width;e!==this._cardWidth&&(this._cardWidth=e)}}),this.isConnected&&this._resizeObserver.observe(this)}_detachResizeObserver(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0)}get _layoutMode(){return this._config?.layout?this._config.layout:(e=this._cardWidth||400)<400?"compact":e<=800?"medium":"wide";var e}get _isDarkMode(){return this._hass?.themes?this._hass.themes.darkMode:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}get activeZone(){return this._activeZone}setActiveZone(e){this._activeZone=e}_handleZoneTap(e){const{zoneId:t}=e.detail;this._activeZone=this._activeZone===t?null:t}get _waterAnimationZones(){return this._hass&&this._config?(this._config.zones||[]).map(e=>{const t=e.entity?this._hass.states[e.entity]:void 0,o=t?.state??"unavailable",i="on"===o||"open"===o,n=(e.polygon||[]).map(([e,t])=>`${e},${t}`).join(" ");return{id:e.id,color:e.color,points:n,isActive:i}}):[]}get _isMowerMowing(){if(!this._hass||!this._config?.mower)return!1;const e=this._hass.states[this._config.mower.entity];return"mowing"===e?.state}get _isPoolRunning(){if(!this._hass||!this._config?.pool)return!1;const e=this._hass.states[this._config.pool.entity];return"on"===e?.state||"cleaning"===e?.state}render(){if(!this._config)return W;const e=this._layoutMode,t=this._isDarkMode;return B`
      <ha-card .header=${this._config.title||""}>
        <div
          class="card-content layout-${e} ${t?"dark-mode":"light-mode"}"
        >
          <!-- Garden Image Layer with SVG zone overlays and water animation -->
          <div class="image-section">
            <garden-image-layer
              .zones=${this._config.zones||[]}
              .hass=${this._hass}
              .image=${this._config.image}
              @zone-tap=${this._handleZoneTap}
            ></garden-image-layer>
            <water-animation
              .zones=${this._waterAnimationZones}
            ></water-animation>
            <mower-animation
              .active=${this._isMowerMowing}
              .zone=${this._config.mower?.zone||[]}
              icon="mdi:robot-mower"
            ></mower-animation>
            ${this._config.pool?B`
              <mower-animation
                .active=${this._isPoolRunning}
                .zone=${this._config.pool?.zone||[]}
                icon="${this._config.pool?.icon||"mdi:pool"}"
              ></mower-animation>
            `:W}
            ${(this._config.sensors||[]).map(e=>B`
              <sensor-badge
                .sensor=${e}
                .hass=${this._hass}
              ></sensor-badge>
            `)}
          </div>

          <!-- Zone Controls and Schedule -->
          <div class="controls-section">
            <zone-control-panel
              .zones=${this._config.zones||[]}
              .hass=${this._hass}
              .columns=${this._config.zones_columns||("compact"===this._layoutMode?1:2)}
            ></zone-control-panel>

            <schedule-view
              .zones=${this._config.zones||[]}
              .hass=${this._hass}
            ></schedule-view>
          </div>

          <!-- Mower Panel (conditional) -->
          ${this._config.mower?B`
                <div class="mower-section">
                  <mower-panel
                    .config=${this._config.mower}
                    .hass=${this._hass}
                  ></mower-panel>
                </div>
              `:W}
        </div>
      </ha-card>
    `}};Ue.styles=a`
    /* =========================================================================
     * CSS Custom Properties - Theme Adaptation
     * Reads HA theme variables with sensible fallbacks.
     * ========================================================================= */
    :host {
      display: block;

      /* Theme variable mappings */
      --garden-card-bg: var(--card-background-color, var(--ha-card-background, #fff));
      --garden-card-text: var(--primary-text-color, #212121);
      --garden-card-text-secondary: var(--secondary-text-color, #727272);
      --garden-card-accent: var(--primary-color, #03a9f4);
      --garden-card-divider: var(--divider-color, #e0e0e0);
      --garden-card-radius: 12px;
      --garden-card-transition: 200ms ease;
    }

    /* =========================================================================
     * ha-card base styling - Mushroom-consistent 12px border-radius
     * ========================================================================= */
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, var(--garden-card-radius));
      background: var(--garden-card-bg);
      color: var(--garden-card-text);
      transition: box-shadow var(--garden-card-transition),
        background var(--garden-card-transition);
    }

    /* =========================================================================
     * Card Content - Base Layout
     * ========================================================================= */
    .card-content {
      padding: 16px;
      transition: padding var(--garden-card-transition);
    }

    /* =========================================================================
     * Dark Mode Adjustments
     * Increases overlay opacity for visibility on dark backgrounds,
     * adjusts text colors for contrast.
     * ========================================================================= */
    .dark-mode {
      --garden-overlay-opacity: 0.45;
      --garden-overlay-active-opacity: 0.65;
      --garden-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .light-mode {
      --garden-overlay-opacity: 0.3;
      --garden-overlay-active-opacity: 0.5;
      --garden-text-shadow: none;
    }

    /* Fallback for when hass.themes.darkMode is not available */
    @media (prefers-color-scheme: dark) {
      :host {
        --garden-overlay-opacity: 0.45;
        --garden-overlay-active-opacity: 0.65;
        --garden-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
    }

    /* =========================================================================
     * Image Section - Contains garden image layer + water animation overlay
     * ========================================================================= */
    .image-section {
      position: relative;
      border-radius: var(--garden-card-radius);
      overflow: hidden;
      transition: box-shadow var(--garden-card-transition);
    }

    /* =========================================================================
     * Controls Section - Zone controls + schedule badges
     * ========================================================================= */
    .controls-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* =========================================================================
     * Mower Section
     * ========================================================================= */
    .mower-section {
      transition: opacity var(--garden-card-transition);
    }

    /* =========================================================================
     * Responsive Layout: Compact (<400px)
     * Single column, everything stacked vertically.
     * ========================================================================= */
    .layout-compact {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .layout-compact .image-section {
      width: 100%;
    }

    .layout-compact .controls-section {
      width: 100%;
    }

    .layout-compact .mower-section {
      width: 100%;
    }

    /* =========================================================================
     * Responsive Layout: Medium (400-800px)
     * Two-column grid: image spans full width, controls in 2-col grid below.
     * ========================================================================= */
    .layout-medium {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 12px;
    }

    .layout-medium .image-section {
      grid-column: 1 / -1;
    }

    .layout-medium .controls-section {
      grid-column: 1 / -1;
    }

    .layout-medium .mower-section {
      grid-column: 1 / -1;
    }

    /* =========================================================================
     * Responsive Layout: Wide (>800px)
     * Side-by-side: image on left, controls on right.
     * ========================================================================= */
    .layout-wide {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
      align-items: start;
    }

    .layout-wide .image-section {
      grid-column: 1;
      grid-row: 1 / 3;
    }

    .layout-wide .controls-section {
      grid-column: 2;
      grid-row: 1;
    }

    .layout-wide .mower-section {
      grid-column: 2;
      grid-row: 2;
    }

    /* =========================================================================
     * Touch Target Enforcement
     * All interactive elements must be at least 44x44px.
     * ========================================================================= */
    button,
    [role="button"],
    .interactive {
      min-width: 44px;
      min-height: 44px;
    }

    /* =========================================================================
     * Smooth Transitions (200ms+) for state changes
     * Applied globally to ensure consistent animation feel.
     * ========================================================================= */
    garden-image-layer,
    zone-control-panel,
    mower-panel,
    schedule-view,
    water-animation {
      transition: opacity var(--garden-card-transition);
    }

    /* =========================================================================
     * Glow Effect on Active Zone Controls
     * Applied via zone-control component's --zone-color custom property.
     * This provides a subtle ambient glow using the zone's configured color.
     * ========================================================================= */
    zone-control-panel {
      --zone-glow-spread: 12px;
    }
  `,e([fe()],Ue.prototype,"_config",void 0),e([fe()],Ue.prototype,"_activeZone",void 0),e([fe()],Ue.prototype,"_cardWidth",void 0),Ue=e([he("ha-garden-card")],Ue),console.info("%c HA-GARDEN-CARD %c v0.1.0 ","color: white; background: #4CAF50; font-weight: bold;","color: #4CAF50; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"ha-garden-card",name:"Garden Card",description:"A visual garden management card with zone overlays, irrigation control, and robot mower status.",preview:!0});export{Ue as HaGardenCard};
