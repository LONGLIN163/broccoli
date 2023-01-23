import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './auth/user.model';

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

  user=new Subject<User>();

  constructor(private http:HttpClient) { }
  signUp(email:string,password:string){
    const API_KEY='AIzaSyBmKK5_b36ULLLtXNrZkdkrk723-vJ8dMA'
    const signUpUrl='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+`${API_KEY}`
    return this.http.post<AuthResData>(signUpUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(
      catchError(this.handleError),
      tap(
        (resData) => { 
        const expirationDate=new Date( // convert back everything back to Date format
          new Date().getTime() //current timestamp in millisecond since the beginning of the time,1970
          +
          +resData.expiresIn*1000 // just convert second to millisecond
        ); 
        const user=new User(
          resData.email,
          resData.localId,
          resData.idToken,
          expirationDate
        )
        this.user.next(user)
        // this.handleAuthentication(
        //   resData.email,
        //   resData.localId,
        //   resData.idToken,
        //   +resData.expiresIn
        // );
      })
    )
  }

  login(email:string,password:string){
    const API_KEY='AIzaSyBmKK5_b36ULLLtXNrZkdkrk723-vJ8dMA'
    const signInUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+`${API_KEY}`
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

  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){

      const expirationDate=new Date( // convert back everything back to Date format
        new Date().getTime() //current timestamp in millisecond since the beginning of the time,1970
        +
        expiresIn*1000 // just convert second to millisecond
      ); 
      const user=new User(
        email,
        userId,
        token,
        expirationDate
      )
      this.user.next(user)
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
