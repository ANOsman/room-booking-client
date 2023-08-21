export class User {
  id!: number;
  name!: string;

  constructor(private initialId: number, private initialName: string) {
    this.id = initialId;
    this.name = initialName;
  }
}
