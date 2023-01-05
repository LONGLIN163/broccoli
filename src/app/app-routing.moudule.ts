import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
const appRoutes:Routes=[
    {
        path:'', // empty path is part of every route
        redirectTo:'/recipes',
        pathMatch:'full'
    },
    {
        path:'recipes',
        component:
        RecipesComponent,
        children:[
            {path:'',component:RecipeStartComponent},
            {path:':id',component:RecipeDetailComponent}
        ]
    },
    {
        path:'shopping-list',component:ShoppingListComponent
    }
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]

})
export class AppRoutingModule {

}