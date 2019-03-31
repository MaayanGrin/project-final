import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../recipes/recipe.modle';
import { RecipeService } from '../../recipes/recipes.service';


@Component({
  selector: 'app-listrecipes-detail',
  templateUrl: './listrecipedetail.component.html',
  styles: ['.body{background: url("http://img2.timg.co.il/forums/26/1280_0_a9f73ddd-33c5-4642-832f-e44d36882d4b.jpeg")}']

})
export class ListRecipesDetailComponent implements OnInit {
 rec: Recipe;
 id: number;


  constructor(private resipeservice: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (parm: Params) => {
     this.id = +parm['id'];
      this.rec = this.resipeservice.getRecipeid(this.id);
      console.log('listdet' + this.id);
      }
    );

  }

}
