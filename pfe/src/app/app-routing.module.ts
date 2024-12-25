import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontlayoutComponent } from './layout/frontlayout/frontlayout.component';
import { EnseignantComponent } from './layout/enseignant/enseignant.component';
import { EtudiantComponent } from './layout/etudiant/etudiant.component';
import { GestionnaireComponent } from './layout/gestionnaire/gestionnaire.component';
import { GuardadminGuard } from './guards/guardadmin.guard';

const routes: Routes = [
  {path:'',component:FrontlayoutComponent,children:[
    {path:'',loadChildren:()=>import('./views/front/login/login.module').then(m=>m.LoginModule)},

    {path:'login',loadChildren:()=>import('./views/front/login/login.module').then(m=>m.LoginModule)},
    {path:'signup',loadChildren:()=>import('./views/front/signup/signup.module').then(m=>m.SignupModule)}
  ]},
  {path:'enseignant',component:EnseignantComponent,canActivate:[GuardadminGuard],children:[
    {path:'calanderier',loadChildren:()=>import('./views/enseignant/calanderier/calanderier.module').then(m=>m.CalanderierModule)},
    {path:'',loadChildren:()=>import('./views/enseignant/calanderier/calanderier.module').then(m=>m.CalanderierModule)},



  ]},
  {path:'etudiant',component:EtudiantComponent,canActivate:[GuardadminGuard],children:[
    {path:'calanderier',loadChildren:()=>import('./views/etudiant/calanderier/calanderier.module').then(m=>m.CalanderierModule)},
    {path:'',loadChildren:()=>import('./views/etudiant/calanderier/calanderier.module').then(m=>m.CalanderierModule)},



    
  ]},
  {path:'gestionnaire',component:GestionnaireComponent,canActivate:[GuardadminGuard],children:[
    {path:'diplome',loadChildren:()=>import('./views/gestionnaire/diplome/diplome.module').then(m=>m.DiplomeModule)},
    {path:'adddiplome',loadChildren:()=>import('./views/gestionnaire/adddiplome/adddiplome.module').then(m=>m.AdddiplomeModule)},
    {path:'updatediplome/:id',loadChildren:()=>import('./views/gestionnaire/updatediplome/updatediplome.module').then(m=>m.UpdatediplomeModule)},

    {path:'utilisateurs',loadChildren:()=>import('./views/gestionnaire/utilisateurs/utilisateurs.module').then(m=>m.UtilisateursModule)},
    {path:'addgroupe',loadChildren:()=>import('./views/gestionnaire/addgroupe/addgroupe.module').then(m=>m.AddgroupeModule)},
    {path:'groupe',loadChildren:()=>import('./views/gestionnaire/groupe/groupe.module').then(m=>m.GroupeModule)},
    {path:'updategroupe/:id',loadChildren:()=>import('./views/gestionnaire/updategroupe/updategroupe.module').then(m=>m.UpdategroupeModule)},

    {path:'calanderier',loadChildren:()=>import('./views/gestionnaire/calanderier/calanderier.module').then(m=>m.CalanderierModule)},
    {path:'addcall',loadChildren:()=>import('./views/gestionnaire/addcal/addcal.module').then(m=>m.AddcalModule)},
    {path:'updatecall/:id',loadChildren:()=>import('./views/gestionnaire/updatecall/updatecall.module').then(m=>m.UpdatecallModule)},

    {path:'plan',loadChildren:()=>import('./views/gestionnaire/plan/plan.module').then(m=>m.PlanModule)},
    {path:'addplan',loadChildren:()=>import('./views/gestionnaire/addplan/addplan.module').then(m=>m.AddplanModule)},
    {path:'updateplan/:id',loadChildren:()=>import('./views/gestionnaire/updateplan/updateplan.module').then(m=>m.UpdateplanModule)},




  ]}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
