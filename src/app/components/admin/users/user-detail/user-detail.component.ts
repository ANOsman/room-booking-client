import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;
  message!: string;

  constructor(private route: ActivatedRoute, private dataService: DataService,
              private router: Router, private dataChange: DataChangeService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.dataService.getUser(+params['user_id']).subscribe(data => {
        this.user = data;
      });
    });
  }

  deleteUser(id:number) {
    this.dataService.deleteUser(id).subscribe(
      _resp => this.dataChange.userDataChangedEvent.emit(), 
      _error => this.message = 'Sorry - this user can\'t deleted at this time.');
      this.router.navigate(['/admin', 'users']);
  }
}
