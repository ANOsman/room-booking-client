import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from '../model/room';
import { User } from '../model/user';
import { Observable, map, of } from 'rxjs';
import { Booking } from '../model/booking';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

   }


   user(id: number) {
    return new User();
   }

   room(id: number) {
    return new Room();
   }

   getUsers() : Observable<User[]>{
    return of(new Array<User>());
   }

   getRooms() : Observable<Room[]> {
    return of(new Array<Room>());
   }

   updateRoom(room: Room) : Observable<Room> {
    return of(new Room());
  }

  addRoom(newRoom: Room) : Observable<Room> {

    return of(newRoom);
  }

  deleteUser(id: number) : Observable<any> {

    return of(null);
  }

  deleteRoom(id: number) : Observable<any> {

    return of(null);
  }

  resetUserPassword(id: number) {
    return of(null);
  }

  addUser(newUser: User) : Observable<User> {

    return of(newUser);
  }

  updateUser(user: User) : Observable<User> {

    return of(new User());
  }

  getBookings(date: string) : Observable<Booking[]> {
    return of(new Array<Booking>());
  }

  getBooking(id: number) : Observable<Booking> {

    return of(new Booking());
  }

  saveBooking(booking: Booking) : Observable<Booking> {
    return of(new Booking());
  }

  addBooking(newBooking: Booking) : Observable<Booking> {
    return of(new Booking());
  }

  deleteBooking(id: number) : Observable<any> {
    return of(null);
  }

  getUser(id: number) : Observable<User> {
     return this.http.get<User>(environment.restUrl + '/data-api/users/' + id)
     .pipe( map( data => {
      return User.fromJson(data)
     }));
  }

}
