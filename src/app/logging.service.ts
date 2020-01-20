//import { Injectable } from '@angular/core';
//servicio de pruebas para verificar ámbito de los servicios. VIDEO 335
//@Injectable()
export class LoggingService {
	lastLog: string = 'init';

	printLastLog(message: string) {
		console.log(this.lastLog);
		console.log(message);
		this.lastLog = message;	
	}
	constructor() { }
}
