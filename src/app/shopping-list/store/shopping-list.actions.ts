import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
	readonly type = ADD_INGREDIENT; //implements Action ->requiere la propiedad type
	constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
	readonly type = ADD_INGREDIENTS; //implements Action ->requiere la propiedad type
	constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
	readonly type = UPDATE_INGREDIENT;
	//constructor(public payload: {id: number, ingredient: Ingredient}) {} 
	//no tengo que pasar el id porque ya lo tengo en un campo del objeto estado
	//se carga cuando realizo la acción StartEdit. el constructor queda así
	constructor(public payload: Ingredient){} //unicamente paso los nuevos valores para el ingrediente
}

export class DeleteIngredient implements Action {
	readonly type = DELETE_INGREDIENT;
	constructor() {}
}

export class StartEdit implements Action {
	readonly type = START_EDIT;
	constructor(public payload: number) {}
}

export class StopEdit implements Action {
	readonly type = STOP_EDIT;
}


export type ShoppingListActionsType = AddIngredient | 
									AddIngredients |
									UpdateIngredient | 
									DeleteIngredient | 
									StartEdit | 
									StopEdit;
