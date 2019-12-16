import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
	constructor(private servicioReceta: RecipesService, private current: ActivatedRoute, private router: Router) { }
	ngOnInit() {
		this.current.params.subscribe((parametros: Params ) => {
			this.idRecipe = +parametros['id'];
			this.detalleReceta = this.servicioReceta.getRecipeById(this.idRecipe);
		});

	}

	onEditRecipe() {
		// this.router.navigate(['edit'], { relativeTo: this.current }); la forma más correcta sería esta línea, pero la siguiente línea también funcionaría:
		this.router.navigate(['../', this.idRecipe, 'edit'], {relativeTo: this.current}); //para propósito demostrativo
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
