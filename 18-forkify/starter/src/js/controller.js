import * as model from './model';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return; //add guard clause
    recipeView.renderSpinner(recipeContainer);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);    
  } catch (err) {
    recipeView.renderError();
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes); //implement the publishes/subscriber pattern
}

init();
