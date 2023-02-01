import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe_services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';
import { AppState } from '../appStore/app.Reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from "../recipes/store/recipe.actions"

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
      private http: HttpClient, 
      private recipeService:RecipeService,
      private store:Store<AppState>
    ) { }

    storeRecipes(){
      const recipes=this.recipeService.getRecipes()
      this.http.put(
        'https://brocclivshop-default-rtdb.firebaseio.com/recipes.json',
        recipes
      ).subscribe((res) => {
        console.log(res)
      })
    }

    fetchRecipes(){
        return this.http
        .get<Recipe[]>(
          'https://brocclivshop-default-rtdb.firebaseio.com/recipes.json',
        )
        .pipe(
          map((recipes) => { // rxjs operrator
            return recipes.map((recipe) => { // js array method
              return {
                ...recipe,
                ingredients:recipe.ingredients ? recipe.ingredients : []
              }
            })
          }),
          tap((recipes) => {
            this.store.dispatch(new RecipesActions.SetRecipes(recipes))
          })
        )
      
    }
}