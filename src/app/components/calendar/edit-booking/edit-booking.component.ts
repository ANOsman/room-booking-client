import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

  booking!: Booking;
  users!: User[];
  rooms!: Room[];
  layouts = Object.values(Layout);
  dataLoaded = false;
  usersLoaded = false;
  roomsLoaded = false;
  message = 'Loading data... please wait.'

  constructor(private dataService: DataService, private route: ActivatedRoute,
                private router: Router) {}

  ngOnInit(): void {
    this.rooms = this.route.snapshot.data['rooms']
    this.users = this.route.snapshot.data['users']

    this.loadData()
  }

  loadData(){
    /*  this.dataService.getRooms().subscribe( 
      resp =>{ 
        this.rooms = resp
      });

    this.dataService.getUsers().subscribe(
      resp => {
        this.users = resp
      }); 
 */
    this.route.params.subscribe((params: Params) => {
      const id = +params['booking_id'];
      if(id) {
        this.dataService.getBooking(id).subscribe(
          next => {
          this.booking = next
          this.dataLoaded = true
          this.message = ''
        }, error => {
          this.message = 'Sorry, something went wrong'
        })
      }
      else {
        this.booking = new Booking();
        this.dataLoaded = true;
        this.message = ''
      }
    });

  }

  saveBooking() {
    if(this.booking.id == null) {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate(['/'])
      );
    }
    else {
      this.dataService.updateBooking(this.booking).subscribe(
        next => this.router.navigate(['/'])
      );
    } 
    console.log("Saved booking: ",this.booking);
  }

} 

/* export class EditBookingComponent implements OnInit {

  booking!: Booking;
  rooms!: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users!: Array<User>;

  dataLoaded = false;
  message = 'Please wait...';

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.rooms = this.route.snapshot.data['rooms'];
    this.users = this.route.snapshot.data['users'];

    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.dataService.getBooking(+id)
        .pipe(
          map(booking => {
            booking.room = this.rooms.find (room => room.id === booking.room.id)!;
            booking.user = this.users.find (user => user.id === booking.user.id)!;
            return booking;
          })
        )
        .subscribe(
        next => {
          this.booking = next;
          this.dataLoaded = true;
          this.message = '';
        }
      );
    } else {
      this.booking = new Booking();
      this.dataLoaded = true;
      this.message = '';
    }
  }

  onSubmit() {
    if (this.booking.id != null) {
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate(['']),
        error => this.message = 'something went wrong : the booking wasn\'t saved.'
      );
    } else {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate(['']),
        error => this.message = 'something went wrong : the booking wasn\'t saved.'
      );
    }
  }

} */