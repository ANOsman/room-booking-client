import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { Layout, Room } from 'src/app/model/room';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking!: Booking;
  users!: User[];
  rooms!: Room[];
  layouts = Object.values(Layout);

  constructor(private dataService: DataService, private route: ActivatedRoute,
                private router: Router) {}

  ngOnInit(): void {

    this.dataService.getRooms().subscribe( resp => this.rooms = resp);

    this.dataService.getUsers().subscribe(resp => this.users = resp);

    this.route.params.subscribe((params: Params) => {
      const id = +params['booking_id'];
      if(id) {
        this.dataService.getBooking(id).subscribe(b =>
          this.booking = b);
      }
      else
        this.booking = new Booking();
    });

  }

  save() {
    if(this.booking.id != null) {
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }
    else {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }
    console.log(this.booking);
  }

}
