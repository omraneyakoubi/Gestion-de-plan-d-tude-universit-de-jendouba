import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatediplomeComponent } from './updatediplome/updatediplome.component';

const routes: Routes = [
  {path:'',component:UpdatediplomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatediplomeRoutingModule { }
