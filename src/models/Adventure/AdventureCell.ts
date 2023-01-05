import { Location } from '@/models/location/location';

import { AdventureCellDTO } from './AdventureCellDTO';
import { AdventureCellInterface } from './AnventureCellModel';

export class AdventureCellState implements AdventureCellInterface {
  constructor(
    public location: Location | null = null,
    public description: string,
    public neighbours: string[],
    public encounterThreshold: number = 0,
    public encounters: string[] = [],
    public id: string = Date.now().toString(16) +
      Math.random().toString(16).slice(8)
  ) {}

  public clone(): AdventureCellState {
    return new AdventureCellState(
      this.location,
      this.description,
      this.neighbours,
      this.encounterThreshold,
      this.encounters,
      this.id
    );
  }

  public updateNeighbours(neighbours: string[]): AdventureCellState {
    return new AdventureCellState(
      this.location,
      this.description,
      neighbours,
      this.encounterThreshold,
      this.encounters,
      this.id
    );
  }

  public static empty(): AdventureCellState {
    return new AdventureCellState(null, '', [], 0, []);
  }

  public static from(
    adventureCell: AdventureCellDTO | AdventureCell
  ): AdventureCellState {
    return new AdventureCellState(
      adventureCell.location,
      adventureCell.description,
      adventureCell.neighbours,
      adventureCell.encounterThreshold,
      adventureCell.encounters,
      adventureCell.id
    );
  }
}

export class AdventureCell {
  constructor(
    public location: Location,
    public description: string,
    public neighbours: string[],
    public encounterThreshold: number,
    public encounters: string[],
    public id: string
  ) {}

  public addEncounter(encoutnerId: string): AdventureCell {
    return new AdventureCell(
      this.location,
      this.description,
      this.neighbours,
      this.encounterThreshold,
      this.encounters.concat(encoutnerId),
      this.id
    );
  }

  public removeEncounter(encoutnerId: string): AdventureCell {
    return new AdventureCell(
      this.location,
      this.description,
      this.neighbours,
      this.encounterThreshold,
      this.encounters.filter((encounter) => encounter !== encoutnerId),
      this.id
    );
  }

  public static from(cells: AdventureCellDTO[]) {
    return cells.map(
      (c) =>
        new AdventureCell(
          Location.from([c.location])[0],
          c.description,
          c.neighbours,
          c.encounterThreshold,
          c.encounters,
          c.id
        )
    );
  }
}
