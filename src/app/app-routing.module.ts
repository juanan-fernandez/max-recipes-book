import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';



const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule)},    //sintaxis antigua: { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule)},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)}
];

@NgModule({
    imports: [ 
        //optimización del lazy loading: hace una precarga de todos los módulos para que posteriormente la navegación sea más agil
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules }) 
        //RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
