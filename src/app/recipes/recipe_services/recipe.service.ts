import { Injectable } from '@angular/core';
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
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FEdit%2F09-2022-sausage-pasta%2Fsausage-pasta-4",
      [
        new Ingredient('tomato',3),
        new Ingredient('mushroom',15),
        new Ingredient('garlic',3)
      ]),
    new Recipe(
      "noodle",
      "best in the town",
      "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/c4e7f587-e9e1-4953-b032-f58f82e91f4d/Derivates/4b8b814f-8562-4ad0-8db8-9939cb103685.jpg",
      [
        new Ingredient('onion',1),
        new Ingredient('pork',20),
        new Ingredient('parsley',10)
      ]
      ),
    new Recipe(
      "paella",
      "eggplant",
      "https://eatingoutorin.com/wp-content/uploads/2022/01/Mana-75-10-1024x768.jpg",
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

  getRecipe(index:number):Recipe{
     //return this.recipes[index]
     return this.recipes.slice()[index] // this is better
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients)
  }
}
