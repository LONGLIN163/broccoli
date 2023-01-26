import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RecipesResolverService } from './recipe_services/recipes-resolver.service';
import { RouterModule } from '@angular/router';

const recipesRoutes=[
  {
    path:'',
    component:RecipesComponent,
    canActivate:[AuthGuard],
    children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {
            path:':id',
            component:RecipeDetailComponent,
            resolve:[RecipesResolverService]
        },
        {
            path:':id/edit',
            component:RecipeEditComponent,
            resolve:[RecipesResolverService]
        }
    ]
  }
]
 
@NgModule({
  declarations: [],
  imports:[
    RouterModule.forChild(recipesRoutes)
  ],
  exports:[RouterModule]
})
export class RecipesRoutingModule { }
