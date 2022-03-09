import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { CookieHandler } from '../core/classes/cookie';

const config: SocketIoConfig = {
  url: environment.apiBaseUrl,
  options: {
    transports: ['websocket'],
    query: { 'x-access-token': CookieHandler.getToken() },
  },
};

@NgModule({
  declarations: [],

  imports: [CommonModule, BrowserModule, SocketIoModule.forRoot(config)],
})
export class SocketModule {}
