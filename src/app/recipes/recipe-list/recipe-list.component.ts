import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe_services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes : Recipe[] = []
  subscription:Subscription

  constructor(
    private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // listen recipesChanged Subject for getting recipes in realtime
    this.subscription=this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes=recipes // when recipes get changed, here also update
     })
     this.recipes=this.recipeService.getRecipes()// the recipes for init
  }

  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route})
  }

}
