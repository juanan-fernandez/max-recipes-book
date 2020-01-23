import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	], //BrowserModule es un módulo especial que sólo importamos en el módulo raíz de la aplicación. 
	//para el resto de módulos usamos CommonModule para realizar esta misma función
	imports: [
		BrowserModule, //ojo!
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot({shoppingList: shoppingListReducer}),
		SharedModule,
		CoreModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
