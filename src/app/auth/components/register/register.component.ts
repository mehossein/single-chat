import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CookieHandler } from './../../../core/classes/cookie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alertService } from 'src/app/shared/modules/alert/services/alert.service';

@Component({
  selector: 'chat-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  passViewMode: boolean = false;
  registerForm!: FormGroup;
  pending: boolean = false;
  constructor(
    private readonly router: Router,
    private readonly FB: FormBuilder,
    private readonly authSrv: AuthService,
    private readonly alertSrv: alertService
  ) {}

  ngOnInit(): void {
    CookieHandler.removeToken();
    this.registerForm = this.FB.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onRegister() {
    if (this.pending) return;
    if (this.registerForm.valid) {
      this.pending = true;
      this.authSrv.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.pending = false;
          this.alertSrv.showSuccess('عملیات موفقیت آمیز بود');
          CookieHandler.setToken(res.token);
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.pending = false;
        },
      });
    } else {
      this.alertSrv.showWarning('لطفا فیلد های اجباری رو وارد کنید . ');
    }
  }

  redirectToLogin() {
    if (this.pending) return;
    this.router.navigate(['/auth/login']);
  }
}
