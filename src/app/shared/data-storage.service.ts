import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe_services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
      private http: HttpClient, 
      private recipeService:RecipeService,
      private authService:AuthService
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
      return this.authService.user.pipe(
        take(1), // take 1 value from the obs already exist,then automatically unsubscribe
        exhaustMap((user) => {
          return this.http
          .get<Recipe[]>(
            'https://brocclivshop-default-rtdb.firebaseio.com/recipes.json',
            //'https://brocclivshop-default-rtdb.firebaseio.com/recipes.json?auth='+user.token
            {
              params:new HttpParams().set('auth',user.token)
            }
          )
        }),
        map((recipes) => { // rxjs operrator
          return recipes.map((recipe) => { // js array method
            return {
              ...recipe,
              ingredients:recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes)
        })
      )
    }
}