import icons from 'url:../../img/icons.svg'; //Parcel v2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (eg a recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @auther JM De Ocampo
   * @todo Finish implementation
   */
  render(data, render = true) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;
    
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //Algorithm may not be performant enough for bigger and real world applications
  update(data){    
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup); //converts string to real DOM node objects like a virtual DOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      
      //Updates changed TEXT
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){ //the text is actually the first child node
        curEl.textContent = newEl.textContent;
      }

      //Updates changed ATTRIBUTES
      if(!newEl.isEqualNode(curEl)){
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
      }
    });
  }

  _clear(){
    this._parentElement.innerHTML = '';
  }

  renderSpinner(){
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
  
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMesage){
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
      
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
 
  renderMessage(message = this._message){
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>
          ${message}
        </p>
      </div>
    `;
      
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}