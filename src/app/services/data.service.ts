import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from '../model/room';
import { User } from '../model/user';
import { Observable, map, of } from 'rxjs';
import { Booking } from '../model/booking';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  authenticateUser(name: string, password: string): Observable<{result: string}> {
    const authData = btoa(`${name}:${password}`);
    const options = { headers: new HttpHeaders({Authorization: `Basic ${authData}`}) }
    return this.http.get<{result: string}>(environment.restUrl + "/basicAuth/validate", options);
  }
  
  getBookingsByDate(date: string): Observable<Booking[]> {
    return this.http.get<any>(`${environment.restUrl}/bookings/search/getBookingsByDate?date=${date}`)
            .pipe(map(data => data._embedded.bookings.map((booking: Booking) => this.convertToBooking(booking))))
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${environment.restUrl}/bookings/${id}`).pipe(
      map(data => this.convertToBooking(data))
    );
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.restUrl}/bookings/${id}`);
  }

  updateBooking(booking: Booking): Observable<any> {
    return this.http.put<Booking>(`${environment.restUrl}/bookings/${booking.id}`, booking).pipe(
      map(data => this.convertToBooking(data))
    );
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${environment.restUrl}/bookings`, booking).pipe(
      map(data => this.convertToBooking(data))
    );
  }

  getRoomForBooking(id: number): Observable<Room> {
    return this.http.get<Room>(`${environment.restUrl}/bookings/${id}/room`).pipe(
      map(data => this.convertToRoom(data))
    );
  }

  getUserWithBooking(id: number): Observable<User> {
    return this.http.get<User>(`${environment.restUrl}/bookings/${id}/user`).pipe(
      map(data => this.convertToUser(data))
    )
  }

  addUser(user: User, password: string): Observable<any> {
    return this.http.post<User>(`${environment.restUrl}/customUsers`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.restUrl}/customUsers/${user.id}`, user)
    // .pipe(
    //   map(data => this.convertToUser(data))
    // )
  }

 getUsers(): Observable<User[]> {
  return this.http.get<any>(`${environment.restUrl}/customUsers`)
  // .pipe(
  //   map(data => data._embedded.customUsers.map((u: any) => this.convertToUser(u)))
  // )
 }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.restUrl}/customUsers/${id}`)
    // .pipe(
    //   map(data => this.convertToUser(data))
    // )
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.restUrl}/customUsers/${id}`);
  }

  addRoom(newRoom: Room): Observable<any> {
    return this.http.post<User>(`${environment.restUrl}/rooms`, newRoom)
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${environment.restUrl}/rooms/${room.id}`, room);
  }

  getRoom(id: number): Observable<any> {
    return this.http.get<any>(`${environment.restUrl}/rooms/${id}`).pipe(
      map(data => this.convertToRoom(data)))
  }
  
  getRooms(): Observable<Room[]> {
    return this.http.get<any>(`${environment.restUrl}/rooms`).pipe(
      map((data) => data._embedded.rooms.map((room: Room) => this.convertToRoom(room))))
  }

  deleteRoom(id: number) : Observable<any> {
    return this.http.delete<any>(`${environment.restUrl}/rooms/${id}`);
  }
 
  getLayoutCapacityFor(id: number): Observable<LayoutCapacity[]> {
    return this.http.get<any>(`${environment.restUrl}/rooms/${id}/layoutCapacity`).pipe(
      map((data) => data._embedded.layoutCapacities.map((lc: LayoutCapacity) => this.convertToLayoutCapacity(lc))) 
    )
  }

  convertToBooking(booking: Booking): Booking {
    const newBooking = new Booking();
    newBooking.id = booking.id;
    newBooking.title = booking.title;
    newBooking.date = booking.date;
    newBooking.startTime = booking.startTime;
    newBooking.endTime = booking.endTime;
    newBooking.participants = booking.participants;
    newBooking.room = booking.room;
    newBooking.user = booking.user;
    newBooking.layout = booking.layout;
    return newBooking;
  }

  convertToUser(user: User): User {
    return {
      id: user.id,
      name: user.name,
      password: user.password
    }
  }

  convertToLayoutCapacity(lc: LayoutCapacity): LayoutCapacity {
    return {
      layout: lc.layout,
      capacity: lc.capacity
    }
  }

  convertToRoom(room: Room) {
    return {
      id: room.id,
      name: room.name,
      location: room.location,
      layoutCapacity: room.layoutCapacity
    }
  }   
}
