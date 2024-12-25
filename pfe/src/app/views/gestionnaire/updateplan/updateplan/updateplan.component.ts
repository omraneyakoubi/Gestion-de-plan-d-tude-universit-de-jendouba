import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService, Plan, Unit, Element } from '../../../../services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateplan',
  templateUrl: './updateplan.component.html',
  styleUrls: ['./updateplan.component.css']
})
export class UpdateplanComponent implements OnInit {
  planId: number = 0;
  unitId: number = 0;
  elementId: number = 0;
  plan: Plan = {
    diplome: '',
    nomplan: '',
    anneeapp: 0,
    spec: ''
  };
  unit: Unit = {
    nomunite: '',
    idplan: 0
  };
  aa: Unit[] = [];

  element: Element = {
    matier1: '',
    matier2: '',
    matier3: '',
    coffmatier1: 0,
    coffmatier2: 0,
    coffmatier3: 0,
    regime1: '',
    regime2: '',
    regime3: '',
    idunite: 0
  };

  unitSelected: boolean = false; // Flag to track unit selection
  elementSelected: boolean = false; // Flag to track element selection

  constructor(private route: ActivatedRoute, private router: Router, private planService: PlanService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planId = +params['id'];
      console.log("test", this.planId);

    


      if (this.planId) {
        this.getPlanById(this.planId);
      } 
    });
  }




  getPlanById(id: number): void {
    this.planService.getplanById(id)
      .subscribe(
        response => {
          this.plan = response;
        },
        error => {
          console.error("Error getting plan by id:", error);
          // Display a user-friendly message here if needed
        });
  }

 
  getPlanAndUnitById(id: number): void {
    this.planService.getelementsById(id)
      .subscribe(
        response => {
          this.element = response;
          if (this.element && this.element['idplan']) {
            const idplan: string = this.element['idplan'] as string;
            this.getPlanById(parseInt(idplan, 10)); // Fetch plan data for the element
          }
          if (this.element && this.element['idunite']) {
            this.unitId = this.element['idunite'];
          }
        },
        error => {
          console.error("Error getting element by id:", error);
          // Display a user-friendly message here if needed
        });
  }
  updatePlan(): void {
    this.planService.updateplan(this.planId, this.plan)
      .subscribe(
        response => {
          console.log(response);
          // Display success message using SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Plan updated successfully',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/gestionnaire/plan']);
            }
          });
        },
        error => {
          console.error("Error updating plan:", error);
          // Display a user-friendly message here if needed
        });}
 






 
}
