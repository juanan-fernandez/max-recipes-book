import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
	public collapsed: boolean;
	public isAuthenticated: boolean = false;
	private userSub: Subscription;

	constructor(private dataStorage: DataStorageService, private authLogin: AuthService, private store: Store<fromApp.AppState>) {
		this.collapsed = true;
	}

	ngOnInit() {
		this.userSub = this.store.select('auth')
					.pipe(map(authState => authState.user))
					.subscribe(user => {
						this.isAuthenticated = !user ? false : true;
					});
	}

	onSave() {
		this.dataStorage.storeRecipes();
	}

	onFetch() {
		this.dataStorage.fetchRecipes().subscribe();
	}

	onLogOut() {
		this.authLogin.logout();
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}

}
