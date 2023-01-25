import { ANIMATION_MODULE_TYPE, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthService,AuthResData } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy{
  isLoginMode=true
  isLoading=false
  error:string=null
  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;

  constructor(
    private authService:AuthService, 
    private router:Router,
    private cfr:ComponentFactoryResolver) { }

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
         this.router.navigate(['./recipes'])
       },(errorMessage) => {
         this.error=errorMessage
         this.showErrAlert(errorMessage)
         this.isLoading=false
       }
     )
     form.reset()
  }
  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }
  onHandleErrAlert(){
    this.error=null
  }

  private closeSub:Subscription;
  showErrAlert(errorMessage:string){
     //const alert=new AlertComponent() // we can not do this,it is ts code no angular
     const alertCmpFatory=this.cfr.resolveComponentFactory(AlertComponent)
     const hostViewContainerRef=this.alertHost.vcr
     hostViewContainerRef.clear()// clear everything renderd before
     const alertCompoRef=hostViewContainerRef.createComponent(alertCmpFatory)

     alertCompoRef.instance.message=errorMessage
     this.closeSub=alertCompoRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe()
        hostViewContainerRef.clear()
      }
     )  
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe(); 
    }
  }
}
