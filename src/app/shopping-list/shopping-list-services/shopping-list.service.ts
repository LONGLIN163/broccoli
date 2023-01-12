import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredients.model";
export class ShoppingListService {

  private ingredients : Ingredient[] = [
    new Ingredient ("apples", 10),
    new Ingredient ("tomatos", 10),
    new Ingredient ("cheese", 10)
  ]

  ingredientsChanged=new Subject<Ingredient[]>()
  startedEditing=new Subject<number>()

  constructor() { }

  getIngredients(){
    return this.ingredients.slice()
  }

  getIngredient(index:number){
    return this.ingredients[index]
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.getIngredients())
  }

  addIngredients(ingredients:Ingredient[]){
    alert(1)
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())

  }

  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]=newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
