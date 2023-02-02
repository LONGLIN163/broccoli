import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { AppState } from '../../appStore/app.Reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as RecipesActions from "../store/recipe.actions";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<AppState>
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(
        (params) => {
          return +params['id']
        }
      ),
      switchMap(id=>{
        this.id=id
        return this.store.select('recipes')
      }),
      map((recipesState) => {
        return recipesState.recipes.find((recipe,index) => {
            return index===this.id
          }
        )
      })
    )
    .subscribe(recipe=>{this.recipe=recipe})
  }

  onEditRecipe() {
    this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes'])
  }
}
