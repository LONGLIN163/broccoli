import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
const appRoutes:Routes=[
    {
        path:'', // empty path is part of every route
        redirectTo:'/recipes',
        pathMatch:'full'
    },
    {
      path:'recipes',
      loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
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