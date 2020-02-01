import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipesActions from '../store/recipes.actions';

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
	constructor(
		private current: ActivatedRoute,
		private router: Router,
		private store: Store<fromApp.AppState>
	) { }

	ngOnInit() {
		this.current.params.subscribe((parametros: Params) => {
			this.idRecipe = +parametros['id'];
			this.store.select('recipe').pipe(
				map(recipeStateData => {
					return recipeStateData.recipes.find((recipe, index) => {
						return (index === this.idRecipe);
					});
				})
			).subscribe(recipe => {
				this.detalleReceta = recipe;
			});
		});

		// OTRA FORMA DE HACERLO
		// this.current.params.pipe(
		// 	map(myparams => {
		// 		return +myparams['id'];
		// 	}),
		// 	switchMap (id => {
		// 		this.idRecipe = id;
		// 		return this.store.select('recipe');
		// 	}), 
		// 	map(recipeStateData => {
		// 			return recipeStateData.recipes.find((recipe, index) => {
		// 				return (index === this.idRecipe);
		// 			});
		// 	})
		// ).subscribe(recipe => {
		// 	this.detalleReceta = recipe;
		// });

	}

	onEditRecipe() {
		// this.router.navigate(['edit'], { relativeTo: this.current }); la forma más correcta sería esta línea, pero la siguiente línea también funcionaría:
		this.router.navigate(['../', this.idRecipe, 'edit'], { relativeTo: this.current }); //para propósito demostrativo
	}

	onDeleteRecipe() {
		//this.servicioReceta.deleteRecipe(this.idRecipe);
		this.store.dispatch(new RecipesActions.DeleteRecipe(this.idRecipe));
		this.router.navigate(['/recipes']);
	}

	/*comprarIngredientes() {
		this.detalleReceta.ingredientes.forEach(
			(ingrediente: Ingredient) => {
				this.servicioSl.addIngredient(ingrediente);
			}
		);
	}*/

	onToShoppingList() {
		this.store.dispatch(new ShoppingListActions.AddIngredients(this.detalleReceta.ingredientes));
	}
}
