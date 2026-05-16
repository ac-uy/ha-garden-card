function e(e,t,o,i){var n,s=arguments.length,r=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(s<3?n(r):s>3?n(t,o,r):n(t,o))||r);return s>3&&r&&Object.defineProperty(t,o,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new s(o,e,i)},a=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,y=f?f.emptyScript:"",v=u.reactiveElementPolyfillSupport,m=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},_=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const s=i?.call(this);n?.call(this,t),this.requestUpdate(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(o)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:b).toAttribute(t,o.type);this._$Em=e,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const s=n.fromAttribute(t,e.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(e,t,o,i=!1,n){if(void 0!==e){const s=this.constructor;if(!1===i&&(n=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??_)(n,t)||o.useDefault&&o.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:n},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==n||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,v?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,z=e=>e,A=$.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,L=`<${E}>`,M=document,P=()=>M.createComment(""),Z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,O=/>/g,N=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,H=/"/g,j=/^(?:script|style|textarea|title)$/i,B=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),V=B(1),F=B(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,X=M.createTreeWalker(M,129);function Y(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const J=(e,t)=>{const o=e.length-1,i=[];let n,s=2===t?"<svg>":3===t?"<math>":"",r=T;for(let t=0;t<o;t++){const o=e[t];let a,l,c=-1,d=0;for(;d<o.length&&(r.lastIndex=d,l=r.exec(o),null!==l);)d=r.lastIndex,r===T?"!--"===l[1]?r=D:void 0!==l[1]?r=O:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=n??T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?N:'"'===l[3]?H:I):r===H||r===I?r=N:r===D||r===O?r=T:(r=N,n=void 0);const h=r===N&&e[t+1].startsWith("/>")?" ":"";s+=r===T?o+L:c>=0?(i.push(a),o.slice(0,c)+k+o.slice(c)+S+h):o+S+(-2===c?t:h)}return[Y(e,s+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class K{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,s=0;const r=e.length-1,a=this.parts,[l,c]=J(e,t);if(this.el=K.createElement(l,o),X.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=X.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(k)){const t=c[s++],o=i.getAttribute(e).split(S),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:r[2],strings:o,ctor:"."===r[1]?ie:"?"===r[1]?ne:"@"===r[1]?se:oe}),i.removeAttribute(e)}else e.startsWith(S)&&(a.push({type:6,index:n}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],P()),X.nextNode(),a.push({type:2,index:++n});i.append(e[t],P())}}}else if(8===i.nodeType)if(i.data===E)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(S,e+1));)a.push({type:7,index:n}),e+=S.length-1}n++}}static createElement(e,t){const o=M.createElement("template");return o.innerHTML=e,o}}function Q(e,t,o=e,i){if(t===W)return t;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const s=Z(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(e),n._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(t=Q(e,n._$AS(e,t.values),n,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);X.currentNode=i;let n=X.nextNode(),s=0,r=0,a=o[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new te(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new re(n,this,e)),this._$AV.push(t),a=o[++r]}s!==a?.index&&(n=X.nextNode(),s++)}return X.currentNode=M,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),Z(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&Z(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=K.createElement(Y(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new K(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new te(this.O(P()),this.O(P()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=z(e).nextSibling;z(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(e,t=this,o,i){const n=this.strings;let s=!1;if(void 0===n)e=Q(this,e,t,0),s=!Z(e)||e!==this._$AH&&e!==W,s&&(this._$AH=e);else{const i=e;let r,a;for(e=n[0],r=0;r<n.length-1;r++)a=Q(this,i[o+r],t,r),a===W&&(a=this._$AH[r]),s||=!Z(a)||a!==this._$AH[r],a===q?e=q:e!==q&&(e+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ne extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class se extends oe{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??q)===W)return;const o=this._$AH,i=e===q&&o!==q||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==q&&(o===q||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=$.litHtmlPolyfillSupport;ae?.(K,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ce extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let n=i._$litPart$;if(void 0===n){const e=o?.renderBefore??null;i._$litPart$=n=new te(t.insertBefore(P(),e),e,void 0,o??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");const he=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},ge=(e=pe,t,o)=>{const{kind:i,metadata:n}=o;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),"accessor"===i){const{name:i}=o;return{set(o){const n=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,n,e,!0,o)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];t.call(this,o),this.requestUpdate(i,n,e,!0,o)}}throw Error("Unsupported decorator location: "+i)};function ue(e){return(t,o)=>"object"==typeof o?ge(e,t,o):((e,t,o)=>{const i=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),i?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function fe(e){return ue({...e,state:!0,attribute:!1})}const ye=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ve=/^(switch|valve|input_boolean)\..+$/;function me(e){const t=e.name||e.id||"unnamed";if(!e.id)throw new Error(`Zone '${t}' is missing an id`);if(!e.name)throw new Error(`Zone '${e.id}' is missing a name`);if(e.entity&&!ve.test(e.entity))throw new Error(`Zone '${t}' has invalid entity '${e.entity}'. Must be switch.*, valve.*, or input_boolean.*`);if(!e.color)throw new Error(`Zone '${t}' is missing a color`);if(!ye.test(e.color))throw new Error(`Zone '${t}' has invalid color format`);if(e.polygon){if(!Array.isArray(e.polygon))throw new Error(`Zone '${t}' has invalid polygon coordinates`);if(e.polygon.length>0&&e.polygon.length<3)throw new Error(`Zone '${t}' polygon must have at least 3 points`);for(const o of e.polygon)if(!Array.isArray(o)||2!==o.length||"number"!=typeof o[0]||"number"!=typeof o[1]||o[0]<0||o[0]>100||o[1]<0||o[1]>100)throw new Error(`Zone '${t}' has invalid polygon coordinates`)}}let be=class extends ce{constructor(){super(...arguments),this.zones=[]}render(){return this.image?this._renderImageWithOverlay():this._renderListLayout()}_renderImageWithOverlay(){const e=this._computeZoneRenderData();return V`
      <div class="image-container">
        <img src="${this.image}" alt="Garden" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${e.map(e=>V`
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
    `}_renderListLayout(){const e=this._computeZoneRenderData();return 0===e.length?q:V`
      <div class="zone-list">
        ${e.map(e=>V`
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
    `}_computeZoneRenderData(){return this.zones.map(e=>{const t=e.entity?this.hass?.states[e.entity]:void 0,o=t?.state??"unavailable",i="on"===o,n="unavailable"===o||"unknown"===o||!t,s=(e.polygon||[]).map(([e,t])=>`${e},${t}`).join(" ");let r;return r=n?.4:i?.5:.3,{id:e.id,name:e.name,color:e.color,points:s,opacity:r,isActive:i,isUnavailable:n}})}_handleZoneTap(e){const t=this.zones.find(t=>t.id===e);if(!t)return;const o=t.entity?this.hass?.states[t.entity]:void 0,i=o?.state??"unavailable";"unavailable"!==i&&"unknown"!==i&&this.dispatchEvent(new CustomEvent("zone-tap",{detail:{zoneId:e},bubbles:!0,composed:!0}))}};be.styles=r`
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
  `,e([ue({attribute:!1})],be.prototype,"zones",void 0),e([ue({attribute:!1})],be.prototype,"hass",void 0),e([ue({type:String})],be.prototype,"image",void 0),be=e([he("garden-image-layer")],be);let _e=class extends ce{get _entityState(){if(!this.hass||!this.zone||!this.zone.entity)return"unavailable";const e=this.hass.states[this.zone.entity];return e?.state??"unavailable"}get _isActive(){return"on"===this._entityState||"open"===this._entityState}get _isUnavailable(){const e=this._entityState;return"unavailable"===e||"unknown"===e}get _statusText(){return this._isUnavailable?"Unavailable":this._isActive?"Active":"Idle"}render(){if(!this.zone)return q;const e=this._isActive,t=this._isUnavailable,o=this.zone.color||"#4CAF50";return V`
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
          ${e?V`
                <button
                  class="zone-btn zone-btn--stop"
                  ?disabled=${t}
                  @click=${this._handleStop}
                  aria-label="Stop ${this.zone.name}"
                >
                  Stop
                </button>
              `:V`
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

        ${e&&this.zone.countdown_entity?this._renderProgressBar():q}
      </div>
    `}_renderProgressBar(){if(!this.hass||!this.zone||!this.zone.countdown_entity)return q;const e=this.hass.states[this.zone.countdown_entity];if(!e||"unavailable"===e.state)return q;const t=parseFloat(e.state);if(isNaN(t))return q;let o=t;if(this.zone.duration_entity){const e=this.hass.states[this.zone.duration_entity];if(e){const t=parseFloat(e.state);!isNaN(t)&&t>0&&(o=60*t)}}if(o<=0)return q;const i=function(e,t){if(t<=0)return 0;const o=(t-e)/t*100;return Math.min(100,Math.max(0,o))}(t,o),n=function(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${(t%60).toString().padStart(2,"0")}`}(t),s=this.zone.color||"#4CAF50";return V`
      <div class="progress-section">
        <div class="progress-track">
          <div class="progress-fill" style="width: ${i}%; background-color: ${s}"></div>
        </div>
        <span class="remaining-time">${n}</span>
      </div>
    `}async _handleStart(){if(!this.hass||!this.zone||!this.zone.entity||this._isUnavailable)return;const{domain:e,service:t}=function(e){switch(e.split(".")[0]){case"valve":return{domain:"valve",service:"open"};case"input_boolean":return{domain:"homeassistant",service:"turn_on"};default:return{domain:"switch",service:"turn_on"}}}(this.zone.entity);await this.hass.callService(e,t,{entity_id:this.zone.entity})}async _handleStop(){if(!this.hass||!this.zone||!this.zone.entity||this._isUnavailable)return;const{domain:e,service:t}=function(e){switch(e.split(".")[0]){case"valve":return{domain:"valve",service:"close"};case"input_boolean":return{domain:"homeassistant",service:"turn_off"};default:return{domain:"switch",service:"turn_off"}}}(this.zone.entity);await this.hass.callService(e,t,{entity_id:this.zone.entity})}};_e.styles=r`
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
  `,e([ue({attribute:!1})],_e.prototype,"zone",void 0),e([ue({attribute:!1})],_e.prototype,"hass",void 0),_e=e([he("zone-control")],_e);let xe=class extends ce{constructor(){super(...arguments),this.zones=[]}render(){return this.zones&&0!==this.zones.length?V`
      <div class="zone-panel">
        ${this.zones.map(e=>V`
            <zone-control .zone=${e} .hass=${this.hass}></zone-control>
          `)}
      </div>
    `:q}};xe.styles=r`
    :host {
      display: block;
    }

    .zone-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `,e([ue({attribute:!1})],xe.prototype,"zones",void 0),e([ue({attribute:!1})],xe.prototype,"hass",void 0),xe=e([he("zone-control-panel")],xe);let we=class extends ce{get _entityState(){if(!this.hass||!this.config)return"unavailable";const e=this.hass.states[this.config.entity];return e?.state??"unavailable"}get _activity(){return function(e){switch(e){case"mowing":return"mowing";case"docked":return"docked";case"paused":return"paused";case"returning":return"returning";case"error":return"error";default:return"unknown"}}(this._entityState)}get _batteryLevel(){if(!this.hass||!this.config?.battery_entity)return null;const e=this.hass.states[this.config.battery_entity];if(!e||"unavailable"===e.state||"unknown"===e.state)return null;const t=parseFloat(e.state);return isNaN(t)?null:Math.max(0,Math.min(100,t))}get _errorDescription(){if("error"!==this._activity)return null;if(!this.hass||!this.config)return null;const e=this.hass.states[this.config.entity];if(!e)return null;const t=e.attributes.error;return"string"==typeof t?t:null}get _isUnavailable(){const e=this._entityState;return"unavailable"===e||"unknown"===e}render(){if(!this.config)return q;const e=this._activity,t=this._batteryLevel,o=this._errorDescription,i=this._isUnavailable,n=function(e){switch(e){case"mowing":return"M5,11 L5,7 L9,7 L9,4 L15,4 L15,7 L19,7 L19,11 L5,11 Z M7,13 A2,2 0 1,0 7,17 A2,2 0 1,0 7,13 M17,13 A2,2 0 1,0 17,17 A2,2 0 1,0 17,13";case"docked":return"M12,3 L2,12 L5,12 L5,20 L10,20 L10,14 L14,14 L14,20 L19,20 L19,12 L22,12 Z";case"paused":return"M6,4 L10,4 L10,20 L6,20 Z M14,4 L18,4 L18,20 L14,20 Z";case"returning":return"M19,11 L19,13 L7.83,13 L12.41,17.59 L11,19 L4,12 L11,5 L12.41,6.41 L7.83,11 L19,11 Z";case"error":return"M1,21 L12,2 L23,21 Z M12,14 L12,10 M12,18 L12,16";default:return"M12,2 A10,10 0 1,0 12,22 A10,10 0 1,0 12,2 M12,8 A2,2 0 0,1 14,10 Q14,12 12,13 M12,16 L12,17"}}(e),s=function(e){switch(e){case"mowing":return"Mowing";case"docked":return"Docked";case"paused":return"Paused";case"returning":return"Returning";case"error":return"Error";default:return"Unknown"}}(e),r=null===(a=t)?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M12,11 L12,14 M12,17 L12,17.5":a>75?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,7 L15,7 L15,20 L9,20 Z":a>=25?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,13 L15,13 L15,20 L9,20 Z":"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,17 L15,17 L15,20 L9,20 Z";var a;const l=function(e){return null===e?"unknown":e>75?"full":e>=25?"medium":"low"}(t);return V`
      <div class="mower-panel ${i?"mower-panel--unavailable":""}">
        <div class="mower-header">
          <div class="mower-icon-container ${"error"===e?"mower-icon-container--error":""} ${"mowing"===e?"mower-icon-container--mowing":""}">
            <svg class="mower-icon ${"mowing"===e?"mower-icon--mowing":""}" viewBox="0 0 24 24">
              <path d="${n}" />
            </svg>
          </div>

          <div class="mower-info">
            <div class="mower-activity">${s}</div>
            ${null!==t?V`
                  <div class="mower-battery">
                    <svg class="battery-icon battery-icon--${l}" viewBox="0 0 24 24">
                      <path d="${r}" />
                    </svg>
                    <span>${t}%</span>
                  </div>
                `:q}
          </div>
        </div>

        ${"error"===e&&o?V`
              <div class="mower-error">
                <svg class="error-icon" viewBox="0 0 24 24">
                  <path d="M1,21 L12,2 L23,21 Z M13,18 L11,18 L11,16 L13,16 Z M13,14 L11,14 L11,10 L13,10 Z" />
                </svg>
                <span class="error-text">${o}</span>
              </div>
            `:q}

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
    `}async _handleStart(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","start_mowing",{entity_id:this.config.entity})}async _handlePause(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","pause",{entity_id:this.config.entity})}async _handleDock(){this.hass&&this.config&&!this._isUnavailable&&await this.hass.callService("lawn_mower","dock",{entity_id:this.config.entity})}};function $e(e){if(!e||""===e.trim())return null;const t=new Date(e);return isNaN(t.getTime())?null:t}function ze(e){return`${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}`}we.styles=r`
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
      width: 24px;
      height: 24px;
      fill: #fff;
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
  `,e([ue({attribute:!1})],we.prototype,"config",void 0),e([ue({attribute:!1})],we.prototype,"hass",void 0),we=e([he("mower-panel")],we);let Ae=class extends ce{constructor(){super(...arguments),this.zones=[]}render(){const e=this._getScheduledZones();return 0===e.length?q:V`
      <div class="schedule-badges">
        ${e.map(({zone:e,nextTime:t})=>this._renderBadge(e,t))}
      </div>
    `}_renderBadge(e,t){return t?V`
        <div class="schedule-badge" title="${e.name}: Next run at ${t}">
          <span class="schedule-badge__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
            </svg>
          </span>
          <span>Next: ${t}</span>
        </div>
      `:V`
      <div class="schedule-badge schedule-badge--no-schedule" title="${e.name}: No schedule configured">
        <span>No schedule</span>
      </div>
    `}_getScheduledZones(){return this.zones.filter(e=>e.schedule_entity).map(e=>{const t=this.hass?.states[e.schedule_entity],o=function(e){if(!e)return null;if("unavailable"===e.state||"unknown"===e.state)return null;const t=e.attributes.next_run;if(t&&"string"==typeof t){const e=$e(t);if(e)return ze(e)}const o=$e(e.state);return o?ze(o):null}(t);return{zone:e,nextTime:o}})}};Ae.styles=r`
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
  `,e([ue({attribute:!1})],Ae.prototype,"zones",void 0),e([ue({attribute:!1})],Ae.prototype,"hass",void 0),Ae=e([he("schedule-view")],Ae);const Ce=r`
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
`;let ke=class extends ce{constructor(){super(...arguments),this.zones=[]}render(){const e=this.zones.filter(e=>e.isActive);return 0===e.length?q:V`
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
    `}_renderPatternDef(e){const t=`water-pattern-${e.id}`;return F`
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
    `}_renderZoneAnimation(e){const t=`water-pattern-${e.id}`,o=e.isActive?"water-zone-group water-zone-group--active":"water-zone-group water-zone-group--inactive";return F`
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
    `}};function Se(e,t,o,i){return[Math.min(100,Math.max(0,e/o*100)),Math.min(100,Math.max(0,t/i*100))]}ke.styles=[Ce,r`
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
    `],e([ue({attribute:!1})],ke.prototype,"zones",void 0),ke=e([he("water-animation")],ke);let Ee=class extends ce{constructor(){super(...arguments),this.image="",this.existingZones=[],this.polygon=[],this.color="#03a9f4",this._isClosed=!1,this._draggingIndex=null,this._validationMessage="",this._longPressTimer=null,this._didDrag=!1}disconnectedCallback(){super.disconnectedCallback(),this._clearLongPress()}render(){return this.image?V`
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
          <svg
            class="drawing-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style="pointer-events: none;"
          >
            <!-- Existing zone polygons (reference) -->
            ${this._renderExistingZones()}

            <!-- Current polygon being drawn -->
            ${this._renderCurrentPolygon()}
          </svg>

          <!-- Vertices as HTML elements (not affected by SVG stretching) -->
          ${this._renderVerticesAsHtml()}
        </div>

        <!-- Controls -->
        <div class="editor-controls">
          ${this._isClosed?V`
                <span class="status-text">✓ Polygon complete (${this.polygon.length} points)</span>
                <button class="btn btn-secondary" @click=${this._handleReset}>
                  Reset
                </button>
              `:V`
                <span class="status-text">
                  ${0===this.polygon.length?"Click on the image to add points":`${this.polygon.length} point${1!==this.polygon.length?"s":""} — click first point or Confirm to close`}
                </span>
                ${this.polygon.length>0?V`<button class="btn btn-danger" @click=${this._handleRemoveLastPoint}>
                      Undo
                    </button>`:q}
                <button class="btn btn-primary" @click=${this._handleConfirm}>
                  Confirm
                </button>
              `}
          ${this._validationMessage?V`<span class="validation-message">${this._validationMessage}</span>`:q}
        </div>
      </div>
    `:V`
        <div class="no-image">
          <p>Configure an image URL first</p>
        </div>
      `}_renderExistingZones(){return this.existingZones.map(e=>V`
        <g class="existing-zone">
          <polygon
            points="${(e.polygon||[]).map(([e,t])=>`${e},${t}`).join(" ")}"
            fill="${e.color}"
            opacity="0.25"
            stroke="${e.color}"
            stroke-width="0.3"
            stroke-dasharray="1,1"
          />
          ${this._renderZoneLabel(e)}
        </g>
      `)}_renderZoneLabel(e){if(!e.polygon||e.polygon.length<3)return q;const t=e.polygon.reduce((e,[t])=>e+t,0)/e.polygon.length,o=e.polygon.reduce((e,[,t])=>e+t,0)/e.polygon.length;return V`
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
    `}_renderCurrentPolygon(){if(this.polygon.length<2)return this.polygon.length,q;if(this._isClosed){const e=this.polygon.map(([e,t])=>`${e},${t}`).join(" ");return V`
        <polygon
          points="${e}"
          fill="rgba(3, 169, 244, 0.3)"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      `}const e=this.polygon.map(([e,t])=>`${e},${t}`).join(" "),t=[...this.polygon,this.polygon[0]].map(([e,t])=>`${e},${t}`).join(" ");return V`
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
        vector-effect="non-scaling-stroke"
      />
    `}_renderVerticesAsHtml(){return this.polygon.map(([e,t],o)=>{const i=0===o&&!this._isClosed&&this.polygon.length>2,n=this._draggingIndex===o;return V`
          <div
            class="vertex-dot ${i?"vertex-dot--first":""} ${n?"vertex-dot--dragging":""}"
            style="left: ${e}%; top: ${t}%;"
            data-index="${o}"
            @pointerdown=${e=>this._handleVertexPointerDown(e,o)}
            @contextmenu=${e=>this._handleVertexContextMenu(e,o)}
          >
            ${i?V`<span class="vertex-label">Close</span>`:q}
          </div>
        `})}_handleImageLoad(){this.requestUpdate()}_handleCanvasClick(e){if(this._didDrag)return void(this._didDrag=!1);if(this._isClosed)return;if(e.target.closest(".vertex-dot"))return;const t=this.renderRoot.querySelector(".canvas-container");if(!t)return;const o=t.getBoundingClientRect(),i=e.clientX-o.left,n=e.clientY-o.top,[s,r]=Se(i,n,o.width,o.height);if(this.polygon.length>2){const[e,t]=this.polygon[0];if(Math.sqrt((s-e)**2+(r-t)**2)<=3)return void this._closePolygon()}this._clearValidationMessage();const a=[...this.polygon,[s,r]];this.polygon=a,this._dispatchPolygonChanged()}_handleVertexPointerDown(e,t){e.preventDefault(),e.stopPropagation(),this._longPressTimer=setTimeout(()=>{this._deleteVertex(t),this._longPressTimer=null},500),this._draggingIndex=t,this._didDrag=!1;e.target.setPointerCapture(e.pointerId)}_handlePointerMove(e){if(null===this._draggingIndex)return;this._clearLongPress(),this._didDrag=!0;const t=this.renderRoot.querySelector(".canvas-container");if(!t)return;const o=t.getBoundingClientRect(),i=e.clientX-o.left,n=e.clientY-o.top,[s,r]=Se(i,n,o.width,o.height),a=[...this.polygon];a[this._draggingIndex]=[s,r],this.polygon=a}_handlePointerUp(e){if(null!==this._draggingIndex){const t=e.target;t.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),this._draggingIndex=null,this._didDrag&&this._dispatchPolygonChanged()}this._clearLongPress()}_handleContextMenu(e){e.preventDefault()}_handleVertexContextMenu(e,t){e.preventDefault(),e.stopPropagation(),this._deleteVertex(t)}_handleRemoveLastPoint(){0!==this.polygon.length&&(this.polygon=this.polygon.slice(0,-1),this._clearValidationMessage(),this._dispatchPolygonChanged())}_handleConfirm(){this.polygon.length<3?this._validationMessage="A zone needs at least 3 points":this._closePolygon()}_handleReset(){this.polygon=[],this._isClosed=!1,this._clearValidationMessage(),this._dispatchPolygonChanged()}_closePolygon(){this._isClosed=!0,this._clearValidationMessage(),this._dispatchPolygonComplete()}_deleteVertex(e){if(0===this.polygon.length)return;const t=this.polygon.filter((t,o)=>o!==e);this.polygon=t,this._isClosed&&t.length<3&&(this._isClosed=!1),this._dispatchPolygonChanged()}_clearLongPress(){null!==this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=null)}_clearValidationMessage(){this._validationMessage=""}_dispatchPolygonChanged(){this.dispatchEvent(new CustomEvent("polygon-changed",{detail:{polygon:[...this.polygon]},bubbles:!0,composed:!0}))}_dispatchPolygonComplete(){this.dispatchEvent(new CustomEvent("polygon-complete",{detail:{polygon:[...this.polygon]},bubbles:!0,composed:!0}))}};Ee.styles=r`
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
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
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
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #03a9f4;
      transform: translate(-50%, -50%);
      cursor: grab;
      z-index: 10;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      transition: transform 150ms ease, box-shadow 150ms ease;
    }

    .vertex-dot:hover {
      transform: translate(-50%, -50%) scale(1.3);
      box-shadow: 0 3px 10px rgba(0,0,0,0.5);
    }

    .vertex-dot--first {
      background: #ff5722;
      border-color: #ffffff;
      width: 16px;
      height: 16px;
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
  `,e([ue({type:String})],Ee.prototype,"image",void 0),e([ue({attribute:!1})],Ee.prototype,"existingZones",void 0),e([ue({attribute:!1})],Ee.prototype,"polygon",void 0),e([ue({type:String})],Ee.prototype,"color",void 0),e([fe()],Ee.prototype,"_isClosed",void 0),e([fe()],Ee.prototype,"_draggingIndex",void 0),e([fe()],Ee.prototype,"_validationMessage",void 0),Ee=e([he("zone-editor")],Ee);let Le=class extends ce{constructor(){super(...arguments),this._editingPolygonIndex=null}setConfig(e){this._config={...e}}set hass(e){this._hass=e}_dispatchConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_handleTitleChange(e){const t=e.target;this._dispatchConfigChanged({...this._config,title:t.value})}_handleImageChange(e){const t=e.target;this._dispatchConfigChanged({...this._config,image:t.value})}_handleAddZone(){const e={id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}),name:`Zone ${this._config.zones.length+1}`,entity:"",color:"#4CAF50",polygon:[]};this._dispatchConfigChanged({...this._config,zones:[...this._config.zones,e]})}_handleRemoveZone(e){const t=[...this._config.zones];t.splice(e,1),this._dispatchConfigChanged({...this._config,zones:t})}_handleMoveZoneUp(e){if(e<=0)return;const t=[...this._config.zones];[t[e-1],t[e]]=[t[e],t[e-1]],this._dispatchConfigChanged({...this._config,zones:t})}_handleMoveZoneDown(e){if(e>=this._config.zones.length-1)return;const t=[...this._config.zones];[t[e],t[e+1]]=[t[e+1],t[e]],this._dispatchConfigChanged({...this._config,zones:t})}_handleZoneNameChange(e,t){const o=t.target,i=[...this._config.zones];i[e]={...i[e],name:o.value},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],entity:o},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneColorChange(e,t){const o=t.target,i=[...this._config.zones];i[e]={...i[e],color:o.value},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneDurationEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],duration_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneCountdownEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],countdown_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleZoneScheduleEntityChange(e,t){const o=t.detail?.value??"",i=[...this._config.zones];i[e]={...i[e],schedule_entity:o||void 0},this._dispatchConfigChanged({...this._config,zones:i})}_handleEditPolygon(e){this._editingPolygonIndex=this._editingPolygonIndex===e?null:e}_handlePolygonChanged(e,t){const o=t.detail?.polygon||[],i=[...this._config.zones||[]];i[e]={...i[e],polygon:o},this._dispatchConfigChanged({...this._config,zones:i})}_handlePolygonComplete(e,t){const o=t.detail?.polygon||[],i=[...this._config.zones||[]];i[e]={...i[e],polygon:o},this._dispatchConfigChanged({...this._config,zones:i}),this._editingPolygonIndex=null}_handleMowerEntityChange(e){const t=e.detail?.value??"";if(!t){const{mower:e,...t}=this._config;return void this._dispatchConfigChanged(t)}const o={...this._config.mower||{entity:""},entity:t};this._dispatchConfigChanged({...this._config,mower:o})}_handleMowerBatteryEntityChange(e){const t=e.detail?.value??"";if(!this._config.mower)return;const o={...this._config.mower,battery_entity:t||void 0};this._dispatchConfigChanged({...this._config,mower:o})}render(){return this._config?V`
      <div class="editor">
        ${this._renderGeneralSection()}
        ${this._renderZonesSection()}
        ${this._renderMowerSection()}
      </div>
    `:q}_renderGeneralSection(){return V`
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
    `}_renderZonesSection(){const e=!this._config.zones||0===this._config.zones.length;return V`
      <div class="section">
        <div class="section-header">
          <h3 class="section-title">Zones</h3>
          <button class="add-button" @click=${this._handleAddZone}>
            + Add Zone
          </button>
        </div>

        ${e?V`<div class="warning">
              ⚠️ At least one zone is required for the card to work.
            </div>`:q}

        <div class="zone-list">
          ${(this._config.zones||[]).map((e,t)=>this._renderZoneEntry(e,t))}
        </div>
      </div>
    `}_renderZoneEntry(e,t){const o=0===t,i=t===(this._config.zones||[]).length-1;return V`
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
              ${e.polygon&&e.polygon.length>=3?V`<span class="polygon-info">✓ ${e.polygon.length} points defined</span>`:V`<span class="polygon-info polygon-info--empty">No shape defined</span>`}
              <button
                class="btn-draw"
                @click=${()=>this._handleEditPolygon(t)}
              >
                ${this._editingPolygonIndex===t?"Close Editor":"Draw Zone"}
              </button>
            </div>
            ${this._editingPolygonIndex===t?V`
                  <zone-editor
                    .image=${this._config.image||""}
                    .existingZones=${(this._config.zones||[]).filter((e,o)=>o!==t)}
                    .polygon=${e.polygon||[]}
                    .color=${e.color||"#4CAF50"}
                    @polygon-changed=${e=>this._handlePolygonChanged(t,e)}
                    @polygon-complete=${e=>this._handlePolygonComplete(t,e)}
                  ></zone-editor>
                `:q}
          </div>
        </div>
      </div>
    `}_renderMowerSection(){return V`
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

        ${this._config.mower?.entity?V`
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
            `:q}
      </div>
    `}};Le.styles=r`
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
  `,e([fe()],Le.prototype,"_config",void 0),e([fe()],Le.prototype,"_hass",void 0),e([fe()],Le.prototype,"_editingPolygonIndex",void 0),Le=e([he("ha-garden-card-editor")],Le);let Me=class extends ce{constructor(){super(...arguments),this._activeZone=null,this._cardWidth=0,this._relevantEntities=new Set}static getConfigElement(){return document.createElement("ha-garden-card-editor")}static getStubConfig(){return{type:"custom:ha-garden-card",title:"My Garden",zones:[{id:"zone_1",name:"Zone 1",entity:"switch.irrigation_zone_1",color:"#4CAF50",polygon:[[10,10],[40,10],[40,40],[10,40]]}]}}setConfig(e){!function(e){if(!e)throw new Error("Configuration is required");if(e.zones&&Array.isArray(e.zones))for(const t of e.zones)me(t)}(e),this._config=e,this._relevantEntities=function(e){const t=new Set;for(const o of e.zones||[])o.entity&&t.add(o.entity),o.duration_entity&&t.add(o.duration_entity),o.countdown_entity&&t.add(o.countdown_entity),o.schedule_entity&&t.add(o.schedule_entity);return e.mower&&(t.add(e.mower.entity),e.mower.battery_entity&&t.add(e.mower.battery_entity)),t}(e)}getCardSize(){if(!this._config)return 3;let e=3;return e+=Math.ceil((this._config.zones||[]).length/2),this._config.mower&&(e+=2),e}set hass(e){const t=this._hass;if(!t)return this._hass=e,void this.requestUpdate();let o=!1;for(const i of this._relevantEntities){if(t.states[i]!==e.states[i]){o=!0;break}}t.themes?.darkMode!==e.themes?.darkMode&&(o=!0),this._hass=e,o&&this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._attachResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this._detachResizeObserver()}_attachResizeObserver(){this._resizeObserver=new ResizeObserver(e=>{for(const t of e){const e=t.contentRect.width;e!==this._cardWidth&&(this._cardWidth=e)}}),this.isConnected&&this._resizeObserver.observe(this)}_detachResizeObserver(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0)}get _layoutMode(){return(e=this._cardWidth||400)<400?"compact":e<=800?"medium":"wide";var e}get _isDarkMode(){return this._hass?.themes?this._hass.themes.darkMode:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}get activeZone(){return this._activeZone}setActiveZone(e){this._activeZone=e}_handleZoneTap(e){const{zoneId:t}=e.detail;this._activeZone=this._activeZone===t?null:t}get _waterAnimationZones(){return this._hass&&this._config?(this._config.zones||[]).map(e=>{const t=e.entity?this._hass.states[e.entity]:void 0,o=t?.state??"unavailable",i="on"===o||"open"===o,n=(e.polygon||[]).map(([e,t])=>`${e},${t}`).join(" ");return{id:e.id,color:e.color,points:n,isActive:i}}):[]}render(){if(!this._config)return q;const e=this._layoutMode,t=this._isDarkMode;return V`
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
          </div>

          <!-- Zone Controls and Schedule -->
          <div class="controls-section">
            <zone-control-panel
              .zones=${this._config.zones||[]}
              .hass=${this._hass}
            ></zone-control-panel>

            <schedule-view
              .zones=${this._config.zones||[]}
              .hass=${this._hass}
            ></schedule-view>
          </div>

          <!-- Mower Panel (conditional) -->
          ${this._config.mower?V`
                <div class="mower-section">
                  <mower-panel
                    .config=${this._config.mower}
                    .hass=${this._hass}
                  ></mower-panel>
                </div>
              `:q}
        </div>
      </ha-card>
    `}};Me.styles=r`
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
  `,e([fe()],Me.prototype,"_config",void 0),e([fe()],Me.prototype,"_activeZone",void 0),e([fe()],Me.prototype,"_cardWidth",void 0),Me=e([he("ha-garden-card")],Me),console.info("%c HA-GARDEN-CARD %c v0.1.0 ","color: white; background: #4CAF50; font-weight: bold;","color: #4CAF50; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"ha-garden-card",name:"Garden Card",description:"A visual garden management card with zone overlays, irrigation control, and robot mower status.",preview:!0});export{Me as HaGardenCard};
