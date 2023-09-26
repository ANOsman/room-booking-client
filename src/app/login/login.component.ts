import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = ''
  userForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
      private router: Router, private activatedRoute: ActivatedRoute) {
    this.userForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if(this.auth.authenticate(this.userForm.get('username')?.value, 
            this.userForm.get('password')?.value)) {
        const url = this.activatedRoute.snapshot.queryParams['requested']
        this.router.navigateByUrl(url);
    }
    else
      this.message = 'Your username or password was not recognized. Try again.'
  }
}
