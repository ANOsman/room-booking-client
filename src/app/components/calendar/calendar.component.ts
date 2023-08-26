import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate!: string;
  bookings!: Booking[];


  constructor(private dataService: DataService, private router: Router,
                private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.dataService.getUser(1).subscribe(
      data => {
        console.log(data);
        console.log(typeof data);
      }
    );

    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if(!this.selectedDate)
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
        this.dataService.getBookings(this.selectedDate).subscribe(resp =>
          this.bookings = resp);
      }
    );


  }


  dateChanged() {
    console.log(this.selectedDate);
    this.router.navigate([''], {queryParams: {date: this.selectedDate}});
  }

  deleteBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe( next =>
      this.router.navigate(['']));
  }

}
