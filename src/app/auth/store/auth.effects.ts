import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions,Effect,ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../auth/user.model";
import * as AuthActions from "./auth.actions";

interface AuthResData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:string
}

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

  const user=new User(resData.email,resData.localId,resData.idToken,expirationDate)
  localStorage.setItem('userData',JSON.stringify(user))

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
    private router:Router,
    private authService:AuthService
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
        tap(
          (resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn*1000)
          }
        ),
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
        const signInUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey
        return this.http.post<AuthResData>(signInUrl,{
            email:action.payload.email,
            password:action.payload.password,
            returnSecureToken:true
          })
          .pipe(
            tap(
              (resData) => {
                this.authService.setLogoutTimer(+resData.expiresIn*1000)
              }
            ),
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
              return handleError(errRes)
            })
          ) 
      } 
    )
  )

  @Effect() // with this params,in the end it would not dispatch any action
  authAutoLogin=this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      //this object is not user instance
      const userData:{
        email:string,
        id:string,
        _token:string,
        _tokenExpirationDate:string // the type after pasing is string
      }=JSON.parse(localStorage.getItem('userData'))
      if(!userData){
        return { type :'haha'}
      }
      //we create new user instanc
      const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))
      if(loadedUser.token){

        const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime()
        this.authService.setLogoutTimer(expirationDuration)

        return new AuthActions.AuthenticateSuccess( // if user exist,dispatch login action
          {
            email:loadedUser.email,
            userId:loadedUser.id,
            token:loadedUser.token,
            expirationDate:new Date(userData._tokenExpirationDate)
          }
        ) 
      }

      return { type :'haha'}
    })
  )

  @Effect({dispatch:false}) // with this params,in the end it would not dispatch any action
  authRedirect=this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/'])
    }
  ))

  @Effect({dispatch:false}) // with this params,in the end it would not dispatch any action
  authLogout=this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer()
      localStorage.removeItem('userData')
      console.log("hahahhahhahahahha")
      this.router.navigate(['/auth'])
    }
  ))
}