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

  constructor(private http: HttpClient) { }
  
  getBookings(): Observable<any> {
    return of(null);
  }

  getBooking(id: number): Observable<any> {
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {
    return of(null);
  }

  updateBooking(booking: Booking): Observable<any> {
    return of(null);
  }

  addBooking(booking: Booking): Observable<any> {
    return of(null);
  }

  addUser(user: User, password: string): Observable<any> {
    return of(null);
  }

  addRoom(room: Room): Observable<any> {
    return of(null);
  }

 getUsers(): Observable<User[]> {
  return this.http.get<any>(`${environment.restUrl}/users`).pipe(
    map(data => data._embedded.users.map((u: User) => this.convertToUser(u)))
  )
 }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.restUrl}/users/${id}`).pipe(
      map(data => this.convertToUser(data))
    )
  }

  getRoom(id: number): Observable<any> {
    return this.http.get<any>(`${environment.restUrl}/rooms/${id}`).pipe(
      map(data => this.convertToRoom(data)))
  }
  
  getRooms(): Observable<Room[]> {
    return this.http.get<any>(`${environment.restUrl}/rooms`).pipe(
      map(data => data._embedded.rooms.map((room: Room) => this.convertToRoom(room))))
  }

  deleteRoom(id: number) : Observable<any> {
    return this.http.delete(`${environment.restUrl}/rooms/${id}`);
  }
 
  getLayoutCapacityFor(id: number): Observable<LayoutCapacity[]> {
    return this.http.get<any>(`${environment.restUrl}/rooms/${id}/capacities`).pipe(
      map((data) => data._embedded.layoutCapacities.map((lc: LayoutCapacity) => this.convertToLayoutCapacity(lc))) 
    )
  }

  updateRoom(room: Room): Observable<any> {
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  updateUser(user: User): Observable<any> {
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    return of(null);
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
      location: room.location
    }
  }   
}
