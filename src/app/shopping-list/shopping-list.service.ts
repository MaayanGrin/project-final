import { Ingredient} from '../shared/ingredient.modle';
import { ListIngredient} from '../shared/listingredient.modle';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginoutService } from '../login_out/login_out.service';


@Injectable()
export class ShoppingListService {

IngredientChanged = new Subject<Ingredient[]>();
startedEditing = new Subject<number>();
private ListIngredient: Ingredient[] = [];

constructor(private httpClients: HttpClient, private user: LoginoutService) {}

getlisting(email: string) {
  this.httpClients.get<ListIngredient[]>('http://localhost:3000/Ingredient/' + email)
  .subscribe((postData) => {
   this.ListIngredient = postData;
    this.IngredientChanged.next( this.ListIngredient.slice());
  });
 return this.ListIngredient.slice();
}
getIngredient(index: number) {
  let temp = this.ListIngredient[index];
  this.httpClients.get<ListIngredient>('http://localhost:3000/Ingredient/' + temp._id)
   .subscribe(postData => {
    temp = postData;
    this.IngredientChanged.next( this.ListIngredient.slice() );
   });
    return temp;
}

onaddlisting(item: Ingredient ) {
  const email = this.user.getemail();
  const ing = new ListIngredient(item._id, email, item.name, item.amount);
  this.httpClients.post<{ing: ListIngredient , messege: string}>('http://localhost:3000/Ingredient', ing)
  .subscribe((resData) => {
    window.alert(resData.messege);
    const temp = new Ingredient(resData.ing._id, resData.ing.name, resData.ing.amount);
      this.ListIngredient.push(temp);
      this.IngredientChanged.next( this.ListIngredient.slice() );
    });

}

addingredients(item: Ingredient[]) {
item.forEach(temp => {
this.onaddlisting(temp);
});
}

UpdateIngredients(index: number, newIngredient: Ingredient) {
  const email = this.user.getemail();
  const item = this.getIngredient(index);
  console.log('_id:' + item._id);
  const ing = new ListIngredient(item._id, email, newIngredient.name, newIngredient.amount);
   this.httpClients.put<{ing: ListIngredient, messege: string}>('http://localhost:3000/Ingredient/' + item._id, ing )
  .subscribe((resData) => {
    window.alert(resData.messege);
    const temp = new Ingredient(resData.ing._id, resData.ing.name, resData.ing.amount);
    this.ListIngredient[index] = temp;
   this.IngredientChanged.next( this.ListIngredient.slice() );
  });
}

DeleteItem( index: number) {
  const temp = this.getIngredient(index);
  this.httpClients.delete<{messege: string}>('http://localhost:3000/Ingredient/' + temp._id)
  .subscribe((data) => {
  window.alert(data.messege);
  this.ListIngredient.splice(index, 1);
  this.IngredientChanged.next( this.ListIngredient.slice() );
  });
}
}

