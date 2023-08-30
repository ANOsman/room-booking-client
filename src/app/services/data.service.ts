import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room, Rooms } from '../model/room';
import { User, Users } from '../model/user';
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

   getRoom(id: number) : Observable<Room> {
    return this.http.get<Room>(environment.restUrl + '/rooms/' + id)
    .pipe(map(data => {
      return Room.fromJson(data)
    }));
   }

   getUsers() : Observable<User[]>{
    return this.http.get<Users>(environment.restUrl + '/users').pipe(map (data=>{
      const users = new Array<User>();
      for(let user of data._embedded.users) {
        users.push(User.fromJson(user));
      }
      return users;
    }))
   }

   getRooms() : Observable<Room[]> {
    return this.http.get<Rooms>(environment.restUrl + '/rooms')
    .pipe(map(data => {
      const rooms = new Array<Room>();
      for(const room of data._embedded.rooms) {
        rooms.push(Room.fromJson(room));
      }
      return rooms;
    }))

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
    return this.http.put<User>(environment.restUrl + `/users/${user.id}`, user)
    .pipe(map(data => {
      return User.fromJson(data)
    }));
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
     return this.http.get<User>(environment.restUrl + '/users/' + id)
     .pipe( map( data => {
      return User.fromJson(data)
     }));
  }

}
