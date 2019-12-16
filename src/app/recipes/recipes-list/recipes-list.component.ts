import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';


@Component({
	selector: 'app-recipes-list',
	templateUrl: './recipes-list.component.html',
	styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

	recipes: Recipe[] = [];

	constructor(private servicioRecetas: RecipesService, private router: Router, private currentRoute: ActivatedRoute) { }

	ngOnInit() {
		this.recipes = this.servicioRecetas.getRecipes();
	}

	onNewRecipe() {
		this.router.navigate(['new'], {relativeTo: this.currentRoute});
	}
}
