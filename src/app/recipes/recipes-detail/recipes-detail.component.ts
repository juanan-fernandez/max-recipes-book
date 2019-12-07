import { Component, OnInit, Input } from '@angular/core';
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

	@Input() detalleReceta: Recipe;
	//constructor(private servicioSl: ShoppingListService) { } esta sería mi forma de hacerlo, accediendo directamente al servicio de lista
	//la forma que propone el autor:
	constructor(private servicioReceta: RecipesService) { }
	ngOnInit() {
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
