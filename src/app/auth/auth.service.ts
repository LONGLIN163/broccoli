import { Injectable } from '@angular/core';
import * as fromAppStore from '../appStore/app.Reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from "./store/auth.actions"

export interface AuthResData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer:any;
  constructor(private store:Store<fromAppStore.AppState>) { }

  logout(){
    this.store.dispatch(new  AuthActions.Logout())
     localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout( this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer=null
  }

  setLogoutTimer(expirationDuration:number){
    console.log('expirationDuration---',expirationDuration+'ms')
    this.tokenExpirationTimer=setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  clearLogoutTimer(){
    clearTimeout(this.tokenExpirationTimer)
    this.tokenExpirationTimer=null
  }
}
