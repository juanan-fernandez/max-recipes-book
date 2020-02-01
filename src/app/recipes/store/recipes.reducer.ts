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
            return(
                {
                    ...state,
                    recipes: [...action.payload]
                }
            );
        
        case RecipesActions.STORE_RECIPES:
                return(
                    {
                        ...state,
                        recipes: [...action.payload]
                    }
                );
        case RecipesActions.ADD_RECIPE:

        default:
            return state;
    }

}
