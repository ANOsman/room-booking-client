import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from '../model/room';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms!: Array<Room>;
  users: Array<User> = new Array<User>();

  constructor() {
    this.rooms = new Array<Room>();

    // Room 1
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'Firs Room';
    room1.location = 'First Floor';

    const layoutCapacity1 = new LayoutCapacity();
    layoutCapacity1.capacity = 50;
    layoutCapacity1.layout = Layout.THEATER;

    const layoutCapacity2 = new LayoutCapacity();
    layoutCapacity2.capacity = 20;
    layoutCapacity2.layout = Layout.BOARD;

    room1.layoutCapacities.push(layoutCapacity1)
    room1.layoutCapacities.push(layoutCapacity2);

    // Room 2
    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor'

    const layoutCapacity3 = new LayoutCapacity();
    layoutCapacity3.capacity = 60;
    layoutCapacity3.layout = Layout.THEATER;

    room2.layoutCapacities!.push(layoutCapacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);

    const user1 = new User(1, 'Susan');
    const user2 = new User(2, 'Matt');

    this.users.push(user1);
    this.users.push(user2);

   }

   room(id: number) {
      return this.rooms.find(r => {
        return r.id === +id;
      })
   }

   user(id: number) {
    return this.users.find(u => {
      return u.id === +id;
    })
   }
}
