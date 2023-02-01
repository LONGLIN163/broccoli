import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from './appStore/app.Reducer';
import * as AuthActions from "./auth/store/auth.actions"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private store:Store<fromAppStore.AppState>
  ){}
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin())
  }
}
