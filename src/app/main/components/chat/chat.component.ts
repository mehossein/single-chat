import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { alertService } from 'src/app/shared/modules/alert/services/alert.service';
import { SOCKET } from 'src/app/socket/models/socket';

@Component({
  selector: 'chat-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chatBox', { static: true }) chatBox!: ElementRef;
  link!: string;
  friendLink!: FormGroup;
  pending: boolean = false;
  waitForChat: boolean = true;
  requester: string = '';
  messages!: any[];
  constructor(
    private readonly FB: FormBuilder,
    private readonly chatSrv: ChatService,
    private readonly alertSrv: alertService
  ) {}

  ngOnInit(): void {
    this.getUserLink();
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
    this.chatSrv.socket.on(SOCKET.EVENT, (data: any) => {
      console.log(data);
      switch (data.type) {
        case SOCKET.REQUEST:
          this.requester = data.data;
          break;
        case SOCKET.IN_CHAT:
          this.waitForChat = false;
          this.requester = data.data;
          console.log(this.chatBox);
          break;
        case SOCKET.MESSAGE:
          this.messages = data.data;
          break;
        case SOCKET.START:
          this.waitForChat = false;
          this.alertSrv.showSuccess(`چت با ${data.data} شروع شد.`);
          break;
      }
    });
  }

  copyLink() {
    navigator.clipboard.writeText(this.link ?? '');
    this.alertSrv.showInfo('(❁´◡`❁) لینک کپی شد');
  }

  sendRequest() {
    if (this.friendLink.valid) {
      this.chatSrv.fetch({ type: 'REQUEST', data: this.friendLink.value.link });
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

  getNewLink() {
    this.chatSrv.getLink(true).subscribe({
      next: ({ link }) => {
        this.link = link ?? '';
      },
    });
  }

  approve() {
    this.chatSrv.fetch({ type: SOCKET.APPROVE, data: this.requester });
  }

  dontChat() {
    this.requester = '';
  }

  sendMsg(msg: string) {
    this.chatSrv.fetch({ type: SOCKET.MESSAGE, data: msg });
  }

  disconnect() {
    this.chatSrv.socket.disconnect();
  }
}
