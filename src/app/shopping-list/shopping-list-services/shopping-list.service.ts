import { createInjectableType } from "@angular/compiler";
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

  addIngredients(ingredients:Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient)
    // }

    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())

  }
}
