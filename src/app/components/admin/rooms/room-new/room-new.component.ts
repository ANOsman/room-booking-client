import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Layout, LayoutCapacity, Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-room-new',
  templateUrl: './room-new.component.html',
  styleUrls: ['./room-new.component.css']
})
export class RoomNewComponent implements OnInit {

  room = new Room();
  roomForm!: FormGroup;
  layoutsVal = Object.values(Layout);
  roomNameMessage!: string;

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
            private router: Router) {
    this.roomForm = this.formBuilder.group(
      {
          roomName: ['', [Validators.required, Validators.minLength(5)]],
          location: ['', [Validators.required, Validators.minLength(3)]]
      });
    for (const layout of this.layoutsVal)
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(0));
  }

  ngOnInit(): void {

  }

  get roomName() {
    return  this.roomForm.get('roomName');
  }

  get location() {
    return this.roomForm.get('location');
  }

  save() {
    this.room.name = this.roomForm.value['roomName'];
    this.room.location = this.roomForm.value['location'];
    this.room.layoutCapacities = new Array<LayoutCapacity>();

    for(let layout of this.layoutsVal) {
      const capacity = this.roomForm.value[`layout${layout}`];
      const lay = layout as Layout;
      const layoutCapacity = new LayoutCapacity();
      if(capacity !== 0) {
        layoutCapacity.capacity = capacity;
        layoutCapacity.layout = lay;
        this.room.layoutCapacities.push(layoutCapacity);
      }
    }

    this.dataService.addRoom(this.room).subscribe(
      next => {
        this.router.navigateByUrl(`/admin/rooms/view/${next.id}`)
      }
    );
  }
}
