import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Layout, LayoutCapacity, Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  room!: Room;
  layoutsVal = Object.values(Layout);
  layouts: Layout[]  = [];
  roomForm!: FormGroup;
  layoutCapacities!: LayoutCapacity[];
temp: any;

  constructor(private dataService: DataService, private route: ActivatedRoute,
                private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.room = this.dataService.room(+params['room_id'])!;
    });

    this.roomForm = this.formBuilder.group(
    {
        roomName: [this.room.name],
        location: [this.room.location],
        layoutCapacities: [this.room.layoutCapacities]
    });

  for (const lay of this.layoutsVal) {
    const layoutCapacity = this.room.layoutCapacities.find ( lc => lc.layout === lay as Layout)!;
    //const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
    if(layoutCapacity) 
      this.layouts.push(layoutCapacity.layout);
      this.roomForm.addControl(`layout${layoutCapacity?.layout}`, this.formBuilder.control(layoutCapacity?.capacity));
    }
  }

}

