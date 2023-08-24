import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {


  user!: User;
  userForm!: FormGroup;
  password!: string;

  constructor(private route: ActivatedRoute, private dataService: DataService,
                private formBuilder: FormBuilder, private router: Router) {


  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.user = this.dataService.user(+params['user_id'])!;
    });

    this.userForm = this.formBuilder.group(
      {
        name: [this.user.name, Validators.required],
        id: [this.user.id, Validators.required]

      }
    )

  }

  save() {
    this.user.name = this.userForm.value['name'];
    this.dataService.updateUser(this.user).subscribe(
      next => {
        this.router.navigateByUrl(`/admin/users/view/${next.id}`)
      }
    );
  }
}

