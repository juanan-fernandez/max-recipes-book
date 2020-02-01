import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const GET_RECIPES = '[Recipes] GET_RECIPES';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const STORE_RECIPES = '[Recipes] SET_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const EDIT_RECIPE = '[Recipes] EDIT_RECIPE';
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
    constructor(public payload: Recipe[]){}
}


export class AddRecipe implements Action{
    readonly type = ADD_RECIPE;
}

export class EditRecipe implements Action{
    readonly type = ADD_RECIPE;
}

export class DeleteRecipe implements Action{
    readonly type = ADD_RECIPE;
}

export type RecipesActionsType = GetRecipes |
                                    FetchRecipes |
                                    StoreRecipes |
                                    AddRecipe | 
									EditRecipe |
                                    DeleteRecipe;
