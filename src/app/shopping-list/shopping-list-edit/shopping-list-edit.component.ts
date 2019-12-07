import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
	@ViewChild('nameInput', {static: true}) ingredientName: ElementRef;
	
	
	constructor(private servicioLista: ShoppingListService) { }

	ngOnInit() {
	}

	onAddIngredient(amountInput: HTMLInputElement) {
		const iname = this.ingredientName.nativeElement.value;
		const iamount = parseInt(amountInput.value, 10);
		const myIngredient: Ingredient = new Ingredient(iname, iamount);
		this.servicioLista.addIngredient(myIngredient);
		this.ingredientName.nativeElement.value = '';
		amountInput.value = '';

	}

}
