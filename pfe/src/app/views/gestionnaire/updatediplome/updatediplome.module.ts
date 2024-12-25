import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatediplomeRoutingModule } from './updatediplome-routing.module';
import { UpdatediplomeComponent } from './updatediplome/updatediplome.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdatediplomeComponent
  ],
  imports: [
    CommonModule,
    UpdatediplomeRoutingModule,
    ReactiveFormsModule 
  ]
})
export class UpdatediplomeModule { }
