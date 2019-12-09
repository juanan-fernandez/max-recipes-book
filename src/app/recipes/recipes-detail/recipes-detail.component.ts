import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

//import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
//import { Ingredient } from 'src/app/shared/ingredient.model';



@Component({
	selector: 'app-recipes-detail',
	templateUrl: './recipes-detail.component.html',
	styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

	detalleReceta: Recipe;
	idRecipe: number;
	//constructor(private servicioSl: ShoppingListService) { } esta sería mi forma de hacerlo, accediendo directamente al servicio de lista
	//la forma que propone el autor:
	constructor(private servicioReceta: RecipesService, private router: ActivatedRoute) { }
	ngOnInit() {
		this.router.params.subscribe((parametros: Params ) => {
			this.idRecipe = +parametros['id'];
			this.detalleReceta = this.servicioReceta.getRecipeById(this.idRecipe);
		});

	}
	
	/*comprarIngredientes() {
		this.detalleReceta.ingredientes.forEach(
			(ingrediente: Ingredient) => {
				this.servicioSl.addIngredient(ingrediente);
			}
		);
	}*/

	onToShoppingList() {
		this.servicioReceta.addIngredientsToShoppingList(this.detalleReceta);
	}
}
