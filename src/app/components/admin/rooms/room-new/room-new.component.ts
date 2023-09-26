import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Layout, LayoutCapacity, Room } from 'src/app/model/room';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-room-new',
  templateUrl: './room-new.component.html',
  styleUrls: ['./room-new.component.css']
})
export class RoomNewComponent implements OnInit {

  room = new Room();
  roomForm!: FormGroup;
  layouts = Object.values(Layout);
  message!: string;

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
            private router: Router, private dataChangedService: DataChangeService) {
    this.roomForm = this.formBuilder.group(
      {
          name: ['', [Validators.required, Validators.minLength(5)]],
          location: ['', [Validators.required, Validators.minLength(5)]]
      });
    for (const layout of this.layouts)
      this.roomForm.addControl(`${layout}`, this.formBuilder.control(0));
  }

  ngOnInit(): void {

  }

  get roomName() {
    return  this.roomForm.get('roomName');
  }

  get location() {
    return this.roomForm.get('location');
  }

  saveRoom() {
    this.message = 'Saving...'
    this.room.name = this.roomForm.get('name')?.value;
    this.room.location = this.roomForm.get('location')?.value;
    this.room.layoutCapacities = new Array<LayoutCapacity>();

    const layout1 = new LayoutCapacity();
    /* let indexOfTheater = Object.values(Layout).indexOf('Theater' as unknown as Layout);
    const key = Object.keys(Layout)[indexOfTheater];
    layout1.layout = key as Layout; */
    layout1.capacity = this.roomForm.get('Theater')?.value;
    for(let member in Layout) {
      if(member === Layout.THEATER)
        layout1.layout = member;
    }

    this.room.layoutCapacities.push(layout1);

    let layout2 = new LayoutCapacity();
    /* let indexUShape = Object.values(Layout).indexOf('U-Shape' as unknown as Layout);
    const key2 = Object.keys(Layout)[indexUShape];
    layout2.layout = key2 as Layout; */
    layout2.capacity = this.roomForm.get('U-Shape')?.value;
    for(let member in Layout) {
      if(member === Layout.USHAPE)
        layout2.layout = member;
    }
    // layout2.layout = 'USHAPE' as Layout
  
    this.room.layoutCapacities.push(layout2);

    const layout3 = new LayoutCapacity();
    /* let indexBoard = Object.values(Layout).indexOf('Board Meeting' as unknown as Layout);
    const key3 = Object.keys(Layout)[indexBoard];
    layout3.layout = key3 as Layout; */
    layout3.capacity = this.roomForm.get('Board Meeting')?.value;
    for(let member in Layout) {
      if(member === Layout.BOARD)
        layout3.layout = member;
    }
    this.room.layoutCapacities.push(layout3);

    this.dataService.addRoom(this.room).subscribe(
      next => {
        this.dataChangedService.roomDataChangedEvent.emit();
        this.router.navigateByUrl(`/admin/rooms/view/${next.id}`)
      },
      error => {
        this.message = 'Sorry, something went wrong and the data wasn\'t saved. You may want to try again.'
      }
    ); 
  }
}
