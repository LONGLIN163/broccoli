import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import * as fromAppStore from '../../appStore/app.Reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from "../store/auth.actions"
import { AuthState } from '../store/auth.reducer';

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
  
  private storeSub:Subscription;
  constructor(
    private cfr:ComponentFactoryResolver,
    private store:Store<fromAppStore.AppState>
    ) { }
    
    ngOnInit(): void {
    this.storeSub=this.store.select('auth').subscribe(
      (authState: AuthState) => {
        this.isLoading=authState.loading
        this.error=authState.authError     
        if(this.error){
          this.showErrAlert(this.error)
        }
      }
     )
  }
  
  onSubmit(form:NgForm){
     if(!form.valid){
      return
     }
     const email=form.value.email
     const password=form.value.password

     if(this.isLoginMode){
      this.store.dispatch(new AuthActions.LoginStart({email,password}))
     }else{
      this.store.dispatch(new AuthActions.SignupStart({email,password}))
     }
     form.reset()
  }
  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }

  //*********this one is relate ngIf aproach of closing the spinner********** */
  onHandleErrAlert(){
    this.store.dispatch(new AuthActions.ClearError())
  }

  private closeSub:Subscription;
  showErrAlert(errorMessage:string){
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
    if(this.storeSub){
      this.storeSub.unsubscribe()
    }
  }
}
