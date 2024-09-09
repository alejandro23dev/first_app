import { Injectable } from '@angular/core';
import { Server } from "socket.io";

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Server {

  constructor() {
	super({
		url:''
	})
   }
}
