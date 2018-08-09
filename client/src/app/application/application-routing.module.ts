import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { ApplicationComponent } from './application.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: 'emisor',
        loadChildren: './transmitter/transmitter.module#TransmitterModule'
      },
      {
        path: 'receptor',
        loadChildren: './receiver/receiver.module#ReceiverModule'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
