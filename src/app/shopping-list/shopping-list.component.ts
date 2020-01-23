import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';


@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Observable<{ ingredients: Ingredient[] }>;
	ingredientsArray: Ingredient[];
	private suscripcion: Subscription;
	
	constructor(
		private servicioLista: ShoppingListService,
		private store: Store<fromShoppingList.AppState>
		//shoppingList es como he llamado a la importación en el app.module
	) { }

	ngOnInit() {
		this.ingredients = this.store.select('shoppingList');
		//línea de abajo sería otra forma de hacerlo: suscribiendose al observable
		/*this.store.select('shoppingList').subscribe(data => {
			this.ingredientsArray = data.ingredients;
		});*/
		//abajo usando el servicio
		/*this.ingredients = this.servicioLista.getIngredientsList();
		this.suscripcion = this.servicioLista.ingredientsChanged.subscribe(
			(ingredientesLista: Ingredient[]) => {
				this.ingredients = ingredientesLista;
			}
		);*/
	}

	onEditItem(id: number) {
		//this.servicioLista.editingIngredient.next(id);
		this.store.dispatch(new ShoppingListActions.StartEdit(id));
	}

	ngOnDestroy() {
		//this.suscripcion.unsubscribe();
	}



}
