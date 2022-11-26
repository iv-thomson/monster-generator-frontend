import { LocationDTO } from './LocationDTO';

export class LocationState {
  constructor(
    public name: string,
    public image: string,
    public description: string,
    public creatureIds: string[]
  ) {}
}

export class Location {
  constructor(
    public name: string,
    public image: string,
    public description: string,
    public creatureIds: string[],
    public id: string
  ) {}

  public static from(items: LocationDTO[]) {
    return items.map(
      (l) => new Location(l.name, l.image, l.description, l.creatureIds, l.id)
    );
  }
}
