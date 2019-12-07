import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
}) /*necesito el servicio a nivel de aplicación*/

export class ShoppingListService {

	private ingredients: Ingredient[] = [
		new Ingredient('Manzanas', 5),
		new Ingredient('Tomates', 10)
	];

	ingredientsChanged = new EventEmitter<Ingredient[]>();

	constructor() { }

	getIngredientsList(): Ingredient[] {
		return this.ingredients.slice();
		//return this.ingredients;
	}

	addIngredient(nuevoIngrediente: Ingredient) {
		this.ingredients.push(nuevoIngrediente);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}

	addIngredients(ingredientes: Ingredient[]) {
		this.ingredients.push(...ingredientes);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}
}
