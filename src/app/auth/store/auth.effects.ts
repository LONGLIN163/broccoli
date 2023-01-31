import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions,Effect,ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResData } from "../auth.service";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$:Actions,
    private http:HttpClient, 
    private router:Router
  ){}

  @Effect()
  authLogin=this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap(
      (authData:AuthActions.LoginStart) => {
        const signInUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey
        return this.http.post<AuthResData>(signInUrl,{
            email:authData.payload.email,
            password:authData.payload.password,
            returnSecureToken:true
          })
          .pipe(
            map( //map return everything into a observable
              (resData:AuthResData) => { 
                const expirationDate=new Date( new Date().getTime() + +resData.expiresIn*1000 )
              return new AuthActions.Login({
                email:resData.email,
                userId:resData.localId,
                token:resData.idToken,
                expirationDate:expirationDate
              })
            }),
            catchError((errRes:HttpErrorResponse)=>{ //catchError doest not like map, we have to use of() to wrap everything into an obserable first
              //return of() // create a new observable
              console.log("errRes:",errRes)

              let errorMessage='An error occurred!!!'
              if(!errRes.error || !errRes.error.error){
               //return throwError(errorMessage) // never do this here, it will break the obserable
               return of(new AuthActions.LoginFail(errorMessage))
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

              return of(new AuthActions.LoginFail(errorMessage))

            })
          ) 
      } 
    )
  )

  @Effect({dispatch:false}) // with this params,in the end it would not dispatch any action
  authSuccess=this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/'])
    }
  ))
}