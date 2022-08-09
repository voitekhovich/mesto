(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._link=e.link,this._name=e.name,this._cardSelector=n,this._handleCardClick=r}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._setEventListeners(),this._element.querySelector(".element__image").src=this._link,this._element.querySelector(".element__image").alt=this._name,this._element.querySelector(".element__title").textContent=this._name,this._element}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".element__like").addEventListener("click",(function(t){e._handleLikeElement(t)})),this._element.querySelector(".element__trash").addEventListener("click",(function(t){e._handleRemoveElement(t)})),this._element.querySelector(".element__image").addEventListener("click",(function(){e._handlePopupImageElement()}))}},{key:"_handleLikeElement",value:function(e){e.currentTarget.classList.toggle("element__like_active")}},{key:"_handleRemoveElement",value:function(e){this._element.remove()}},{key:"_handlePopupImageElement",value:function(){this._handleCardClick()}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._form=n,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputSelector))}var t,r,o;return t=e,o=[{key:"setSubmitButtonDisable",value:function(t){t.setAttribute("disabled","disabled"),t.classList.add(e._formSubmitInactive)}}],(r=[{key:"_showInputError",value:function(e,t){var n=this._form.querySelector(".".concat(e.id,"-error"));e.classList.add(this._config.inputErrorClass),n.textContent=t,n.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_setEventListeners",value:function(){var e=this;this._buttonElement=this._form.querySelector(this._config.submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitButton():(this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._config.inactiveButtonClass))}},{key:"disableSubmitButton",value:function(){this._buttonElement.setAttribute("disabled","disabled"),this._buttonElement.classList.add(this._config.inactiveButtonClass)}}])&&n(t.prototype,r),o&&n(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"rendererItems",value:function(){var e=this;this._items.forEach((function(t){return e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._escHandler=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){document.addEventListener("keydown",this._escHandler),this._popup.classList.add("popup_visible")}},{key:"close",value:function(){document.removeEventListener("keydown",this._escHandler),this._popup.classList.remove("popup_visible")}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_visible")||t.target.classList.contains("popup__close"))&&e.close()}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function p(e,t){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},p(e,t)}function y(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return y(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._imageBox=t._popup.querySelector(".imagebox__img"),t._imageCaption=t._popup.querySelector(".imagebox__caption"),t}return t=u,(n=[{key:"open",value:function(e){this._imageBox.src=e.src,this._imageBox.alt=e.alt,this._imageCaption.textContent=e.alt,l(m(u.prototype),"open",this).call(this)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function k(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._handleFormSubmit=t,n._popupForm=n._popup.querySelector(".popup__form"),n._formInputList=Array.from(n._popup.querySelectorAll(".form__input")),n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._formInputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"getForm",value:function(){return this._popupForm}},{key:"setEventListeners",value:function(){var e=this;v(w(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues()),e.close()}))}},{key:"close",value:function(){v(w(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var O=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._elementName=document.querySelector(t.userName),this._elementAbout=document.querySelector(t.userAbout)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._elementName.textContent,about:this._elementAbout.textContent}}},{key:"setUserInfo",value:function(e){this._elementName.textContent=e.name,this._elementAbout.textContent=e.about}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),j={inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},L=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button");function P(e){var n=new t(e,"#element-template",(function(){!function(e){q.open({src:e._link,alt:e._name})}(n)}));return n.generateCard()}var I=new i({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){I.addItem(P(e))}},".elements");I.rendererItems();var q=new _(".popup_image");q.setEventListeners();var x=new E(".popup_add",(function(e){I.addItem(P(e))}));x.setEventListeners(),C.addEventListener("click",(function(){V.disableSubmitButton(),x.open()}));var B=new O({userName:".profile__name",userAbout:".profile__about"}),R=new E(".popup_edit",(function(e){B.setUserInfo(e)}));R.setEventListeners();var T=R._popup.querySelector(".form__input_type_name"),A=R._popup.querySelector(".form__input_type_about");L.addEventListener("click",(function(){var e=B.getUserInfo();T.value=e.name,A.value=e.about,F.disableSubmitButton(),R.open()}));var V=new r(j,x.getForm());V.enableValidation();var F=new r(j,R.getForm());F.enableValidation()})();