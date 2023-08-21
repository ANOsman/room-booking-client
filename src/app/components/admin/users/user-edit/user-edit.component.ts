import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user!: User;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.user = this.dataService.user(params['user_id'])!;
    });
  }

}
