import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
		return this.store.select('auth').pipe(
			take(1),
			map(appState => {
				return appState.user;
			}),
			map(user => {
				//return !!user; equivalente a la siguiente línea. para mi es más legible
				//return !user ? false : true;
				const isAuth = !user ? false : true;
				if (isAuth) {
					return true;
				}
				return this.router.createUrlTree(['/auth']);
			})
		);
	}

}
