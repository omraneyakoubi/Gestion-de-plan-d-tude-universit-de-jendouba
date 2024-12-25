import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalanderierComponent } from './calanderier/calanderier.component';

const routes: Routes = [
  {path:'',component:CalanderierComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalanderierRoutingModule { }
