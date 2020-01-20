import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';



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
		RouterModule,
		RecipesRoutingModule,
		ReactiveFormsModule,
		HttpClientModule, 
		SharedModule
	],
	exports: [
		RecipesComponent,
		RecipeEditComponent,
		RecipeStartComponent,
		RecipesDetailComponent,
		RecipesListComponent,
		RecipeItemComponent
	]
})
export class RecipesModule { }
