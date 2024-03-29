import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredients.model";
export const ADD_INGREDIENT='[Shopping-List] Add Ingredient'
export const ADD_INGREDIENTS='[Shopping-List] Add Ingredients'
export const DELETE_INGREDIENT='[Shopping-List] Delete Ingredient'
export const UPDATE_INGREDIENT='[Shopping-List] Update Ingredient'
export const START_EDIT_INGREDIENT='[Shopping-List] Start Edit Ingredient'
export const CANCEL_EDIT_INGREDIENT='[Shopping-List] Cancel Edit Ingredient'

export class AddIngredient implements Action {
    readonly type=ADD_INGREDIENT;
    constructor(public payload:Ingredient){}
} 
export class AddIngredients implements Action {
    readonly type=ADD_INGREDIENTS;
    constructor(public payload:Ingredient[]){}
} 
export class DeleteIngredient implements Action {
    readonly type=DELETE_INGREDIENT;
} 
export class UpdateIngredient implements Action {
    readonly type=UPDATE_INGREDIENT;
    constructor(public payload:Ingredient){}

} 
export class StartEditIngredient implements Action {
    readonly type=START_EDIT_INGREDIENT;
    constructor(public payload:number){}
} 
export class CancelEditIngredient implements Action {
    readonly type=CANCEL_EDIT_INGREDIENT;
} 

export type ShoppingListActions = AddIngredient | 
                                  AddIngredients |
                                  DeleteIngredient |
                                  UpdateIngredient |
                                  StartEditIngredient |
                                  CancelEditIngredient ;