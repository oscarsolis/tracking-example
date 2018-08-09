export class Point {

  public _id?: string;
  public location: Location;
  public createdAt: string;

  constructor() {
    this.location = new Location();
    this.createdAt = '';
  }

}

/**
 *
 */
export class Location {
  public type?: string;
  public coordinates: Array<number>;
  constructor() { }
}
