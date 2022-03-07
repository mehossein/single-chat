import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CookieHandler } from './../../../core/classes/cookie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alertService } from 'src/app/shared/modules/alert/services/alert.service';
@Component({
  selector: 'chat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passViewMode: boolean = false;
  loginForm!: FormGroup;
  pending: boolean = false;
  constructor(
    private readonly router: Router,
    private readonly FB: FormBuilder,
    private readonly authSrv: AuthService,
    private readonly alertSrv: alertService
  ) {}

  ngOnInit(): void {
    CookieHandler.removeToken();
    this.loginForm = this.FB.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.pending) return;
    if (this.loginForm.valid) {
      this.pending = true;
      this.authSrv.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.pending = false;
          this.alertSrv.showSuccess('عملیات موفقیت آمیز بود');
          CookieHandler.setToken(res.token);
          this.router.navigate(['/']);
        },
        error: () => {
          this.pending = false;
        },
      });
    } else {
      this.alertSrv.showWarning('لطفا فیلد های اجباری رو وارد کنید . ');
    }
  }

  redirectToRegister() {
    if (this.pending) return;
    this.router.navigate(['/auth/register']);
  }
}
