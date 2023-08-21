import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.users = this.dataService.users;
  }

}
