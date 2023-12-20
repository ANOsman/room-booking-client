import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtToken = '';
  authResultEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private dataService: DataService) { }

  authenticate(name: string, password: string) {
    this.dataService.authenticateUser(name, password).subscribe(
      next => {
        if(next) {
          this.jwtToken = next.result;
          this.authResultEvent.emit(true);
          console.log('token = ', this.jwtToken)
          console.log('next = ', next);
        } else {
          this.authResultEvent.emit(false);
        }
        
      }
    )
  }

  logout() {
    this.jwtToken = '';
  }

  get isLoggedIn() { return this.jwtToken !== ''; };

}
