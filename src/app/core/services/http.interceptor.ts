import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, timeout } from 'rxjs/operators';
import { alertService } from 'src/app/shared/modules/alert/services/alert.service';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly alertService: alertService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      this.alertService.showError(
        'متاسفیم به نظر میرسد اتصال اینترنت شما برقرار نمی باشد!'
      );
      return EMPTY;
    }
    let tokenizedRequest: HttpRequest<any>;
    tokenizedRequest = request.clone({});

    return next.handle(tokenizedRequest).pipe(
      timeout(30000),
      retry(0),
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  errorHandler(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.alertService.showError('متاسفیم نمیتونیم سرویس رو پیدا کنیم!');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.alertService.showError('مجوز دسترسی شما منقضی شده است');
      localStorage.clear();
      if (!environment.devMode) this.router.navigate(['/auth/login']);
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 403) {
      this.alertService.showError('شما دسترسی کافی ندارید!');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 400) {
      this.alertService.showError(error.error);
      return EMPTY;
    }
    if (error.message) {
      this.alertService.showError(error.message);
    } else {
      this.alertService.showError('اشکال در اتصال به سرویس');
    }

    this.alertService.showError('اشکال در اتصال به سرویس');
    return throwError(() => new Error(error.message));
  }
}
