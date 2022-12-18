import { Location, LocationDTO } from '@/models';

export interface AdventureMapDTO {
  cells: AdventureCellDTO[],
  id: string;
}


export interface AdventureCellDTO {
  location: LocationDTO;
  description: string;
  neighbours: string[];
  encounterThreshold: number;
  encounters: string[];
  id: string;
}
