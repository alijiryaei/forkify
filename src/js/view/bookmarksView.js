import View from './view.js';
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'add some bookmarks'
  
  bookmarksHandler(handler){
     window.addEventListener('load' , function(){
         handler();
     })
  }
  _generateMarkup() {
    return this._data.map( ent => {
        return `
        <li class="preview">
            <a class="preview__link" href="#${ent.id}">
              <figure class="preview__fig">
                <img src="${ent.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${ent.title}</h4>
                <p class="preview__publisher">${ent.publisher}</p>
                <div class="preview__user-generated ${ent.key ? '' : 'hidden'}">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
                </div>
              </div>
            </a>
          </li>
       `
    }).join('') 
  }
}

export default new bookmarksView();