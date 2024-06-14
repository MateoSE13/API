import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { APOD } from './apod.interface';

// Properties to consider:
// - copyright
// - date
// - explanation
// - hdurl
// - title
// - url

@Component({
  selector: 'apod-browser',
  template: `
    <h2>Astronomy Picture of the Day | APOD</h2>
    <form class="filter-form" [formGroup]="dateFilter">
      <div class="form-group">
        <label for="apod-date-start">From: </label>
        <input type="date" class="filter-input" id="apod-date-start" formControlName="apodDateStart">
      </div>
      <div class="form-group">
        <label for="apod-date-end">To: </label>
        <input type="date" class="filter-input" id="apod-date-end" formControlName="apodDateEnd">
      </div>
      <div class="btn-group">
        <button class="btn" (click)="clearFilter()">Reset</button>
        <button type="submit" class="btn" [disabled]="!dateFilter.valid" (click)="onDateFilter()">Filter</button>
      </div>
    </form>
    <div class="apod-container" *ngIf="dataLoaded; else dataNotLoaded">
      <div class="apod-list">
        <div class="apod-card" *ngFor="let apod of apodData" [routerLink]="[apod.id]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <p class="apod-card-title">{{apod.id}} : {{apod.title}}</p>
          <p>{{apod.copyright ? apod.copyright : 'No Copyright Available'}}</p>
          <p>{{apod.date | date:'longDate' }}</p>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
    <ng-template #dataNotLoaded>
      <p class="loading-placeholder">Loading data...</p>
    </ng-template>
  `,
  styles: [`
  
  `]
})
export class ApodComponent implements OnInit {
  apodData?: APOD[];
  dataLoaded: boolean = false;
  dateFilter!: FormGroup;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    let today = new Date();
    // Initializing form
    this.dateFilter = new FormGroup({
      'apodDateStart': new FormControl(null, Validators.required),
      'apodDateEnd': new FormControl(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`, Validators.required)
    });
    this.clearFilter()
  }

  getApodData(start: string, end: string): void {
    this.dataLoaded = false;
    this.apiService.getApodData(start, end)
      .subscribe(data => {
        this.apodData = data;
        this.dataLoaded = true;
      });
  }

  onDateFilter() {
    this.getApodData(this.dateFilter.value.apodDateStart, this.dateFilter.value.apodDateEnd);
  }

  clearFilter() {
    let today = new Date();
    let startDate = new Date();
    startDate.setDate(today.getDate() - 7);
    let start = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    let end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    this.getApodData(start, end);
  }
}
