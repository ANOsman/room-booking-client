import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Layout, LayoutCapacity, Room } from 'src/app/model/room';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit{

  newRoom: Room = new Room();
  layouts = Object.values(Layout);
  roomForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    layoutCapacity: new FormArray<FormControl<number>>([])
  })

  constructor(
    private dataService: DataService, 
    private dataChangeService: DataChangeService,
    private router: Router) { 

  }

  ngOnInit(): void {
    this.layouts.forEach(() => {
      this.roomForm.controls.layoutCapacity.push(new FormControl(0, {nonNullable: true}))
    })
  }

  createRoom() {
    this.newRoom.name = this.roomForm.get('name')?.value!;
    this.newRoom.location = this.roomForm.get('location')?.value!;
    let index = 0;
    this.roomForm.controls.layoutCapacity.controls.forEach(control => {
      const lc = new LayoutCapacity();
      lc.layout = this.layouts[index];
      lc.capacity = control.value;
      this.newRoom.layoutCapacity.push(lc);
      index++;
    })
    this.dataService.addRoom(this.newRoom).subscribe((data) => {
      this.dataChangeService.roomDataChanged.emit();
      this.router.navigate(['admin', 'rooms', 'view', data.id])
    });
  }

}
