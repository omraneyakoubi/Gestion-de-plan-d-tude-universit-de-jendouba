import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Plan {
  idplan?: number;
  diplome: string;
  nomplan: string;
  anneeapp: number;
  spec: string;
}

export interface Unit {
  idunite?: number;
  nomunite: string;
  idplan: number;
}

export interface Element {
  matier1: string;
  matier2: string;
  matier3: string;
  coffmatier1: number;
  coffmatier2: number;
  coffmatier3: number;
  regime1: string;
  regime2: string;
  regime3: string;


  idunite: number;
  [key: string]: string | number | undefined;
}


@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Plan CRUD
  addPlan(plan: Plan): Observable<any> {
    return this.http.post(`${this.apiUrl}/plan/add`, plan);
  }

  getAllPlans(): Observable<any> {
    return this.http.get(`${this.apiUrl}/plan/all`);
  }

  // Unit CRUD
  addUnit(unit: Unit): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unite/add`, unit);
  }
  
  getAllUnitsByPlan(idplan: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/unite/all/${idplan}`);
  }

  // Element CRUD
  addElement(elementData: Element): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/element/add', elementData);
  }
  

  getAllElementsByUnit(idunite: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/element/element/${idunite}`);
  }
  getplanfromunit(idplan:number):  Observable<any>{
    return this.http.get(`${this.apiUrl}/unite/unite/${idplan}`);

  }
  getunitfromelement(idunite:number):  Observable<any>{
    return this.http.get(`${this.apiUrl}/element/element/${idunite}`);

  }
  getdiplome(): Observable<any> {
    return this.http.get(`${this.apiUrl}/diplome/diplome/nomdiplome`);
  }
  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plan/${id}`);
  }


  updateplan(id: any, plan: Plan): Observable<any> {
    return this.http.put(`${this.apiUrl}/plan/${id}`, plan);
  }

  getplanById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/plan/${id}`);
  }
  updateunit(id: any, unit: Unit): Observable<any> {
    return this.http.put(`${this.apiUrl}/unite/${id}`, unit);
  }

  getunitById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/unite/${id}`);
  }
  updateelement(id: any, element: Element): Observable<any> {
    return this.http.put(`${this.apiUrl}/element/${id}`, element);
  }

  getelementsById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/element/${id}`);
  }
  
}
