import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetComponent } from './planet/planet.component';
import { MainComponent } from './main/main.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'planet',
    component: PlanetComponent,

  },
  {
    path: 'main',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
