import { Ingredient } from "../../shared/ingredients.model"
import * as ShoppingListActions from "./shopping-list.actions"

const initialState = {
    ingredients : [
        new Ingredient ("apples", 10),
        new Ingredient ("tomatos", 10),
        new Ingredient ("cheese", 10)
    ]
}

export function shoppingListReducer(
  state = initialState, 
  action:ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT :
      return { 
        ...state, // a way of copying the old state, pull out all the properties and add into the new object(outer bracket)
        ingredients:[
          ...state.ingredients,
          action.payload
        ]//then change the ingredients property 
      }
  
    default:
      return state
  }
}


