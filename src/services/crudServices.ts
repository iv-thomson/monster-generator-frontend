import { Creature, Location, Encounter } from '@/models';
import { CRUDService } from './CRUDService';

export const encounterService = new CRUDService('encounter', Encounter.from);
export const creatureService = new CRUDService('creature', Creature.from);
export const locationService = new CRUDService('location', Location.from);
