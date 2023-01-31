import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions,Effect,ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResData } from "../auth.service";
import * as AuthActions from "./auth.actions";

// const handleAuthentication=(
//   email:string,
//   userId:string,
//   token:string,
//   expiresIn:number
// )=>{
//   const expirationDate=new Date( new Date().getTime() + expiresIn*1000 )
//   return new AuthActions.AuthenticateSuccess({
//     email:email,
//     userId:userId,
//     token:token,
//     expirationDate:expirationDate
//   })
// }
const handleAuthentication=(resData:AuthResData)=>{
  const expirationDate=new Date( new Date().getTime() + +resData.expiresIn*1000 )
  return new AuthActions.AuthenticateSuccess({
    email:resData.email,
    userId:resData.localId,
    token:resData.idToken,
    expirationDate:expirationDate
  })
}

const handleError=(errRes:HttpErrorResponse)=>{
  console.log("errRes:",errRes)

  let errorMessage='An error occurred!!!'
  if(!errRes.error || !errRes.error.error){
   //return throwError(errorMessage) // never do this here, it will break the obserable
   return of(new AuthActions.AuthenticateFail(errorMessage))
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

  return of(new AuthActions.AuthenticateFail(errorMessage))
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$:Actions,
    private http:HttpClient, 
    private router:Router
  ){}

  @Effect()
  authSignup=this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap( (action:AuthActions.SignupStart) => {
      const signUpUrl='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey
      return this.http.post<AuthResData>(signUpUrl,{
        email:action.payload.email,
        password:action.payload.password,
        returnSecureToken:true
      })
      .pipe(
        map( //map return everything into a observable
          (resData:AuthResData) => { 
            // return handleAuthentication(
            //   resData.email,
            //   resData.localId,
            //   resData.idToken,
            //   +resData.expiresIn
            // )
            return handleAuthentication(resData)
        }),
        catchError((errRes:HttpErrorResponse)=>{ //catchError doest not like map, we have to use of() to wrap everything into an obserable first
          //return of() // create a new observable
          return handleError(errRes)

        })
      ) 
     }
    )
  )

  @Effect()
  authLogin=this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap(
      (action:AuthActions.LoginStart) => {
        console.log("authData:",action)
        const signInUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey
        return this.http.post<AuthResData>(signInUrl,{
            email:action.payload.email,
            password:action.payload.password,
            returnSecureToken:true
          })
          .pipe(
            map( //map return everything into a observable
              (resData:AuthResData) => { 
                // return handleAuthentication(
                //   resData.email,
                //   resData.localId,
                //   resData.idToken,
                //   +resData.expiresIn
                // )    
                return handleAuthentication(resData);        
            }),
            catchError((errRes:HttpErrorResponse)=>{ //catchError doest not like map, we have to use of() to wrap everything into an obserable first
              //return of() // create a new observable
              return handleError(errRes)
            })
          ) 
      } 
    )
  )

  @Effect({dispatch:false}) // with this params,in the end it would not dispatch any action
  authSuccess=this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/'])
    }
  ))
}