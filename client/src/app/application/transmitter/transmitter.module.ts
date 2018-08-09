// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { NguiMapModule } from '@ngui/map';
import { TransmitterRoutingModule } from './transmitter-routing.module';

// components
import { TransmitterComponent } from './transmitter.component';

//
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({
      apiUrl: `${environment.maps.apiUrl}?key=${environment.maps.apiKey}&libraries=${environment.maps.libraries}`
    }),
    TransmitterRoutingModule
  ],
  declarations: [TransmitterComponent]
})
export class TransmitterModule { }
