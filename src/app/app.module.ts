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


const routes: Routes = [
  { path: 'admin/users', component: UsersComponent,
    children: [
      { path: 'view/:user_id', component: UserDetailComponent },
      { path: 'edit/:user_id', component: UserEditComponent },
      { path: 'add', component: UserNewComponent }
    ]
  },
  { path: 'admin/rooms', component: RoomsComponent,
    children: [
      { path: 'add', component: RoomNewComponent },
      { path: 'view/:room_id', component: RoomDetailComponent },
      { path: 'edit/:room_id', component: RoomEditComponent }

    ]
  },
  { path: '', component: CalendarComponent},
  { path: 'editBooking/:booking_id', component: EditBookingComponent},
  { path: 'addBooking', component: EditBookingComponent},
  { path: '404', component: PageNotFoundComponent },
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
    EditBookingComponent
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
