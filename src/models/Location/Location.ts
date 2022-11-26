import { LocationDTO } from "./LocationDTO";

export class LocationState {
  constructor(
    public name: string,
    public image: string,
    public description: string,
    public creatureIds: string[]
  ) {}

  public static empty(): LocationState {
    return new LocationState("", "", "", []);
  }

  public static from(location: LocationDTO | Location): LocationState {
    return new LocationState(
      location.name,
      location.image,
      location.description,
      location.creatureIds
    );
  }
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
