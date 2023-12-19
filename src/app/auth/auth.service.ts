import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtToken = '';

  constructor(private http: HttpClient, private dataService: DataService) { }

  authenticate(name: string, password: string) {
    this.dataService.login(name, password).subscribe(
      next => {
        this.jwtToken = next.result;
        console.log('token = ', this.jwtToken)
      }
    )
  }

  logout() {
    this.jwtToken = '';
  }

  get isLoggedIn() { return this.jwtToken !== ''; };

}
