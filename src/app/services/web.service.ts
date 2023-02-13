import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebService {

  socket:any;
  readonly url:string  = "https://training-tool-backend-production.up.railway.app";
  constructor() {
    this.socket = io(this.url);
  }


  listen(eventName:string)
  {
    return new Observable((subscriber)=>{
        this.socket.on(eventName,(data)=>{
          subscriber.next(data);
        })
    });
  }

  emit(eventName:string,data:any)
  {
    this.socket.emit(eventName,data);
  }

}
