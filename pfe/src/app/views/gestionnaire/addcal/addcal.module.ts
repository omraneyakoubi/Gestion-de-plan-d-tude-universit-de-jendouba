import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcalRoutingModule } from './addcal-routing.module';
import { AddcalComponent } from './addcal/addcal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddcalComponent
  ],
  imports: [
    CommonModule,
    AddcalRoutingModule,
    FormsModule
  ]
})
export class AddcalModule { }
