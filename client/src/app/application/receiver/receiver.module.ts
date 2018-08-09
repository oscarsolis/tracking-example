import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { NguiMapModule } from '@ngui/map';
import { ReceiverRoutingModule } from './receiver-routing.module';

// components
import { ReceiverComponent } from './receiver.component';

//
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({
      apiUrl: `${environment.maps.apiUrl}?key=${environment.maps.apiKey}&libraries=${environment.maps.libraries}`
    }),
    ReceiverRoutingModule
  ],
  declarations: [ReceiverComponent]
})
export class ReceiverModule { }
