import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dss:DataStorageService){}

    resolve(
        route: ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):Recipe[] | Observable<Recipe[]> | Promise<Recipe[]>{
        return this.dss.fetchRecipes();
    }
}