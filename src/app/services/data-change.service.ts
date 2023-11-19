import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataChangeService {

  userDataChanged = new EventEmitter<any>();
  roomDataChanged = new EventEmitter<any>();

  constructor(){ }
  
}
