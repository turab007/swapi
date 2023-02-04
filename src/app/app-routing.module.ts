import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'planet',
    pathMatch: 'full'
  },
  {
    path: 'planet',
    component: PlanetComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
