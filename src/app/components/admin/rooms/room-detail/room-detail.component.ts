import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  room?: Room;

  constructor(private dataService: DataService, private route: ActivatedRoute)
  {}

  ngOnInit(): void {
     this.route.params.subscribe((params: Params) => {
      this.room = this.dataService.room(params['room_id']);
    })
  }
}
