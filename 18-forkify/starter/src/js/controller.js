import * as model from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return; //add guard clause
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

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
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes); //implement the publishes/subscriber pattern
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();
