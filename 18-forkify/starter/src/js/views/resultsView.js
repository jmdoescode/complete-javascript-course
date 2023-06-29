import View from "./view";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg'; //Parcel v2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');  
  _errorMesage = 'No recipes found for your query! Please try again.';
  _message = '';

  _generateMarkup(){
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();