import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list-services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy{

  ingredients : Ingredient[] = []
  igChangedSub:Subscription

  constructor(private slService:ShoppingListService,private loggingService:LoggingService) { }
  
  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients()
    this.igChangedSub=this.slService.ingredientsChanged
    .subscribe(
      (ingredients:Ingredient[]) => this.ingredients = ingredients
      );
    this.loggingService.printLog('hello in shoppinglist')
  }
  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }

  onEditItem(index:number){
     this.slService.startedEditing.next(index)
  }
}
