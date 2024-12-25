import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdategroupeRoutingModule } from './updategroupe-routing.module';
import { UpdategroupeComponent } from './updategroupe/updategroupe.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdategroupeComponent
  ],
  imports: [
    CommonModule,
    UpdategroupeRoutingModule,
    ReactiveFormsModule 
  ]
})
export class UpdategroupeModule { }
