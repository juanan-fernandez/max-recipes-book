import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const authRoutes: Routes = [
    { path: '', component: AuthComponent}   
];

@NgModule({
    declarations: [
        AuthComponent,

    ],
    imports: [
        RouterModule.forChild(authRoutes),
        SharedModule,
        FormsModule
    ]
})
export class AuthModule { }
