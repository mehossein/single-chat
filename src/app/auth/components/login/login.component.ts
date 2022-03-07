import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passViewMode: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
