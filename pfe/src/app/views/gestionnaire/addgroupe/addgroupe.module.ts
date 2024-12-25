import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddgroupeRoutingModule } from './addgroupe-routing.module';
import { AddgroupeComponent } from './addgroupe/addgroupe.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@NgModule({
  declarations: [
    AddgroupeComponent
  ],
  imports: [
    CommonModule,
    AddgroupeRoutingModule,
    FormsModule
  ]
})
export class AddgroupeModule { }
