import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, mapTo, take } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private authService:AuthService,
        private router:Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.user.pipe(
            take(1), // always take a latest user
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