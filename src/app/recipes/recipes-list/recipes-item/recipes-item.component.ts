import { Component, OnInit, Input } from '@angular/core';
import { FRecipe } from 'src/app/listAllRecipes/Frecipe.modle';
import { Recipe } from '../../recipe.modle';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

@Input() res: FRecipe ;
@Input() index: number;

  ngOnInit() {
    console.log(this.index + ' listitem: ' + this.res.name);
  }


}
