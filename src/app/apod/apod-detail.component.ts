import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { APOD } from './apod.interface';

@Component({
  selector: 'apod-detail',
  template: `
    <div *ngIf="apod; else apodNotSelected">
      <div class="apod-details">
        <div class="apod-img-container">
          <img [src]="apod.url" class="apod-img" [routerLink]="[apod.id, 'full']" [queryParams]="{ view: 'apod-img' }">
        </div>
        <div class="apod-info">
          <p class="apod-info-title">{{apod.title}}, {{apod.date | date:'longDate'}}</p>
          <p class="apod-info-copyright">Copyright: {{apod.copyright ? apod.copyright : 'No Copyright Available'}}</p>
          <a class="image-detail-link" [routerLink]="[apod.id, 'full']" [queryParams]="{ view: 'apod-img' }">View Capture</a>
          <p class="apod-info-explanation">{{apod.explanation}}</p>
        </div>
      </div>
    </div>
    <router-outlet></router-outlet>
    <ng-template #apodNotSelected>No APOD Selected</ng-template>
  `,
  styles: [`
  
  `]
})
export class ApodDetailComponent implements OnInit {
  apod?: APOD;
  id?: number;

  constructor(
    private apiService: ApiService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Observable for changing parameters
    this.route.params.subscribe((params: Params) => {
      // '+' casts the string id into a number
      this.id = +params['id'];
      this.apod = this.apiService.getApod(this.id);
    });
  }

}
