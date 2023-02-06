import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { People } from '../models/people.model';
import { PeopleObj } from '../models/peopleObj.model';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(private swapiService: SwapiService) {
  }

  vehicles: any;
  displayedColumns: string[] = ['name', 'height', 'mass', 'birth_year', 'gender', 'starships'];

  dataSource: any;
  people: People[] = [];
  peopleObject!: PeopleObj;
  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;
  @Output() loading_data: EventEmitter<boolean> = new EventEmitter()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.swapiService.searchPeople(searchQuery))
      )
      .subscribe((results) => {
        this.loading_data.emit(false)
        this.peopleObject = results;
      });

    this.loading_data.emit(true);
    let page = 1;
    this.swapiService.getPeople(page).subscribe(res => {
      this.loading_data.emit(false);
      this.peopleObject = res;
    })
  }



  applyFilter(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.loading_data.emit(true);
    this.searchSubject.next(searchQuery?.trim());

  }

}
