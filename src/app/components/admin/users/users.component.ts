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

  users: User[] = [];
  user = new User();

  constructor(private dataService: DataService, private formResetService: FormResetService) {
  }

  ngOnInit(): void {
    this.users = this.dataService.users;
  }

  addUser(user: User) {
    this.formResetService.resetUserFormEvent.emit(user);
  }

}
