import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { Room } from 'src/app/model/room';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  user: User | undefined;
  room: Room = new Room();
  rooms: Room[] | undefined

  constructor(private dataService: DataService, private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

}
