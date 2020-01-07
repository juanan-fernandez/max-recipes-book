import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	public collapsed: boolean;
	
	constructor(private dataStorage: DataStorageService) {
		this.collapsed = true;
	}

	onSave(){
		this.dataStorage.storeRecipes();
	}

	onFetch(){
		this.dataStorage.fetchRecipes().subscribe();
	}

}
