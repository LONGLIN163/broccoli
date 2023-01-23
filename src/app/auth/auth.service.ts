import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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
      catchError(this.handleError)
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
      catchError(this.handleError)
    )
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
