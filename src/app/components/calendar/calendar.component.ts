import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { Room } from 'src/app/model/room';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  room!: Room
  selectedDate!: string;
  bookings!: Booking[];
  dataLoaded = false;
  message = ''

  constructor(private dataService: DataService, private router: Router,
                private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

    this.message = 'Loading data...'
    
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if(!this.selectedDate)
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
        this.dataService.getBookings(this.selectedDate).subscribe( data =>{ 
          this.bookings = data
          this.dataLoaded = true
          this.message = ''
        });  
      }
    );
  }


  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}});
  }

  deleteBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe( 
      next =>{
        this.loadData();
        this.message = ''

    }, error =>{
        this.message = 'Sorry - there was a problem deleting the item.'
    });
  }
      //this.router.navigate(['']));

}
