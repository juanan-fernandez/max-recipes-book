import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
}) /*necesito el servicio a nivel de aplicación*/

export class ShoppingListService {

	private ingredients: Ingredient[] = [
		new Ingredient('Manzanas', 5),
		new Ingredient('Tomates', 10)
	];

	//ingredientsChanged = new EventEmitter<Ingredient[]>();

	ingredientsChanged = new Subject<Ingredient[]>();

	constructor() { }

	getIngredientsList(): Ingredient[] {
		return this.ingredients.slice();
		//return this.ingredients;
	}

	addIngredient(nuevoIngrediente: Ingredient) {
		this.ingredients.push(nuevoIngrediente);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredientes: Ingredient[]) {
		this.ingredients.push(...ingredientes);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}
