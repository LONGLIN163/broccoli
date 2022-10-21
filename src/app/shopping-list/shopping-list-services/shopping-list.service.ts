import { EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredients.model";

export class ShoppingListService {

  private ingredients : Ingredient[] = [
    new Ingredient ("apples", 10),
    new Ingredient ("tomatos", 10),
    new Ingredient ("cheese", 10)
  ]

  ingredientsChanged=new EventEmitter<Ingredient[]>()

  constructor() { }

  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.getIngredients())
  }
}
