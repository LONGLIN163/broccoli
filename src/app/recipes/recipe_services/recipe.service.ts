import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes : Recipe[] = [
    new Recipe("salad1","tomato","https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg"),
    new Recipe("salad2","potato","https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg"),
    new Recipe("salad3","eggplant","https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg"),
  ]

  constructor() { }

  getRecipes(){
    //return this.recipes 
    return this.recipes.slice() // return a new arr object
  }

  recipeSelected=new EventEmitter<Recipe>();
}
