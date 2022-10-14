import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput:ElementRef;
  @ViewChild('amountInput') amountInput:ElementRef;

  @Output() ingredientAdd=new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingName=this.nameInput.nativeElement.value;
    const ingAmount=this.nameInput.nativeElement.value;
    this.ingredientAdd.emit(new Ingredient(ingName, ingAmount));
  }

}
