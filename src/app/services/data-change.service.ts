import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataChangeService {

  userDataChangedEvent = new EventEmitter<any>();
  roomDataChangedEvent = new EventEmitter<any>();

  constructor(){}
}
