import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateplanRoutingModule } from './updateplan-routing.module';
import { UpdateplanComponent } from './updateplan/updateplan.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateplanComponent
  ],
  imports: [
    CommonModule,
    UpdateplanRoutingModule,
    FormsModule
  ]
})
export class UpdateplanModule { }
