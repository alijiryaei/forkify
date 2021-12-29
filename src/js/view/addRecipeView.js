import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';


class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay')
  _recipeWindow = document.querySelector('.add-recipe-window')
  _closeModal = document.querySelector('.btn--close-modal')
  _recipeBtn = document.querySelector('.nav__btn--add-recipe')
  
  constructor(){
    super()
    this.addHandlerShowWindow()
    this.addHandlerHideWindow()
  }
  addHandlerShowWindow() {
     this._recipeBtn.addEventListener('click' , this.toggleModal.bind(this))
  }
  addHandlerHideWindow(){
    this._closeModal.addEventListener('click' , this.toggleModal.bind(this))
    this._overlay.addEventListener('click' , this.toggleModal.bind(this))
  }
  toggleModal(){
    this._overlay.classList.toggle('hidden')
    this._recipeWindow.classList.toggle('hidden')
  }
  

  addRecipeHandler(handler){
    this._parentElement.addEventListener('submit' , function(e){
       e.preventDefault();
       const dataArr = [...new FormData(this)];
       const data = Object.fromEntries(dataArr)
       handler(data)
    }) 
  }

}

export default new addRecipeView();
