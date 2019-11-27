import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	public collapsed: boolean;
	@Output() clickedMenu = new EventEmitter<string>();
	constructor() {
		this.collapsed = true;
	}

	onClickMenu(item: string) {
		this.clickedMenu.emit(item);
	}

}
