// core
import {
  NgZone,
  Component,
  OnDestroy
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

// models
import { Point } from '../../models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnDestroy {

  //
  mapOptions: google.maps.MapOptions = MAP_OPTIONS;

  //
  map: google.maps.Map;

  //
  marker: google.maps.Marker;

  //
  subscriptions: Array<Subscription> = [];

  //
  points: Array<Point> = [];

  constructor(
    private _ngZone: NgZone,
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
   * @param marker
   */
  markerInit(marker): void {
    this.marker = marker;
  }

  /**
   *
   * @param coordinates
   */
  changeMarker(coordinates: Array<number>): void {
    this.marker.setPosition(new google.maps.LatLng(coordinates[1], coordinates[0]));
    this.map.setCenter(this.marker.getPosition());
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
        .on(SOCKET_EVENTS.on.updatePoints)
        .subscribe(this.handlerUpdatePoints)
    );

    this.subscriptions.push(
      this._socketService
        .on(SOCKET_EVENTS.on.allPoints)
        .subscribe(this.handlerAllPoints)
    );
  }

  /**
   *
   */
  handlerConnect = (): void => {
    this._debug.success(`TransmitterComponent ${SOCKET_EVENTS.on.connect}`);
    this._socketService.emit(SOCKET_EVENTS.emit.allPoints);
  }

  /**
   *
   */
  handlerUpdatePoints = data => {
    this._debug.success(`TransmitterComponent ${SOCKET_EVENTS.on.updatePoints}`, data);
    let self = this;
    self._ngZone.run(() => this.points.push(Object.assign(new Point(), data)));
  }

  /**
   *
   */
  handlerAllPoints = data => {
    this._debug.success(`TransmitterComponent ${SOCKET_EVENTS.on.allPoints}`, data);
    let self = this;
    self._ngZone.run(() => this.points = data.map(val => Object.assign(new Point(), val)));
  }

}
