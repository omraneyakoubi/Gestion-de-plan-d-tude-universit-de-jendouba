import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Diplome, DiplomeService } from 'src/app/services/diplome.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatediplome',
  templateUrl: './updatediplome.component.html',
  styleUrls: ['./updatediplome.component.css']
})
export class UpdatediplomeComponent implements OnInit {
  diplomeForm: FormGroup;
  diplomeId: any;
  diplomee: Diplome = {
    id: null,
    code: '',
    nomdiplome: '',
    niveau: '',
    niveauuniv: ''
  };
  niveaux: string[] = [];

  constructor(private route: ActivatedRoute, private diplomeService: DiplomeService,
              private location: Location, private fb: FormBuilder) {
    this.diplomeForm = this.fb.group({
      code: ['', Validators.required],
      nomdiplome: ['', Validators.required],
      niveau: ['', Validators.required],
      niveauuniv: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.diplomeId = params['id'];
      this.getDiplomeById(this.diplomeId);
    });
  }

  getDiplomeById(diplomeId: any): void {
    this.diplomeService.getDiplomeById(diplomeId).subscribe(
      (response: any) => {
        console.log("test", response);

        if (response && typeof response === 'object') { // Vérifie si la réponse est un objet
          const diplome: Diplome = response; // Attribue directement la réponse à diplome
          this.diplomeForm.patchValue({
            code: diplome.code,
            nomdiplome: diplome.nomdiplome,
            niveau: diplome.niveau,
            niveauuniv: diplome.niveauuniv
          });
        } else {
          console.error('Erreur: Format de réponse invalide');
        }
      },
      error => {
        console.error('Erreur lors de la récupération du diplôme :', error);
      }
    );
  }

  onNiveauChange() {
    this.niveaux = [];
    const niveau = this.diplomeForm.value.niveau;
    if (niveau === 'Licence') {
      this.niveaux = ['1ere', '2eme', '3eme'];
    } else if (niveau === 'Master') {
      this.niveaux = ['1ere', '2eme'];
    }
  
    // Reset the selected value for niveauuniv
    this.diplomeForm.patchValue({
      niveauuniv: ''
    });
  }
  


  updateDiplome(): void {
    if (this.diplomeForm.valid) {
      const updatedDiplome: Diplome = this.diplomeForm.value;
      this.diplomeService.updatediplome(this.diplomeId, updatedDiplome).subscribe(
        (response: any) => {
          console.log("res",response);
          
          if (response.status === 1) {
            Swal.fire('Succès', 'Diplôme mis à jour avec succès', 'success');
            this.location.back();
          } else {
            Swal.fire('Succès', 'Diplôme mis à jour avec succès', 'success');
            this.location.back();

          }
        },
        error => {
          console.error('Erreur lors de la mise à jour du diplôme :', error);
          Swal.fire('Erreur', 'Échec de la mise à jour du diplôme', 'error');
        }
      );
    } else {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs requis', 'error');
    }
  }
}
