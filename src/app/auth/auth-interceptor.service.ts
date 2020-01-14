import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })

export class AuthInterceptorService implements HttpInterceptor {

	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler) {

		return this.authService.myUser.pipe(
			take(1),
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
