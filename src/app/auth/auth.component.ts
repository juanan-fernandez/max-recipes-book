import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
	logginMode: boolean = true;
	isLoading: boolean = false;
	strError: string = '';
	closeSubs: Subscription;

	@ViewChild(PlaceholderDirective, { static: true }) anAlert: PlaceholderDirective;

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver) { }


	ngOnDestroy() {
		if (this.closeSubs) {
			this.closeSubs.unsubscribe();
		}
	}

	onSwitchLoginMode() {
		this.logginMode = !this.logginMode;
	}

	onSubmit(frm: NgForm) {

		if (!frm.valid) { return; }

		let authObserv: Observable<AuthResponseData>;
		const valueForm = frm.value; //cuando oculto el formulario pierdo los valores, por eso los guardo en una variable
		this.isLoading = true;

		if (this.logginMode) {
			authObserv = this.authService.login(valueForm);
		} else {
			authObserv = this.authService.signUp(valueForm);
		}
		authObserv.subscribe(
			data => {
				this.strError = '';
				//console.log(data);
				frm.reset();
				this.router.navigate(['/recipes']);
			}, errorMessage => {
				this.strError = 'ERROR: ' + errorMessage;
				this.showAlertError(errorMessage);
			}

		);
		setTimeout(_ => { this.isLoading = false; }, 1000); //temporizador para que se muestre durante 1 seg. el spinner

	}

	onAcceptedError() {
		this.strError = '';
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
