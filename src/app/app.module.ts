import { NgModule } from '@angular/core';
import { HttpsInterceptor } from './core';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketModule } from './socket/socket.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    SocketModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
