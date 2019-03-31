import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../../recipes/recipe.modle';
import { Subscription } from 'rxjs';
import { LoginoutService } from 'src/app/login_out/login_out.service';
import { RecipeService } from 'src/app/recipes/recipes.service';
import { FRecipe } from '../Frecipe.modle';


@Component({
  selector: 'app-listrecipes-item',
  templateUrl: './listrecipe-item.component.html',
  styles: ['.body{background: url("http://img2.timg.co.il/forums/26/1280_0_a9f73ddd-33c5-4642-832f-e44d36882d4b.jpeg")}']

})
export class ListrecipeItemComponent implements OnInit {
   @Input() res: Recipe ;
   @Input() index: number;
   @Input() islog: boolean;
   email: string;
   constructor(private userservice: LoginoutService, private recipeservice: RecipeService) {}

   ngOnInit() {
    this.email = this.userservice.getemail();
    if (this.email !== undefined) {
      this.islog = true;
   } else {
     this.islog = false;
   }
  }
AddtoMyrecipe(rec: Recipe) {
if (this.email !== undefined) {
const temp = new FRecipe(rec._id, this.email, rec.name, rec.description, rec.imgPath, rec.ingredient);
this.recipeservice.AddMyRecipe(temp);
}
 }


}
