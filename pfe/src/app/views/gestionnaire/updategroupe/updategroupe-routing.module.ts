import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdategroupeComponent } from './updategroupe/updategroupe.component';

const routes: Routes = [
  {path:'',component:UpdategroupeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdategroupeRoutingModule { }
