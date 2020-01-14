import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	logginMode: boolean = true;
	isLoading: boolean = false;
	strError: string = '';
	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
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
			}

		);
		setTimeout(_ => { this.isLoading = false; }, 1000);

	}

}
