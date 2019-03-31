import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule, MatToolbarModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './recipes/recipes.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { LoginoutService } from './login_out/login_out.service';

import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { LoginComponent } from './login_out/login/login.component';
import { SignupComponent } from './login_out/signup/signup.component';
import { ListAllRecipesComponent } from './listAllRecipes/listallres/listallrecipes.component';
import { ListrecipeItemComponent } from './listAllRecipes/listrecipe-item/listrecipe-item.component';
import { ListRecipesDetailComponent } from './listAllRecipes/listrecipedetail/listrecipedetail.component';
import { AllRecipesComponent } from './listAllRecipes/allrecpie.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipesStartComponent,
    RecipesEditComponent,
    LoginComponent,
    SignupComponent,
    ListAllRecipesComponent,
    ListrecipeItemComponent,
    ListRecipesDetailComponent,
    AllRecipesComponent

  ],
  imports: [
    BrowserModule, MatToolbarModule, MatCardModule, MatInputModule, BrowserAnimationsModule,
     AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [ShoppingListService, RecipeService, LoginoutService,
              /*{provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
