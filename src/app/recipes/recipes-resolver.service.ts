import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';
import { Recipe } from './recipe.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { RecipesService } from './recipes.service';


@Injectable({
	providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

	constructor(
		private store: Store<fromApp.AppState>, 
		private actions$: Actions,
		private recipeService: RecipesService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const recipes: Recipe[] = this.recipeService.getRecipes();
		if (recipes.length === 0) {
			return this.dataStorage.fetchRecipes();
		} else {
			return recipes;
		}

	}



}
