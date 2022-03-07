import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  passViewMode: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
