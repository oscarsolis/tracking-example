import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// services
import {
  DebugService,
  SocketService
} from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    // services
    DebugService,
    SocketService
  ]
})
export class CoreModule { }
