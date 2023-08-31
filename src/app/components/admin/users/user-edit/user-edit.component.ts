import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { DataChangeService } from 'src/app/services/data-change.service';
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
  message!: string

  @Output()
  dataChangedEvent = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private dataService: DataService,
                private formBuilder: FormBuilder, private router: Router, 
                private dataChangeService: DataChangeService) {
        
                  this.userForm = this.formBuilder.group(
                    {
                      name: ['', Validators.required],
                      id: ['', Validators.required]
              
                    }
                  )

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['user_id']) {
        this.dataService.getUser(+params['user_id']).subscribe(data => {
          this.user = data;
          this.userForm.setValue(data);
      });
    }
    });


  }

  updateUser() {
    this.message = 'Saving...'
    this.user.name = this.userForm.get('name')?.value;
   
    this.dataService.updateUser(this.user).subscribe(
      next => {
        this.dataChangeService.userDataChangedEvent.emit(this.user);
        this.router.navigateByUrl(`/admin/users/view/${this.user.id}`)
      }, error => {
        this.message = 'Something went wrong and the data wasn\'t saved. You may want to try again.'
      }
    );
  }
}

