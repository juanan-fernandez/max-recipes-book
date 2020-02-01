import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';



export interface AuthResponseData {
    name: string;
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

const handleAuthentication = (email: string, id: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const userAuthenticated = new User(email, id, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(userAuthenticated));
    return new AuthActions.Login({ email: email, id: id, token: token, tokenExpirationDate: expirationDate });
};

const handleError = (errorRes) => {
    let errorMessage = 'Error desconocido!';
    console.log(errorRes.error.error.message);
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.LoginFail(errorMessage));
    }

    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'La cuenta ya existe!';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = "El password no es correcto.";
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = "La cuenta indicada no existe.";
            break;
    }
    return of(new AuthActions.LoginFail(errorMessage));
};

@Injectable()
export class AuthEffects {

    @Effect()
    authSingUp = this.actions$.pipe(
        ofType(AuthActions.SINGUP_START),
        switchMap((authStateData: AuthActions.SingupStart) => {
            const urlSignUp = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey;
            return this.http.post(urlSignUp, { email: authStateData.payload.email, password: authStateData.payload.password, returnSecureToken: true })
                .pipe(
                    tap((resData: AuthResponseData) => {
                        this.authService.setLogOutTimer(+resData.expiresIn * 1000);
                    }),
                    map((resData: AuthResponseData) => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                        //return new AuthActions.Login({ email: resData.email, id: resData.idToken, token: resData.localId, tokenExpirationDate: expirationDate });
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                );
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            const urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey;
            const myLoginData = { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true };

            return this.http.post<AuthResponseData>(urlLogin, myLoginData)
                .pipe(
                    tap((resData: AuthResponseData) => {
                        this.authService.setLogOutTimer(+resData.expiresIn * 1000); //*1000
                    }),
                    map((resData: AuthResponseData) => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                );
        })

    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return { type: 'test' }; //la funcion obligatoriamente debe devolver un observable
            }
            const currentUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if (currentUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogOutTimer(expirationDuration);
                return (new AuthActions.Login({
                    email: currentUser.email,
                    id: currentUser.id,
                    token: currentUser.token,
                    tokenExpirationDate: new Date(userData._tokenExpirationDate)
                }));
            }
            return { type: 'test' };
        })
    );

    @Effect({ dispatch: false })
    authLogOut = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogOutTimer();
            localStorage.removeItem('userData'); //only removes userData key
            this.router.navigate(['/auth']);
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap((authData) => {
            this.router.navigate(['/recipes']);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) { }

}
