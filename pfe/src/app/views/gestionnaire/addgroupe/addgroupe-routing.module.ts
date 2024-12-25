import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddgroupeComponent } from './addgroupe/addgroupe.component';

const routes: Routes = [
  {path:"",component:AddgroupeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddgroupeRoutingModule { }
