import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredients.model";
export class ShoppingListService {

  private ingredients : Ingredient[] = [
    new Ingredient ("apples", 10),
    new Ingredient ("tomatos", 10),
    new Ingredient ("cheese", 10)
  ]

  ingredientsChanged=new Subject<Ingredient[]>()

  constructor() { }

  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.getIngredients())
  }

  addIngredients(ingredients:Ingredient[]){

    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())

  }
}
