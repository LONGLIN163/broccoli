import { Ingredient } from "../../shared/ingredients.model"
import * as ShoppingListActions from "./shopping-list.actions"

export interface ShoppingListState{
  ingredients:Ingredient[];
  editedIngredient:Ingredient;
  editedIngredientIndex:number;
}

const initialState:ShoppingListState= {
    ingredients : [
        new Ingredient ("apples", 10),
        new Ingredient ("tomatos", 10),
        new Ingredient ("cheese", 10)
    ],
    editedIngredient:null,
    editedIngredientIndex:-1
}

export function shoppingListReducer(
  state : ShoppingListState= initialState, 
  action:ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { 
        ...state, // a way of copying the old state, pull out all the properties and add into the new object(outer bracket)
        ingredients:[
          ...state.ingredients,
          action.payload
        ]//then change the ingredients property 
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return { 
        ...state, 
        ingredients:[
          ...state.ingredients,
          ...action.payload
        ]
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return { 
        ...state, 
        ingredients:[
          ...state.ingredients.filter((ingredient,index)=>index!==state.editedIngredientIndex),
        ],
        editedIngredientIndex:-1
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const targetIngredient=state.ingredients[state.editedIngredientIndex]
      const tempIngredient={ 
        ...targetIngredient, // span all the old ingredient properties
        ...action.payload // span ingredient from the pauyload then overwrite upper field
      }
      const updatedIngredients=[...state.ingredients]// pull out old ingredients
      updatedIngredients[state.editedIngredientIndex]=tempIngredient // change new ingredients

      return { 
        ...state, 
        ingredients:updatedIngredients,
        editedIngredientIndex:-1
      }
    case ShoppingListActions.START_EDIT_INGREDIENT:
      return { 
        ...state,
        editedIngredientIndex:action.payload,
        editedIngredient:{...state.ingredients[action.payload]} //this is a copy
      }
    case ShoppingListActions.CANCEL_EDIT_INGREDIENT:
      return { 
        ...state,
        editedIngredientIndex:-1,
        editedIngredient:null 
      }
  
    default:
      return state
  }
}


