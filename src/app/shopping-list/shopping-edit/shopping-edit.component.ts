import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list-services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput:ElementRef;
  @ViewChild('amountInput') amountInput:ElementRef;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {}

  onAddItem() {
    const ingName=this.nameInput.nativeElement.value;
    const ingAmount=this.nameInput.nativeElement.value;
    this.slService.addIngredient(new Ingredient(ingName, ingAmount));
  }

}
