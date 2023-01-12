import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list-services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  
  @ViewChild('f') slForm:NgForm;

  editMode=false
  editedItemIndex:number
  editedItem:Ingredient

  subscription:Subscription
  
  constructor(private slService:ShoppingListService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editMode=true
        this.editedItemIndex=index
        this.editedItem=this.slService.getIngredient(index)
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }

  onAddItem(form: NgForm) {
    console.log(2)
    const value=form.value
    const newIngredient=new Ingredient(value.name, value.amount)
    this.slService.addIngredient(newIngredient);
  }

}
