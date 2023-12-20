import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => this.handleAuthError(error)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if(error.status === 401 || error.status === 403) {
      this.router.navigate(['login'])
      console.log('Error = ', error.message);
      return of(error.message)
    } 
    return of(error);
    
  }
}
