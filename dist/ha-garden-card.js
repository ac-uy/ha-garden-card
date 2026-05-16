function t(t,e,i,o){var n,s=arguments.length,r=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,v=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=o;const s=n.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,n){if(void 0!==t){const s=this.constructor;if(!1===o&&(n=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??_)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,m?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,z=t=>t,A=$.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,L=`<${E}>`,M=document,Z=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,O="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,D=/>/g,N=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=I(1),W=I(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),V=new WeakMap,X=M.createTreeWalker(M,129);function Y(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===R?"!--"===l[1]?r=T:void 0!==l[1]?r=D:void 0!==l[2]?(B.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=n??R,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?N:'"'===l[3]?j:H):r===j||r===H?r=N:r===T||r===D?r=R:(r=N,n=void 0);const h=r===N&&t[e+1].startsWith("/>")?" ":"";s+=r===R?i+L:c>=0?(o.push(a),i.slice(0,c)+C+i.slice(c)+S+h):i+S+(-2===c?e:h)}return[Y(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class K{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=X.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=c[s++],i=o.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?ot:"?"===r[1]?nt:"@"===r[1]?st:it}),o.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],Z()),X.nextNode(),a.push({type:2,index:++n});o.append(t[e],Z())}}}else if(8===o.nodeType)if(o.data===E)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===q)return e;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=U(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??M).importNode(e,!0);X.currentNode=o;let n=X.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new et(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new rt(n,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(n=X.nextNode(),s++)}return X.currentNode=M,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new et(this.O(Z()),this.O(Z()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=z(t).nextSibling;z(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=Q(this,t,e,0),s=!U(t)||t!==this._$AH&&t!==q,s&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Q(this,o[i+r],e,r),a===q&&(a=this._$AH[r]),s||=!U(a)||a!==this._$AH[r],a===G?t=G:t!==G&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class nt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class st extends it{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const i=this._$AH,o=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==G&&(i===G||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(K,et),($.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let n=o._$litPart$;if(void 0===n){const t=i?.renderBefore??null;o._$litPart$=n=new et(e.insertBefore(Z(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},ut=(t=pt,e,i)=>{const{kind:o,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,n,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];e.call(this,i),this.requestUpdate(o,n,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function gt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return gt({...t,state:!0,attribute:!1})}const vt=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,mt=/^(switch|valve|input_boolean)\..+$/;function yt(t){const e=t.name||t.id||"unnamed";if(!t.id)throw new Error(`Zone '${e}' is missing an id`);if(!t.name)throw new Error(`Zone '${t.id}' is missing a name`);if(t.entity&&!mt.test(t.entity))throw new Error(`Zone '${e}' has invalid entity '${t.entity}'. Must be switch.*, valve.*, or input_boolean.*`);if(!t.color)throw new Error(`Zone '${e}' is missing a color`);if(!vt.test(t.color))throw new Error(`Zone '${e}' has invalid color format`);if(t.polygon){if(!Array.isArray(t.polygon))throw new Error(`Zone '${e}' has invalid polygon coordinates`);if(t.polygon.length>0&&t.polygon.length<3)throw new Error(`Zone '${e}' polygon must have at least 3 points`);for(const i of t.polygon)if(!Array.isArray(i)||2!==i.length||"number"!=typeof i[0]||"number"!=typeof i[1]||i[0]<0||i[0]>100||i[1]<0||i[1]>100)throw new Error(`Zone '${e}' has invalid polygon coordinates`)}}let bt=class extends ct{constructor(){super(...arguments),this.zones=[]}render(){return this.image?this._renderImageWithOverlay():this._renderListLayout()}_renderImageWithOverlay(){const t=this._computeZoneRenderData();return F`
      <div class="image-container">
        <img src="${this.image}" alt="Garden" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${t.map(t=>F`
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
    `}_renderListLayout(){const t=this._computeZoneRenderData();return 0===t.length?G:F`
      <div class="zone-list">
        ${t.map(t=>F`
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
    `}_computeZoneRenderData(){return this.zones.map(t=>{const e=t.entity?this.hass?.states[t.entity]:void 0,i=e?.state??"unavailable",o="on"===i,n="unavailable"===i||"unknown"===i||!e,s=(t.polygon||[]).map(([t,e])=>`${t},${e}`).join(" ");let r;return r=n?.4:o?.5:.3,{id:t.id,name:t.name,color:t.color,points:s,opacity:r,isActive:o,isUnavailable:n}})}_handleZoneTap(t){const e=this.zones.find(e=>e.id===t);if(!e)return;const i=e.entity?this.hass?.states[e.entity]:void 0,o=i?.state??"unavailable";"unavailable"!==o&&"unknown"!==o&&this.dispatchEvent(new CustomEvent("zone-tap",{detail:{zoneId:t},bubbles:!0,composed:!0}))}};bt.styles=r`
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
  `,t([gt({attribute:!1})],bt.prototype,"zones",void 0),t([gt({attribute:!1})],bt.prototype,"hass",void 0),t([gt({type:String})],bt.prototype,"image",void 0),bt=t([ht("garden-image-layer")],bt);let _t=class extends ct{get _entityState(){if(!this.hass||!this.zone||!this.zone.entity)return"unavailable";const t=this.hass.states[this.zone.entity];return t?.state??"unavailable"}get _isActive(){return"on"===this._entityState||"open"===this._entityState}get _isUnavailable(){const t=this._entityState;return"unavailable"===t||"unknown"===t}get _statusText(){return this._isUnavailable?"Unavailable":this._isActive?"Active":"Idle"}render(){if(!this.zone)return G;const t=this._isActive,e=this._isUnavailable,i=this.zone.color||"#4CAF50";return F`
      <div
        class="zone-control ${t?"zone-control--active":""} ${e?"zone-control--unavailable":""}"
        style="--zone-color: ${i}"
      >
        <span
          class="status-indicator ${t?"status-indicator--active":""} ${e?"status-indicator--unavailable":""}"
          style="background-color: ${e?"#9e9e9e":t?i:"#bdbdbd"}; color: ${i}"
        ></span>

        <div class="zone-info">
          <div class="zone-name">${this.zone.name}</div>
          <div class="zone-status-text">${this._statusText}</div>
        </div>

        <div class="zone-actions">
          ${t?F`
                <button
                  class="zone-btn zone-btn--stop"
                  ?disabled=${e}
                  @click=${this._handleStop}
                  aria-label="Stop ${this.zone.name}"
                >
                  Stop
                </button>
              `:F`
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
      </div>
    `}async _handleStart(){if(!this.hass||!this.zone||this._isUnavailable)return;const{domain:t,service:e}=function(t){switch(t.split(".")[0]){case"valve":return{domain:"valve",service:"open"};case"input_boolean":return{domain:"homeassistant",service:"turn_on"};default:return{domain:"switch",service:"turn_on"}}}(this.zone.entity);await this.hass.callService(t,e,{entity_id:this.zone.entity})}async _handleStop(){if(!this.hass||!this.zone||this._isUnavailable)return;const{domain:t,service:e}=function(t){switch(t.split(".")[0]){case"valve":return{domain:"valve",service:"close"};case"input_boolean":return{domain:"homeassistant",service:"turn_off"};default:return{domain:"switch",service:"turn_off"}}}(this.zone.entity);await this.hass.callService(t,e,{entity_id:this.zone.entity})}};_t.styles=r`
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
  `,t([gt({attribute:!1})],_t.prototype,"zone",void 0),t([gt({attribute:!1})],_t.prototype,"hass",void 0),_t=t([ht("zone-control")],_t);let wt=class extends ct{constructor(){super(...arguments),this.zones=[]}render(){return this.zones&&0!==this.zones.length?F`
      <div class="zone-panel">
        ${this.zones.map(t=>F`
            <zone-control .zone=${t} .hass=${this.hass}></zone-control>
          `)}
      </div>
    `:G}};wt.styles=r`
    :host {
      display: block;
    }

    .zone-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `,t([gt({attribute:!1})],wt.prototype,"zones",void 0),t([gt({attribute:!1})],wt.prototype,"hass",void 0),wt=t([ht("zone-control-panel")],wt);let xt=class extends ct{get _entityState(){if(!this.hass||!this.config)return"unavailable";const t=this.hass.states[this.config.entity];return t?.state??"unavailable"}get _activity(){return function(t){switch(t){case"mowing":return"mowing";case"docked":return"docked";case"paused":return"paused";case"returning":return"returning";case"error":return"error";default:return"unknown"}}(this._entityState)}get _batteryLevel(){if(!this.hass||!this.config?.battery_entity)return null;const t=this.hass.states[this.config.battery_entity];if(!t||"unavailable"===t.state||"unknown"===t.state)return null;const e=parseFloat(t.state);return isNaN(e)?null:Math.max(0,Math.min(100,e))}get _errorDescription(){if("error"!==this._activity)return null;if(!this.hass||!this.config)return null;const t=this.hass.states[this.config.entity];if(!t)return null;const e=t.attributes.error;return"string"==typeof e?e:null}get _isUnavailable(){const t=this._entityState;return"unavailable"===t||"unknown"===t}render(){if(!this.config)return G;const t=this._activity,e=this._batteryLevel,i=this._errorDescription,o=this._isUnavailable,n=function(t){switch(t){case"mowing":return"M5,11 L5,7 L9,7 L9,4 L15,4 L15,7 L19,7 L19,11 L5,11 Z M7,13 A2,2 0 1,0 7,17 A2,2 0 1,0 7,13 M17,13 A2,2 0 1,0 17,17 A2,2 0 1,0 17,13";case"docked":return"M12,3 L2,12 L5,12 L5,20 L10,20 L10,14 L14,14 L14,20 L19,20 L19,12 L22,12 Z";case"paused":return"M6,4 L10,4 L10,20 L6,20 Z M14,4 L18,4 L18,20 L14,20 Z";case"returning":return"M19,11 L19,13 L7.83,13 L12.41,17.59 L11,19 L4,12 L11,5 L12.41,6.41 L7.83,11 L19,11 Z";case"error":return"M1,21 L12,2 L23,21 Z M12,14 L12,10 M12,18 L12,16";default:return"M12,2 A10,10 0 1,0 12,22 A10,10 0 1,0 12,2 M12,8 A2,2 0 0,1 14,10 Q14,12 12,13 M12,16 L12,17"}}(t),s=function(t){switch(t){case"mowing":return"Mowing";case"docked":return"Docked";case"paused":return"Paused";case"returning":return"Returning";case"error":return"Error";default:return"Unknown"}}(t),r=null===(a=e)?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M12,11 L12,14 M12,17 L12,17.5":a>75?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,7 L15,7 L15,20 L9,20 Z":a>=25?"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,13 L15,13 L15,20 L9,20 Z":"M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,17 L15,17 L15,20 L9,20 Z";var a;const l=function(t){return null===t?"unknown":t>75?"full":t>=25?"medium":"low"}(e);return F`
      <div class="mower-panel ${o?"mower-panel--unavailable":""}">
        <div class="mower-header">
          <div class="mower-icon-container ${"error"===t?"mower-icon-container--error":""} ${"mowing"===t?"mower-icon-container--mowing":""}">
            <svg class="mower-icon ${"mowing"===t?"mower-icon--mowing":""}" viewBox="0 0 24 24">
              <path d="${n}" />
            </svg>
          </div>

          <div class="mower-info">
            <div class="mower-activity">${s}</div>
            ${null!==e?F`
                  <div class="mower-battery">
                    <svg class="battery-icon battery-icon--${l}" viewBox="0 0 24 24">
                      <path d="${r}" />
                    </svg>
                    <span>${e}%</span>
                  </div>
                `:G}
          </div>
        </div>

        ${"error"===t&&i?F`
              <div class="mower-error">
                <svg class="error-icon" viewBox="0 0 24 24">
                  <path d="M1,21 L12,2 L23,21 Z M13,18 L11,18 L11,16 L13,16 Z M13,14 L11,14 L11,10 L13,10 Z" />
                </svg>
                <span class="error-text">${i}</span>
              </div>
            `:G}

        <div class="mower-controls">
          <button
            class="mower-btn mower-btn--start"
            ?disabled=${o}
            @click=${this._handleStart}
            aria-label="Start mowing"
          >
            Start
          </button>
          <button
            class="mower-btn mower-btn--pause"
            ?disabled=${o}
            @click=${this._handlePause}
            aria-label="Pause mower"
          >
            Pause
          </button>
          <button
            class="mower-btn mower-btn--dock"
            ?disabled=${o}
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
  `,t([gt({attribute:!1})],xt.prototype,"config",void 0),t([gt({attribute:!1})],xt.prototype,"hass",void 0),xt=t([ht("mower-panel")],xt);let At=class extends ct{constructor(){super(...arguments),this.zones=[]}render(){const t=this._getScheduledZones();return 0===t.length?G:F`
      <div class="schedule-badges">
        ${t.map(({zone:t,nextTime:e})=>this._renderBadge(t,e))}
      </div>
    `}_renderBadge(t,e){return e?F`
        <div class="schedule-badge" title="${t.name}: Next run at ${e}">
          <span class="schedule-badge__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
            </svg>
          </span>
          <span>Next: ${e}</span>
        </div>
      `:F`
      <div class="schedule-badge schedule-badge--no-schedule" title="${t.name}: No schedule configured">
        <span>No schedule</span>
      </div>
    `}_getScheduledZones(){return this.zones.filter(t=>t.schedule_entity).map(t=>{const e=this.hass?.states[t.schedule_entity],i=function(t){if(!t)return null;if("unavailable"===t.state||"unknown"===t.state)return null;const e=t.attributes.next_run;if(e&&"string"==typeof e){const t=$t(e);if(t)return zt(t)}const i=$t(t.state);return i?zt(i):null}(e);return{zone:t,nextTime:i}})}};At.styles=r`
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
  `,t([gt({attribute:!1})],At.prototype,"zones",void 0),t([gt({attribute:!1})],At.prototype,"hass",void 0),At=t([ht("schedule-view")],At);const kt=r`
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
`;let Ct=class extends ct{constructor(){super(...arguments),this.zones=[]}render(){const t=this.zones.filter(t=>t.isActive);return 0===t.length?G:F`
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
    `}_renderPatternDef(t){const e=`water-pattern-${t.id}`;return W`
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
    `}_renderZoneAnimation(t){const e=`water-pattern-${t.id}`,i=t.isActive?"water-zone-group water-zone-group--active":"water-zone-group water-zone-group--inactive";return W`
      <g class="${i}">
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
    `}};Ct.styles=[kt,r`
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
    `],t([gt({attribute:!1})],Ct.prototype,"zones",void 0),Ct=t([ht("water-animation")],Ct);let St=class extends ct{setConfig(t){this._config={...t}}set hass(t){this._hass=t}_dispatchConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_handleTitleChange(t){const e=t.target;this._dispatchConfigChanged({...this._config,title:e.value})}_handleImageChange(t){const e=t.target;this._dispatchConfigChanged({...this._config,image:e.value})}_handleAddZone(){const t={id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}),name:`Zone ${this._config.zones.length+1}`,entity:"",color:"#4CAF50",polygon:[]};this._dispatchConfigChanged({...this._config,zones:[...this._config.zones,t]})}_handleRemoveZone(t){const e=[...this._config.zones];e.splice(t,1),this._dispatchConfigChanged({...this._config,zones:e})}_handleMoveZoneUp(t){if(t<=0)return;const e=[...this._config.zones];[e[t-1],e[t]]=[e[t],e[t-1]],this._dispatchConfigChanged({...this._config,zones:e})}_handleMoveZoneDown(t){if(t>=this._config.zones.length-1)return;const e=[...this._config.zones];[e[t],e[t+1]]=[e[t+1],e[t]],this._dispatchConfigChanged({...this._config,zones:e})}_handleZoneNameChange(t,e){const i=e.target,o=[...this._config.zones];o[t]={...o[t],name:i.value},this._dispatchConfigChanged({...this._config,zones:o})}_handleZoneEntityChange(t,e){const i=e.detail?.value??"",o=[...this._config.zones];o[t]={...o[t],entity:i},this._dispatchConfigChanged({...this._config,zones:o})}_handleZoneColorChange(t,e){const i=e.target,o=[...this._config.zones];o[t]={...o[t],color:i.value},this._dispatchConfigChanged({...this._config,zones:o})}_handleZoneDurationEntityChange(t,e){const i=e.detail?.value??"",o=[...this._config.zones];o[t]={...o[t],duration_entity:i||void 0},this._dispatchConfigChanged({...this._config,zones:o})}_handleZoneCountdownEntityChange(t,e){const i=e.detail?.value??"",o=[...this._config.zones];o[t]={...o[t],countdown_entity:i||void 0},this._dispatchConfigChanged({...this._config,zones:o})}_handleZoneScheduleEntityChange(t,e){const i=e.detail?.value??"",o=[...this._config.zones];o[t]={...o[t],schedule_entity:i||void 0},this._dispatchConfigChanged({...this._config,zones:o})}_handleMowerEntityChange(t){const e=t.detail?.value??"";if(!e){const{mower:t,...e}=this._config;return void this._dispatchConfigChanged(e)}const i={...this._config.mower||{entity:""},entity:e};this._dispatchConfigChanged({...this._config,mower:i})}_handleMowerBatteryEntityChange(t){const e=t.detail?.value??"";if(!this._config.mower)return;const i={...this._config.mower,battery_entity:e||void 0};this._dispatchConfigChanged({...this._config,mower:i})}render(){return this._config?F`
      <div class="editor">
        ${this._renderGeneralSection()}
        ${this._renderZonesSection()}
        ${this._renderMowerSection()}
      </div>
    `:G}_renderGeneralSection(){return F`
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
    `}_renderZonesSection(){const t=!this._config.zones||0===this._config.zones.length;return F`
      <div class="section">
        <div class="section-header">
          <h3 class="section-title">Zones</h3>
          <button class="add-button" @click=${this._handleAddZone}>
            + Add Zone
          </button>
        </div>

        ${t?F`<div class="warning">
              ⚠️ At least one zone is required for the card to work.
            </div>`:G}

        <div class="zone-list">
          ${(this._config.zones||[]).map((t,e)=>this._renderZoneEntry(t,e))}
        </div>
      </div>
    `}_renderZoneEntry(t,e){const i=0===e,o=e===this._config.zones.length-1;return F`
      <div class="zone-entry">
        <div class="zone-header">
          <span class="zone-number">${e+1}</span>
          <span class="zone-name-display">${t.name||"Unnamed"}</span>
          <div class="zone-actions">
            <button
              class="icon-button"
              @click=${()=>this._handleMoveZoneUp(e)}
              ?disabled=${i}
              title="Move up"
            >
              ▲
            </button>
            <button
              class="icon-button"
              @click=${()=>this._handleMoveZoneDown(e)}
              ?disabled=${o}
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
        </div>
      </div>
    `}_renderMowerSection(){return F`
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

        ${this._config.mower?.entity?F`
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
            `:G}
      </div>
    `}};St.styles=r`
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
  `,t([ft()],St.prototype,"_config",void 0),t([ft()],St.prototype,"_hass",void 0),St=t([ht("ha-garden-card-editor")],St);let Et=class extends ct{constructor(){super(...arguments),this._activeZone=null,this._cardWidth=0,this._relevantEntities=new Set}static getConfigElement(){return document.createElement("ha-garden-card-editor")}static getStubConfig(){return{type:"custom:ha-garden-card",title:"My Garden",zones:[{id:"zone_1",name:"Zone 1",entity:"switch.irrigation_zone_1",color:"#4CAF50",polygon:[[10,10],[40,10],[40,40],[10,40]]}]}}setConfig(t){!function(t){if(!t)throw new Error("Configuration is required");if(t.zones&&Array.isArray(t.zones))for(const e of t.zones)yt(e)}(t),this._config=t,this._relevantEntities=function(t){const e=new Set;for(const i of t.zones||[])i.entity&&e.add(i.entity),i.duration_entity&&e.add(i.duration_entity),i.countdown_entity&&e.add(i.countdown_entity),i.schedule_entity&&e.add(i.schedule_entity);return t.mower&&(e.add(t.mower.entity),t.mower.battery_entity&&e.add(t.mower.battery_entity)),e}(t)}getCardSize(){if(!this._config)return 3;let t=3;return t+=Math.ceil((this._config.zones||[]).length/2),this._config.mower&&(t+=2),t}set hass(t){const e=this._hass;if(!e)return this._hass=t,void this.requestUpdate();let i=!1;for(const o of this._relevantEntities){if(e.states[o]!==t.states[o]){i=!0;break}}e.themes?.darkMode!==t.themes?.darkMode&&(i=!0),this._hass=t,i&&this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._attachResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this._detachResizeObserver()}_attachResizeObserver(){this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect.width;t!==this._cardWidth&&(this._cardWidth=t)}}),this.isConnected&&this._resizeObserver.observe(this)}_detachResizeObserver(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0)}get _layoutMode(){return(t=this._cardWidth||400)<400?"compact":t<=800?"medium":"wide";var t}get _isDarkMode(){return this._hass?.themes?this._hass.themes.darkMode:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}get activeZone(){return this._activeZone}setActiveZone(t){this._activeZone=t}_handleZoneTap(t){const{zoneId:e}=t.detail;this._activeZone=this._activeZone===e?null:e}get _waterAnimationZones(){return this._hass&&this._config?(this._config.zones||[]).map(t=>{const e=t.entity?this._hass.states[t.entity]:void 0,i=e?.state??"unavailable",o="on"===i||"open"===i,n=(t.polygon||[]).map(([t,e])=>`${t},${e}`).join(" ");return{id:t.id,color:t.color,points:n,isActive:o}}):[]}render(){if(!this._config)return G;const t=this._layoutMode,e=this._isDarkMode;return F`
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
          ${this._config.mower?F`
                <div class="mower-section">
                  <mower-panel
                    .config=${this._config.mower}
                    .hass=${this._hass}
                  ></mower-panel>
                </div>
              `:G}
        </div>
      </ha-card>
    `}};Et.styles=r`
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
  `,t([ft()],Et.prototype,"_config",void 0),t([ft()],Et.prototype,"_activeZone",void 0),t([ft()],Et.prototype,"_cardWidth",void 0),Et=t([ht("ha-garden-card")],Et),console.info("%c HA-GARDEN-CARD %c v0.1.0 ","color: white; background: #4CAF50; font-weight: bold;","color: #4CAF50; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"ha-garden-card",name:"Garden Card",description:"A visual garden management card with zone overlays, irrigation control, and robot mower status.",preview:!0});export{Et as HaGardenCard};
