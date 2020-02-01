import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipesEffects } from './recipes/store/recipes.effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';

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
		StoreModule.forRoot(fromApp.appReducer),
		EffectsModule.forRoot([AuthEffects, RecipesEffects]),
		StoreDevtoolsModule.instrument({logOnly: environment.production}),
		StoreRouterConnectingModule.forRoot(),
		SharedModule,
		CoreModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
