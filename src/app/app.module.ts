import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UsersComponent } from './components/admin/users/users.component';
import { RoomsComponent } from './components/admin/rooms/rooms.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RoomDetailComponent } from './components/admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './components/admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './components/admin/users/user-edit/user-edit.component';
import { RoomEditComponent } from './components/admin/rooms/room-edit/room-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomNewComponent } from './components/admin/rooms/room-new/room-new.component';
import { UserNewComponent } from './components/admin/users/user-new/user-new.component';
import { EditBookingComponent } from './components/calendar/edit-booking/edit-booking.component';
import { HttpClientModule } from '@angular/common/http'
import { PrefetchRoomsService } from './services/prefetch-rooms.service';
import { PrefetchUsersService } from './services/prefetch-users.service';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';


const routes: Routes = [
  { path: 'admin/users', component: UsersComponent, canActivate: [RouteGuardService],
    children: [
      { path: 'view/:user_id', component: UserDetailComponent, canActivate: [RouteGuardService] },
      { path: 'edit/:user_id', component: UserEditComponent, canActivate: [RouteGuardService], },
      { path: 'add', component: UserNewComponent, canActivate: [RouteGuardService], }
    ]
  },
  { path: 'admin/rooms', component: RoomsComponent, canActivate: [RouteGuardService],
    children: [
      { path: 'add', component: RoomNewComponent },
      { path: 'view/:room_id', component: RoomDetailComponent },
      { path: 'edit/:room_id', component: RoomEditComponent}

    ]
  },
  { path: '', component: CalendarComponent},
  { path: 'editBooking/:booking_id', component: EditBookingComponent,  resolve: {rooms: PrefetchRoomsService, users: PrefetchUsersService}},
  { path: 'addBooking', component: EditBookingComponent, resolve: {rooms: PrefetchRoomsService, users: PrefetchUsersService}},
  { path: '404', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/404' }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    UsersComponent,
    RoomsComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    RoomNewComponent,
    UserNewComponent,
    EditBookingComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
