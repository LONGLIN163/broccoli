import { Component, OnDestroy, OnInit } from "@angular/core";
import { map, Subscription } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Store } from '@ngrx/store';
import * as fromAppStore from '../appStore/app.Reducer';
import * as AuthActions from "../auth/store/auth.actions"


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated=false
  private userSub:Subscription
  constructor(
    private dss:DataStorageService,
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
     this.dss.storeRecipes()
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout())
  }

  onFetchData(){
    this.dss.fetchRecipes().subscribe()
  }
}