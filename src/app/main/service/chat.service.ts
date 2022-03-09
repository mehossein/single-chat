import { SOCKET } from './../../socket/models/socket';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/classes/service-base';
@Injectable({
  providedIn: 'root',
})
export class ChatService extends ServiceBase {
  constructor(injector: Injector, public socket: Socket) {
    super(injector);
  }

  getLink(newLink: boolean = false): Observable<any> {
    return this.get$('link', [{ key: 'new_link', value: newLink }]);
  }

  fetch(arg: any) {
    this.socket.emit(SOCKET.EVENT, arg);
  }
}
