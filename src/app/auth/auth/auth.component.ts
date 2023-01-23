import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
     if(!form.valid){
      return
     }
     this.isLoading=true
     const email=form.value.email
     const password=form.value.password
     if(this.isLoginMode){
        console.log('this is login')
     }else{
        this.authService.signUp(email,password)
        .subscribe(
          (signUpRes) => {
            console.log('signUpRes---',signUpRes)
            this.isLoading=false
          },(errorMessage) => {
            this.error=errorMessage
            this.isLoading=false
          }
        )
     }
     form.reset()
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }



}
