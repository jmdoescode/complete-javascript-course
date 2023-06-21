import View from "./view";
import icons from 'url:../../img/icons.svg'; //Parcel v2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');  
  _errorMesage = 'No recipes found for your query! Please try again.';
  _message = '';

  addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto; //convert to a number

      handler(goToPage);
    });
  }

  _generateMarkup(){
    const currPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    
    //Page 1, there are other pages
    if(currPage === 1 && numPages > 1){
      return `
        <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `
    }

    //Last page
    if(currPage === numPages && numPages > 1){      
      return `
        <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
      `;
    }

    //Other page
    if(currPage < numPages){
      return `
        <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }   

    //Page 1, NO other pages
    return '';
  }
}

export default new PaginationView();