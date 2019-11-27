import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Libro de recetas';
	selectedMenu = 'recetas';

	onMenu(menuItem: string) {
		this.selectedMenu = menuItem;
		console.log(this.selectedMenu);
	}
}
