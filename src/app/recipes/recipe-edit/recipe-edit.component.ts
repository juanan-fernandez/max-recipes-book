import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	idRecipe: number;
	editMode: boolean = false;
	recipeForm: FormGroup;
	private SubsStore: Subscription;
	constructor(
		private ruta: ActivatedRoute,
		private router: Router,
		private store: Store<fromApp.AppState>
	) { }

	ngOnInit() {
		this.ruta.params.subscribe((params: Params) => {
			this.idRecipe = +params['id'];
			this.editMode = params['id'] != null;
			this.InitForm();
		});
	}

	get controls() { // a getter!
		return (this.recipeForm.get('ingredientes') as FormArray).controls;
	}

	OnSubmitRecipe() {
		const newRecipe: Recipe = new Recipe(this.recipeForm.value.name, this.recipeForm.value.description, this.recipeForm.value.imagePath, this.recipeForm.value.ingredients);
		if (this.editMode) {
			//esta solución sería válida.
			//this.recipeService.editRecipe(this.idRecipe, newRecipe); 
			//gracias a los formularios reactivos como están establecidos igual que el modelo y con los mismos nombres de campo podemos pasar
			//el formulario entero.value porque es un objeto json igual que el modelo Recipe. NO HARÍA FALTA LA PRIMERA LÍNEA CON el const
			//this.recipeService.editRecipe(this.idRecipe, this.recipeForm.value);
			//this.store.dispatch(new RecipesActions.UpdateRecipe({id: this.idRecipe, editedRecipe: newRecipe}));
			this.store.dispatch(new RecipesActions.UpdateRecipe({ id: this.idRecipe, editedRecipe: this.recipeForm.value }));


		} else {
			//this.recipeService.addRecipe(this.recipeForm.value);
			//this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
			this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
			this.SubsStore = this.store.select('recipe').pipe(
				tap(stateData => {
					this.idRecipe = stateData.recipes.length - 1;
				})
			).subscribe();
		}
		console.log(this.idRecipe);
		this.router.navigate(['/recipes', this.idRecipe]);
		//también podría ser:
		//this.router.navigate(['../'], {relativeTo: this.ruta});
	}

	onDeleteIngredient(id: number) {
		(this.recipeForm.get("ingredientes") as FormArray).removeAt(id);

		//(this.recipeForm.get("ingredientes") as FormArray).clear();
		/*The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.
		It's like manually creating a loop and calling removeAt() for every item.*/
	}

	onAddIngredient() {
		(this.recipeForm.get('ingredientes') as FormArray).push(
			new FormGroup(
				{
					name: new FormControl(null, Validators.required),
					amount: new FormControl(1, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
				})
		);
	}

	onCancel() {
		this.router.navigate(['/recipes']);
	}

	private InitForm() {
		let recipeName = '';
		let urlImg = '';
		let description = '';
		const recipeIngredients = new FormArray([]);

		if (this.editMode) {
			this.SubsStore = this.store.select('recipe').pipe(
				map(recipeStateData => {
					return recipeStateData.recipes.find((recipe, id) => {
						return (id === this.idRecipe);
					});
				})
			).subscribe(recipe => {
				recipeName = recipe.name;
				urlImg = recipe.imagePath;
				description = recipe.description;
				if (recipe.ingredientes) {
					recipe.ingredientes.forEach((ingrediente) => {
						recipeIngredients.push(
							new FormGroup({
								name: new FormControl(ingrediente.name, Validators.required),
								amount: new FormControl(ingrediente.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
							})
						);
					});
				}
			});

		}

		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(urlImg, Validators.required),
			description: new FormControl(description, Validators.required),
			ingredientes: recipeIngredients
		});
	}

	ngOnDestroy() {
		if (this.SubsStore) {
			this.SubsStore.unsubscribe();
		}

	}


}
