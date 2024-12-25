import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatecallRoutingModule } from './updatecall-routing.module';
import { UpdatecallComponent } from './updatecall/updatecall.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdatecallComponent
  ],
  imports: [
    CommonModule,
    UpdatecallRoutingModule,
    FormsModule
  ]
})
export class UpdatecallModule { }
