import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/model/room';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  rooms!: Array<Room>;
  room = new Room();
  loadingData = true;
  message = 'Please wait... getting the list of rooms'
  reloadAttempts = 0;

  constructor(private dataService: DataService,
          private formResetService: FormResetService, private router: Router,
          private dataChangeService: DataChangeService) {}

  
  loadData() {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
        this.loadingData = false;
      }, (error) => {
        this.reloadAttempts++;
        if(this.reloadAttempts <= 0) {
          this.loadData();
        }
        else {
          this.message = 'Sorry - something went wrong, please contact support'
        }
      }
    );
  }
  ngOnInit(): void {
   this.loadData();
   this.dataChangeService.roomDataChangedEvent.subscribe(next => {
    this.loadData();
   })
  }

  addRoom() {
    this.formResetService.resetRoomFormEvent.emit(new Room());
    this.router.navigateByUrl('/admin/rooms/edit');
  }
}
