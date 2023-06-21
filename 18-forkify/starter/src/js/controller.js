import * as model from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return; //add guard clause
    recipeView.renderSpinner(recipeContainer);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);    
  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function(){
  try{
    //Get search query
    const query = searchView.getQuery();
    if(!query) return;

    //Load search results
    await model.loadSearchResults(query);

    //Render search Results
    console.log(model.state.search.results);
  }catch(err){
    console.log(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes); //implement the publishes/subscriber pattern
  searchView.addHandlerSearch(controlSearchResults);
}

init();
