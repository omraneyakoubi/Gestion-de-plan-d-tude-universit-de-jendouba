import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiplomeComponent } from './diplome/diplome.component';

const routes: Routes = [
  {path:'',component:DiplomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiplomeRoutingModule { }
