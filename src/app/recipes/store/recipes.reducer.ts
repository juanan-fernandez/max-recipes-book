import * as RecipesActions from './recipes.actions';
import { Recipe } from '../recipe.model';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state: State = initialState, action: RecipesActions.RecipesActionsType) {

    switch (action.type) {
        case RecipesActions.GET_RECIPES:
            return (
                {
                    ...state,
                    recipes: [...action.payload]
                }
            );

        // case RecipesActions.STORE_RECIPES: yo lo haría así y funciona. copiamos el código del profesor más eficiente
        //     return (
        //         {
        //             ...state,
        //             recipes: [...action.payload]
        //         }
        //     );
        case RecipesActions.ADD_RECIPE:
            return ({
                ...state,
                recipes: [...state.recipes, action.payload]
            });

        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe = { ...state.recipes[action.payload.id], ...action.payload.editedRecipe };
            const theUpdatedRecipes = [...state.recipes];
            theUpdatedRecipes[action.payload.id] = updatedRecipe;
            return (
                {
                    ...state,
                    recipes: theUpdatedRecipes
                }
            );

        case RecipesActions.DELETE_RECIPE:
            return ({
                ...state,
                recipes: state.recipes.filter((element, index) => {
                    return index !== action.payload;
                })
            });

        default:
            return state;
    }

}
