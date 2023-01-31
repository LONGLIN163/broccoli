import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './auth/user.model';
import { environment } from 'src/environments/environment';
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
  //user=new BehaviorSubject<User>(null) // it has to be initialized
  private tokenExpirationTimer:any;
  constructor(
    private http:HttpClient, 
    private router:Router,
    private store:Store<fromAppStore.AppState>
  ) { }
  signUp(email:string,password:string){

    const signUpUrl='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey
    return this.http.post<AuthResData>(signUpUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(
      catchError(this.handleError),
      tap(
        (resData) => { 
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    )
  }

  login(email:string,password:string){
    const signInUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey
    return this.http.post<AuthResData>(signInUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(
      catchError(this.handleError),
      tap(
        (resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }
      )
    )
  }

  logout(){
    this.store.dispatch(new  AuthActions.Logout())
    this.router.navigate(['/auth'])
     localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout( this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer=null
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer=setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  autoLogin(){
    //this object is not user instance
    const userData:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string // the type after pasing is string
    }=JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }
    //we create new user instanc
    const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))
    if(loadedUser.token){
      this.store.dispatch(new AuthActions.Login(
        {
          email:loadedUser.email,
          userId:loadedUser.id,
          token:loadedUser.token,
          expirationDate:new Date(userData._tokenExpirationDate)
        }
      ))

      const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime()
      //logout after remained time.
      this.autoLogout(expirationDuration)
    }
  }

  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
      const expirationDate=new Date( // convert back everything back to Date format
        new Date().getTime() //current timestamp in millisecond since the beginning of the time,1970
        +
        expiresIn*1000 // just convert second to millisecond
      ); 
      const user=new User(email,userId,token,expirationDate)
      this.store.dispatch(new AuthActions.Login({
        email:email,
        userId:userId,
        token:token,
        expirationDate:expirationDate}
      ))

      this.autoLogout(expiresIn*1000) // right after the user instance is created
      localStorage.setItem('userData',JSON.stringify(user))
  }

  private handleError(errRes:HttpErrorResponse){
    let errorMessage='An error occurred!!!'
    if(!errRes.error || !errRes.error.error){
     return throwError(errorMessage)
    }

    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage='This email exists already.'
        break;    
      case 'EMAIL_NOT_FOUND':
        errorMessage='This email doesnt exist.'
        break;    
      case 'INVALID_PASSWORD':
        errorMessage='This password is not correct.'
        break;    
    }

    return throwError(errorMessage)
  }
}
