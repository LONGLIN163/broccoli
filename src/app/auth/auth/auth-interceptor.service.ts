import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../appStore/app.Reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(
        private authService:AuthService,    
        private store:Store<fromAppStore.AppState>,
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(1)
        return this.store.select('auth').pipe(
            take(1),
            map((authState) => {
              return authState.user
            }),
            exhaustMap((user) => {
                //if no user ye, we sent origin req, it s for login/signup
                if(!user){
                    return next.handle(req); 
                }
                const modifiedReq=req.clone({params:new HttpParams().set('auth',user.token)})
                return next.handle(modifiedReq);
            })
        )
    }
}