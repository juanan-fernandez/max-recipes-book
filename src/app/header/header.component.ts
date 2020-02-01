import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

//import { Recipe } from '../recipes/recipe.model';
//import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';



@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
	public collapsed: boolean;
	public isAuthenticated: boolean = false;
	private userSub: Subscription;
	//private storeSub: Subscription;

	constructor(private store: Store<fromApp.AppState>) {
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
		// let recipes: Recipe[]; esta sería mi forma de hacerlo. respeto el código del profesor por ser más eficiente
		// this.storeSub = this.store.select('recipe').pipe(
		// 	tap(stateData => {
		// 		recipes = [...stateData.recipes];
		// 	})
		// ).subscribe();
		// this.store.dispatch(new RecipeActions.StoreRecipes(recipes));
		this.store.dispatch(new RecipeActions.StoreRecipes());
		//this.dataStorage.storeRecipes();

	}

	onFetch() {
		this.store.dispatch(new RecipeActions.FetchRecipes());
	}

	onLogOut() {
		this.store.dispatch(new AuthActions.LogOut());
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
		//if (this.storeSub) { this.storeSub.unsubscribe(); }
	}

}
