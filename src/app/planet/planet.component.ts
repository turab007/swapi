import { Component, OnInit, ViewChild } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Planet } from '../models/planet.model';
import { PlanetObj } from '../models/planetObj.model';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  constructor(private swapiService: SwapiService) {
  }
  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.swapiService.searchPlanet(searchQuery))
      )
      .subscribe((results) => {
        this.planetObject = results;
      });

    do {

      let page = 1;
      this.swapiService.getPlanets(page).subscribe(res => {
        this.planetObject = res;
        console.log('res', this.planet);
        page++;
      })
    } while (this.planetObject && this.planetObject.next)
  }

  vehicles: any;
  displayedColumns: string[] = ['name', 'population', 'terrain', 'residents', 'climate'];

  dataSource: any;
  planet: Planet[] = [];
  planetObject!: PlanetObj;
  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  applyFilter(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  // listResidents(element: Planet) {
  //   let residents: string[] = []
  //    element.residents.forEach(resident => {
  //     this.swapiService.getSinglePeople(resident).subscribe(res => {
  //       residents.push(res.name);
  //     })
  //   });
  //  element.residents = residents;

  //   this.planetObject.results.forEach((planet, index) => {
  //     if (planet.name === element.name) {
  //       this.planetObject.results[index] = element;

  //     }
  //   })

  // }


}
