import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Calanderier {
  id: any;
  nomprenom: string;
  email: string;
  dateexam: string;
  salle: string;
  nomexam: string;
  typeexam: string;
  role: string;
  groupe: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalanderierService {
  private url = 'http://localhost:3000'; // Adjust the port if necessary

  constructor(private http: HttpClient) { }

  addCalanderier(calanderier: Calanderier): Observable<any> {
    return this.http.post(`${this.url}/api/calandrier/add`, calanderier);
  }

  getAllCalanderier(): Observable<Calanderier[]> {
    return this.http.get<Calanderier[]>(`${this.url}/api/calandrier/all`);
  }

  deleteCalendarEvent(id: any): Observable<any> {
    return this.http.delete(`${this.url}/api/calandrier/${id}`);
  }

  sendMail(obj: any): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.url + '/api/emailcall', obj, headers);
  }

  getCalanderierById(id: any): Observable<Calanderier> {
    return this.http.get<Calanderier>(`${this.url}/api/calandrier/${id}`).pipe(
      catchError(() => of({
        id: null,
        nomprenom: '',
        email: '',
        dateexam: '',
        salle: '',
        nomexam: '',
        typeexam: '',
        role: '',
        groupe: ''
      }))
    );
  }

  updateCalanderier(id: any, updatedCalanderier: Calanderier): Observable<any> {
    return this.http.put(`${this.url}/api/calandrier/${id}`, updatedCalanderier);
  }
}
