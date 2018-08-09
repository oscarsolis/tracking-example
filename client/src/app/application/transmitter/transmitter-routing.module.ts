import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransmitterComponent } from './transmitter.component';

const routes: Routes = [{
  path: '',
  component: TransmitterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransmitterRoutingModule { }
