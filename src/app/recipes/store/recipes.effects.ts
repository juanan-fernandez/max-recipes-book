import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app.reducer';




@Injectable()
export class RecipesEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
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

    @Effect({ dispatch: false })
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipe')),
        switchMap((latestFromData) => {
            const url = 'https://max-recipes-book.firebaseio.com/recetas.json';
            return this.http.put(url, latestFromData[1].recipes);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}
