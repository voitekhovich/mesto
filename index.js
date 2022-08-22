(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var n,r;return n=t,(r=[{key:"_getJsonOrError",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status," ").concat(e.statusText))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(t){return e._getJsonOrError(t)}))}},{key:"setUserInfo",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return t._getJsonOrError(e)}))}},{key:"setAvatar",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._getJsonOrError(e)}))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(t){return e._getJsonOrError(t)}))}},{key:"addCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return t._getJsonOrError(e)}))}},{key:"delCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._getJsonOrError(e)}))}},{key:"setLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return t._getJsonOrError(e)}))}},{key:"delLikes",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return t._getJsonOrError(e)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i,a,u){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t,this._cardSelector=n,this._handleCardClick=r,this._handleRemoveCard=o,this._getOwnerTrash=i,this._getOwnerLike=a,this._setCardLiked=u,this.isOwenLiked=!1}var t,r;return t=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._like.addEventListener("click",(function(t){return e._handleLikeElement(t)})),this._image.addEventListener("click",(function(){return e._handlePopupImageElement()})),this._getOwnerTrash()?this._trash.addEventListener("click",(function(){return e._handleRemoveElement()})):this.delTrashElement()}},{key:"_handleLikeElement",value:function(){this._setCardLiked()}},{key:"_handleRemoveElement",value:function(){this._handleRemoveCard(this.element)}},{key:"_handlePopupImageElement",value:function(){this._handleCardClick()}},{key:"generateCard",value:function(){return this.element=this._getTemplate(),this._trash=this.element.querySelector(".element__trash"),this._title=this.element.querySelector(".element__title"),this._image=this.element.querySelector(".element__image"),this._like=this.element.querySelector(".element__like"),this._likeCount=this.element.querySelector(".element__likes-count"),this._setEventListeners(),this._getOwnerLike(),this._image.src=this.data.link,this._image.alt=this.data.name,this._title.textContent=this.data.name,this._likeCount.textContent=this.data.likes.length,this.element}},{key:"isOwnerLiked",value:function(e){return Boolean(this.data.likes.findIndex((function(t){return t._id===e}))+1)}},{key:"setLikeCount",value:function(e){this._likeCount.textContent=e}},{key:"setLike",value:function(){this._like.classList.add("element__like_active"),this.isOwenLiked=!0}},{key:"delLike",value:function(){this._like.classList.remove("element__like_active"),this.isOwenLiked=!1}},{key:"delTrashElement",value:function(){this._trash.remove()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._form=n,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputSelector))}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._form.querySelector(".".concat(e.id,"-error"));e.classList.add(this._config.inputErrorClass),n.textContent=t,n.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_setEventListeners",value:function(){var e=this;this._buttonElement=this._form.querySelector(this._config.submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitButton():this.enableSubmitButton()}},{key:"disableSubmitButton",value:function(){this._buttonElement.setAttribute("disabled","disabled"),this._buttonElement.classList.add(this._config.inactiveButtonClass)}},{key:"enableSubmitButton",value:function(){this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._config.inactiveButtonClass)}},{key:"resetValidation",value:function(){var e=this;this.disableSubmitButton(),this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"setItems",value:function(e){this._items=e}},{key:"rendererItems",value:function(){var e=this;this._items.forEach((function(t){return e._renderer(t)}))}},{key:"rendererItem",value:function(e){this._renderer(e)}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._escHandler=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"getPopup",value:function(){return this._popup}},{key:"open",value:function(){document.addEventListener("keydown",this._escHandler),this._popup.classList.add("popup_visible")}},{key:"close",value:function(){document.removeEventListener("keydown",this._escHandler),this._popup.classList.remove("popup_visible")}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_visible")||t.target.classList.contains("popup__close"))&&e.close()}))}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(){return h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},h.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function y(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return y(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imageBox=t._popup.querySelector(".imagebox__img"),t._imageCaption=t._popup.querySelector(".imagebox__caption"),t}return t=a,(n=[{key:"open",value:function(e){this._imageBox.src=e.src,this._imageBox.alt=e.alt,this._imageCaption.textContent=e.alt,h(m(a.prototype),"open",this).call(this)}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},g.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function w(e,t){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},w(e,t)}function O(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return O(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleFormSubmit=t,n.form=n._popup.querySelector(".popup__form"),n._inputList=Array.from(n._popup.querySelectorAll(".form__input")),n._formSubmit=n._popup.querySelector(".form__submit"),n._defaulSubmitText=n._formSubmit.textContent,n}return t=a,n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;g(E(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e.renderLoading(!0),e._handleFormSubmit(e._getInputValues())}))}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"renderLoading",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";this._formSubmit.textContent=e?t:this._defaulSubmitText}},{key:"close",value:function(){this.form.reset(),g(E(a.prototype),"close",this).call(this)}}],n&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=P(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function P(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}function I(e,t){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},I(e,t)}function T(e,t){if(t&&("object"===L(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleFormSubmit=t,n._formSubmit=n._popup.querySelector(".form__submit"),n._defaulSubmitText=n._formSubmit.textContent,n}return t=a,n=[{key:"setEventListeners",value:function(){var e=this;j(x(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e.renderLoading(!0),e._handleFormSubmit(e._card)}))}},{key:"renderLoading",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Удаление...";this._formSubmit.textContent=e?t:this._defaulSubmitText}},{key:"open",value:function(e){this._card=e,j(x(a.prototype),"open",this).call(this)}}],n&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var A=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._elementName=document.querySelector(t.userName),this._elementAbout=document.querySelector(t.userAbout),this._elementAvatar=document.querySelector(t.userAvatart)}var t,n;return t=e,(n=[{key:"getId",value:function(){return this._id}},{key:"getUserInfo",value:function(){return{name:this._elementName.textContent,about:this._elementAbout.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about,r=e.avatar,o=e._id;this._elementName.textContent=t,this._elementAbout.textContent=n,this._elementAvatar.src=r,this._id=o}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),q=document.querySelector(".profile__edit-button"),U=document.querySelector(".profile__add-button"),V=document.querySelector(".profile__avatar-edit");function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var D=new t({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-47",headers:{authorization:"517ca562-c193-4fa0-98e3-f69b3e71bc2a","Content-Type":"application/json"}}),N=new A({userName:".profile__name",userAbout:".profile__about",userAvatart:".profile__avatar"});function H(e){console.log(e)}var F=new S(".popup_edit",(function(e){var t;t=e,W["edit-form"].disableSubmitButton(),D.setUserInfo(t).then((function(e){N.setUserInfo(e),F.close()})).catch((function(e){return H(e)})).finally((function(){F.renderLoading(!1),W["edit-form"].enableSubmitButton()}))}));F.setEventListeners(),q.addEventListener("click",(function(){F.setInputValues(N.getUserInfo()),W["edit-form"].resetValidation(),F.open()}));var M=new S(".popup_avatar",(function(e){var t;t=e,W["edit-form-avatar"].disableSubmitButton(),D.setAvatar(t.avatar).then((function(e){N.setUserInfo(e),M.close()})).catch((function(e){return H(e)})).finally((function(){M.renderLoading(!1),W["edit-form-avatar"].enableSubmitButton()}))}));M.setEventListeners(),V.addEventListener("click",(function(){W["edit-form-avatar"].resetValidation(),M.open()}));var z=new u({items:[],renderer:function(e){return z.addItem(function(e){var t=new r(e,"#element-template",(function(){return $.open({src:t.data.link,alt:t.data.name})}),(function(){return K.open(t)}),(function(){return function(e){return e.data.owner._id===N.getId()}(t)}),(function(){return function(e){e.data.likes.find((function(e){return e._id===N.getId()}))?e.setLike():e.delLike()}(t)}),(function(){return function(e){e.isOwenLiked?D.delLikes(e.data._id).then((function(t){e.setLikeCount(t.likes.length),e.delLike()})).catch((function(e){return H(e)})):D.setLike(e.data._id).then((function(t){e.setLikeCount(t.likes.length),e.setLike()})).catch((function(e){return H(e)}))}(t)}));return t.generateCard()}(e))}},".elements");Promise.all([D.getUserInfo(),D.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];N.setUserInfo(o),z.setItems(i.reverse()),z.rendererItems()})).catch((function(e){return H(e)}));var $=new _(".popup_image");$.setEventListeners();var G=new S(".popup_add",(function(e){return t=e,W["add-form"].disableSubmitButton(),void D.addCard(t).then((function(e){z.rendererItem(e),G.close()})).catch((function(e){return H(e)})).finally((function(){G.renderLoading(!1),W["add-form"].enableSubmitButton()}));var t}));G.setEventListeners(),U.addEventListener("click",(function(){W["add-form"].resetValidation(),G.open()}));var K=new R(".popup_del",(function(e){D.delCard(e.data._id).then((function(t){e.element.remove(),K.close()})).catch((function(e){return H(e)})).finally((function(){return K.renderLoading(!1)}))}));K.setEventListeners();var Q,W={};Q={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},Array.from(document.querySelectorAll(Q.formSelector)).forEach((function(e){var t=new i(Q,e),n=e.getAttribute("name");W[n]=t,t.enableValidation()}))})();