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
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipesEffects } from './recipes/store/recipe.effects';

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
    StoreModule.forRoot(fromAppStore.appReducer),
    EffectsModule.forRoot([AuthEffects,RecipesEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production }),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
