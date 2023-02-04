import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.swapiService.getPlanets().subscribe(res=>{
      console.log(res);
    })
  }


}
