import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateplanComponent } from './updateplan/updateplan.component';

const routes: Routes = [
  {path:'',component:UpdateplanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateplanRoutingModule { }
