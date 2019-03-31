import { Ingredient } from '../shared/ingredient.modle';

export class Recipe {
public _id: string;
public name: string;
public description: string ;
public imgPath: string ;
public ingredient: Ingredient[];


constructor(id: string, name: string, des: string, url: string, ing: Ingredient[]) {
this._id = id;
this.name = name;
this.description = des;
this.imgPath = url ;
this.ingredient = ing;
}
}
