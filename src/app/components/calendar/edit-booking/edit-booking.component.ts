import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
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

  bookingForm: FormGroup | undefined;
  booking: Booking = new Booking();
  users!: User[];
  rooms!: Room[];
  layouts = Object.values(Layout);
  dataLoaded = false;
  usersLoaded = false;
  roomsLoaded = false;
  message = 'Loading data... please wait.'

  constructor(private dataService: DataService, private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {
    this.loadData()
    this.rooms = this.route.snapshot.data['rooms']
    this.users = this.route.snapshot.data['users']
    // this.dataService.getRooms().subscribe(data => this.rooms = data);
    // this.dataService.getUsers().subscribe(data => this.users = data);
    
    console.log('this.rooms = ', this.rooms);
    console.log('this.users = ', this.users);
    console.log('this.booking = ', this.booking);
  }

  loadData() {

    const id = this.route.snapshot.queryParams['id'];
      console.log('id = ', id);
      if(id) {
        this.dataService.getBooking(id).subscribe(
          next => {
            
          this.booking = next
          this.dataLoaded = true
          this.message = ''
          console.log('this.booking = ', this.booking)
        })
      }
      else {
        this.booking = new Booking();
        this.dataLoaded = true;
        this.message = ''
      }
  }
  // onSubmmit() {
  //   if (this.booking.id != null) {
  //     this.dataService.saveBooking(this.booking).subscribe(
  //       next => this.router.navigate(['']),
  //       error => this.message = 'something went wrong : the booking wasn\'t saved.'
  //     );
  //   } else {
  //     this.dataService.addBooking(this.booking).subscribe(
  //       next => this.router.navigate(['']),
  //       error => this.message = 'something went wrong : the booking wasn\'t saved.'
  //     );
  //   }
  // }

  saveBooking() {
    console.log('new booking = ', this.booking);
    if(this.booking.id == null) {
      console.log('adding a booking');
      this.dataService.addBooking(this.booking)
    }
    else {
      console.log('updating a booking')
      this.dataService.updateBooking(this.booking);
    }
  }

} 