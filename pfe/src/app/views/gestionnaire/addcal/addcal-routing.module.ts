import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcalComponent } from './addcal/addcal.component';

const routes: Routes = [
  {path:'',component:AddcalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcalRoutingModule { }
