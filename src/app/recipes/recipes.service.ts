import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


//QUIERO LA INSTANCIA DEL SERVICIO DISPONIBLE EN TODA LA APLICACIÓN
@Injectable({
	providedIn: 'root'
})
export class RecipesService {

	onChangedRecipes = new Subject<Recipe[]>();

	/*private recipes: Recipe[] = [
		new Recipe('Flan de turrón', 'Esto es una prueba de flan de turrón', 
				'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg',
				[
					new Ingredient('Pastilla de turron', 1),
					new Ingredient('Nata', 2)
				]
			),
		new Recipe('Paella de verduras', 'Esto es una prueba de paella. Quiero aprender a hacer el arroz de conejo y verduras',
					'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg',
					[
						new Ingredient('Arroz', 200),
						new Ingredient('Conejo', 1),
						new Ingredient('Alcachofa', 4),
						new Ingredient('Pimiento rojo', 4)
					]
				),
		new Recipe('Arroz de matanza', 'Arroz al horno muy rico. Bomba calórica.', 
					'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg',
					[
						new Ingredient('Arroz', 200),
						new Ingredient('Blanco', 1),
						new Ingredient('Morcilla', 4),
						new Ingredient('Tocino', 4)
					]
				),
		new Recipe('Lubina al horno', 'Pescado de gran sabor y calidad cocinado con cariño por mi esposa.', 
					'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg', 
					[
						new Ingredient('Lubina', 1),
						new Ingredient('Vino blanco', 1),
						new Ingredient('Patatas', 4),
						new Ingredient('Cebolla', 1)
					]
				)
	];*/

	private recipes: Recipe[] = [];


	constructor(
		private slService: ShoppingListService,
		private store: Store<fromShoppingList.AppState>
	) { }

	setStoredRecipes(storedRecipes: Recipe[]) {
		this.recipes = storedRecipes;
		this.onChangedRecipes.next(this.recipes.slice());
	}
	getRecipes() {
		//this.onChangedRecipes.next(this.recipes.slice()); //TAMBIÉN FUNCIONA
		return this.recipes.slice(); // con slice devolvemos una copia del array del servicio.
	}

	getRecipeById(id: number): Recipe {
		if (id > this.recipes.length) { id = this.recipes.length - 1; }
		if (id < 0) { id = 0; }
		return this.recipes[id];
	}

	//solución usando servicio ShoppingList	
	addIngredientsToShoppingListService(receta: Recipe) {
		this.slService.addIngredients(receta.ingredientes);
	}

	addIngredientsToShoppingList(receta: Recipe) {
		this.store.dispatch(new ShoppingListActions.AddIngredients(receta.ingredientes));
	}

	addRecipe(newRecipe: Recipe) {
		this.recipes.push(newRecipe);
		this.onChangedRecipes.next(this.recipes.slice());
	}

	editRecipe(id: number, newRecipe: Recipe) {
		this.recipes[id] = newRecipe;
		this.onChangedRecipes.next(this.recipes.slice());
	}

	deleteRecipe(id: number) {
		this.recipes.splice(id, 1);
		this.onChangedRecipes.next(this.recipes.slice());
	}

}
