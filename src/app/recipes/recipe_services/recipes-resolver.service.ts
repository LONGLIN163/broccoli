import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from './recipe.service';
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

        this.store.dispatch(new RecipesActions.FetchRecipes())

        return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
        )
    }
}