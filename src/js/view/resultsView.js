import icons from "url:../../img/icons.svg";
import View from './view.js';

class Results extends View {
    _parentElement = document.querySelector('.results')

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

export default new Results();