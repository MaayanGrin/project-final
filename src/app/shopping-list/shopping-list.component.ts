import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modle';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoginoutService } from '../login_out/login_out.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
ingredient: Ingredient[];
private subscription: Subscription;

constructor(private shopingservice: ShoppingListService, private user: LoginoutService) { }

  ngOnInit() {
    this.ingredient = this.shopingservice.getlisting(this.user.getemail());
    this.subscription = this.shopingservice.IngredientChanged
    .subscribe(
    (ing: Ingredient[]) => {
    this.ingredient = ing;
    }
    );
  }
ngOnDestroy() {
this.subscription.unsubscribe();
}

onAddItem(index: number) {
this.shopingservice.startedEditing.next(index);
}




}
