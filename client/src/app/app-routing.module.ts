// core
import { NgModule } from '@angular/core';

// angular router
import {
  Routes,
  RouterModule
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'application',
    pathMatch: 'full'
  },
  {
    path: 'application',
    loadChildren: './application/application.module#ApplicationModule'
  },
  {
    path: 'not-found',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
