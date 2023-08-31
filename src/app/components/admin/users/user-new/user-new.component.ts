import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { DataChangeService } from 'src/app/services/data-change.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

userForm!: FormGroup;
user = new User();
password!: string;
message!: string;

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
                private router: Router, private dataChangeService: DataChangeService) {
    this.userForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        password2: ['', [Validators.required, Validators.minLength(5)]]
      }
    )
  }

  ngOnInit(): void {
   
  }

  saveUser() {
    this.message = 'Saving...'
    this.user.name = this.userForm.value['name'];
    this.password = this.userForm.value['password'];
    this.dataService.addUser(this.user, this.password).subscribe(
      next => {
        this.dataChangeService.userDataChangedEvent.emit();
        this.router.navigateByUrl('/admin/users/view/' + next.id)
      },
      error => {
        this.message = 'Something went wrong and the data wasn\'t saved. You may want to try again.'
      }
    );
  }
}
