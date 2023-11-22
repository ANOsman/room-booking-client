import { HttpClient } from "@angular/common/http"
import { DataService } from "./data.service"
import { Observable, of } from "rxjs"
import { user, users } from "./users.mock"
import { User } from "../model/user"
import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class StubDataService extends DataService {

    constructor() {
        super({} as HttpClient)
    }

    override getUsers(): Observable<User[]> {
        return of(users);
    }

    override getUser(id: number): Observable<User> {
        return of(user)
    }

    override addUser(user: User, password: string): Observable<any> {
        return of([...users, user])
    }

    override updateUser(user: User): Observable<User> {
        return of(user);
    }
}