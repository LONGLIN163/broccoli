import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as ShoppingListActions from "../store/shopping-list.actions"
import * as fromAppStore from '../../appStore/app.Reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  
  @ViewChild('f') slForm:NgForm;

  editMode=false
  editedItem:Ingredient

  subscription:Subscription
  
  constructor(
    private store:Store<fromAppStore.AppState>
  ) { }

  ngOnInit(): void {
    this.subscription=this.store.select('shoppingList').subscribe(
      (state) => {
         if(state.editedIngredientIndex>-1){
          this.editMode=true
          this.editedItem=state.editedIngredient
          //update form
          this.slForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          })
         }else{
          this.editMode=false
         }

      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.CancelEditIngredient())
  }
  
  onSubmit(form: NgForm) {
    const value=form.value
    const newIngredient=new Ingredient(value.name, value.amount)

    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    
    this.editMode=false
    this.slForm.reset()
  }

  onClear(){
    this.store.dispatch(new ShoppingListActions.CancelEditIngredient())
    this.slForm.reset()
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear()
  }

}
