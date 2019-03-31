import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.modle';
import { RecipeService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginoutService } from 'src/app/login_out/login_out.service';
import { FRecipe } from 'src/app/listAllRecipes/Frecipe.modle';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
recipes: FRecipe[] ;
subscription: Subscription;
 email: string;

 constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute, private userservice: LoginoutService) { }

  ngOnInit() {
this.email = this.userservice.getemail();
  this.recipeService.getAllRecipe(this.email);
  this.subscription = this.recipeService.MyrecipesChanged
  .subscribe(
    (recipe: FRecipe[]) => {
      console.log('recipe-list' + recipe);
      this.recipes = recipe;
  });
  }


ngOnDestroy() {
  this.subscription.unsubscribe();
}

  onnewrecipe() {
  this.router.navigate(['new'], {relativeTo: this.route});
  }


}
