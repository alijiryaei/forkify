import icons from "url:../../img/icons.svg";
import View from './view.js';

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');
    
    addHandlerClick(handler){
       this._parentElement.addEventListener('click' , function(e){
          const btn = e.target.closest('.btn--inline');
          if(!btn) return;
          const goto = +btn.dataset.goto

          handler(goto);
       })
    }

    _generateMarkup(){
        const pages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const curPage = this._data.page

        if(pages > 1 && curPage === 1) {
            return `<button class="btn--inline pagination__btn--next" data-goto="${curPage + 1}" >
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`
        }

        if(pages === curPage && curPage !== 1 ){
            return `<button class="btn--inline pagination__btn--prev" data-goto="${curPage - 1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>`
        }

        if(curPage < pages){
            return `<button class="btn--inline pagination__btn--prev" data-goto="${curPage - 1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next" data-goto="${curPage + 1}">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`
        }
        
        return '';

    }
}

export default new paginationView();