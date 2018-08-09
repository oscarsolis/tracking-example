// core
import { Component } from '@angular/core';

@Component({
  selector: 'app-application',
  template: `
    <div class="main">
      <mat-toolbar color="primary" class="toolbar">
        <a [routerLink]="[ '/' ]" class="link">Tracking</a>
      </mat-toolbar>
      <div>
        <router-outlet></router-outlet>
      </div>
  </div>
  `
})
export class ApplicationComponent {

  constructor() { }

}
