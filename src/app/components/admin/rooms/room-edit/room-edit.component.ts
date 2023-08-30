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
    roomForm!: FormGroup;
    
    constructor(private dataService: DataService, private route: ActivatedRoute,
      private formBuilder: FormBuilder) {
        this.roomForm = this.formBuilder.group(
          {
              roomName: [''],
              location: [''],
              theaterCapacity: [''],
              uShapeCapacity: [''],
              boardCapacity: ['']
          });
      
    }

    ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.dataService.getRoom(+params['room_id']).subscribe(data => {
          this.room = data;
          this.initForm();
        });
      });
    }

    initForm() {
      if(this.room) {
        this.roomForm.get('roomName')?.setValue(this.room.name);
        this.roomForm.get('location')?.setValue(this.room.location);
        this.roomForm.get('theaterCapacity')?.setValue(this.room.layoutCapacities[0].capacity);
        this.roomForm.get('uShapeCapacity')?.setValue(this.room.layoutCapacities[1].capacity);
        this.roomForm.get('boardCapacity')?.setValue(this.room.layoutCapacities[2].capacity);

      }
    }

    onSubmit() {
      
    }

 
}



