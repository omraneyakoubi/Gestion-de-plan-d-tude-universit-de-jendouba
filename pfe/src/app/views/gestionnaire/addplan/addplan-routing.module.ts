import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddplanComponent } from './addplan/addplan.component';

const routes: Routes = [
  {path:'',component:AddplanComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddplanRoutingModule { }
