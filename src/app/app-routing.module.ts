import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApodComponent } from './apod/apod.component';
import { ApodDetailComponent } from './apod/apod-detail.component';
import { RoverComponent } from './mars-rover/rover.component';
import { ImageDetailComponent } from './image-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/apod', pathMatch: 'full' },
  { path: 'apod', component: ApodComponent, children: [
    { path: ':id', component: ApodDetailComponent, children: [
      // TODO: Route improvement for duplicate id param
      { path: ':id/full', component: ImageDetailComponent },
    ] }
  ] },
  { path: 'mars-rover', component: RoverComponent, children: [
    { path: ':id/full', component: ImageDetailComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
