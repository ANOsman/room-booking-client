import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Layout, LayoutCapacity, Room } from 'src/app/model/room';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  room: Room = new Room();
  layoutValues: any = Object.values(Layout);
  message!: string

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private router: Router, private dataChangeService: DataChangeService) { }

  ngOnInit(): void {
     this.route.params.subscribe((params: Params) => {
      this.dataService.getRoom(+params['room_id']).subscribe(rm => {
        this.room.id = rm.id;
        this.room.name = rm.name;
        this.room.location = rm.location
        this.room.layoutCapacity = rm.layoutCapacity
      });
    })
  }

  deleteRoom(id: number) {
    const result = confirm('Are you sure you want to delete this room?')
    if(result) {
      this.dataService.deleteRoom(id).subscribe( () => {
          this.dataChangeService.roomDataChanged.emit();
      })
      this.router.navigate(['/admin', 'rooms']);
     }
  }
}
