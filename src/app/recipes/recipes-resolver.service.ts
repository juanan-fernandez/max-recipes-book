import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({
	providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

	constructor(private dataStorage: DataStorageService, private recipeService: RecipesService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const recipes: Recipe[] = this.recipeService.getRecipes();
		if (recipes.length === 0) {
			return this.dataStorage.fetchRecipes();
		} else {
			return recipes;
		}

	}



}
