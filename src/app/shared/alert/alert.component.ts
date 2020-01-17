import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor() { }
  @Input() message: string;
  @Output() close: EventEmitter<void> = new EventEmitter();

  onClose(){
    this.close.emit(null);
  }


}
