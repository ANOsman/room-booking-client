import { Data } from "@angular/router";
import { DataService } from "../services/data.service";
import { Room, Layout } from "./room";
import { User } from "./user";

export class Booking {
  id!: number;
  room!: Room;
  user!: User;
  title!: string;
  date!: string;
  startTime!: string;
  endTime!: string;
  participants!: number;
  layout!: Layout

  getDateAsDate() {
    return new Date(this.date);
  }

}
