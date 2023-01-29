import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list-services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy{

  //ingredients : Ingredient[] = []
  ingredients : Observable<{ingredients:Ingredient[]}>
  //igChangedSub:Subscription
  
  constructor(
    private slService:ShoppingListService,
    private store:Store<{shoppingList:{ingredients:Ingredient[]}}>
  ) { }
  
  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList')
    //this.ingredients=this.slService.getIngredients()
    // this.igChangedSub=this.slService.ingredientsChanged
    // .subscribe(
    //   (ingredients:Ingredient[]) => this.ingredients = ingredients
    //   );
  }
  ngOnDestroy(): void {
    //this.igChangedSub.unsubscribe();
  }

  onEditItem(index:number){
     this.slService.startedEditing.next(index)
  }
}
