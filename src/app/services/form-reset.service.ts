import { EventEmitter, Injectable } from '@angular/core';
import { Room } from '../model/room';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetRoomFormEvent = new EventEmitter<Room>();
  resetUserFormEvent = new EventEmitter<User>();

  constructor() { }
}
