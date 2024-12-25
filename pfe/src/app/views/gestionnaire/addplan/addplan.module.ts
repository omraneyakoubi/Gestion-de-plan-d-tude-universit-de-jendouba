import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddplanRoutingModule } from './addplan-routing.module';
import { AddplanComponent } from './addplan/addplan.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddplanComponent
  ],
  imports: [
    CommonModule,
    AddplanRoutingModule,
    FormsModule
  ]
})
export class AddplanModule { }
