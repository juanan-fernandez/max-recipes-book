import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';



@NgModule({
	declarations: [
		RecipesComponent,
		RecipeEditComponent,
		RecipeStartComponent,
		RecipesDetailComponent,
		RecipesListComponent,
		RecipeItemComponent
	],
	imports: [
		CommonModule
	]
})
export class RecipesModule { }
