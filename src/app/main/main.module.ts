import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './component/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ChatComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
})
export class MainModule {}
