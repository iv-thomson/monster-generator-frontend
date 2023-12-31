import { Encounter } from '../Encounter/Encounter';
import { Identifiable } from '../Identifiable';
import { AdventureCell, AdventureCellState } from './AdventureCell';
import { AdventureMapDTO } from './AdventureCellDTO';

export class AdventureMap implements Identifiable {
  constructor(
    public cells: AdventureCell[],
    public id: string,
    public name: string
  ) {}

  public addEncounterToCell(
    cellId: string,
    encounter: Encounter
  ): AdventureMap {
    return new AdventureMap(
      this.cells.map((cell) =>
        cell.id === cellId ? cell.addEncounter(encounter.id) : cell
      ),
      this.id,
      this.name
    );
  }

  public removeEncounterFromCell(
    cellId: string,
    encounterId: string
  ): AdventureMap {
    return new AdventureMap(
      this.cells.map((cell) =>
        cell.id === cellId ? cell.removeEncounter(encounterId) : cell
      ),
      this.id,
      this.name
    );
  }

  public static from(adventureMapDTOs: AdventureMapDTO[]): AdventureMap[] {
    return adventureMapDTOs.map(
      (item) => new AdventureMap(AdventureCell.from(item.cells), item.id, item.name),
    );
  }
}

export class AdventureMapState {
  constructor(public cells: AdventureCellState[], public name: string) {}

  public deleteCell(key: string): AdventureMapState {
    return new AdventureMapState(
      this.cells.filter((cell) => cell.id !== key),
      this.name
    );
  }

  public updateCell(cell: AdventureCellState): AdventureMapState {
    return new AdventureMapState(
      this.cells.map((existing) => this.getUpdatedCell(existing, cell)),
      this.name
    );
  }

  public addCell(cell: AdventureCellState): AdventureMapState {
    return new AdventureMapState(
      this.cells
        .map((existing) => this.getUpdatedCell(existing, cell))
        .concat(cell),
      this.name
    );
  }

  private getUpdatedCell(
    existing: AdventureCellState,
    newCell: AdventureCellState
  ): AdventureCellState {
    if (existing.id === newCell.id) {
      return newCell;
    } else if (newCell.neighbours.includes(existing.id)) {
      const neighboursWithoutDuplicates = Array.from(
        new Set([...existing.neighbours, newCell.id])
      );
      return existing.updateNeighbours(neighboursWithoutDuplicates);
    } else {
      return existing;
    }
  }

  public static empty(): AdventureMapState {
    return new AdventureMapState([], '');
  }

  public static from(
    adventureMap: AdventureMapDTO | AdventureMap
  ): AdventureMapState {
    return new AdventureMapState(
      adventureMap.cells.map((c) => AdventureCellState.from(c)),
      adventureMap.name
    );
  }
}
