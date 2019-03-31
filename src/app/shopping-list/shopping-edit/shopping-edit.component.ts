import { Component, OnInit, OnDestroy, ViewChild, OnChanges} from '@angular/core' ;
import { Ingredient } from 'src/app/shared/ingredient.modle';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
subscription: Subscription;
editMode = false;
editItemIndex: number;
editItem: Ingredient;
@ViewChild('f') SLForm: NgForm;

  constructor(private shoppingservice: ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.shoppingservice.startedEditing
    .subscribe((index: number) => {
    this.editMode = true;
    this.editItemIndex = index;
    this.editItem = this.shoppingservice.getIngredient(index);
    this.SLForm.setValue( {
     name: this.editItem.name,
     amount: this.editItem.amount
    });
    });
  }

ngOnDestroy() {
  this.subscription.unsubscribe();
}

  onSubmit(form: NgForm) {
  const value = form.value;
  const additemnew = new Ingredient(value._id, value.name, value.amount);
  if (this.editMode) {
  this.shoppingservice.UpdateIngredients(this.editItemIndex, additemnew);
  } else {
  this.shoppingservice.onaddlisting(additemnew);
  }
  form.reset();
  this.editMode = false;
}

onClear() {
  this.SLForm.reset();
  this.editMode = false;
}

onDelete() {
  this.shoppingservice.DeleteItem(this.editItemIndex);
  this.onClear();
}

}
