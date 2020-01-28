import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	//myUser = new BehaviorSubject<User>(null);
	private tokenExpirationTime: any;
	constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

	logout() {
		//this.myUser.next(null);
		this.store.dispatch(new AuthActions.LogOut());
		this.router.navigate(['/auth']);
		//localStorage.clear();  clears all storaged information in localStorage
		localStorage.removeItem('userData'); //only removes userData key
		if (this.tokenExpirationTime) {
			clearTimeout(this.tokenExpirationTime);
		}
		this.tokenExpirationTime = null;
	}

	signUp(loginData: { email: string, password: string }) {
		const urlSignUp = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey;
		const myData = { ...loginData, returnSecureToken: true };

		return this.http.post<AuthResponseData>(urlSignUp, myData)
			.pipe(catchError(this.handleError),
				tap(resData => {
					this.handleAuthenticatedUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
				}));
	}

	//metodo para leer el localstorage para tener un login persistente
	autoLogin() {
		const userData: {
			email: string,
			id: string,
			_token: string,
			_tokenExpirationDate: string
		} = JSON.parse(localStorage.getItem('userData'));

		if (!userData) {
			return;
		}
		const currentUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
		if (currentUser.token) {
			//this.myUser.next(currentUser);
			this.store.dispatch(new AuthActions.Login({
				email: currentUser.email,
				id: currentUser.id,
				token: currentUser.token,
				tokenExpirationDate: new Date(userData._tokenExpirationDate)
			}));
			const timeExpiration: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogOut(timeExpiration);
		}
	}

	//para controlar que cuando expire el token se cierre la sesión automaticamente
	autoLogOut(expirationLong: number) {
		this.tokenExpirationTime = setTimeout(_ => {
			this.logout();
		}, expirationLong);
	}

	login(loginData: { email: string, password: string }) {
		const urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey;
		const myLoginData = { ...loginData, returnSecureToken: true };

		return this.http.post<AuthResponseData>(urlLogin, myLoginData)
			.pipe(catchError(this.handleError),
				tap(resData => {
					this.handleAuthenticatedUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
				}));
	}

	private handleAuthenticatedUser(email: string, id: string, token: string, expiresIn: number) {
		const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
		const userAuthenticated = new User(email, id, token, expirationDate);
		this.store.dispatch(new AuthActions.Login({ email: email, id: id, token: token, tokenExpirationDate: expirationDate }));
		//this.myUser.next(userAuthenticated);
		this.autoLogOut(expiresIn * 1000);
		localStorage.setItem('userData', JSON.stringify(userAuthenticated));
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'Error desconocido!';
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}
		switch (errorRes.error.error.message) {

			case 'INVALID_PASSWORD':
				errorMessage = "El password no es correcto.";
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = "La cuenta indicada no existe.";
				break;
		}
		return throwError(errorMessage);
	}

}
