import { Injectable } from '@angular/core';
import { Resolve, ResolveData } from '@angular/router';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Room } from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class PrefetchRoomsService implements Resolve<Observable<Array<Room>>> {

  constructor(private dataService: DataService){}

  resolve() {
    return this.dataService.getRooms();
  }
}
