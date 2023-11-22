import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { user, users } from './users.mock';
import { Layout, LayoutCapacity, Room } from '../model/room';

describe('DataService: Users', () => {

  let service: DataService;
  let http: HttpTestingController;
  const usersUrl = 'http://localhost:8080/data-api/customUsers'
  const roomsUrl = 'http://localhost:8080/data-api/rooms'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService ]
    });
    service = TestBed.inject(DataService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUser should load a single user', (done) => {
    service.getUser(1).subscribe(u => {
      expect(u).toEqual(user);
      done();
    })

    const request = http.expectOne(usersUrl + '/1')
    request.flush(user);
  })


  it('getUsers should return a list of users', (done) => {
    service.getUsers().subscribe(result => {
      expect(result).toEqual(users);
      done();
    });
    
    const req = http.expectOne(usersUrl);
    expect(req.request.method).toBe('GET')
    req.flush(users);
  });

  it('updateUser: should change user', (done: DoneFn) => {
    const updatedUser = user
    updatedUser.name = 'Osman';
    service.updateUser(updatedUser).subscribe(result => {
      expect(result).toEqual(updatedUser);
      done();
    });

    const req = http.expectOne(usersUrl + '/' + updatedUser.id)
    expect(req.request.method).toBe('PUT')
    req.flush(updatedUser);
  })

  it('addUser should increase list of users', (done) => {
    const newUser =  {name: 'Jama', password: '2345', id: 4};
    const myUsers = [...users, newUser ]
    service.addUser(user, user.password).subscribe(result => {
      expect(result.length).toEqual(myUsers.length);
      done();
    })
    
    const req = http.expectOne(usersUrl);
    expect(req.request.method).toBe('POST');
    req.flush(myUsers)
  })
  
  it('getRooms should return a list of rooms', (done) => {
    service.getRooms().subscribe();
    done();
    const request = http.expectOne(roomsUrl);
    expect(request.request.method).toEqual('GET')
  })

  it('should add a new room', () => {
    const lc = new LayoutCapacity();
    lc.layout = Layout.THEATER;
    lc.capacity = 10;
    const newRoom = {id: 10, name: 'Basement', location: 'Third floor west', layoutCapacity: [lc]}
    service.addRoom(newRoom).subscribe();

    const req = http.expectOne(roomsUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newRoom);
  });

  it('updateRoom should perform a put request', () => {
    const room = new Room();
    room.id = 10;
    service.updateRoom(room).subscribe();

    const req = http.expectOne(roomsUrl + '/' + room.id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(room);
  })


});


