import { Starship } from './starship.model';

export interface People {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  gender: string;
  birth_year: string;
  starships: Starship[]
}
