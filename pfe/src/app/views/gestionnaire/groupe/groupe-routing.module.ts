import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupeComponent } from './groupe/groupe.component';

const routes: Routes = [
  {path:"",component:GroupeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
