import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

message = '';
loginForm = new FormGroup({
  username: new FormControl('', [ Validators.required, Validators.min(3)]),
  password: new FormControl('', [ Validators.required, Validators.min(6)])
})

constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.authResultEvent.subscribe(result => {
      if(result) {
        const url = this.activatedRoute.snapshot.queryParams['requested'];
        this.router.navigateByUrl(url);
      } else {
        this.message = 'Your username or password was not recognized - try again.';
      }
    })
  }



get username() { return this.loginForm.controls.username }

get password () { return this.loginForm.controls.password }

onSubmit() { 
 this.authService.authenticate(this.username.value!, this.password.value!)
}

}
