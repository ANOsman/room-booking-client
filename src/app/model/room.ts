export class Room {
  id!: number;
  name!: string;
  location!: string;
  layoutCapacities = new Array<LayoutCapacity>();

  static fromJson(o: Room) {
    const newRoom = new Room();
    newRoom.id = o.id;
    newRoom.name = o.name;
    newRoom.location = o.location;
    newRoom.layoutCapacities = new Array<LayoutCapacity>();
    for(const lc of o.layoutCapacities) {
      newRoom.layoutCapacities.push(LayoutCapacity.fromJson(lc));
    }
    return newRoom;
  }
}

export class LayoutCapacity {
  capacity!: number;
  layout!: Layout;

  static fromJson(lc: LayoutCapacity) {
    const layoutCap = new LayoutCapacity();
    layoutCap.capacity = lc.capacity;
    layoutCap.layout = lc.layout;
    return layoutCap;
  }
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}

export interface Rooms {
  _embedded: {
    rooms: [
    {
      id: number,
      name: string,
      location: string,
      layoutCapacities: [
      {
        capacity: number,
        layout: Layout,
      }]
    }]
    
  }
}