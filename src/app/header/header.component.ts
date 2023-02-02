import { Component, OnDestroy, OnInit } from "@angular/core";
import { map, Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import * as fromAppStore from '../appStore/app.Reducer';
import * as AuthActions from "../auth/store/auth.actions"
import * as RecipesActions from "../recipes/store/recipe.actions"


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated=false
  private userSub:Subscription
  constructor(
    private store:Store<fromAppStore.AppState>
    ){}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub=this.store.select('auth')
    .pipe(
      map((authState) => {
        return authState.user
      })
    )
    .subscribe(
      (user) => {
          this.isAuthenticated=!!user 
      }
    );
  }
  onSaveData(){
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout())
  }

  onFetchData(){
    this.store.dispatch(new RecipesActions.FetchRecipes())
  }
}