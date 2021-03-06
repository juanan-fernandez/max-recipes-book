import { Component, OnInit } from '@angular/core';

import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';


@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
	unaReceta: Recipe;
	constructor() { }

	ngOnInit() {

	}

	onRecetaRecibida(laReceta: Recipe) {
		this.unaReceta = laReceta;
	}

}
