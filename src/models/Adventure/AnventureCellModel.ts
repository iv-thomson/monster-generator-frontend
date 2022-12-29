import { Location } from '@/models/location/location';

export interface AdventureCellInterface {
  location: Location | null;
  description: string;
  neighbours: string[];
  encounterThreshold: number;
  encounters: string[];
  id: string;
}
