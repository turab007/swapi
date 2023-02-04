import { Component, OnInit, ViewChild } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Starship } from '../models/starship.model';
import { StarshipObj } from '../models/starshipObj.model';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.css']
})
export class StarshipComponent implements OnInit {

  constructor(private swapiService: SwapiService) {
  }
  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.swapiService.searchStarships(searchQuery))
      )
      .subscribe((results) => {
        this.starshipObject = results;
      });

      let page = 1;
      this.swapiService.getStarships(page).subscribe(res => {
        this.starshipObject = res;
        console.log('res', this.starship);
        page++;
      })
  }

  vehicles: any;
  displayedColumns: string[] = ['name', 'model', 'manufacturer', 'length', 'passengers'];

  dataSource: any;
  starship: Starship[] = [];
  starshipObject!: StarshipObj;
  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  applyFilter(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());

  }

}
