import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
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

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
                private router: Router) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5)]]
      }
    )
  }

  save() {
    this.user.name = this.userForm.value['name'];
    this.password = this.userForm.value['password'];
    this.dataService.addUser(this.user).subscribe(
      next => {
        this.router.navigateByUrl('/admin/users/view/' + next.id)
      }
    );
  }
}
