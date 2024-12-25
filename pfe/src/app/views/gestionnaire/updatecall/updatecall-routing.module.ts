import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatecallComponent } from './updatecall/updatecall.component';

const routes: Routes = [
  {path:"",component:UpdatecallComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatecallRoutingModule { }
