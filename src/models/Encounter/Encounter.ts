import { EncounterDTO } from "./EncounterDTO";

export class EncounterState {
  constructor(
    public name: string,
    public description: string,
    public creatures: string[],
    public items: string[]
  ) {}

  public static empty(): EncounterState {
    return new EncounterState("", "", [], []);
  }

  public static from(encounter: EncounterDTO | Encounter): EncounterState {
    return new EncounterState(
      encounter.name,
      encounter.description,
      encounter.creatures,
      encounter.items
    );
  }
}

export class Encounter {
  constructor(
    public name: string,
    public description: string,
    public creatures: string[],
    public items: string[],
    public id: string
  ) {}

  public static from(items: EncounterDTO[]) {
    return items.map(
      (e) => new Encounter(e.name, e.description, e.creatures, e.items, e.id)
    );
  }
}
