import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signUp(email:string,password:string){

    const API_KEY='AIzaSyBmKK5_b36ULLLtXNrZkdkrk723-vJ8dMA'

    const signUpUrl='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+`${API_KEY}`
    console.log('signUpUrl:',signUpUrl)
    return this.http.post<AuthResData>(signUpUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(catchError((errRes) => {
       let errorMessage='An error occurred!!!'
       if(!errRes.error || !errRes.error.error){
        return throwError(errorMessage)
       }
       errorMessage=errRes.error.error.message
       return throwError(errorMessage)
     }
    ))
  }

  login(){

  }
}
