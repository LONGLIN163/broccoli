import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from '../../appStore/app.Reducer';
import { Store } from '@ngrx/store';
import { map, Subscription, switchMap } from 'rxjs';
import * as RecipesActions from "../store/recipe.actions"



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy  {
  id:number;
  editModel=false
  recipeForm:FormGroup
  recipeSub:Subscription

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id=+params['id']
        this.editModel=(params['id']!=null)
        this.initForm()
      }
    )
  }

  ngOnDestroy(): void {
    if(this.recipeSub){
      this.recipeSub.unsubscribe();
    }
  }

  private initForm(){
    let recipeName=''
    let recipeImagePath=''
    let recipeDescription=''
    let recipeIngredients=new FormArray([])

    if(this.editModel){
      this.recipeSub=this.store.select('recipes')
      .pipe(map(recipesState => {
          return recipesState.recipes.find((recipe,index) => {
              return index===this.id
            }
          )
        })
      )
      .subscribe(recipe=>{
        recipeName=recipe.name
        recipeImagePath=recipe.imagePath
        recipeDescription=recipe.description
        
        if(recipe['ingredients']){
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[
                  Validators.required, Validators.pattern(/^[1-9][0-9]*$/)
                ])
              })
            );
          }
        }
      })
    }

    this.recipeForm=new FormGroup({
      name:new FormControl(recipeName,Validators.required),
      imagePath:new FormControl(recipeImagePath,Validators.required),
      description:new FormControl(recipeDescription,Validators.required),
      ingredients:recipeIngredients
    })

  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null,Validators.required),
        amount: new FormControl(null,[Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      })
    )
  }


  onDeleteIngredient(index:number){    
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onSubmit(){
    if(this.editModel){
      this.store.dispatch(new RecipesActions.UpdateRecipe(
        {
          index:this.id,
          newRecipe:this.recipeForm.value
        }
      ))
    }else{
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value))
    }
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
