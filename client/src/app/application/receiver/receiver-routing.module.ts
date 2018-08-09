import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiverComponent } from './receiver.component';

const routes: Routes = [
  {
    path: '',
    component: ReceiverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiverRoutingModule { }
