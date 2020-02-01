import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

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
	constructor(private store: Store<fromApp.AppState>) { }

	//para controlar que cuando expire el token se cierre la sesión automaticamente
	setLogOutTimer(expirationLong: number) {
		console.log(expirationLong);
		this.tokenExpirationTime = setTimeout(_ => {
			this.store.dispatch(new AuthActions.LogOut());
		}, expirationLong);
	}

	clearLogOutTimer(){
		if (this.tokenExpirationTime) {
			clearTimeout(this.tokenExpirationTime);
		}
		this.tokenExpirationTime = null;
	}

}
