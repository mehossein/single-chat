import { Login, Register } from '../models/auth';
import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/classes/service-base';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ServiceBase {
  constructor(injector: Injector) {
    super(injector);
  }

  login(model: Login) {
    return this.post$('login', model);
  }

  register(model: Register) {
    return this.post$('login', model);
  }
}
