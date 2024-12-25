import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Diplome {
  id: any;
  code: string;
  nomdiplome: string;
  niveau: string;
  niveauuniv	: string;
}
@Injectable({
  providedIn: 'root'
})
export class DiplomeService {
  filter(arg0: (item: Diplome) => boolean): DiplomeService {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/diplome';

  constructor(private http: HttpClient) { }
 
  adddiplome(diplome:Diplome){
    return this.http.post(`${this.apiUrl}/add`,diplome)
  }

  getalldiplomes(){
    return this.http.get(`${this.apiUrl}/all`)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updatediplome(id: any, updatedDiplome: Diplome): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedDiplome);
}
getDiplomeById(id: any): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}
}
