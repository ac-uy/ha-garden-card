function t(t,e,o,i){var n,s=arguments.length,r=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,o,r):n(e,o))||r);return s>3&&r&&Object.defineProperty(e,o,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new s(o,t,i)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,y=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},b=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const s=i?.call(this);n?.call(this,e),this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:_).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const s=n.fromAttribute(e,t.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(t,e,o,i=!1,n){if(void 0!==t){const s=this.constructor;if(!1===i&&(n=this[t]),o??=s.getPropertyOptions(t),!((o.hasChanged??b)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:n},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,z=t=>t,C=$.trustedTypes,k=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,M=`<${E}>`,P=document,Z=()=>P.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,O=/>/g,N=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,F=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),B=F(1),V=F(2),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,X=P.createTreeWalker(P,129);function Y(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const J=(t,e)=>{const o=t.length-1,i=[];let n,s=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,d=0;for(;d<o.length&&(r.lastIndex=d,l=r.exec(o),null!==l);)d=r.lastIndex,r===T?"!--"===l[1]?r=D:void 0!==l[1]?r=O:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=n??T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?N:'"'===l[3]?I:H):r===I||r===H?r=N:r===D||r===O?r=T:(r=N,n=void 0);const h=r===N&&t[e+1].startsWith("/>")?" ":"";s+=r===T?o+M:c>=0?(i.push(a),o.slice(0,c)+A+o.slice(c)+S+h):o+S+(-2===c?e:h)}return[Y(t,s+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,o),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(A)){const e=c[s++],o=i.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:o,ctor:"."===r[1]?it:"?"===r[1]?nt:"@"===r[1]?st:ot}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],Z()),X.nextNode(),a.push({type:2,index:++n});i.append(t[e],Z())}}}else if(8===i.nodeType)if(i.data===E)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const o=P.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,i){if(e===q)return e;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const s=L(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);X.currentNode=i;let n=X.nextNode(),s=0,r=0,a=o[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new et(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new rt(n,this,t)),this._$AV.push(e),a=o[++r]}s!==a?.index&&(n=X.nextNode(),s++)}return X.currentNode=P,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),L(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=K.createElement(Y(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new K(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const n of t)i===e.length?e.push(o=new et(this.O(Z()),this.O(Z()),this,this.options)):o=e[i],o._$AI(n),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=z(t).nextSibling;z(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=W}_$AI(t,e=this,o,i){const n=this.strings;let s=!1;if(void 0===n)t=Q(this,t,e,0),s=!L(t)||t!==this._$AH&&t!==q,s&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Q(this,i[o+r],e,r),a===q&&(a=this._$AH[r]),s||=!L(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class nt extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends ot{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===q)return;const o=this._$AH,i=t===W&&o!==W||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==W&&(o===W||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(K,et),($.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=o?.renderBefore??null;i._$litPart$=n=new et(e.insertBefore(Z(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b},gt=(t=pt,e,o)=>{const{kind:i,metadata:n}=o;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,n,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];e.call(this,o),this.requestUpdate(i,n,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,o)=>"object"==typeof o?gt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function ft(t){return ut({...t,state:!0,attribute:!1})}const yt=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,mt=/^(switch|valve|input_boolean)\..+$/;function vt(t){const e=t.name||t.id||"unnamed";if(!t.id)throw new Error(`Zone '${e}' is missing an id`);if(!t.name)throw new Error(`Zone '${t.id}' is missing a name`);if(t.entity&&!mt.test(t.entity))throw new Error(`Zone '${e}' has invalid entity '${t.entity}'. Must be switch.*, valve.*, or input_boolean.*`);if(!t.color)throw new Error(`Zone '${e}' is missing a color`);if(!yt.test(t.color))throw new Error(`Zone '${e}' has invalid color format`);if(t.polygon){if(!Array.isArray(t.polygon))throw new Error(`Zone '${e}' has invalid polygon coordinates`);if(t.polygon.length>0&&t.polygon.length<3)throw new Error(`Zone '${e}' polygon must have at least 3 points`);for(const o of t.polygon)if(!Array.isArray(o)||2!==o.length||"number"!=typeof o[0]||"number"!=typeof o[1]||o[0]<0||o[0]>100||o[1]<0||o[1]>100)throw new Error(`Zone '${e}' has invalid polygon coordinates`)}}let _t=class extends ct{constructor(){super(...arguments),this.zones=[]}render(){return this.image?this._renderImageWithOverlay():this._renderListLayout()}_renderImageWithOverlay(){const t=this._computeZoneRenderData();return B`
      <div class="image-container">
        <img src="${this.image}" alt="Garden" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${t.map(t=>B`
              <polygon
                class="zone-polygon ${t.isActive?"zone-polygon--active":""} ${t.isUnavailable?"zone-polygon--unavailable":""}"
                points="${t.points}"
                fill="${t.isUnavailable?"#9e9e9e":t.color}"
                opacity="${t.opacity}"
                data-zone-id="${t.id}"
                @click="${()=>this._handleZoneTap(t.id)}"
              />
            `)}
        </svg>
      </div>
    `}_renderListLayout(){const t=this._computeZoneRenderData();return 0===t.length?W:B`
      <div class="zone-list">
        ${t.map(t=>B`
            <div
              class="zone-list-item ${t.isActive?"zone-list-item--active":""} ${t.isUnavailable?"zone-list-item--unavailable":""}"
              @click="${()=>this._handleZoneTap(t.id)}"
            >
              <span
                class="zone-color-dot"
                style="background-color: ${t.isUnavailable?"#9e9e9e":t.color}"
              ></span>
              <span class="zone-name">${t.name}</span>
              <span class="zone-status">
                ${t.isUnavailable?"Unavailable":t.isActive?"Active":"Off"}
              </span>
            </div>
          `)}
      </div>
    `}_computeZoneRenderData(){return this.zones.map(t=>{const e=t.entity?this.hass?.states[t.entity]:void 0,o=e?.state??"unavailable",i="on"===o,n="unavailable"===o||"unknown"===o||!e,s=(t.polygon||[]).map(([t,e])=>`${t},${e}`).join(" ");let r;return r=n?.4:i?.5:.3,{id:t.id,name:t.name,color:t.color,points:s,opacity:r,isActive:i,isUnavailable:n}})}_handleZoneTap(t){const e=this.zones.find(e=>e.id===t);if(!e)return;const o=e.entity?this.hass?.states[e.entity]:void 0,i=o?.state??"unavailable";"unavailable"!==i&&"unknown"!==i&&this.dispatchEvent(new CustomEvent("zone-tap",{detail:{zoneId:t},bubbles:!0,composed:!0}))}};_t.styles=r`
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
  `,t([ut({attribute:!1})],_t.prototype,"zones",void 0),t([ut({attribute:!1})],_t.prototype,"hass",void 0),t([ut({type:String})],_t.prototype,"image",void 0),_t=t([ht("garden-image-layer")],_t);let bt=class extends ct{get _entityState(){if(!this.hass||!this.zone||!this.zone.entity)return"unavailable";const t=this.hass.states[this.zone.entity];return t?.state??"unavailable"}get _isActive(){return"on"===this._entityState||"open"===this._entityState}get _isUnavailable(){const t=this._entityState;return"unavailable"===t||"unknown"===t}get _statusText(){return this._isUnavailable?"Unavailable":this._isActive?"Active":"Idle"}render(){if(!this.zone)return W;const t=this._isActive,e=this._isUnavailable,o=this.zone.color||"#4CAF50";return B`
      <div
        class="zone-control ${t?"zone-control--active":""} ${e?"zone-control--unavailable":""}"
        style="--zone-color: ${o}"
      >
        <span
          class="status-indicator ${t?"status-indicator--active":""} ${e?"status-indicator--unavailable":""}"
          style="background-color: ${e?"#9e9e9e":t?o:"#bdbdbd"}; color: ${o}"
        ></span>

        <div class="zone-info">
          <div class="zone-name">${this.zone.name}</div>
          <div class="zone-status-text">${this._statusText}</div>
        </div>

        <div class="zone-actions">
          ${t?B`
                <button
                  class="zone-btn zone-btn--stop"
                  ?disabled=${e}
                  @click=${this._handleStop}
                  aria-label="Stop ${this.zone.name}"
                >
                  Stop
                </button>
              `:B`
                <button
                  class="zone-btn zone-btn--start"
                  ?disabled=${e}
                  @click=${this._handleStart}
                  aria-label="Start ${this.zone.name}"
                >
                  Start
                </button>
              `}
        </div>

        ${t&&this.zone.countdown_entity?this._renderProgressBar():W}
      </div>
    `}_renderProgressBar(){if(!this.hass||!this.zone||!this.zone.countdown_entity)return W;const t=this.hass.states[this.zone.countdown_entity];if(!t||"unavailable"===t.state)return W;const e=parseFloat(t.state);if(isNaN(e))return W;let o=e;if(this.zone.duration_entity){const t=this.hass.states[this.zone.duration_entity];if(t){const e=parseFloat(t.state);!isNaN(e)&&e>0&&(o=60*e)}}if(o<=0)return W;const i=function(t,e){if(e<=0)return 0;const o=(e-t)/e*100;return Math.min(100,Math.max(0,o))}(e,o),n=function(t){const e=Math.max(0,Math.floor(t));return`${Math.floor(e/60)}:${(e%60).toString().padStart(2,"0")}`}(e),s=this.zone.color||"#4CAF50";return B`
      <div class="progress-section">
        <div class="progress-track">
          <div class="progress-fill" style="width: ${i}%; background-color: ${s}"></div>
        </div>
        <span class="remaining-time">${n}</span>
      </div>
    `}async _handleStart(){if(!this.hass||!this.zone||!this.zone.entity||this._isUnavailable)return;const{domain:t,service:e}=function(t){switch(t.split(".")[0]){case"valve":return{domain:"valve",service:"open"};case"input_boolean":return{domain:"homeassistant",service:"turn_on"};default:return{domain:"switch",service:"turn_on"}}}(this.zone.entity);await this.hass.callService(t,e,{entity_id:this.zone.entity})}async _handleStop(){if(!this.hass||!this.zone||!this.zone.entity||this._isUnavailable)return;const{domain:t,service:e}=function(t){switch(t.split(".")[0]){case"valve":return{domain:"valve",service:"close"};case"input_boolean":return{domain:"homeassistant",service:"turn_off"};default:return{domain:"switch",service:"turn_off"}}}(this.zone.entity);await this.hass.callService(t,e,{entity_id:this.zone.entity})}};bt.styles=r`
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
  `,t([ut({attribute:!1})],bt.prototype,"zone",void 0),t([ut({attribute:!1})],bt.prototype,"hass",void 0),bt=t([ht("zone-control")],bt);let wt=class extends ct{constructor(){super(...arguments),this.zones=[],this.columns=1}render(){if(!this.zones||0===this.zones.length)return W;const t=`grid-template-columns: repeat(${this.columns}, 1fr)`;return B`
      <div class="zone-panel" style="${t}">
        ${this.zones.map(t=>B`
            <zone-control .zone=${t} .hass=${this.hass}></zone-control>
          `)}
      </div>
    `}};wt.styles=r`
    :host {
      display: block;
    }

    .zone-panel {
      display: grid;
      gap: 8px;
    }
  `,t([ut({attribute:!1})],wt.prototype,"zones",void 0),t([ut({attribute:!1})],wt.prototype,"hass",void 0),t([ut({type:Number})],wt.prototype,"columns",void 0),wt=t([ht("zone-control-panel")],wt);let xt=class extends ct{get _entityState(){if(!this.hass||!this.config)return"unavailable";const t=this.hass.states[this.config.entity];return t?.state??"unavailable"}get _activity(){return function(t){switch(t){case"mowing":return"mowing";case"docked":return"docked";case"paused":return"paused";case"returning":return"returning";case"error":return"error";default:return"unknown"}}(this._entityState)}get _batteryLevel(){if(!this.hass||!this.config?.battery_entity)return null;const t=this.hass.states[this.config.battery_entity];if(!t||"unavailable"===t.state||"unknown"===t.state)return null;const e=parseFloat(t.state);return isNaN(e)?null:Math.max(0,Math.min(100,e))}get _errorDescription(){if("error"!==this._activity)return null;if(!this.hass||!this.config)return null;const t=this.hass.states[this.config.entity];if(!t)return null;const e=t.attributes.error;return"string"==typeof e?e:null}get _isUnavailable(){const t=this._entityState;return"unavailable"===t||"unknown"===t}render(){if(!this.config)return W;const t=this._activity,e=this._batteryLevel,o=this._errorDescription,i=this._isUnavailable,n=function(t){switch(t){case"mowing":return"Mowing";case"docked":return"Docked";case"paused":return"Paused";case"returning":return"Returning";case"error":return"Error";default:return"Unknown"}}(t),s=null===(r=e)?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M12,11 L12,14 M12,17 L12,17.5":r>75?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,7 L15,7 L15,20 L9,20 Z":r>=25?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,13 L15,13 L15,20 L9,20 Z":"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,17 L15,17 L15,20 L9,20 Z";var r;const a=function(t){return null===t?"unknown":t>75?"full":t>=25?"medium":"low"}(e);return B`
      <div class="mower-panel ${i?"mower-panel--unavailable":""}">
        <div class="mower-header">
          <div class="mower-icon-container ${"error"===t?"mower-icon-container--error":""} ${"mowing"===t?"mower-icon-container--mowing":""}">
            <ha-icon icon="${"error"===t?"mdi:alert":"mdi:robot-mower"}" class="mower-icon"></ha-icon>
          </div>

          <div class="mower-info">
            <div class="mower-activity">${n}</div>
            ${null!==e?B`
                  <div class="mower-battery">
                    <svg class="battery-icon battery-icon--${a}" viewBox="0 0 24 24">
                      <path d="${s}" />
                    </svg>
                    <span>${e}%</span>
                  </div>
                `:W}
          </div>
        </div>

        ${"error"===t&&o?B`
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
    `}async _handleStart(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","start_mowing",{entity_id:this.config.entity})}async _handlePause(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","pause",{entity_id:this.config.entity})}async _handleDock(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","dock",{entity_id:this.config.entity})}};function $t(t){if(!t||""===t.trim())return null;const e=new Date(t);return isNaN(e.getTime())?null:e}function zt(t){return`${t.getHours().toString().padStart(2,"0")}:${t.getMinutes().toString().padStart(2,"0")}`}xt.styles=r`
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
  `,t([ut({attribute:!1})],xt.prototype,"config",void 0),t([ut({attribute:!1})],xt.prototype,"hass",void 0),xt=t([ht("mower-panel")],xt);let Ct=class extends ct{constructor(){super(...arguments),this.zones=[]}render(){const t=this._getScheduledZones();return 0===t.length?W:B`
      <div class="schedule-badges">
        ${t.map(({zone:t,nextTime:e})=>this._renderBadge(t,e))}
      </div>
    `}_renderBadge(t,e){return e?B`
        <div class="schedule-badge" title="${t.name}: Next run at ${e}">
          <span class="schedule-badge__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
            </svg>
          </span>
          <span>Next: ${e}</span>
        </div>
      `:B`
      <div class="schedule-badge schedule-badge--no-schedule" title="${t.name}: No schedule configured">
        <span>No schedule</span>
      </div>
    `}_getScheduledZones(){return this.zones.filter(t=>t.schedule_entity).map(t=>{const e=this.hass?.states[t.schedule_entity],o=function(t){if(!t)return null;if("unavailable"===t.state||"unknown"===t.state)return null;const e=t.attributes.next_run;if(e&&"string"==typeof e){const t=$t(e);if(t)return zt(t)}const o=$t(t.state);return o?zt(o):null}(e);return{zone:t,nextTime:o}})}};Ct.styles=r`
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
  `,t([ut({attribute:!1})],Ct.prototype,"zones",void 0),t([ut({attribute:!1})],Ct.prototype,"hass",void 0),Ct=t([ht("schedule-view")],Ct);const kt=r`
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
`;let At=class extends ct{constructor(){super(...arguments),this.zones=[]}render(){const t=this.zones.filter(t=>t.isActive);return 0===t.length?W:B`
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          ${t.map(t=>this._renderPatternDef(t))}
        </defs>
        ${t.map(t=>this._renderZoneAnimation(t))}
      </svg>
    `}_renderPatternDef(t){const e=`water-pattern-${t.id}`;return V`
      <pattern
        id="${e}"
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
    `}_renderZoneAnimation(t){const e=`water-pattern-${t.id}`,o=t.isActive?"water-zone-group water-zone-group--active":"water-zone-group water-zone-group--inactive";return V`
      <g class="${o}">
        <!-- Base color fill with low opacity for glow effect -->
        <polygon
          points="${t.points}"
          fill="${t.color}"
          opacity="0.2"
        />
        <!-- Pattern overlay for particle effect -->
        <polygon
          points="${t.points}"
          fill="url(#${e})"
          opacity="0.6"
        />
      </g>
    `}};At.styles=[kt,r`
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
    `],t([ut({attribute:!1})],At.prototype,"zones",void 0),At=t([ht("water-animation")],At);let St=class extends ct{constructor(){super(...arguments),this.active=!1,this.zone=[],this.icon="mdi:robot-mower",this._x=50,this._y=50,this._targetX=50,this._targetY=50,this._animFrame=null,this._tick=()=>{if(!this.active)return;const t=this._targetX-this._x,e=this._targetY-this._y,o=Math.sqrt(t*t+e*e);o<1?this._pickNewTarget():(this._x+=t/o*.08,this._y+=e/o*.08),this.requestUpdate(),this._animFrame=requestAnimationFrame(this._tick)}}connectedCallback(){super.connectedCallback(),this.active&&this._startAnimation()}disconnectedCallback(){super.disconnectedCallback(),this._stopAnimation()}updated(t){t.has("active")&&(this.active?this._startAnimation():this._stopAnimation())}_startAnimation(){this._animFrame||(this.zone.length>=3?(this._x=this.zone.reduce((t,[e])=>t+e,0)/this.zone.length,this._y=this.zone.reduce((t,[,e])=>t+e,0)/this.zone.length):(this._x=50,this._y=50),this._pickNewTarget(),this._tick())}_stopAnimation(){this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null)}_pickNewTarget(){if(this.zone.length>=3){const t=Math.min(...this.zone.map(([t])=>t)),e=Math.max(...this.zone.map(([t])=>t)),o=Math.min(...this.zone.map(([,t])=>t)),i=Math.max(...this.zone.map(([,t])=>t));this._targetX=t+Math.random()*(e-t),this._targetY=o+Math.random()*(i-o)}else this._targetX=20+60*Math.random(),this._targetY=20+60*Math.random()}render(){return this.active?B`
      <div class="device-icon" style="left: ${this._x}%; top: ${this._y}%;">
        <ha-icon icon="${this.icon}"></ha-icon>
      </div>
    `:W}};function Et(t,e,o,i){return[Math.min(100,Math.max(0,t/o*100)),Math.min(100,Math.max(0,e/i*100))]}St.styles=r`
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
  `,t([ut({type:Boolean})],St.prototype,"active",void 0),t([ut({attribute:!1})],St.prototype,"zone",void 0),t([ut({type:String})],St.prototype,"icon",void 0),t([ft()],St.prototype,"_x",void 0),t([ft()],St.prototype,"_y",void 0),St=t([ht("mower-animation")],St);let Mt=class extends ct{constructor(){super(...arguments),this.image="",this.existingZones=[],this.polygon=[],this.color="#03a9f4",this._isClosed=!1,this._draggingIndex=null,this._validationMessage="",this._longPressTimer=null,this._didDrag=!1,this._pendingPosition=null}disconnectedCallback(){super.disconnectedCallback(),this._clearLongPress()}render(){return this.image?B`
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
          ${this.existingZones.filter(t=>t.polygon&&t.polygon.length>=3).map(t=>{const e=t.polygon.reduce((t,[e])=>t+e,0)/t.polygon.length,o=t.polygon.reduce((t,[,e])=>t+e,0)/t.polygon.length;return B`
              <div class="existing-zone-fill" style="clip-path: polygon(${t.polygon.map(([t,e])=>`${t}% ${e}%`).join(", ")}); background-color: ${t.color||"#888"};"></div>
              <span class="existing-zone-label" style="left: ${e}%; top: ${o}%;">${t.name}</span>
            `})}

          <!-- Current zone fill overlay -->
          ${this.polygon.length>=3?B`
            <div class="zone-fill" style="clip-path: polygon(${this.polygon.map(([t,e])=>`${t}% ${e}%`).join(", ")})"></div>
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
      `}_renderExistingZones(){return this.existingZones.map(t=>B`
        <g class="existing-zone">
          <polygon
            points="${(t.polygon||[]).map(([t,e])=>`${t}%,${e}%`).join(" ")}"
            fill="${t.color}"
            opacity="0.25"
            stroke="${t.color}"
            stroke-width="0.3"
            stroke-dasharray="1,1"
          />
          ${this._renderZoneLabel(t)}
        </g>
      `)}_renderZoneLabel(t){if(!t.polygon||t.polygon.length<3)return W;const e=t.polygon.reduce((t,[e])=>t+e,0)/t.polygon.length,o=t.polygon.reduce((t,[,e])=>t+e,0)/t.polygon.length;return B`
      <text
        x="${e}"
        y="${o}"
        text-anchor="middle"
        dominant-baseline="middle"
        class="zone-label"
        fill="${t.color}"
      >
        ${t.name}
      </text>
    `}_renderCurrentPolygon(){if(this.polygon.length<2)return this.polygon.length,W;if(this._isClosed){const t=this.polygon.map(([t,e])=>`${t}%,${e}%`).join(" ");return B`
        <polygon
          points="${t}"
          fill="rgba(3, 169, 244, 0.3)"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linejoin="round"
        />
      `}const t=this.polygon.map(([t,e])=>`${t}%,${e}%`).join(" "),e=[...this.polygon,this.polygon[0]].map(([t,e])=>`${t}%,${e}%`).join(" ");return B`
      <!-- Semi-transparent fill preview -->
      <polygon
        points="${e}"
        fill="rgba(3, 169, 244, 0.25)"
        stroke="none"
      />
      <!-- Visible stroke for the drawn lines -->
      <polyline
        points="${t}"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `}_renderVerticesAsHtml(){return this.polygon.map(([t,e],o)=>{const i=0===o&&!this._isClosed&&this.polygon.length>2,n=this._draggingIndex===o;return B`
          <div
            class="vertex-dot ${i?"vertex-dot--first":""} ${n?"vertex-dot--dragging":""}"
            style="left: ${t}%; top: ${e}%;"
            data-index="${o}"
            @pointerdown=${t=>this._handleVertexPointerDown(t,o)}
            @contextmenu=${t=>this._handleVertexContextMenu(t,o)}
          >
            ${W}
          </div>
        `})}_renderLines(){if(this.polygon.length<2)return W;const t=[],e=this.polygon.length>=3?[...this.polygon,this.polygon[0]]:this.polygon;for(let o=0;o<e.length-1;o++){const[i,n]=e[o],[s,r]=e[o+1];t.push(B`
        <svg class="line-svg" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;">
          <line
            x1="${i}%" y1="${n}%"
            x2="${s}%" y2="${r}%"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      `)}return t}_handleImageLoad(){this.requestUpdate()}_handleCanvasClick(t){if(this._didDrag)return void(this._didDrag=!1);if(null!==this._draggingIndex)return;if(this._isClosed)return;const e=t.target;if(e.closest(".vertex-dot")||e.closest(".line-svg"))return;const o=this.renderRoot.querySelector(".canvas-container");if(!o)return;const i=o.getBoundingClientRect(),n=t.clientX-i.left,s=t.clientY-i.top,[r,a]=Et(n,s,i.width,i.height);if(this.polygon.length>2){const[t,e]=this.polygon[0];if(Math.sqrt((r-t)**2+(a-e)**2)<=3)return void this._closePolygon()}this._clearValidationMessage();const l=[...this.polygon,[r,a]];this.polygon=l,this._dispatchPolygonChanged()}_handleVertexPointerDown(t,e){t.preventDefault(),t.stopPropagation(),this._draggingIndex=e,this._didDrag=!1}_handlePointerMove(t){if(null===this._draggingIndex)return;this._didDrag=!0;const e=this.renderRoot.querySelector(".canvas-container");if(!e)return;const o=e.getBoundingClientRect(),i=t.clientX-o.left,n=t.clientY-o.top,[s,r]=Et(i,n,o.width,o.height),a=this.renderRoot.querySelectorAll(".vertex-dot")[this._draggingIndex];a&&(a.style.left=`${s}%`,a.style.top=`${r}%`),this._pendingPosition=[s,r]}_handlePointerUp(t){if(null!==this._draggingIndex){if(this._didDrag&&this._pendingPosition){const t=[...this.polygon];t[this._draggingIndex]=this._pendingPosition,this.polygon=t,this._dispatchPolygonChanged()}this._draggingIndex=null,this._pendingPosition=null}}_handleContextMenu(t){t.preventDefault()}_handleVertexContextMenu(t,e){t.preventDefault(),t.stopPropagation(),this._deleteVertex(e)}_handleRemoveLastPoint(){0!==this.polygon.length&&(this.polygon=this.polygon.slice(0,-1),this._clearValidationMessage(),this._dispatchPolygonChanged())}_handleConfirm(){this.polygon.length<3?this._validationMessage="A zone needs at least 3 points":this._closePolygon()}_handleReset(){this.polygon=[],this._isClosed=!1,this._clearValidationMessage(),this._dispatchPolygonChanged()}_closePolygon(){this._isClosed=!0,this._clearValidationMessage(),this._dispatchPolygonComplete()}_deleteVertex(t){if(0===this.polygon.length)return;const e=this.polygon.filter((e,o)=>o!==t);this.polygon=e,this._isClosed&&e.length<3&&(this._isClosed=!1),this._dispatchPolygonChanged()}_clearLongPress(){null!==this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=null)}_clearValidationMessage(){this._validationMessage=""}_dispatchPolygonChanged(){this.dispatchEvent(new CustomEvent("polygon-changed",{detail:{polygon:[...this.polygon]},bubbles:!0,composed:!0}))}_dispatchPolygonComplete(){this.dispatchEvent(new CustomEvent("polygon-complete",{detail:{polygon:[...this.polygon]},bubbles:!0,composed:!0}))}};Mt.styles=r`
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
  `,t([ut({type:String})],Mt.prototype,"image",void 0),t([ut({attribute:!1})],Mt.prototype,"existingZones",void 0),t([ut({attribute:!1})],Mt.prototype,"polygon",void 0),t([ut({type:String})],Mt.prototype,"color",void 0),t([ft()],Mt.prototype,"_isClosed",void 0),t([ft()],Mt.prototype,"_draggingIndex",void 0),t([ft()],Mt.prototype,"_validationMessage",void 0),Mt=t([ht("zone-editor")],Mt);let Pt=class extends ct{constructor(){super(...arguments),this._editingPolygonIndex=null,this._editingMowerZone=!1,this._editingPoolZone=!1}setConfig(t){this._config={...t}}set hass(t){this._hass=t}_dispatchConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_handleTitleChange(t){const e=t.target;this._dispatchConfigChanged({...this._config,title:e.value})}_handleImageChange(t){const e=t.target;this._dispatchConfigChanged({...this._config,image:e.value})}_handleAddZone(){const t={id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}),name:`Zone ${this._config.zones.length+1}`,entity:"",color:"#4CAF50",polygon:[]};this._dispatchConfigChanged({...this._config,zones:[...this._config.zones,t]})}_handleRemoveZone(t){const e=[...this._config.zones];e.splice(t,1),this._dispatchConfigChanged({...this._config,zones:e})}_handleMoveZoneUp(t){if(t<=0)return;const e=[...this._config.zones];[e[t-1],e[t]]=[e[t],e[t-1]],this._dispatchConfigChanged({...this._config,zones:e})}_handleMoveZoneDown(t){if(t>=this._config.zones.length-1)return;const e=[...this._config.zones];[e[t],e[t+1]]=[e[t+1],e[t]],this._dispatchConfigChanged({...this._config,zones:e})}_handleZoneNameChange(t,e){const o=e.target,i=[...this._config.zones];i[t]={...i[t],name:o.value},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneEntityChange(t,e){const o=e.detail?.value??"",i=[...this._config.zones];i[t]={...i[t],entity:o},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneColorChange(t,e){const o=e.target,i=[...this._config.zones];i[t]={...i[t],color:o.value},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneDurationEntityChange(t,e){const o=e.detail?.value??"",i=[...this._config.zones];i[t]={...i[t],duration_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneCountdownEntityChange(t,e){const o=e.detail?.value??"",i=[...this._config.zones];i[t]={...i[t],countdown_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneScheduleEntityChange(t,e){const o=e.detail?.value??"",i=[...this._config.zones];i[t]={...i[t],schedule_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleEditPolygon(t){this._editingPolygonIndex=this._editingPolygonIndex===t?null:t}_handlePolygonChanged(t,e){const o=e.detail?.polygon||[],i=[...this._config.zones||[]];i[t]={...i[t],polygon:o},this._dispatchConfigChanged({...this._config,zones:i})}_handlePolygonComplete(t,e){const o=e.detail?.polygon||[],i=[...this._config.zones||[]];i[t]={...i[t],polygon:o},this._dispatchConfigChanged({...this._config,zones:i}),this._editingPolygonIndex=null}_handleEditMowerZone(){this._editingMowerZone=!this._editingMowerZone}_handleMowerZoneChanged(t){const e=t.detail?.polygon||[],o={...this._config.mower||{entity:""},zone:e};this._dispatchConfigChanged({...this._config,mower:o})}_handleMowerZoneComplete(t){const e=t.detail?.polygon||[],o={...this._config.mower||{entity:""},zone:e};this._dispatchConfigChanged({...this._config,mower:o}),this._editingMowerZone=!1}_handlePoolEntityChange(t){const e=t.detail?.value??"";if(!e){const{pool:t,...e}=this._config;return void this._dispatchConfigChanged(e)}const o={...this._config.pool||{entity:""},entity:e};this._dispatchConfigChanged({...this._config,pool:o})}_handleEditPoolZone(){this._editingPoolZone=!this._editingPoolZone}_handlePoolZoneChanged(t){const e=t.detail?.polygon||[],o={...this._config.pool||{entity:""},zone:e};this._dispatchConfigChanged({...this._config,pool:o})}_handlePoolZoneComplete(t){const e=t.detail?.polygon||[],o={...this._config.pool||{entity:""},zone:e};this._dispatchConfigChanged({...this._config,pool:o}),this._editingPoolZone=!1}_handleMowerEntityChange(t){const e=t.detail?.value??"";if(!e){const{mower:t,...e}=this._config;return void this._dispatchConfigChanged(e)}const o={...this._config.mower||{entity:""},entity:e};this._dispatchConfigChanged({...this._config,mower:o})}_handleMowerBatteryEntityChange(t){const e=t.detail?.value??"";if(!this._config.mower)return;const o={...this._config.mower,battery_entity:e||void 0};this._dispatchConfigChanged({...this._config,mower:o})}render(){return this._config?B`
      <div class="editor">
        ${this._renderGeneralSection()}
        ${this._renderZonesSection()}
        ${this._renderMowerSection()}
        ${this._renderPoolSection()}
      </div>
    `:W}_renderGeneralSection(){return B`
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
    `}_renderZonesSection(){const t=!this._config.zones||0===this._config.zones.length;return B`
      <div class="section">
        <div class="section-header">
          <h3 class="section-title">Zones</h3>
          <button class="add-button" @click=${this._handleAddZone}>
            + Add Zone
          </button>
        </div>

        ${t?B`<div class="warning">
              ⚠️ At least one zone is required for the card to work.
            </div>`:W}

        <div class="zone-list">
          ${(this._config.zones||[]).map((t,e)=>this._renderZoneEntry(t,e))}
        </div>
      </div>
    `}_renderZoneEntry(t,e){const o=0===e,i=e===(this._config.zones||[]).length-1;return B`
      <div class="zone-entry">
        <div class="zone-header">
          <span class="zone-number">${e+1}</span>
          <span class="zone-name-display">${t.name||"Unnamed"}</span>
          <div class="zone-actions">
            <button
              class="icon-button"
              @click=${()=>this._handleMoveZoneUp(e)}
              ?disabled=${o}
              title="Move up"
            >
              ▲
            </button>
            <button
              class="icon-button"
              @click=${()=>this._handleMoveZoneDown(e)}
              ?disabled=${i}
              title="Move down"
            >
              ▼
            </button>
            <button
              class="icon-button remove-button"
              @click=${()=>this._handleRemoveZone(e)}
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
              .value=${t.name||""}
              @input=${t=>this._handleZoneNameChange(e,t)}
              placeholder="Zone name"
              class="text-input"
            />
          </div>

          <div class="field">
            <label class="field-label">Entity (switch/valve)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${t.entity||""}
              .includeDomains=${["switch","valve","input_boolean"]}
              @value-changed=${t=>this._handleZoneEntityChange(e,t)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Color</label>
            <div class="color-picker-row">
              <input
                type="color"
                .value=${t.color||"#4CAF50"}
                @input=${t=>this._handleZoneColorChange(e,t)}
                class="color-input"
              />
              <span class="color-value">${t.color||"#4CAF50"}</span>
            </div>
          </div>

          <div class="field">
            <label class="field-label">Duration Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${t.duration_entity||""}
              .includeDomains=${["number"]}
              @value-changed=${t=>this._handleZoneDurationEntityChange(e,t)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Countdown Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${t.countdown_entity||""}
              .includeDomains=${["sensor"]}
              @value-changed=${t=>this._handleZoneCountdownEntityChange(e,t)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Schedule Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${t.schedule_entity||""}
              .includeDomains=${["input_datetime","schedule","sensor"]}
              @value-changed=${t=>this._handleZoneScheduleEntityChange(e,t)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Zone Shape</label>
            <div class="polygon-status">
              ${t.polygon&&t.polygon.length>=3?B`<span class="polygon-info">✓ ${t.polygon.length} points defined</span>`:B`<span class="polygon-info polygon-info--empty">No shape defined</span>`}
              <button
                class="btn-draw"
                @click=${()=>this._handleEditPolygon(e)}
              >
                ${this._editingPolygonIndex===e?"Close Editor":"Draw Zone"}
              </button>
            </div>
            ${this._editingPolygonIndex===e?B`
                  <zone-editor
                    .image=${this._config.image||""}
                    .existingZones=${(this._config.zones||[]).filter((t,o)=>o!==e)}
                    .polygon=${t.polygon||[]}
                    .color=${t.color||"#4CAF50"}
                    @polygon-changed=${t=>this._handlePolygonChanged(e,t)}
                    @polygon-complete=${t=>this._handlePolygonComplete(e,t)}
                  ></zone-editor>
                `:W}
          </div>
        </div>
      </div>
    `}_renderMowerSection(){return B`
      <div class="section">
        <h3 class="section-title">Robot Mower (optional)</h3>
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
        <h3 class="section-title">Pool Cleaner (optional)</h3>
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
    `}};Pt.styles=r`
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
  `,t([ft()],Pt.prototype,"_config",void 0),t([ft()],Pt.prototype,"_hass",void 0),t([ft()],Pt.prototype,"_editingPolygonIndex",void 0),t([ft()],Pt.prototype,"_editingMowerZone",void 0),t([ft()],Pt.prototype,"_editingPoolZone",void 0),Pt=t([ht("ha-garden-card-editor")],Pt);let Zt=class extends ct{constructor(){super(...arguments),this._activeZone=null,this._cardWidth=0,this._relevantEntities=new Set}static getConfigElement(){return document.createElement("ha-garden-card-editor")}static getStubConfig(){return{type:"custom:ha-garden-card",title:"My Garden",zones:[{id:"zone_1",name:"Zone 1",entity:"switch.irrigation_zone_1",color:"#4CAF50",polygon:[[10,10],[40,10],[40,40],[10,40]]}]}}setConfig(t){!function(t){if(!t)throw new Error("Configuration is required");if(t.zones&&Array.isArray(t.zones))for(const e of t.zones)vt(e)}(t),this._config=t,this._relevantEntities=function(t){const e=new Set;for(const o of t.zones||[])o.entity&&e.add(o.entity),o.duration_entity&&e.add(o.duration_entity),o.countdown_entity&&e.add(o.countdown_entity),o.schedule_entity&&e.add(o.schedule_entity);return t.mower&&(e.add(t.mower.entity),t.mower.battery_entity&&e.add(t.mower.battery_entity)),t.pool&&e.add(t.pool.entity),e}(t)}getCardSize(){if(!this._config)return 3;let t=3;return t+=Math.ceil((this._config.zones||[]).length/2),this._config.mower&&(t+=2),t}set hass(t){const e=this._hass;if(!e)return this._hass=t,void this.requestUpdate();let o=!1;for(const i of this._relevantEntities){if(e.states[i]!==t.states[i]){o=!0;break}}e.themes?.darkMode!==t.themes?.darkMode&&(o=!0),this._hass=t,o&&this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._attachResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this._detachResizeObserver()}_attachResizeObserver(){this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect.width;t!==this._cardWidth&&(this._cardWidth=t)}}),this.isConnected&&this._resizeObserver.observe(this)}_detachResizeObserver(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0)}get _layoutMode(){return this._config?.layout?this._config.layout:(t=this._cardWidth||400)<400?"compact":t<=800?"medium":"wide";var t}get _isDarkMode(){return this._hass?.themes?this._hass.themes.darkMode:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}get activeZone(){return this._activeZone}setActiveZone(t){this._activeZone=t}_handleZoneTap(t){const{zoneId:e}=t.detail;this._activeZone=this._activeZone===e?null:e}get _waterAnimationZones(){return this._hass&&this._config?(this._config.zones||[]).map(t=>{const e=t.entity?this._hass.states[t.entity]:void 0,o=e?.state??"unavailable",i="on"===o||"open"===o,n=(t.polygon||[]).map(([t,e])=>`${t},${e}`).join(" ");return{id:t.id,color:t.color,points:n,isActive:i}}):[]}get _isMowerMowing(){if(!this._hass||!this._config?.mower)return!1;const t=this._hass.states[this._config.mower.entity];return"mowing"===t?.state}get _isPoolRunning(){if(!this._hass||!this._config?.pool)return!1;const t=this._hass.states[this._config.pool.entity];return"on"===t?.state||"cleaning"===t?.state}render(){if(!this._config)return W;const t=this._layoutMode,e=this._isDarkMode;return B`
      <ha-card .header=${this._config.title||""}>
        <div
          class="card-content layout-${t} ${e?"dark-mode":"light-mode"}"
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
    `}};Zt.styles=r`
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
  `,t([ft()],Zt.prototype,"_config",void 0),t([ft()],Zt.prototype,"_activeZone",void 0),t([ft()],Zt.prototype,"_cardWidth",void 0),Zt=t([ht("ha-garden-card")],Zt),console.info("%c HA-GARDEN-CARD %c v0.1.0 ","color: white; background: #4CAF50; font-weight: bold;","color: #4CAF50; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"ha-garden-card",name:"Garden Card",description:"A visual garden management card with zone overlays, irrigation control, and robot mower status.",preview:!0});export{Zt as HaGardenCard};
