import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpParams } from '@angular/common/http';
import { take, map, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })

export class AuthInterceptorService implements HttpInterceptor {

	constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

	intercept(request: HttpRequest<any>, next: HttpHandler) {

		return this.store.select('auth').pipe(
			take(1),
			map(appState => {
				return appState.user;
			}),
			exhaustMap(user => {
				if (!user){
					return next.handle(request);
				}
				const modifiedRequest  = request.clone(
					{params: new HttpParams().set('auth', user.token)}
				);
				return next.handle(modifiedRequest);
			}));
	}

}
