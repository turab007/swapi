import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeopleObj } from './models/peopleObj.model';
import { PlanetObj } from './models/planetObj.model';
import {Starship} from './models/starship.model';
import {StarshipObj} from './models/starshipObj.model';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  base_url = 'https://swapi.dev/api'

  constructor(
    private http: HttpClient) { }

  getVehicles() {
    return this.http.get(`${this.base_url}/vehicles/`);
  }

  getPeople(page: number): Observable<PeopleObj> {
    const params = new HttpParams({
      fromObject: {
        page: page,
      }
    });
    return this.http.get<PeopleObj>(`${this.base_url}/people/`, { params: params });
  }

  getPlanets(page: number): Observable<PlanetObj> {
    const params = new HttpParams({
      fromObject: {
        page: page,
      }
    });
    return this.http.get<PlanetObj>(`${this.base_url}/planets/`, { params: params });
  }

  getStarships(page: number): Observable<StarshipObj> {
    const params = new HttpParams({
      fromObject: {
        page: page,
      }
    });
    return this.http.get<StarshipObj>(`${this.base_url}/starships/`, { params: params });
  }

  searchStarships(searchKeyword: string): Observable<StarshipObj> {
    const params = new HttpParams({
      fromObject: {
        search: searchKeyword,
      }
    });
    return this.http.get<StarshipObj>(`${this.base_url}/starships/`, { params: params });
  }

  searchPlanet(searchKeyword: string): Observable<PlanetObj> {
    const params = new HttpParams({
      fromObject: {
        search: searchKeyword,
      }
    });
    return this.http.get<PlanetObj>(`${this.base_url}/planets/`, { params: params });


  }

  searchPeople(searchKeyword: string): Observable<PeopleObj> {
    const params = new HttpParams({
      fromObject: {
        search: searchKeyword,
      }
    });
    return this.http.get<PeopleObj>(`${this.base_url}/people/`, { params: params });


  }

}
