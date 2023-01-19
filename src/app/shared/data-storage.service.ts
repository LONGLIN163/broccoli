import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe_services/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService:RecipeService) { }

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
      this.http
      .get<Recipe[]>('https://brocclivshop-default-rtdb.firebaseio.com/recipes.json')
      .subscribe((res) => {
        console.log(res)
        this.recipeService.setRecipes(res)
      })
    }
}