import icons from "url:../../img/icons.svg";
import View from './view.js';

class searchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }
  
  addHandlerSearch(handler){
      this._parentElement.addEventListener('submit' , function(e){
          e.preventDefault();
          handler();
      })
  }

 
}

export default new searchView();
