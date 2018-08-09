import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HistoryComponent } from './history.component';

// modules
import { MomentModule } from 'ngx-moment';
import { NguiMapModule } from '@ngui/map';
import { HistoryRoutingModule } from './history-routing.module';

//
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    NguiMapModule.forRoot({
      apiUrl: `${environment.maps.apiUrl}?key=${environment.maps.apiKey}&libraries=${environment.maps.libraries}`
    }),
    HistoryRoutingModule
  ],
  declarations: [HistoryComponent]
})
export class HistoryModule { }
