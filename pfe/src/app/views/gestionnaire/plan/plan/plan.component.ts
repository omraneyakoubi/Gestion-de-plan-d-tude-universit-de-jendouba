import { Component, OnInit } from '@angular/core';
import { PlanService, Plan, Unit, Element } from '../../../../../services/plan.service';
import Swal from 'sweetalert2'; // Import Swal

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planArray: Plan[] = [];
  unit: Unit[] = [];
  element: Element[] = [];
  selectedUnit: Unit = { nomunite: '', idplan: 0 };
  selectedElement: Element | null = null;

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.planService.getAllPlans().subscribe({
      next: (response: Plan[]) => {
        console.log('Response from backend API:', response);
        this.planArray = this.groupPlansByDiploma(response);
      },
      error: (err: any) => console.error('Error fetching plans:', err),
    });
  }

  groupPlansByDiploma(plans: Plan[]): Plan[] {
    const groupedPlans: Plan[] = [];
    const diplomas = new Set(plans.map(plan => plan.diplome));
    diplomas.forEach(diploma => {
      const plansForDiploma = plans.filter(plan => plan.diplome === diploma);
      groupedPlans.push(plansForDiploma[0]);
    });
    return groupedPlans;
  }

  getUnits(idplan: number): void {
    this.planService.getplanfromunit(idplan).subscribe({
      next: (response: Unit[]) => (this.unit = response),
      error: (err: any) => console.error('Error fetching units:', err),
    });
  }

  openElementModal(idunite: number): void {
    this.planService.getAllElementsByUnit(idunite).subscribe({
      next: (response: Element[]) => {
        this.element = response;
        $('#elementModal').modal('show');
      },
      error: (err: any) => console.error('Error fetching elements:', err),
    });
  }

  deletePlan(plan: Plan): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(result => {
      if (result.isConfirmed) {
        this.planService.deletePlan(plan.idplan!).subscribe({
          next: () => {
            this.planArray = this.planArray.filter(p => p.idplan !== plan.idplan);
            Swal.fire('Deleted!', 'Plan has been deleted.', 'success');
          },
          error: (err: any) => Swal.fire('Error', 'Failed to delete plan', 'error'),
        });
      }
    });
  }

  getUnitById(id: number): void {
    this.planService.getunitById(id).subscribe({
      next: (response: Unit) => (this.selectedUnit = response),
      error: (err: any) => console.error('Error getting unit by id:', err),
    });
  }

  updateUnit(): void {
    this.planService.updateunit(this.selectedUnit.idunite, this.selectedUnit).subscribe({
      next: () =>
        Swal.fire('Success!', 'Unit updated successfully', 'success').then(() =>
          this.getUnits(this.selectedUnit.idplan)
        ),
      error: (err: any) => Swal.fire('Error', 'Failed to update unit', 'error'),
    });
  }

  updateElement(): void {
    if (this.selectedElement && this.selectedElement.idelement) {
      this.planService.updateelement(this.selectedElement.idelement, this.selectedElement).subscribe({
        next: () =>
          Swal.fire('Success!', 'Element updated successfully', 'success').then(() =>
            this.getUnits(this.selectedUnit.idplan)
          ),
        error: (err: any) => Swal.fire('Error', 'Failed to update element', 'error'),
      });
    }
  }

  editElement(element: Element): void {
    const elementId = element.idelement;
    if (elementId) {
      this.getElementById(elementId);
      $('#updateElementModal').modal('show');
    }
  }

  getElementById(id: number): void {
    this.planService.getelementsById(id).subscribe({
      next: (response: Element) => (this.selectedElement = response),
      error: (err: any) => console.error('Error getting element by id:', err),
    });
  }
}
