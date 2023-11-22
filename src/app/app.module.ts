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
import { EditBookingComponent } from './components/calendar/edit-booking/edit-booking.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';
import { roomResolver, roomsResolver } from './components/admin/rooms/rooms-resolver';
import { RoomCreateComponent } from './components/admin/rooms/room-create/room-create.component';
import { usersResolver } from './components/admin/users.resolver';
import { UserCreateComponent } from './components/admin/users/user-create/user-create.component';


const routes: Routes = [
  { path: 'admin/users', component: UsersComponent,
    children: [
      { path: 'view/:user_id', component: UserDetailComponent },
      { path: 'edit/:user_id', component: UserEditComponent },
      { path: 'add', component: UserCreateComponent }
    ]
  },
  { path: 'admin/rooms', component: RoomsComponent,
    resolve: {
      rooms: roomsResolver
    },
    children: [
      { path: 'add', component: RoomCreateComponent },
      { path: 'view/:room_id', component: RoomDetailComponent },
      { 
        path: 'edit/:room_id',
        component: RoomEditComponent
      }
    ]
  },
  { path: '', component: CalendarComponent },
  { path: 'editBooking', component: EditBookingComponent, resolve: { rooms: roomsResolver, users: usersResolver } },
  { path: 'addBooking', component: EditBookingComponent, resolve: { users: usersResolver, rooms: roomsResolver } },
  { path: '404', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
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
    RoomCreateComponent,
    UserCreateComponent,
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
