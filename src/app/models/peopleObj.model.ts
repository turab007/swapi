import { People } from './people.model';

export interface PeopleObj {
  count: number;
  next: string;
  results: People[];
}
