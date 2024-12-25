import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalanderierRoutingModule } from './calanderier-routing.module';
import { CalanderierComponent } from './calanderier/calanderier.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CalanderierComponent
  ],
  imports: [
    CommonModule,
    CalanderierRoutingModule,
    MatIconModule
  ]
})
export class CalanderierModule { }
