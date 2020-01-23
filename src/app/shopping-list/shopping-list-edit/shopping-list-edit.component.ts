import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
	@ViewChild('name2', { static: true }) ingredientName: ElementRef;
	@ViewChild('frm', { static: true }) myForm: NgForm;
	subscription: Subscription;
	editMode: boolean = false;
	editItemIndex: number;
	editItem: Ingredient;

	constructor(
		private servicioLista: ShoppingListService,
		private store: Store<fromShoppingList.AppState>
	) { }

	ngOnInit() {
		//solución mediante estados ngrx
		this.subscription = this.store.select('shoppingList').subscribe(stateData => {
			if (stateData.editedIngredientId > -1) {
				this.editMode = true;
				this.editItemIndex = stateData.editedIngredientId;
				this.editItem = stateData.editedIngredient;
				this.myForm.setValue(
					{
						name: this.editItem.name,
						amount: this.editItem.amount
					}
				);
			} else {
				this.editMode = false;
			}
		});
		//solución clásica mediante servicios y subjects
		/*this.subscription = this.servicioLista.editingIngredient.subscribe(
			(id: number) => {
				this.editMode = true;
				this.editItemIndex = id;
				this.editItem = this.servicioLista.getIngredientById(id);
				this.myForm.setValue(
					{
						name: this.editItem.name,
						amount: this.editItem.amount
					}
				);
			}
		);*/
	}

	/*solución trabajando solamente con ElementRef (no formularios)*/
	/*onAddIngredient(amountInput: HTMLInputElement) {
		const iname = this.ingredientName.nativeElement.value;
		const iamount = parseInt(amountInput.value, 10);
		const myIngredient: Ingredient = new Ingredient(iname, iamount);
		this.servicioLista.addIngredient(myIngredient);
		this.ingredientName.nativeElement.value = '';
		amountInput.value = '';

	}*/

	/*otra aproximación sin usar viewchild y pasando el formulario en la llamada al submit*/
	/*onAdd(formulario: NgForm) {
		const myIngredient: Ingredient = new Ingredient(formulario.value.name, +formulario.value.amount);
		this.servicioLista.addIngredient(myIngredient);
		formulario.reset(); //para inicializar el form
	}*/

	onSubmitIngredient() {
		//console.log(this.myForm.value);
		const myIngredient = new Ingredient(this.myForm.value.name, this.myForm.value.amount);
		if (this.editMode) {
			//this.servicioLista.updateIngredientById(this.editItemIndex, myIngredient);
			this.store.dispatch(new ShoppingListActions.UpdateIngredient(myIngredient));
		} else {
			//this.servicioLista.addIngredient(myIngredient); ahora lo haremos con ngrx
			this.store.dispatch(new ShoppingListActions.AddIngredient(myIngredient));
		}
		this.onResetForm();
	}

	onResetForm() {
		//this.myForm.reset({ amount: 1 }); //si quiero poner un valor por defecto en el campo amount
		this.myForm.reset();
		this.store.dispatch(new ShoppingListActions.StopEdit());
		this.editMode = false;
		this.ingredientName.nativeElement.focus();
	}

	onDelete() {
		//this.servicioLista.deleteIngredient(this.editItemIndex);
		this.store.dispatch(new ShoppingListActions.DeleteIngredient());
		this.onResetForm();
	}

	ngOnDestroy() {
		this.store.dispatch(new ShoppingListActions.StopEdit());
		this.subscription.unsubscribe();
	}

}
