import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe_services/recipe.service';
import { AppState } from '../../appStore/app.Reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;

  constructor(
    private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<AppState>
    ) { }

  ngOnInit(): void {
    // method1
/*     this.route.params.subscribe(
      (params:Params) => {
       this.id = +params['id']
       this.store.select('recipes')
       .pipe(
          map((recipesState) => {
            return recipesState.recipes.find((recipe,index) => {
                return index===this.id
              }
            )
          }),
       )
       .subscribe(recipe=>{this.recipe=recipe})
      }
    ) */
    
    // method2
    this.route.params.pipe(
      map(
        (params) => {
          console.log("params---",params)
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
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
