import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanetObj  } from './models/planetObj.model';

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

  getPeople() {
    return this.http.get(`${this.base_url}/people/`);
  }

  getPlanets(): Observable<PlanetObj> {
    return this.http.get<PlanetObj>(`${this.base_url}/planets/`);
  }

}
