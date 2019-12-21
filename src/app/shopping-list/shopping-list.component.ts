import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Ingredient[] = [];
	private suscripcion: Subscription;
	constructor(private servicioLista: ShoppingListService) { }

	ngOnInit() {
		this.ingredients = this.servicioLista.getIngredientsList();
		this.suscripcion = this.servicioLista.ingredientsChanged.subscribe(
			(ingredientesLista: Ingredient[]) => {
				this.ingredients = ingredientesLista;
			}
		);
	}

	onEditItem(id: number){
		this.servicioLista.editingIngredient.next(id);
	}

	ngOnDestroy(){
		this.suscripcion.unsubscribe();
	}



}
