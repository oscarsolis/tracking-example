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
  selector: 'app-transmitter',
  templateUrl: './transmitter.component.html',
  styleUrls: ['./transmitter.component.scss']
})
export class TransmitterComponent implements OnDestroy {

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
  ) { }

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
   * @param event
   */
  dragendMarker(event: any, save: boolean = false): void {
    let data: any = {
      save,
      coordinates: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    };
    this._socketService.emit(SOCKET_EVENTS.emit.changePosition, data);
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
  }

  /**
   *
   */
  handlerConnect = (): void => {
    this._debug.success(`TransmitterComponent ${SOCKET_EVENTS.on.connect}`);
  }
}
