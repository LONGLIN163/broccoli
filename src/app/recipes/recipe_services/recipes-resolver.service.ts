import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private dss:DataStorageService,
        private rs:RecipeService
    ){}

    resolve(
        route: ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):Recipe[] | Observable<Recipe[]> | Promise<Recipe[]>{
        const recipes=this.rs.getRecipes()
        if(recipes.length===0){
            return this.dss.fetchRecipes();
        }else{
            return recipes
        }
    }
}