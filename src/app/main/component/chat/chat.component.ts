import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { alertService } from 'src/app/shared/modules/alert/services/alert.service';

@Component({
  selector: 'chat-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  link!: string;
  friendLink!: FormGroup;
  pending: boolean = false;
  showMode: boolean = true;
  constructor(
    private readonly FB: FormBuilder,
    private readonly chatSrv: ChatService,
    private readonly alertSrv: alertService
  ) {}

  ngOnInit(): void {
    //this.getUserLink();
    this.friendLink = this.FB.group({
      link: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  copyLink() {
    navigator.clipboard.writeText(this.link ?? '');
  }

  sendRequest() {
    if (this.pending) return;
    if (this.friendLink.valid) {
      this.pending = true;
      this.chatSrv.sendRequest().subscribe({
        next: (res) => {
          this.pending = false;
          console.log(res);
        },
      });
    } else {
      this.alertSrv.showWarning('لینک طرف دوم چت رو وارد نکردید');
    }
  }

  private getUserLink() {
    this.chatSrv.getLink().subscribe({
      next: ({ link }) => {
        this.link = link ?? '';
      },
    });
  }
}
