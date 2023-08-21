export class Room {
  id!: number;
  name!: string;
  location!: string;
  layoutCapacities: LayoutCapacity[] = [];
}

export class LayoutCapacity {
  capacity!: number;
  layout!: Layout;
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}
