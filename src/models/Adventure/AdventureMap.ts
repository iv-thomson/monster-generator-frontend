import { Identifiable } from '../Identifiable';
import { AdventureCell, AdventureCellState } from './AdventureCell';
import { AdventureMapDTO } from './AdventureCellDTO';

export class AdventureMap implements Identifiable {
  constructor(public cells: AdventureCell[], public id: string) {}

  public static from(adventureMapDTOs: AdventureMapDTO[]): AdventureMap[] {
    return adventureMapDTOs.map(
      (item) => new AdventureMap(AdventureCell.from(item.cells), item.id)
    );
  }
}

export class AdventureMapState {
  constructor(public cells: AdventureCellState[]) {}

  public deleteCell(key: string): AdventureMapState {
    return new AdventureMapState(this.cells.filter((cell) => cell.id !== key));
  }

  public updateCell(cell: AdventureCellState): AdventureMapState {
    return new AdventureMapState(
      this.cells.map((existing) => this.getUpdatedCell(existing, cell))
    );
  }

  public addCell(cell: AdventureCellState): AdventureMapState {
    return new AdventureMapState(
      this.cells
        .map((existing) => this.getUpdatedCell(existing, cell))
        .concat(cell)
    );
  }

  private getUpdatedCell(
    existing: AdventureCellState,
    newCell: AdventureCellState
  ): AdventureCellState {
    if (existing.id === newCell.id) {
      return newCell;
    } else if (newCell.neighbours.includes(existing.id)) {
      const neighboursWithoutDuplicates = Array.from(new Set([...existing.neighbours, newCell.id]))
      return existing.updateNeighbours(neighboursWithoutDuplicates);
    } else {
      return existing;
    }
  }

  public static empty(): AdventureMapState {
    return new AdventureMapState([]);
  }

  public static from(
    adventureMap: AdventureMapDTO | AdventureMap
  ): AdventureMapState {
    return new AdventureMapState(
      adventureMap.cells.map((c) => AdventureCellState.from(c))
    );
  }
}
