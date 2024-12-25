import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Groupe, GroupeService } from 'src/app/services/groupe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updategroupe',
  templateUrl: './updategroupe.component.html',
  styleUrls: ['./updategroupe.component.css']
})
export class UpdategroupeComponent implements OnInit {
  groupeForm: FormGroup;
  groupeId: any;
  groupe: Groupe = {
    id: null,
    nomprenom: '',
    email: '',
    specialite: '',
    nbgroupe: ''
  };

  constructor(private route: ActivatedRoute, private groupeService: GroupeService,
              private location: Location, private fb: FormBuilder) {
    this.groupeForm = this.fb.group({
      nomprenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialite: ['', Validators.required],
      nbgroupe: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupeId = params['id'];
      this.getGroupeById(this.groupeId);
    });
  }

  getGroupeById(groupeId: any): void {
    this.groupeService.getgroupeById(groupeId).subscribe(
      (response: any) => {
        if (response && typeof response === 'object') {
          const groupe: Groupe = response;
          this.groupeForm.patchValue({
            nomprenom: groupe.nomprenom,
            email: groupe.email,
            specialite: groupe.specialite,
            nbgroupe: groupe.nbgroupe
          });
          console.log("ee",this.groupeForm);
          
        } else {
          console.error('Error: Invalid response format');
        }
      },
      error => {
        console.error('Error retrieving group:', error);
      }
    );
  }

  updateGroupe(): void {
    if (this.groupeForm.valid) {
      const updatedGroupe: Groupe = this.groupeForm.value;
      this.groupeService.updateGroupe(this.groupeId, updatedGroupe).subscribe(
        (response: any) => {
          if (response.status === 1) {
            Swal.fire('Success', 'Group updated successfully', 'success').then(() => {
              this.location.back();
            });
          } else {
            Swal.fire('Success', 'Group updated successfully', 'success').then(() => {
              this.location.back();
            });          }
        },
        error => {
          console.error('Error updating group:', error);
          Swal.fire('Error', 'Failed to update group', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
    }
  }
}
