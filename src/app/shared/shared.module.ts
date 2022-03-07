import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const MODULES = [CommonModule, ReactiveFormsModule, FormsModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
