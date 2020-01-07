import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
	providedIn: 'root'
})
export class DataStorageService {

	constructor(private http: HttpClient, private recipeService: RecipesService) { }

	storeRecipes() {
		const recipes: Recipe[] = this.recipeService.getRecipes();

		this.http.put('https://max-recipes-book.firebaseio.com/recetas.json', recipes).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	fetchRecipes() {
		return this.http.get<Recipe[]>('https://max-recipes-book.firebaseio.com/recetas.json')
		.pipe(
			map(recipes => {
				return recipes.map(recipe => {
					return { ...recipe, ingredientes: recipe.ingredientes ? recipe.ingredientes : [] };
				});
			}), 
			tap(
				recipes => {
					this.recipeService.setStoredRecipes(recipes);
				}
			)
		);
	}
}
