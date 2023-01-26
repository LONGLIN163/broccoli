import { Injectable } from '@angular/core';

//@Injectable({providedIn: 'root'})
export class LoggingService {
    lastlog:string;
    constructor() { }

    printLog(message:string){
      console.log("current---",message)
      console.log("last---",this.lastlog)
      this.lastlog=message
    }
    
}