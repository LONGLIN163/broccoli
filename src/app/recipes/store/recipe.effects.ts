import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Actions, Effect, ofType } from "@ngrx/effects"
import { map, switchMap } from "rxjs"
import { Recipe } from "../recipe.model"
import * as RecipesActions from '../store/recipe.actions'

@Injectable()
export class RecipesEffects {
   constructor(
    private actions$:Actions,
    private http:HttpClient,

   ){}
   @Effect()
   fetchRecipes=this.actions$.pipe(
       ofType(RecipesActions.FETCH_RECIPES),
       switchMap(() => {
        console.log(111)

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
        console.log(222)
        return new RecipesActions.SetRecipes(recipes)
      })

   )
}
