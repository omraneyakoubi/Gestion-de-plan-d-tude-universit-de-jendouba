import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { FrontlayoutComponent } from './frontlayout/frontlayout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GestionnaireComponent,
    EnseignantComponent,
    EtudiantComponent,
    FrontlayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class LayoutModule { }
