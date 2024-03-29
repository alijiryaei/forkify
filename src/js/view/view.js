import icons from 'url:../../img/icons.svg';

export default class View{
    _data;
    render(data ){
      if( !data || (Array.isArray(data) && data.length === 0)) return this.renderError()
      this._data = data
      const markup = this._generateMarkup();
      this._clearParentElement();
      this._parentElement.insertAdjacentHTML('afterBegin',markup)
    }

    renderError(message = this._errorMessage){
      console.log(22222);
      const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
      </div> `
      this._clearParentElement()
      this._parentElement.insertAdjacentHTML('afterBegin', markup)
    }
    renderSpinner(){
         const markup =  `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
         `
         this._clearParentElement();
         this._parentElement.insertAdjacentHTML('afterBegin' , markup)
    }
    _clearParentElement(){
     this._parentElement.innerHTML = ''
    }

}