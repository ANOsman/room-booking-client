import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
deleteRoom(arg0: number) {
throw new Error('Method not implemented.');
}
deleteUser(arg0: number) {
throw new Error('Method not implemented.');
}
deleteUser(arg0: number) {
throw new Error('Method not implemented.');
}
deleteUser(arg0: number) {
throw new Error('Method not implemented.');
}

  @Input()
  room!: Room;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
