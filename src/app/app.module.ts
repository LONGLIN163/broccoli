import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.moudule';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromAppStore from './appStore/app.Reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromAppStore.appReducer)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
