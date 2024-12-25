import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiplomeRoutingModule } from './diplome-routing.module';
import { DiplomeComponent } from './diplome/diplome.component';


@NgModule({
  declarations: [
    DiplomeComponent
  ],
  imports: [
    CommonModule,
    DiplomeRoutingModule
  ]
})
export class DiplomeModule { }
