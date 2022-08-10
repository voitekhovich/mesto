export default class Section {

  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container =  document.querySelector(selector);
  }

  setItems(items) {
    this._items = items;
  }

  rendererItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container. prepend(element);
  }

}