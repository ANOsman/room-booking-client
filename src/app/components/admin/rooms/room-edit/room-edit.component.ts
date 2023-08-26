import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Layout, LayoutCapacity, Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  room!: Room;
  layoutsVal = Object.values(Layout);
  roomForm!: FormGroup;

  constructor(private dataService: DataService, private route: ActivatedRoute,
                private formBuilder: FormBuilder, private router: Router,
                private formResetService: FormResetService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      //this.room = this.dataService.room(+params['room_id'])!;
    });
    this.initializeForm();
  }

  initializeForm() {
    if(this.room?.id == null) {
      this.roomForm = this.formBuilder.group(
        {
            roomName: [''],
            location: ['']
        });
      for (const layout of this.layoutsVal)
        this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(0));
    }
    else {
      this.roomForm = this.formBuilder.group(
        {
            roomName: [this.room.name],
            location: [this.room.location]
        });
      for (const layout of this.layoutsVal) {

        const layoutCapacity = this.room.layoutCapacities.find ( lc => lc.layout === layout as Layout)!;
        const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
        this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
        }
      }
  }

  onSubmit() {
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

    this.dataService.updateRoom(this.room).subscribe(
        next => {
            this.router.navigateByUrl('/admin/rooms/view/' + next.id)
          });
  }
}



