import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';
import { Recipe } from './recipe.model';
import { Actions, ofType } from '@ngrx/effects';



@Injectable({
	providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

	constructor(
		private store: Store<fromApp.AppState>, 
		private actions$: Actions
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.store.select('recipe').pipe(
			take(1),
			map(recipeState => {
				return recipeState.recipes;
			}),
			switchMap(recipes => {
				if (recipes.length === 0){
					this.store.dispatch(new RecipesActions.FetchRecipes());
					return this.actions$.pipe(ofType(RecipesActions.GET_RECIPES), take(1));
				}else {
					return of(recipes);
				}
			})
		);
			
	}



}
