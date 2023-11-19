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

  bookings: Booking[] = new Array<Booking>();
  message = '';
  dataLoaded = false;
  selectedDate: string | undefined;
  isAdminUser = true;

  constructor(private dataService: DataService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.message = 'Loading data...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
        }
        this.dataService.getBookingsByDate(this.selectedDate).subscribe(
          next => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          }
        );
      }
    );
  }

  deleteBooking(id: number) {
    const result = confirm('Are you sure you want to delete this booking?')
    if(result) {
      this.dataService.deleteBooking(id).subscribe(() => {
        this.loadData();
      })
    }
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id}})
  }
  addBooking() {
    //throw new Error('Method not implemented.');
  }
 
  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}}) 
  }

}
