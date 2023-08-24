import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
          private formResetService: FormResetService, private router: Router) {}

  ngOnInit(): void {
    this.rooms = this.dataService.rooms
    //this.addRoom();
  }

  addRoom() {
    this.formResetService.resetRoomFormEvent.emit(new Room());
    this.router.navigateByUrl('/admin/rooms/edit');
  }
}
