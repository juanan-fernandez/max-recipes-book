import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {
        email: string,
        id: string,
        token: string,
        tokenExpirationDate: Date
    }) { }
}

export class LogOut implements Action {
    readonly type = LOGOUT;
}


export type AuthActions = Login | LogOut;
