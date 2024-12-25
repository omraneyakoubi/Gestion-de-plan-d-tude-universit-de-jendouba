import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdddiplomeRoutingModule } from './adddiplome-routing.module';
import { AdddiplomeComponent } from './adddiplome/adddiplome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdddiplomeComponent
  ],
  imports: [
    CommonModule,
    AdddiplomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdddiplomeModule { }
