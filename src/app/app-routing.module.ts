import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { LoginComponent } from './login_out/login/login.component';
import { SignupComponent } from './login_out/signup/signup.component';
import { ListAllRecipesComponent } from './listAllRecipes/listallres/listallrecipes.component';
import { ListRecipesDetailComponent } from './listAllRecipes/listrecipedetail/listrecipedetail.component';
import { AllRecipesComponent } from './listAllRecipes/allrecpie.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'listallrecipes', pathMatch: 'full'  },

  {path: 'listallrecipes', component: AllRecipesComponent, children: [
  { path: ':id' , component: ListRecipesDetailComponent},
  ]},
  {path: 'recipes', component: RecipesComponent , children: [
  { path: '' , component: RecipesStartComponent },
  { path: 'new' , component: RecipesEditComponent},
  { path: ':id' , component: RecipesDetailComponent},
  { path: ':id/edit' , component: RecipesEditComponent}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  { path: 'login' , component: LoginComponent },
  { path: 'signup' , component: SignupComponent }


];

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule {

}
