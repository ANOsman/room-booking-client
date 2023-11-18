import { inject } from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { LayoutCapacity, Room } from "src/app/model/room";
import { DataService } from "src/app/services/data.service";

export const roomsResolver: ResolveFn<Room[]> = () => {
    const dataService = inject(DataService);
    return dataService.getRooms()
}

export const roomResolver: ResolveFn<Room> = (route: ActivatedRouteSnapshot) => {
    const dataService = inject(DataService);
    return dataService.getRoom(Number(route.paramMap.get('room_id')))
}