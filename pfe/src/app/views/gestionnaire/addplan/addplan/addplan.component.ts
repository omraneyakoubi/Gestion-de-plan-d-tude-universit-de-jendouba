import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan, PlanService, Unit, Element } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addplan',
  templateUrl: './addplan.component.html',
  styleUrls: ['./addplan.component.css']
})
export class AddplanComponent implements OnInit {
  step1 = true;
  step2 = false;
  step3 = false;
  gostep2: boolean = false;
  units: Unit[] = [];
  test: number | undefined;

  plan: Plan = {
    idplan: 0,
    diplome: '',
    nomplan: '',
    anneeapp: 0,
    spec: ''
  };

  unit: Unit = {
    idunite: 0,
    nomunite: '',
    idplan: 0
  };

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
  diplomes: string[] = [];


  constructor(private planService: PlanService, private router: Router) { }

  ngOnInit(): void {
    this.getDiplomes();

  }

  nextStep(): void {
    if (this.step1 && this.validateStep1()) {
      this.step1 = false;
      this.step2 = true;
    } else if (this.step2) {
      this.step2 = false;
      this.step3 = true;
    }
  }

  addUnit(): void {
    this.unit.idplan = this.plan.idplan || 0;
    this.units.push({...this.unit});
    const addedUnit = this.units[this.units.length - 1];
    
    if (addedUnit.idplan) {
      this.planService.addUnit(addedUnit).subscribe(
        (response: any) => {
          console.log('Unit added successfully:', response);
          this.test = response.idunite;
        },
        (error) => {
          console.error('Error adding unit:', error);
        }
      );
    } else {
      console.error('Error: Unit ID is undefined.');
    }
  }
  
  addPlanAndGoToStep2(): void {
    this.addPlan().then((planId: number) => {
      if (planId) {
        this.units.forEach(unit => {
          unit.idplan = planId;
        });
        this.addUnitsToPlan().then(() => {
          this.step2 = true;
          this.step3 = false;
          
          
        });
      }
    });
  }

  addPlan(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.planService.addPlan(this.plan).subscribe(
        (response: any) => {
          console.log('Plan added successfully:', response);
          const planId = Number(response.idplan);
          console.log('Plan ID:', planId);
          resolve(planId);
        },
        (error) => {
          console.error('Error adding plan:', error);
          reject(null);
        }
      );
    });
  }


  
  validateStep1(): boolean {
    if (!this.plan.diplome || !this.plan.nomplan || !this.plan.anneeapp || !this.plan.spec) {
      this.showErrorAlert('Veuillez remplir tous les champs obligatoires.');
      return false;
    }
    return true;
  }
  
  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: message
    });
  }
  

  addUnitsToPlan(): Promise<void> {
    const promises = this.units.map(unit => {
      return new Promise<void>((resolve, reject) => {
        this.planService.addUnit(unit).subscribe(
          (response: any) => {
            console.log('Unit added successfully:', response);
            if (response.idunite) {
              unit.idunite = response.idunite;
              this.addElement(this.element, unit.idunite); // Call addElement if idunite is defined
            }
            resolve();
          },
          (error) => {
            console.error('Error adding unit:', error);
            reject();
          }
        );
      });
    });
    return Promise.all(promises).then(() => {}) as Promise<void>;
  }

  addElement(elementData: Element, idunit?: number): void {
    if (idunit !== undefined) {
      elementData.idunite = idunit;
      this.planService.addElement(elementData).subscribe(
        (response) => {
          console.log('Element added successfully:', response);
        },
        (error) => {
          console.error('Error adding element:', error);
        }
      );
    } else {
      console.error('Error: Unit ID is undefined.');
    }
  }
  
  addPlanAndAddElement(): void {
    this.addPlan().then((planId: number) => {
      if (planId) {
        this.units.forEach(unit => {
          unit.idplan = planId;
        });
        this.addUnitsToPlan().then(() => {
          console.log('Plan and units added successfully.');
        });
      }
    });
  }

  getDiplomes(): void {
    this.planService.getdiplome().subscribe(
      (data: string[]) => {
        this.diplomes = data;
        console.log("Diplomes:", this.diplomes);
      },
      (error) => {
        console.error("Error fetching diplomes:", error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/gestionnaire/plan']);
  }
}
