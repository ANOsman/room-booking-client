import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { LayoutCapacity, Room } from 'src/app/model/room';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  rooms$: Observable<Array<Room>> | undefined;
  room$: Observable<Room> | undefined;
  rooms: Room[] | undefined
  loadingData = true;
  message = 'Please wait... getting the list of rooms'
  reloadAttempts = 0;

  constructor(private dataService: DataService,
          private formResetService: FormResetService, private router: Router,
          private dataChangeService: DataChangeService,
          private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.room$ = this.dataService.getRoom(1);
    this.loadRooms();
    this.dataChangeService.roomDataChanged.subscribe(() => this.loadRooms());
  }
  
  loadRooms() {
    this.dataService.getRooms().subscribe(data => {
      this.rooms = data;
    })
  }

  addRoom() {
    this.formResetService.resetRoomFormEvent.emit();
    this.router.navigateByUrl('/admin/rooms/edit');
  }
}
