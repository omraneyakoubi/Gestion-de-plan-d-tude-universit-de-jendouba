import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdddiplomeComponent } from './adddiplome/adddiplome.component';

const routes: Routes = [
  {path:'',component:AdddiplomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdddiplomeRoutingModule { }
