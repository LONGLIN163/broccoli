import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../appStore/app.Reducer';
import * as RecipesActions from "../store/recipe.actions"
import { Actions, ofType } from "@ngrx/effects"


@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private actions$:Actions,
        private store:Store<fromAppStore.AppState>
    ){}

    resolve(
        route: ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):Recipe[] | Observable<Recipe[]> | Promise<Recipe[]>{

        return this.store.select('recipes').pipe(
            take(1),
            map((recipesState) => {
              return recipesState.recipes
            }),
            switchMap((recipes) => {
              if(recipes.length===0){
                  this.store.dispatch(new RecipesActions.FetchRecipes())
                  return this.actions$.pipe(
                      ofType(RecipesActions.SET_RECIPES),
                      take(1)
                  ).pipe(
                      tap( (data) => {
                        console.log("resolver data:",data)
                       }
                      )
                  )
              }else{
                return of(recipes)
              }
            })
        )
    }
}

