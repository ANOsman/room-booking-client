import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from '../model/room';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { Booking } from '../model/booking';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms!: Array<Room>;
  users: Array<User> = new Array<User>();
  bookings!: Array<Booking>;

  constructor() {

    console.log(environment.restUrl);
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

    const user1 = new User();
    const user2 = new User();

    user1.name = 'Susan';
    user1.id = 1;

    user2.name = 'Matt';
    user2.id = 2;

    this.users.push(user1);
    this.users.push(user2);

    // Create and add bookings
    this.bookings = new Array<Booking>();

    const booking1 = new Booking();
    booking1.id = 1;
    booking1.title = 'example meetng';
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
    booking1.layout = Layout.THEATER;
    booking1.participants = 12;
    booking1.room = room1;
    booking1.user = user1;

    const booking2 = new Booking();
    booking2.id = 2;
    booking2.title = 'another meetng';
    booking2.startTime = '14:00';
    booking2.endTime = '15:00';
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
    booking2.layout = Layout.USHAPE;
    booking2.participants = 5;
    booking2.room = room2;
    booking2.user = user2;

    this.bookings.push(booking1);
    this.bookings.push(booking2);

   }

   room(id: number) {
      return this.rooms.find(r => {
        return r.id === +id;
      })
   }

   user(id: number) {
    return this.users.find(u => {
      return u.id === id;
    })
   }

   getUsers() : Observable<User[]>{
    return of(this.users);
   }

   getRooms() : Observable<Room[]> {
    return of(this.rooms);
   }

   updateRoom(room: Room) : Observable<Room> {
    const originalRoom = this.rooms.find ( r => r.id === room.id);
    if(originalRoom !== undefined) {
      originalRoom.name = room.name;
      originalRoom.location = room.location;
      originalRoom.layoutCapacities = room.layoutCapacities;
      return of(originalRoom)
    }
    return of(new Room());
  }

  addRoom(newRoom: Room) : Observable<Room> {
    let id = 0;
    for(const room of this.rooms) {
      if(room.id > id)
        id = room.id;
    }
    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

  deleteUser(id: number) : Observable<any> {
    const user = this.users.find(u => u.id === id);
    if(user)
      this.users.splice(this.users.indexOf(user),1);
    return of(null);
  }

  deleteRoom(id: number) : Observable<any> {
    const room = this.rooms.find(r => r.id === id);
    if(room)
      this.rooms.splice(this.rooms.indexOf(room), 1);
    return of(null);
  }

  resetUserPassword(id: number) {
    return of(null);
  }

  addUser(newUser: User) : Observable<User> {
    let id = 0;
    for(const user of this.users) {
      if(user.id > id)
        id = user.id;
    }
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser);
  }

  updateUser(user: User) : Observable<User> {
    const originalUser = this.users.find(u => u.id === user.id);
    if(originalUser !== undefined) {
      originalUser.name = user.name;
      return of(originalUser);
    }
    return of(new User());
  }

  getBookings(date: string) : Observable<Booking[]> {
    return of(this.bookings.filter(b => b.date === date));
  }

  getBooking(id: number) : Observable<Booking> {
    const booking = this.bookings.find(b => b.id === id);
    if(booking !== undefined)
      return of(booking);
    return of(new Booking());
  }

  saveBooking(booking: Booking) : Observable<Booking> {
    const originalBooking = this.bookings.find(b => b.id === booking.id);
    if(originalBooking !== undefined) {
      originalBooking.id = booking.id;
      originalBooking.title = booking.title;
      originalBooking.startTime = booking.startTime;
      originalBooking.endTime = booking.endTime;
      originalBooking.date = booking.date;
      originalBooking.layout = booking.layout;
      originalBooking.user = booking.user;
      originalBooking.room = booking.room;
      originalBooking.participants = booking.participants;
      return of(originalBooking);
    }
    return of(new Booking());
  }

  addBooking(newBooking: Booking) : Observable<Booking> {

    let id = 0;
    for(let booking of this.bookings) {
      if(booking.id > id)
        id = booking.id;
    }
    newBooking.id = id + 1;
    this.bookings.push(newBooking);
    return of(newBooking);
  }

  deleteBooking(id: number) : Observable<any> {
    const booking = this.bookings.find(b => b.id === id);
    if(booking !== undefined) {
      this.bookings.splice(this.bookings.indexOf(booking), 1)
      return of(null);
    }
    return of(null);
  }

}
