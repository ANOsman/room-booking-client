import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  rooms!: Array<Room>;
  room = new Room();

  constructor(private dataService: DataService,
          private formResetService: FormResetService) {}

  ngOnInit(): void {
    this.rooms = this.dataService.rooms
  }

  addRoom(room: Room) {
    this.formResetService.resetRoomFormEvent.emit(room);
  }
}
