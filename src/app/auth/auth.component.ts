import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';



@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy, OnInit {
	logginMode: boolean = true;
	isLoading: boolean = false;
	strError: string = '';
	closeSubs: Subscription;
	storeSubs: Subscription;

	@ViewChild(PlaceholderDirective, { static: true }) anAlert: PlaceholderDirective;

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private store: Store<fromApp.AppState>
	) { }

	ngOnInit() {
		console.log('auth component ngOnInit');
		this.storeSubs = this.store.select('auth').subscribe(authData => {
			this.strError = authData.authError;
			this.isLoading = authData.isLoading;
			if (this.strError) {
				this.showAlertError(this.strError);
			}
		});
	}

	ngOnDestroy() {
		if (this.closeSubs) { this.closeSubs.unsubscribe(); }
		if (this.storeSubs) { this.storeSubs.unsubscribe(); }

	}

	onSwitchLoginMode() {
		this.logginMode = !this.logginMode;
	}

	onSubmit(frm: NgForm) {

		if (!frm.valid) { return; }

		const email = frm.value.email;
		const passwd = frm.value.password;
		this.isLoading = true;

		if (this.logginMode) {
			//authObserv = this.authService.login(valueForm);
			this.store.dispatch(new AuthActions.LoginStart({ email: email, password: passwd }));
		} else {
			//authObserv = this.authService.signUp(valueForm);
			this.store.dispatch(new AuthActions.SingupStart({ email: email, password: passwd }));
		}

		setTimeout(_ => { this.isLoading = false; }, 1000); //temporizador para que se muestre durante 1 seg. el spinner
	}

	onAcceptedError() {
		this.store.dispatch(new AuthActions.ClearError());
	}

	//ejemplo de instanciar un component en runtime (dinamicamente)
	showAlertError(message: string) {
		const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const containerRef = this.anAlert.viewContainerRef;
		containerRef.clear();

		const newComponentAlert = containerRef.createComponent(alertCmpFactory);
		(newComponentAlert.instance as AlertComponent).message = message;
		this.closeSubs = newComponentAlert.instance.close.subscribe(_ => {
			this.closeSubs.unsubscribe();
			containerRef.clear();
		});

	}

}
