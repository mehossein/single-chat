import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, SharedModule, HttpClientModule],
  exports: [HttpClientModule],
})
export class CoreModule {}
