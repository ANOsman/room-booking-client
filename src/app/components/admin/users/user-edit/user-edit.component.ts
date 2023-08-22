import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';
import { FormResetService } from 'src/app/services/form-reset.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {


  user!: User;
  userForm!: FormGroup;
  resetEventSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private dataService: DataService,
                private formBuilder: FormBuilder, private formResetService: FormResetService) {

    this.userForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        id: ['', Validators.required]

      }
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.user = this.dataService.user(+params['user_id'])!;
    });
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    )
  }

  ngOnDestroy(): void {
      this.resetEventSubscription.unsubscribe();
  }

  initializeForm() {
    if(this.user?.id == null) {
      this.userForm = this.formBuilder.group(
        {
          name: [''],
          id: ['']
        }
      );
    }
    else {
      this.userForm = this.formBuilder.group(
        {
          name: [this.user.name],
          id: [this.user.id]
        }
      );
    }
  }

}
