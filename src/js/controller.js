import icons from "url:../img/icons.svg";
import * as model from "./model.js";
import recipeView from "./view/recipeview.js"
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
import addRecipeView from "./view/addRecipeView.js";
import { async } from "regenerator-runtime";
import View from "./view/view.js";
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    
    if(!id) return;
    recipeView.renderSpinner();
    
    
    await model.loadRecipe(id)
    
    bookmarksView.render(model.state.bookmarks)
    recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlSearch = async function(){
  try {
    const query = searchView.getQuery();

    await model.searchRecipe(query)

    resultsView.render(model.pagination())

    paginationView.render(model.state.search)
  } catch (err) {
    recipeView.renderError(err);
  }
}

const controlPagination = function(goto){
  resultsView.render(model.pagination(goto))

  paginationView.render(model.state.search)
}

const controlServings = function(serv){
  model.servings(serv)
  recipeView.render(model.state.recipe)
}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe)
    
  } else{
    model.deleteBookmark(model.state.recipe.id)
  }
  recipeView.render(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlUploadRecipe = async function(newRecipe){
  try{
    await model.uploadNewRecipe(newRecipe)
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe)
    bookmarksView.render(model.state.bookmarks)
    window.history.pushState(null , '' , `#${model.state.recipe.id}`)
    addRecipeView.toggleModal()
  }catch(err){
    alert(err)
  }
}
// controlSearch()
bookmarksView.bookmarksHandler(controlBookmarks)
recipeView.addEventHandler(showRecipe)
searchView.addHandlerSearch(controlSearch)
paginationView.addHandlerClick(controlPagination)
recipeView.addServingsHandler(controlServings)
recipeView.addBookmarkHandler(controlAddBookmark)
addRecipeView.addRecipeHandler(controlUploadRecipe)

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
