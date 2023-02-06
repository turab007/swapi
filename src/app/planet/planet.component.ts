import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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


  vehicles: any;
  displayedColumns: string[] = ['name', 'population', 'terrain', 'residents', 'climate'];

  dataSource: any;
  planet: Planet[] = [];
  planetObject!: PlanetObj;
  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() loading_data: EventEmitter<boolean> = new EventEmitter()

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchQuery) => this.swapiService.searchPlanet(searchQuery))
      )
      .subscribe((results) => {
        this.loading_data.emit(false);
        this.planetObject = results;
      });

      this.loading_data.emit(true);
    let page = 1;
    this.swapiService.getPlanets(page).subscribe(res => {
      this.loading_data.emit(false);
      this.planetObject = res;
    })

  }


  applyFilter(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.loading_data.emit(true);
    this.searchSubject.next(searchQuery?.trim());
  }

}
