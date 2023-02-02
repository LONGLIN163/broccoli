import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";

export interface RecipesState{
    recipes:Recipe[];
    //recipe:Recipe
}

const initialState : RecipesState= {
   recipes:[]
}

export function recipeReducer(state = initialState, action:RecipesActions.RecipesActions){
  switch (action.type) {

  case RecipesActions.SET_RECIPES:
    return { 
        ...state, 
        recipes:[...action.payload]
    }
  case RecipesActions.FETCH_RECIPES:
    return { 
        ...state, 
    }
  case RecipesActions.ADD_RECIPE:
    return { 
        ...state, 
        recipes:[
          ...state.recipes,
          action.payload
        ]
    }
  case RecipesActions.DELETE_RECIPE:
    return { 
        ...state, 
        recipes:state.recipes.filter((recipe,index) => index!==action.payload)
    }
  case RecipesActions.UPDATE_RECIPE:
    const updatedRecipe={
      ...state.recipes[action.payload.index],//pull out old recipe
      ...action.payload.newRecipe//overwrite old recipe
    }
    const updatedRecipes=[...state.recipes]
    updatedRecipes[action.payload.index]=updatedRecipe
    return { 
        ...state, 
        recipes:updatedRecipes
    }

  default:
    return state
  }
}
