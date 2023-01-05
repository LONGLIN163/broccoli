import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list-services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes : Recipe[] = [
    new Recipe(
      "pasta",
      "very good",
      "https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg",
      [
        new Ingredient('tomato',3),
        new Ingredient('mushroom',15),
        new Ingredient('garlic',3)
      ]),
    new Recipe(
      "noodle",
      "best in the town",
      "https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg",
      [
        new Ingredient('onion',1),
        new Ingredient('pork',20),
        new Ingredient('parsley',10)
      ]
      ),
    new Recipe(
      "paella",
      "eggplant",
      "https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg",
      [ 
        new Ingredient('green bean',15),
        new Ingredient('chicken leg',6),
        new Ingredient('snail',10)
      ]
      ),
  ]

  constructor(private slService:ShoppingListService) { }

  getRecipes(){
    //return this.recipes 
    return this.recipes.slice() // return a new arr object
  }

  getRecipe(id:number):Recipe{
     //return this.recipes[id]
     return this.recipes.slice()[id] // this is better
  }

  recipeSelected=new EventEmitter<Recipe>();

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients)
  }
}
