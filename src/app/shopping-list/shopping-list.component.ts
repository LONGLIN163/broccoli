import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[] = [
    new Ingredient ("apples", 10),
    new Ingredient ("tomatos", 10),
    new Ingredient ("cheese", 10)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
