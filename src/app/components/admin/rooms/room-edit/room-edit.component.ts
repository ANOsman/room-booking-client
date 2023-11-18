import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Layout, LayoutCapacity, Room } from 'src/app/model/room';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

    room: Room = new Room()
    roomForm: FormGroup;
    constructor(private dataService: DataService, private route: ActivatedRoute,
      private formBuilder: FormBuilder, private dataChangeService: DataChangeService,
      private router: Router) {
        this.roomForm = this.formBuilder.group({
          name: [''],
          location: [''],
          layout: this.formBuilder.group({
            theater: [''],
            uShape: [''],
            board: ['']
          }),
        });
      
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = Number(params['room_id']);
        this.dataService.getRoom(id).subscribe(data => {
          this.room!.name = data.name
          this.room!.location = data.location
        })
        this.dataService.getLayoutCapacityFor(id).subscribe(data => {
          this.room.layoutCapacity = new Array<LayoutCapacity>()
          data.forEach((lc: LayoutCapacity) => {;
            this.room.layoutCapacity.push(lc)
          })
          this.roomForm.setValue({
            name: this.room.name,
            location: this.room.location,
            layout: {
              theater: this.room.layoutCapacity[0].capacity,
              uShape: this.room.layoutCapacity[1].capacity,
              board: this.room.layoutCapacity[2].capacity,
            }
          
          })
        })
      })
    }
}



