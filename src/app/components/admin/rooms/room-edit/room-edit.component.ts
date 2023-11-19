import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

    room: Room = new Room();
    updatedRoom:Room = new Room();
    roomForm = new FormGroup({
      name: new FormControl(''),
      location: new FormControl(''),
      layoutCapacity: new FormArray<FormControl<number>>([])
    })
    
    constructor(private dataService: DataService, private route: ActivatedRoute,
      private formBuilder: FormBuilder, private dataChangeService: DataChangeService,
      private router: Router) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = Number(params['room_id']);

        this.dataService.getRoom(id).subscribe(data => {
          this.room = data;
          this.roomForm?.get('name')?.setValue(data.name);
          this.roomForm?.get('location')?.setValue(data.location);
          data.layoutCapacity.forEach((lc: LayoutCapacity) => {
            this.roomForm?.controls.layoutCapacity.push(new FormControl(lc.capacity!, {nonNullable: true}));
          })
        });
      })
    }

    editRoom() {
      this.room.name = this.roomForm.get('name')?.value!;
      this.room.location = this.roomForm.get('location')?.value!;
      let index = 0
      this.roomForm.controls.layoutCapacity.controls.forEach(control => {
        this.room.layoutCapacity[index].capacity = control.value;
        index++;
      })
      this.dataService.updateRoom(this.room).subscribe((data) => {
        this.dataChangeService.roomDataChanged.emit();
        this.router.navigate(['admin', 'rooms'])
      })
      console.log('this.room = ', this.room);
      
    }

}



