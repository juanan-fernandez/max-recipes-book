import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
	public collapsed: boolean;
	public isAuthenticated: boolean = false;
	private userSub: Subscription;
	
	constructor(private dataStorage: DataStorageService, private authLogin: AuthService) {
		this.collapsed = true;
	}

	ngOnInit(){
		this.userSub = this.authLogin.myUser.subscribe( user => {
			this.isAuthenticated = !user ? false : true; 
		});
	}

	onSave(){
		this.dataStorage.storeRecipes();
	}

	onFetch(){
		this.dataStorage.fetchRecipes().subscribe();
	}

	onLogOut() {
		this.authLogin.logout();
	}

	ngOnDestroy(){
		this.userSub.unsubscribe();
	}

}
