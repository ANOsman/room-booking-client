import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{
[x: string]: any;

  rooms!: Array<Room>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.rooms = this.dataService.rooms
  }

}
