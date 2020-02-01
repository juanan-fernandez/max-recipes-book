import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Injectable({
	providedIn: 'root'
})
export class DataStorageService {

	constructor(
		private http: HttpClient,
		private recipeService: RecipesService,
		private store: Store<fromApp.AppState>) { }

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

	//esta función sería la que usariamos agregando de forma manual a cada petición http el token de usuario	
	fetchRecipes_manualtoken() {
		return this.store.select('auth').pipe(
			take(1),
			map(authState => {
				return authState.user;
			}),
			exhaustMap(user => { //video 300!!!
				//podemos enviar el token así,.. o con el código de abajo mas elegante (1)
				//return this.http.get<Recipe[]>('https://max-recipes-book.firebaseio.com/recetas.json?auth=' + user.token); 
				// 1. en firebase el token lo exige en los parametros. en otras apis puede variar.
				return this.http.get<Recipe[]>('https://max-recipes-book.firebaseio.com/recetas.json',
					{
						params: new HttpParams().set('auth', user.token)
					});
			}),
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

	//usamos esta función porque el token de usuario lo pasamos con un interceptor
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
						//this.recipeService.setStoredRecipes(recipes);
						this.store.dispatch(new RecipesActions.GetRecipes(recipes));
					}
				)
			);
	}
}
