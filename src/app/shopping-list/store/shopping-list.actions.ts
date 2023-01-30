import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredients.model";
export const ADD_INGREDIENT='ADD_INGREDIENT'
export const ADD_INGREDIENTS='ADD_INGREDIENTS'
export const DELETE_INGREDIENT='DELETE_INGREDIENTS'
export const UPDATE_INGREDIENT='UPDATE_INGREDIENTS'
export const START_EDIT_INGREDIENT='START_EDIT_INGREDIENT'
export const CANCEL_EDIT_INGREDIENT='CANCEL_EDIT_INGREDIENT'

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