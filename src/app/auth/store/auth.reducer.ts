import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    isLoading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    isLoading: false
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
    
    switch (action.type) {
        case AuthActions.LOGIN:
            const theUser = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate);
            return({
                ...state, 
                user: theUser,
                authError: null,
                isLoading: false
            });

        case AuthActions.LOGOUT:
            return({
                ...state,
                user: null,
                authError: null,
                isLoading: false
            });
        
        case AuthActions.LOGIN_START:
        case AuthActions.SINGUP_START:
            return({
                ...state,
                user: null,
                authError: null,
                isLoading: true
            });
        
        
        case AuthActions.LOGIN_FAIL:
                return({
                    ...state,
                    user: null,
                    authError: action.payload,
                    isLoading: false
                });
                
        case AuthActions.CLEAR_ERROR:
                return({
                    ...state,
                    authError: null
                });

        default:
            return state;
    }
}
