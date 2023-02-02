//import {} as fromShoppingListReducer from '../store/shopping-list.reducer';

import { ActionReducerMap } from "@ngrx/store"
import * as fromAuthStore from "../auth/store/auth.reducer"
import * as fromShoppingListStore from "../shopping-list/store/shopping-list.reducer"
import * as fromRecipeStore from "../recipes/store/recipe.reducer"

export interface AppState{
    shoppingList: fromShoppingListStore.ShoppingListState
    auth: fromAuthStore.AuthState
    recipes:fromRecipeStore.RecipesState
}


export const appReducer:ActionReducerMap<AppState>={
    shoppingList:fromShoppingListStore.shoppingListReducer,
    auth:fromAuthStore.authReducer,
    recipes:fromRecipeStore.recipeReducer
}
