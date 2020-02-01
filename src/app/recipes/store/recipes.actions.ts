import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const GET_RECIPES = '[Recipes] GET_RECIPES';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const STORE_RECIPES = '[Recipes] STORE_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';


export class GetRecipes implements Action{
    readonly type = GET_RECIPES;
    constructor(public payload: Recipe[]){}
}

export class FetchRecipes implements Action{
    readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action{
    readonly type = STORE_RECIPES;
    //constructor(public payload: Recipe[]){} esto sería mi aproximación. dejamos el código del profesor porque es mejor
}


export class AddRecipe implements Action{
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe){}
}

export class UpdateRecipe implements Action{
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {id: number, editedRecipe: Recipe}){}
}

export class DeleteRecipe implements Action{
    readonly type = DELETE_RECIPE;
    constructor(public payload: number){}
}

export type RecipesActionsType = GetRecipes |
                                    FetchRecipes |
                                    StoreRecipes |
                                    AddRecipe | 
                                    UpdateRecipe |
                                    DeleteRecipe;
