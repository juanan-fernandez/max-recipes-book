import { Action } from '@ngrx/store';

export const SINGUP_START = '[Auth] SINGUP_START';
export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';
export const CLEAR_ERROR = '[Auth] CLEAR_ERR';


export class SingupStart implements Action {
    readonly type = SINGUP_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) { }
}

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {
        email: string,
        id: string,
        token: string,
        tokenExpirationDate: Date}) { }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class LogOut implements Action {
    readonly type = LOGOUT;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type AuthActions =  SingupStart | Login | LogOut | LoginStart | LoginFail | ClearError;
