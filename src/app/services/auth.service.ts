import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() { }

  authenticate(name: string, password: string) {
    if(name === 'matt' && password === 'secret'){
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}
