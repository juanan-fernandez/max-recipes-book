import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipes.actions';



@Injectable()
export class RecipesEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.GET_RECIPES),
        switchMap(() => {
            const url = 'https://max-recipes-book.firebaseio.com/recetas.json';
            return this.http.get<Recipe[]>(url);
        }),
		    map(recipes => {
				return recipes.map(recipe => {
					return { ...recipe, ingredientes: recipe.ingredientes ? recipe.ingredientes : [] };
				});
            }),
            map(recipes => {
                    return new RecipeActions.GetRecipes(recipes);
            })
    );

    

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }
}
