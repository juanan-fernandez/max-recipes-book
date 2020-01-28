import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';


export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientId: number;
}

const initialState: State = {
	ingredients: [
		new Ingredient('Manzanas2', 5),
		new Ingredient('Platanos', 8),
		new Ingredient('Yogurt', 8)
	],
	editedIngredient: null,
	editedIngredientId: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActionsType) {
	switch (action.type) {
		case ShoppingListActions.ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload]
			};

		case ShoppingListActions.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload]
			};

		case ShoppingListActions.UPDATE_INGREDIENT:
			const ingredientAux = state.ingredients[state.editedIngredientId];
			//console.log(ingredientAux);
			const updatedIngredient = {
				...ingredientAux,
				...action.payload
			};
			//console.log(updatedIngredient);
			const updatedIngredients = [...state.ingredients]; //hago una copia del array de ingredientes sin modificar. NUNCA MOODIFICAR los datos de la variable state
			updatedIngredients[state.editedIngredientId] = updatedIngredient;
			//console.log({...state, ingredients: updatedIngredients});
			return {
				...state,
				ingredients: updatedIngredients,
				editedIngredient: null,
				editedIngredientId: -1
			};

		case ShoppingListActions.DELETE_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter((ig, igIndex) => {  //filter ya crea una copia del array, por tanto no estamos modificando el state original
					return igIndex !== state.editedIngredientId;
				}),
				editedIngredient: null,
				editedIngredientId: -1
			};

		case ShoppingListActions.START_EDIT:
			return {
				...state,
				editedIngredient: { ...state.ingredients[action.payload] },
				editedIngredientId: action.payload
			};

		case ShoppingListActions.STOP_EDIT:
			return {
				...state,
				editedIngredient: null,
				editedIngredientId: -1
			};

		default:
			return state;
	}

}
