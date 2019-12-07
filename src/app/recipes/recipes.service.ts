import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

/*@Injectable({
	providedIn: 'root'
}) NO LO QUIERO DISPONIBLE EN TODA LA APLICACIÓN*/

@Injectable()
export class RecipesService {
	private recipes: Recipe[] = [
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
	];

	RecipeSelected = new EventEmitter<Recipe>();

	constructor(private slService: ShoppingListService) { }

	getRecipes() {
		return this.recipes.slice(); // con slice devolvemos una copia del array del servicio.
	}

	addIngredientsToShoppingList(receta: Recipe) {
		this.slService.addIngredients(receta.ingredientes);
	}
}
