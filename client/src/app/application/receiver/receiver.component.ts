// core
import {
  Component,
  OnDestroy,
} from '@angular/core';

// services
import {
  DebugService,
  SocketService
} from '../../core/services';

// config
import { MAP_OPTIONS } from '../../config/map.config';
import { SOCKET_EVENTS } from '../../config/socket-events.config';

//
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnDestroy {
  //
  mapOptions: google.maps.MapOptions = MAP_OPTIONS;

  //
  map: google.maps.Map;

  //
  marker: google.maps.Marker;

  //
  subscriptions: Array<Subscription> = [];

  constructor(
    private _debug: DebugService,
    private _socketService: SocketService
  ) {
    console.log('wewewe')
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this._socketService.disconnect();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   *
   * @param map
   */
  mapReady(map: any): void {
    this.map = map;
    this.startSocketEvents();
  }

  /**
   *
   * @param marker
   */
  markerInit(marker): void {
    this.marker = marker;
  }

  /**
   *
   */
  startSocketEvents(): void {
    this._socketService.connect();

    this.subscriptions.push(
      this._socketService
        .on(SOCKET_EVENTS.on.connect)
        .subscribe(this.handlerConnect)
    );

    this.subscriptions.push(
      this._socketService
        .on(SOCKET_EVENTS.on.changePosition)
        .subscribe(this.handlerChangePosition)
    );
  }

  /**
   *
   */
  handlerConnect = (): void => {
    this._debug.success(`TransmitterComponent ${SOCKET_EVENTS.on.connect}`);
  }

  /**
   *
   */
  handlerChangePosition = data => {
    this._debug.success(`TransmitterComponent ${SOCKET_EVENTS.on.changePosition}`, data);
    this.marker.setPosition(new google.maps.LatLng(data.lat, data.lng));
  }

}
