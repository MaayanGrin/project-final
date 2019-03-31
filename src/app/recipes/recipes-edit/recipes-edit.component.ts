import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipes.service';
import { LoginoutService } from 'src/app/login_out/login_out.service';
import { FRecipe } from 'src/app/listAllRecipes/Frecipe.modle';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

id: number;
editmode = false;
recipeForm: FormGroup;
email: string;

  constructor(private route: ActivatedRoute,
              private rescipeService: RecipeService,
              private router: Router, private userservice: LoginoutService) { }

  ngOnInit() {
    this.email = this.userservice.getemail();
    this.route.params.subscribe(
      (parms: Params) => {
        this.id = +parms['id'];
        console.log(this.id);
        this.editmode = parms['id'] != null;
        this.intForm();
      }
    );
  }

private intForm() {
let recipeName = '';
let imgPath = '';
let description = '';
let _id = '';
const recipeIngredient = new FormArray([]);

 if (this.editmode) {
  const recipe = this.rescipeService.getMyRecipeid(this.id);
  _id = recipe._id;
  recipeName = recipe.name;
  imgPath = recipe.imgPath;
  description = recipe.description;
  if (recipe['ingredient']) {
   for (const ingredient of recipe.ingredient) {
   recipeIngredient.push(
    new FormGroup({
     'name': new FormControl(ingredient.name, Validators.required),
     'amount': new FormControl(ingredient.amount, [
      Validators.required,
      Validators.pattern(/^[1-9]+[0-9]*$/)
     ])
   })
   );
   }
  }
}
this.recipeForm = new FormGroup({
  '_id': new FormControl(_id),
  'name': new FormControl(recipeName, Validators.required),
  'imgPath': new FormControl(imgPath, Validators.required),
  'description': new FormControl(description, Validators.required),
  'ingredient' : recipeIngredient
});
}

  onSubmit() {
    const rec = new FRecipe(this.recipeForm.value._id, this.email, this.recipeForm.value.name,
       this.recipeForm.value.description, this.recipeForm.value.imgPath, this.recipeForm.value.ingredient);
if (this.editmode) {
this.rescipeService.UpdateMyRecipe(this.id, rec);
} else {
  this.rescipeService.AddMyRecipe(rec);
}
 this.onCancel();
  }

  OnAddIngredient() {
  (<FormArray>this.recipeForm.get('ingredient')).push(
    new FormGroup ({
'name': new FormControl(null, Validators.required),
'amount': new FormControl(null, [
  Validators.required,
  Validators.pattern(/^[1-9]+[0-9]*$/)
 ])
    })
  );
  }

  onCancel() {
this.router.navigate(['../'] , {relativeTo: this.route});
  }

  DeletedIngredient(index: number) {
 (<FormArray> this.recipeForm.get(['ingredient'])).removeAt(index);
  }
}
