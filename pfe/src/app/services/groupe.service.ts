import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Groupe {
  id: any;
  nomprenom: string;
  email: string;
  specialite: string;
  nbgroupe: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private url = 'http://localhost:3000/api/groupes';

  constructor(private http: HttpClient) { }

  addGroupe(groupe: Groupe): Observable<any> {
    return this.http.post(`${this.url}/add`, groupe);
  }

  getAllGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${this.url}/all`);
  }
  deletegroupe(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  updateGroupe(id: any, groupe: Groupe): Observable<any> {
    return this.http.put(`${this.url}/${id}`, groupe);
  }

  getgroupeById(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
  
}
