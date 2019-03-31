import { Ingredient } from '../shared/ingredient.modle';

export class FRecipe {
public _id: string;
public email: string;
public name: string;
public description: string;
public imgPath: string;
public ingredient: Ingredient[];

constructor(id: string, email: string, name: string, des: string, img: string, ing: Ingredient[]) {
this._id = id;
this.email = email;
this.name = name;
this.description = des;
this.imgPath = img;
this.ingredient = ing;
  }

}
