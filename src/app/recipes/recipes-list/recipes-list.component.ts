import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';




@Component({
	selector: 'app-recipes-list',
	templateUrl: './recipes-list.component.html',
	styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

	recipes: Recipe[] = [];
	recipeSubscriber: Subscription;
	constructor(
		private router: Router, 
		private currentRoute: ActivatedRoute,
		private store: Store<fromApp.AppState>) { }

	ngOnInit() {
		this.recipeSubscriber = this.store.select('recipe').subscribe((storeData) => {
			this.recipes = storeData.recipes;
		});

		// this.recipeSubscriber = this.servicioRecetas.onChangedRecipes.subscribe((recipesSubject: Recipe[]) => {
		// 	this.recipes = recipesSubject;
		// });
		//this.recipes = this.servicioRecetas.getRecipes();
		//this.servicioRecetas.getRecipes(); //SI Usamos el Subject en la función esta sería la llamada
	}

	onNewRecipe() {
		this.router.navigate(['new'], {relativeTo: this.currentRoute});
	}

	ngOnDestroy(){
		this.recipeSubscriber.unsubscribe();
	}
}
