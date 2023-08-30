import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  user = new User();
  message = 'Loading data - please wait'
  loadingData = true;

  constructor(private dataService: DataService, private formResetService: FormResetService) {
  }

  ngOnInit(): void {
   this.loadData();
   this.formResetService.dataChangedEvent.subscribe( next => {
    this.loadData();
   })
  }

  loadData() {
    this.dataService.getUsers().subscribe(
      next => {
        this.users = next;
        this.loadingData = false;
      },
      error => {
        this.message = 'An error occured - please contact support!'
      }
    );
  }

  loadAgain(dataChanged: boolean) {
      this.loadData();
      console.log("Running load data")
  }

  addUser(user: User) {
    this.formResetService.resetUserFormEvent.emit(user);
  }

}
