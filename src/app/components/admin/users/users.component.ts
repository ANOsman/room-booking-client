import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { User } from 'src/app/model/user';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  message = 'Loading data - please wait'
  loadingData = true;

  constructor(private dataService: DataService,
               private dataChangeService: DataChangeService) {
  }

  ngOnInit(): void {
   this.loadData();
   this.dataChangeService.userDataChanged.subscribe( () => {
    this.loadData();
   })
  }

  loadData() {
    this.dataService.getUsers().subscribe(
      next => {
        this.users = next.map(user => this.dataService.convertToUser(user))
        this.loadingData = false;
        console.log('this.users = ', this.users)
      }
    );
  }

}
