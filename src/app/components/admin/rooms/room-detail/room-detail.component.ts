import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Layout, Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  room!: Room;
  layoutValues: any = Object.values(Layout);

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private router: Router)
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
    this.dataService.deleteRoom(id);
    this.router.navigate(['/admin', 'rooms']);
  }
}
