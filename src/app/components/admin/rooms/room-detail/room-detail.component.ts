import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Layout, Room } from 'src/app/model/room';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  room!: Room;
  layoutValues: any = Object.values(Layout);
  message!: string

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private router: Router, private dataChangeService: DataChangeService)
  {}

  ngOnInit(): void {
     this.route.params.subscribe((params: Params) => {
      this.dataService.getRoom(+params['room_id']).subscribe(r => {
        this.room = r;
        for(let lc of this.room.layoutCapacities) {
          this.layoutValues.push(lc.layout);
        }
      });
        
    })
  }

  deleteRoom(id: number) {
    const result = confirm('Are you sure you want to delete this room?')
    if(result) {
      this.dataService.deleteRoom(id).subscribe( 
        next => {
          this.dataChangeService.roomDataChangedEvent.emit();
      },
        error => {
          this.message = 'Sorry - this room cannot be deleted at this time.'
        }
      );
      this.router.navigate(['/admin', 'rooms']);
     }
  }
}
