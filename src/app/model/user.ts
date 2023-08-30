export class User {
  id!: number;
  name!: string;

  constructor() {
  }

  static fromJson(o:User) : User {
    let user = new User();
    user.id = o.id;
    user.name = o.name;
    return user;
  }
}

export interface Users {
  _embedded: {
    users: User[];
  }
}
