import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Recipe } from '../../recipes/recipe.modle';
import { RecipeService } from '../../recipes/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginoutService } from 'src/app/login_out/login_out.service';


@Component({
  selector: 'app-listallrecipes',
  templateUrl: './listallrecipes.component.html',
  styles: ['.body{background: url("http://img2.timg.co.il/forums/26/1280_0_a9f73ddd-33c5-4642-832f-e44d36882d4b.jpeg")}']

})

export class ListAllRecipesComponent implements OnInit, OnDestroy {
recipes: Recipe[] ;
subscription: Subscription;
 userlog = false;
userlisener: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute, private userservice: LoginoutService) { }

  ngOnInit() {
  this.recipeService.getRecipe();
  this.subscription = this.recipeService.recipesChanged
  .subscribe(
    (recipe: Recipe[]) => {
this.recipes = recipe;
  });
  this.userlisener = this.userservice.getuserstatus()
  .subscribe(islog => {
    console.log('listiten' + islog);
  this.userlog = islog;
  });
    }
  ngOnDestroy() {
  this.userlisener.unsubscribe();
  this.subscription.unsubscribe();

  }




}
