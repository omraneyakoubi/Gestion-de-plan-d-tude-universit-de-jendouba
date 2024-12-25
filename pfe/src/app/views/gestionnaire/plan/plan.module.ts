import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan/plan.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    FormsModule
  ]
})
export class PlanModule { }
