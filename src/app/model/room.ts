export class Room {
  id: number | undefined;
  name: string | undefined;
  location: string | undefined;
  layoutCapacity = new Array<LayoutCapacity>();

}

export class LayoutCapacity {
  layout: Layout | undefined
  capacity: number | undefined
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}