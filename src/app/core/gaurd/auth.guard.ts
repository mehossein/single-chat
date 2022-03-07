import { CookieHandler } from './../classes/cookie';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate() {
    if (CookieHandler.getToken() != '') {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
