import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, mapTo, take } from 'rxjs';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../appStore/app.Reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private authService:AuthService,
        private router:Router,
        private store:Store<fromAppStore.AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').pipe(
            take(1), // always take a latest user
            map((authState) => {
              return authState.user
            }),
            map((user) => {
              //return !!user
              const isAuth=!!user
              if(isAuth){ 
                return true
              }
              return this.router.createUrlTree(['/auth'])
            })
        )
    }
}