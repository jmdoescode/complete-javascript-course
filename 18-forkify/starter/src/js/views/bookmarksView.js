import View from "./view";
import icons from 'url:../../img/icons.svg'; //Parcel v2
import previewView from "./previewView";

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');  
  _errorMesage = 'No bookmarks yet.';
  _message = '';

  addHandlerRender(handler){
    window.addEventListener('load', handler);
  }

  _generateMarkup(){
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();