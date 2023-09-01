import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room, Rooms } from '../model/room';
import { User, Users } from '../model/user';
import { Observable, map, of } from 'rxjs';
import { Booking, Bookings } from '../model/booking';
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
    .pipe(map(data =>{
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
    return this.http.get<any>(environment.restUrl + '/rooms')
    .pipe(map(data => {
      const rooms = new Array<Room>();
      for(const room of data._embedded.rooms) {
        rooms.push(Room.fromJson(room));
      }
      return rooms;
      
    }))

   }

   updateRoom(room: Room) : Observable<Room> {
    return this.http.put<Room>(`${environment.restUrl}/rooms/${room.id}`, room)
    .pipe(map(data => {
      return Room.fromJson(data)
    }));
    }

  addRoom(newRoom: Room) : Observable<Room> {
    return this.http.post<Room>(`${environment.restUrl}/rooms`, newRoom)
    .pipe(map( data => {
      return Room.fromJson(data)
    }));
  }

  deleteUser(id: number) : Observable<any> {
    return this.http.delete<any>(`${environment.restUrl}/users/${id}`);
  }

  resetUserPassword(id: number) : Observable<any> {
    return this.http.get(`${environment.url}/users/resetPassword/${id}`);
  }

  deleteRoom(id: number) : Observable<any> {
    return this.http.delete(`${environment.restUrl}/rooms/${id}`);
  }

  addUser(newUser: User, password: string) : Observable<User> {
    const fullUser = {name: newUser.name, password: password}
    return this.http.post<User>(`${environment.restUrl}/users`, fullUser);
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User>(`${environment.restUrl}/users/${user.id}`, user)
    .pipe(map(data => {
      return User.fromJson(data)
    }));
  }

  getBookings(date: string) : Observable<Booking[]> {
    return this.http.get<any>(`${environment.url}/bookings/${date}`)
      .pipe(map( data => {
        const bookings = new Array<Booking>();
        for(const booking of data) {

        let fullBooking = Booking.fromJson(booking);
        this.getRoomWithBooking(booking.id).subscribe(data => fullBooking.room = data)
        this.getUserWithBooking(booking.id).subscribe(data => fullBooking.user = data);
          bookings.push(fullBooking)
        }
        return bookings;
      }))
  }

  getRoomWithBooking(id: number) : Observable<Room>{
    return this.http.get<Room>(`${environment.restUrl}/bookings/${id}/room`)
      .pipe(map(data =>{
        return Room.fromJson(data)
      }))
  }

  getUserWithBooking(id: number) : Observable<User> {
    return this.http.get<Room>(`${environment.restUrl}/bookings/${id}/user`)
    .pipe(map(data =>{
      return User.fromJson(data)
    }))
  }

  getBooking(id: number) : Observable<Booking> {
    return this.http.get<Booking>(`${environment.restUrl}/bookings/${id}`)
        .pipe(map( data => {
          const fullBooking = Booking.fromJson(data)
          this.getRoomWithBooking(data.id).subscribe(data => fullBooking.room = data);
          this.getUserWithBooking(data.id).subscribe(data => fullBooking.user = data);
          return fullBooking;
        }))
  }

  saveBooking(booking: Booking) : Observable<Booking> {
    return of(new Booking());
  }

  addBooking(newBooking: Booking) : Observable<Booking> {
    return of(new Booking());
  }

  deleteBooking(id: number) : Observable<any> {
    return this.http.delete(`${environment.restUrl}/bookings/${id}`);
  }

  getUser(id: number) : Observable<User> {
     return this.http.get<User>(environment.restUrl + '/users/' + id)
     .pipe( map( data =>{
      return User.fromJson(data)
     }));
  }
}
