import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	idRecipe: number;
	editMode: boolean = false;
	recipeForm: FormGroup;
	constructor(private ruta: ActivatedRoute, private router: Router, private recipeService: RecipesService) { }

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

	OnSubmitRecipe(){
		const newRecipe: Recipe = new Recipe(this.recipeForm.value.name, this.recipeForm.value.description, this.recipeForm.value.imagePath, this.recipeForm.value.ingredients);
		if (this.editMode) {
			//esta solución sería válida.
			//this.recipeService.editRecipe(this.idRecipe, newRecipe); 
			//gracias a los formularios reactivos como están establecidos igual que el modelo y con los mismos nombres de campo podemos pasar
			//el formulario entero.value porque es un objeto json igual que el modelo Recipe. NO HARÍA FALTA LA PRIMERA LÍNEA CON el const
			this.recipeService.editRecipe(this.idRecipe, this.recipeForm.value); 
			
		}else{
			this.recipeService.addRecipe(this.recipeForm.value);
			this.idRecipe = this.recipeService.getRecipes().length - 1;
		}
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

	onCancel(){
		this.router.navigate(['/recipes']);
	}

	private InitForm() {
		let recipeName = '';
		let urlImg = '';
		let description = '';
		const recipeIngredients = new FormArray([]);

		if (this.editMode) {
			const receta = this.recipeService.getRecipeById(this.idRecipe);
			recipeName = receta.name;
			urlImg = receta.imagePath;
			description = receta.description;
			if (receta.ingredientes){
				receta.ingredientes.forEach( (ingrediente) => {
					recipeIngredients.push(
						new FormGroup({
							name: new FormControl(ingrediente.name, Validators.required),
							amount: new FormControl(ingrediente.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
						})
					);
				});
			}
		}

		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(urlImg, Validators.required),
			description: new FormControl(description, Validators.required),
			ingredientes: recipeIngredients
		});

	}



}
