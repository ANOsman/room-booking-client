import { Data } from "@angular/router";
import { DataService } from "../services/data.service";
import { Room, Layout } from "./room";
import { User } from "./user";

export class Booking {
  id!: number;
  room!: Room;
  user!: User;
  layout!: Layout;
  title!: string;
  date!: string;
  startTime!: string;
  endTime!: string;
  participants!: number;

  getDateAsDate() {
    return new Date(this.date);
  }

  static fromJson(booking: Booking) {
    const newBooking = new Booking();
    newBooking.id = booking?.id;
   /*  newBooking.room = Room.fromJson(booking?.room);
    newBooking.user = User.fromJson(booking?.user); */
    newBooking.layout = booking?.layout;
    newBooking.title = booking?.title;
    newBooking.date = booking?.date;
    newBooking.startTime = booking?.startTime;
    newBooking.endTime = booking?.endTime;
    newBooking.participants = booking?.participants;
    return newBooking
}
}

export interface Bookings {
  _embedded: {
    bookings: [
      {
        id: number,
        room: Room,
        user: User,
        title: string,
        layout: Layout,
        date: string,
        startTime: string,
        endTime: string,
        participants: number
      }
    ]
  }
}
