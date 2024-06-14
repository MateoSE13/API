import { Component } from '@angular/core';
import { AppHeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [`
  
  `]
})
export class AppComponent {
  title = 'nasa-api-browser';
  
}
