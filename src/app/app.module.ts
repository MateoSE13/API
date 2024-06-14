import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApodComponent } from './apod/apod.component';
import { RoverComponent } from './mars-rover/rover.component';
import { AppHeaderComponent } from './header.component';
import { ApodDetailComponent } from './apod/apod-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageDetailComponent } from './image-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ApodComponent,
    ApodDetailComponent,
    RoverComponent,
    ImageDetailComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
