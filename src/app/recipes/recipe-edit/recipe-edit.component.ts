import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	idRecipe: number;
	editMode: boolean = false;
	constructor(private ruta: ActivatedRoute) { }

	ngOnInit() {
		this.ruta.params.subscribe((params: Params) => {
			this.idRecipe = +params['id'];
			this.editMode = params['id'] != null;
			console.log(this.editMode);
		});
	}

}
