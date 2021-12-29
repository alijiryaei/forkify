import { async } from 'regenerator-runtime';

const key = '084f2677-add4-40c2-8c64-835e92985288'
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page : 1 ,
    resultsPerPage : 10
  },
  bookmarks:[]
};

const createRecipeObject = function(data){
  const { recipe } = data.data;
    return state.recipe = {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && {key : recipe.key})
  };
}
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${key}`
    );
    const data = await res.json();
    createRecipeObject(data)
    if (!res.ok) throw new Error(`faild ${res.status}`);


    if(state.bookmarks.some(bookmark => bookmark.id === state.recipe.id))
    state.recipe.bookmarked = true
    else state.recipe.bookmarked = false
  } catch (err) {
    throw err;
  }
};

export const searchRecipe = async function (query) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${key}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`faild ${res.status}`);

    state.search.results = data.data.recipes.map(ent => {
      return {
        publisher: ent.publisher,
        imageUrl: ent.image_url,
        title: ent.title,
        id: ent.id,
        ...(ent.key && {key : ent.key})
      };
    });
  } catch (err) {
    alert(err);
  }
};


export const pagination = function(page = state.search.page){
  state.search.page = page

  const start = (page - 1) * state.search.resultsPerPage //
  const end = page * state.search.resultsPerPage 
   return state.search.results.slice(start,end)
   
}

export const servings = function(newServing){
  state.recipe.ingredients.forEach( ing => {
    ing.quantity = ing.quantity * newServing / state.recipe.servings
  })
  state.recipe.servings = newServing;
}

const storeBookmarks = function(){
  localStorage.setItem('bookmarks' , JSON.stringify(state.bookmarks))
}

export const addBookmark = function(recipe){
   state.bookmarks.push(recipe)

   if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
   storeBookmarks()
}

export const deleteBookmark = function(id){
  const index =  state.bookmarks.findIndex( bookmark => bookmark.id === id)
  state.bookmarks.splice(index , 1)

  if(id === state.recipe.id) state.recipe.bookmarked = false;
  storeBookmarks()
}

const init = function(){
  const storage = localStorage.getItem('bookmarks')
  if(storage) state.bookmarks =  JSON.parse(storage)
}
init()


export const uploadNewRecipe = async function(newRecipe){
  try{
   const ingredients = Object.entries(newRecipe).filter( ing => ing[0].startsWith('ingredient') && ing[1] !== '')
   .map(entry => {
     const ingArr = entry[1].split(',').map(el => el.trim())
     if(ingArr.length !== 3){
       throw new Error('wrong ingredients format')
    }
    const [quantity , unit , description ] = ingArr
    return {quantity : quantity ? +quantity : null , unit , description}
   })
   
   const recipe = {
     title: newRecipe.title ,
     source_url : newRecipe.sourceUrl,
     image_url : newRecipe.image ,
     publisher : newRecipe.publisher ,
     cooking_time : +newRecipe.cookingTime,
     servings : +newRecipe.servings,
     ingredients
   }

   
   const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/?key=${key}` , {
     method: 'POST',
     headers : {
       'Content-Type' : 'application/json'
     },
     body: JSON.stringify(recipe)
   })
     const data =  await res.json()
     console.log(data);
     if (!res.ok) throw new Error(`faild ${res.status}`);
     state.recipe = createRecipeObject(data)
     addBookmark(state.recipe)
     return data
     
  } catch(err){
    alert(err)
  }
}



