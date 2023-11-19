import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Room } from "src/app/model/room";
import { DataService } from "src/app/services/data.service";

export const roomsResolver: ResolveFn<Room[]> = () => {
    const dataService = inject(DataService);
    return dataService.getRooms();
}