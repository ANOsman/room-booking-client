import { DataService } from "../services/data.service";

export class Room {
  id!: number;
  name!: string;
  location!: string;
  layoutCapacities = new Array<LayoutCapacity>();
  static dataService: DataService;
  newRoom: any;

  constructor(){
  };

  // static fromJson(o: Room) {
  //   const newRoom = new Room();
  //   newRoom.id = o?.id;
  //   newRoom.name = o?.name;
  //   newRoom.location = o?.location;
  //   this.dataService.getRoomCapacities(o.id).subscribe(data => {
  //     for(const lc of data) {
  //       newRoom.layoutCapacities.push(LayoutCapacity.fromJson(lc));
  //     }
  //   })
    
  //   return newRoom;
  // }
}

export class LayoutCapacity {
  //id!: number;
  capacity!: number;
  layout!: Layout;

  // setLayout(lay: Layout) {
  //   this.layout = lay;
  // }

  static fromJson(lc: LayoutCapacity) {
    const layoutCap = new LayoutCapacity();
   //layoutCap.id = lc?.id;
    layoutCap.capacity = lc?.capacity;
    layoutCap.layout = lc?.layout;
    return layoutCap;
  }
}


export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting',
  member = "member"
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
        id: number,
        layout: Layout,
        capacity: number
      }]
    }]
    
  }
}