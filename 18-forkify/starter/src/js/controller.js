import * as model from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return; //add guard clause
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);    
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
}

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();

    //Get search query
    const query = searchView.getQuery();
    //const query = 'pizza'; //DEBUGGING ONLY

    //Load search results
    await model.loadSearchResults(query);

    //Render search Results 
    resultsView.render(model.getSearchResultsPage());

    //Render initial pagination buttons
    paginationView.render(model.state.search);
  }catch(err){
    console.log(err);
  }
}

//controlSearchResults(); //DEBUGGING ONLY

const controlPagination = function(goToPage){
  //Render NEW search Results 
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render NEW pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  //Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try {
    addRecipeView.renderSpinner();
    
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function(){
      recipeView.toggle
    }, MODAL_CLOSE_SEC * 1000);
  } catch(err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes); //implement the publishes/subscriber pattern
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();

const clearBookmarks = function(){
  localStorage.clear('bookmarks');
}
