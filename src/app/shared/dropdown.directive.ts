import { Directive, Renderer2, HostListener, ElementRef, HostBinding } from '@angular/core';


@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	clicked: boolean = false;
	//constructor(private elRef: ElementRef, private renderer: Renderer2) { }
	constructor() {}
	@HostBinding('class.open') isOpen: boolean = false;  // OTRA FORMA DE HACERLO CON HOSTBINDING si se devuelve true se aplica la clase, en caso contrario no se aplica.
	@HostListener('click') toggleOpen() {
		this.clicked = !this.clicked;
		this.isOpen = !this.isOpen;
		// OTRA FORMA DE HACERLO ->USANDO EL RENDERER: tengo que importarlo en el constructor (comentado)
		/*if (!this.clicked) {
			this.renderer.addClass(this.elRef.nativeElement, 'open');
		} else {
			this.renderer.removeClass(this.elRef.nativeElement, 'open');
		}*/
	} 
	 
	/*If you want that a dropdown can also be closed by a click anywhere outside (which also means that a click on one dropdown closes any other one, btw.), replace the code of dropdown.directive.ts by this one (placing the listener not on the dropdown, but on the document):

	import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
	 
	@Directive({
	  selector: '[appDropdown]'
	})
	export class DropdownDirective {
	  @HostBinding('class.open') isOpen = false;
	  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
		this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
	  }
	  constructor(private elRef: ElementRef) {}
	}*/

}
