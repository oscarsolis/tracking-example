// core
import { Injectable } from '@angular/core';

// socket.io
import * as io from 'socket.io-client';

// config
import { URLS } from '../../config/urls.config';

// rxjs
import { Observable } from 'rxjs/Observable';

//
import { isDefined } from '../../core/utils/util';

declare global {
  interface Window { io: any }
}

@Injectable()
export class SocketService {

  socket: any;

  constructor() { }

	/**
	 *
	 */
  connect(): void {
    if (!window.io) {
      window.io = io.connect(URLS.socketUrl);
    }
    this.socket = window.io;
  }

	/**
	 *
	 */
  disconnect(): void {
    window.io = undefined;
    if (this.socket) {
      this.socket.disconnect();
    }
  }

	/**
	 *
	 */
  isConnect(): boolean {
    if (isDefined(this.socket)) {
      return this.socket.connected;
    }
    return false
  }

	/**
	 *
	 * @param eventName
	 */
  on(eventName: string): Observable<any> {
    return new Observable(observer => {
      if (isDefined(this.socket)) {
        this.socket.on(eventName, data => observer.next(data))
      }
    });
  }

	/**
	 *
	 * @param emitName
	 * @param data
	 */
  emit(emitName: string, data?: any) {
    if (isDefined(this.socket)) {
      this.socket.emit(emitName, data);
    }
  }

}
