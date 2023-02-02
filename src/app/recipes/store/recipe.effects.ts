import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Actions, Effect, ofType } from "@ngrx/effects"
import { map, switchMap, withLatestFrom } from "rxjs"
import { Recipe } from "../recipe.model"
import * as RecipesActions from '../store/recipe.actions'
import { Store } from '@ngrx/store';
import { AppState } from '../../appStore/app.Reducer';
@Injectable()
export class RecipesEffects {
   constructor(
    private actions$:Actions,
    private http:HttpClient,
    private store:Store<AppState>
   ){}
   @Effect()
   fetchRecipes=this.actions$.pipe(
       ofType(RecipesActions.FETCH_RECIPES),
       switchMap(() => {
            return this.http
            .get<Recipe[]>(
            'https://brocclivshop-default-rtdb.firebaseio.com/recipes.json',
            )
         }
       ),
       map((recipes) => { // rxjs operrator
        return recipes.map((recipe) => { // js array method
          return {
            ...recipe,
            ingredients:recipe.ingredients ? recipe.ingredients : []
          }
        })
      }),
      map((recipes) => {
        return new RecipesActions.SetRecipes(recipes)
      })
   )

   @Effect({dispatch:false})
   storeRecipes=this.actions$.pipe(
       ofType(RecipesActions.STORE_RECIPES),
       withLatestFrom(this.store.select('recipes')),
       switchMap(([actionData,recipesState]) => {
        console.log(recipesState)
        return this.http.put(
          'https://brocclivshop-default-rtdb.firebaseio.com/recipes.json',
          recipesState.recipes
        )}
       )
   )
}
