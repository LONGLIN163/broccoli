import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService,AuthResData } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode=true
  isLoading=false
  error:string=null

  constructor(private authService:AuthService) { }
  ngOnInit(): void {}
  
  onSubmit(form:NgForm){
    let authObs:Observable<AuthResData>;
     if(!form.valid){
      return
     }
     this.isLoading=true
     const email=form.value.email
     const password=form.value.password

     if(this.isLoginMode){
      authObs=this.authService.login(email,password)
     }else{
      authObs=this.authService.signUp(email,password)
     }
     authObs.subscribe(
       (res) => {
         console.log("res---",res)
         this.isLoading=false
       },(errorMessage) => {
         this.error=errorMessage
         this.isLoading=false
       }
     )
     form.reset()
  }
  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }
}
