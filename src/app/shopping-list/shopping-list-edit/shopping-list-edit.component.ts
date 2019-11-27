import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
	@ViewChild('nameInput', {static: true}) ingredientName: ElementRef;
	@Output() addIngredient = new EventEmitter<Ingredient>();
	
	constructor() { }

	ngOnInit() {
	}

	onAddIngredient(amountInput: HTMLInputElement) {
		const iname = this.ingredientName.nativeElement.value;
		const iamount = parseInt(amountInput.value, 10);
		const myIngredient: Ingredient = new Ingredient(iname, iamount);
		this.addIngredient.emit(myIngredient);
		this.ingredientName.nativeElement.value = '';
		amountInput.value = '';

	}

}
