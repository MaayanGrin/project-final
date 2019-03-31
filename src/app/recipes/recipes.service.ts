import { Recipe } from './recipe.modle';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modle';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute } from '@angular/router';
import { FRecipe } from '../listAllRecipes/Frecipe.modle';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


/*vkhs0gUcYkMoHdLe*/
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];

  MyrecipesChanged = new Subject<FRecipe[]>();
  Myrecipes: FRecipe[] = [];

constructor(private slserver: ShoppingListService,
            private httpclient: HttpClient,
            private router: Router, private route: ActivatedRoute) {}

addIngertoshoppinglist(inga: Ingredient[]) {
this.slserver.addingredients(inga);
}
getRecipe() {
   this.httpclient.get<Recipe[]>('http://localhost:3000/recipe')
   .subscribe((postData) => {
    this.recipes = postData;
     this.recipesChanged.next( this.recipes.slice());
   });

   return this.recipes.slice();
}
getRecipeid (id: number) {
  let temp = this.recipes[id];
  this.httpclient.get<Recipe>('http://localhost:3000/recipe/' + temp._id)
   .subscribe(postData => {
    temp = postData;
    this.recipesChanged.next( this.recipes.slice() );
   });
    return temp;
}
AddRecipe(rec: Recipe) {
 this.httpclient.post<{rec: Recipe, messege: string}>('http://localhost:3000/recipe', rec)
.subscribe((resData) => {
  window.alert(resData.messege);
  const temp = resData;
    this.recipes.push(temp.rec);
    this.recipesChanged.next( this.recipes.slice() );
  });

}
UpdateRecipe(index: number, newRecipe: Recipe) {
  const temp = this.getRecipeid(index);
  console.log(newRecipe._id + ' ' + newRecipe.name + '  ' + newRecipe.description);
   this.httpclient.put<Recipe>('http://localhost:3000/recipe/' + temp._id, newRecipe )
  .subscribe((resData) => {
    console.log('mes upp service ' + resData);
   this.recipes[index] = resData;
   this.recipesChanged.next( this.recipes.slice() );
   this.router.navigate(['./recipes'] , {relativeTo: this.route});
  });
}

DeleteRecipe(index: number) {
const temp = this.getRecipeid(index);
this.httpclient.delete<{mess: string}>('http://localhost:3000/recipe/' + temp._id)
.subscribe((data) => {
console.log(data);
this.recipes.splice(index, 1);
this.recipesChanged.next( this.recipes.slice() );
});

}

AddMyRecipe(rec: FRecipe) {
  this.httpclient.post<{rec: FRecipe, messege: string}>('http://localhost:3000/myrecipe', rec)
 .subscribe((resData) => {
   window.alert(resData.messege);
   const temp = resData;
     this.Myrecipes.push(temp.rec);
     this.MyrecipesChanged.next( this.Myrecipes.slice() );
   });

 }

getAllRecipe(email: string) {
  console.log('getall: ' + email);
  this.httpclient.get<FRecipe[]>('http://localhost:3000/myrecipe/' + email)
  .subscribe((postData) => {
console.log(postData);
    this.Myrecipes = postData;
    this.MyrecipesChanged.next( this.Myrecipes.slice());
  });

}
getMyRecipeid (id: number) {
  let temp: FRecipe;
  temp = this.Myrecipes[id];
  temp.email = this.Myrecipes[id].email;
  console.log(temp.email);

  this.httpclient.get<FRecipe>('http://localhost:3000/myrecipe/' +  this.Myrecipes[id]._id)
   .subscribe(postData => {
    temp = postData;
    this.MyrecipesChanged.next( this.Myrecipes.slice() );
   });
    return temp;
}
UpdateMyRecipe(index: number, newRecipe: FRecipe) {
  const temp = this.getMyRecipeid(index);
   this.httpclient.put<{rec: FRecipe, messege: string}>('http://localhost:3000/myrecipe/' + temp._id, newRecipe )
  .subscribe((resData) => {
    window.alert(resData.messege);
   this.Myrecipes[index] = resData.rec;
   this.MyrecipesChanged.next( this.Myrecipes.slice() );
   this.router.navigate(['./recipes'] , {relativeTo: this.route});
  });
}
DeleteMyRecipe(index: number) {
  const temp = this.getMyRecipeid(index);
  this.httpclient.delete<{messege: string}>('http://localhost:3000/myrecipe/' + temp._id)
  .subscribe((data) => {
  window.alert(data.messege);
  this.Myrecipes.splice(index, 1);
  this.MyrecipesChanged.next( this.Myrecipes.slice() );
  });

  }


}
