import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/classes/service-base';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends ServiceBase {
  constructor(injector: Injector) {
    super(injector);
  }

  sendRequest(): Observable<any> {
    return this.get$('');
  }

  disconnect(model: any): Observable<any> {
    return this.post$('', model);
  }

  getChat(model: any): Observable<any> {
    return this.post$('', model);
  }

  sendChat(model: any): Observable<any> {
    return this.post$('', model);
  }

  getLink(): Observable<any> {
    return this.get$('link');
  }
}
