import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.modle';
import { RecipeService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { LoginoutService } from 'src/app/login_out/login_out.service';
import { FRecipe } from 'src/app/listAllRecipes/Frecipe.modle';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
 rec: FRecipe;
 id: number;
email: string;

  constructor(private resipeservice: RecipeService,
              private route: ActivatedRoute,
              private router: Router, private userservice: LoginoutService
              ) { }

  ngOnInit() {
    this.email = this.userservice.getemail();
    this.route.params
    .subscribe(
      (parm: Params) => {
     this.id = +parm['id'];
     console.log('deta id ' + this.id);
      this.rec = this.resipeservice.getMyRecipeid(this.id);
      console.log('deta _id ' + this.rec._id);
      }
    );

  }

onaddtoshoppinglist() {
  this.resipeservice.addIngertoshoppinglist(this.rec.ingredient);
}
oneditrecipe() {
this.router.navigate(['edit'], {relativeTo: this.route});
}
onDeleted() {
this.resipeservice.DeleteMyRecipe(this.id);
this.router.navigate(['../'], {relativeTo: this.route});
}
publishrec() {
const newrec = new Recipe(this.rec._id, this.rec.name, this.rec.description, this.rec.imgPath, this.rec.ingredient);
this.resipeservice.AddRecipe(newrec);
this.router.navigate(['listallrecipes'], {relativeTo: this.route});

}

}

