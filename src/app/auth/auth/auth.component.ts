import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

message: any;

constructor(private authService: AuthService) { }

loginForm = new FormGroup({
  username: new FormControl('', [ Validators.required, Validators.min(3)]),
  password: new FormControl('', [ Validators.required, Validators.min(6)])
})

get username() { return this.loginForm.controls.username }

get password () { return this.loginForm.controls.password }

onSubmit() { 
  this.authService.authenticate(this.username.value!, this.password.value!)
}

}
