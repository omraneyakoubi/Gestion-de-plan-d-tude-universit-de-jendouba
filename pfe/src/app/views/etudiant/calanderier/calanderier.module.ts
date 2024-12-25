import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalanderierRoutingModule } from './calanderier-routing.module';
import { CalanderierComponent } from './calanderier/calanderier.component';


@NgModule({
  declarations: [
    CalanderierComponent
  ],
  imports: [
    CommonModule,
    CalanderierRoutingModule
  ]
})
export class CalanderierModule { }
