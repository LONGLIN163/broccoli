import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated=false
  private userSub:Subscription
  constructor(
    private dss:DataStorageService,
    private as:AuthService
    ){}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub=this.as.user.subscribe(
      (user) => {
          //this.isAuthenticated=!user?false:true
          this.isAuthenticated=!!user //this is the same as above 
      }
    );
  }
  onSaveData(){
     this.dss.storeRecipes()
  }

  onFetchData(){
    this.dss.fetchRecipes().subscribe()
  }
}