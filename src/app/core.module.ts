import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe_services/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list-services/shopping-list.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        {
          provide:HTTP_INTERCEPTORS,
          useClass:AuthInterceptorService,
          multi:true
        },
    ],
})
export class CoreModule { }
