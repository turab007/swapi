import { Planet } from './planet.model';

export interface PlanetObj {
  count: number;
  next: string;
  results: Planet[];
}
