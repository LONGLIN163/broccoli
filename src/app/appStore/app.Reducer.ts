//import {} as fromShoppingListReducer from '../store/shopping-list.reducer';

import { ActionReducerMap } from "@ngrx/store"
import * as fromAuthStore from "../auth/store/auth.reducer"
import * as fromShoppingListStore from "../shopping-list/store/shopping-list.reducer"

export interface AppState{
    shoppingList: fromShoppingListStore.ShoppingListState
    auth: fromAuthStore.AuthState
}


export const appReducer:ActionReducerMap<AppState>={
    shoppingList:fromShoppingListStore.shoppingListReducer,
    auth:fromAuthStore.authReducer
}
