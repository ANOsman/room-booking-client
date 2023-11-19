import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { User } from "src/app/model/user";
import { DataService } from "src/app/services/data.service";

export const usersResolver: ResolveFn<User[]> = ( ) => {
    const dataService = inject(DataService);
    return dataService.getUsers();
}