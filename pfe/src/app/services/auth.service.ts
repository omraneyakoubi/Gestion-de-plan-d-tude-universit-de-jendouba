// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface User {
  id: number;
  nom: string;
  prenom:string;
  email: string;
  password: string;
  role: string;
  cin:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private api='http://localhost:3000/api/';
  profiladmin={
    nom:'',
    prenom:'',
    email:'',
    password:'',
    role:'',
    cin:''
  }
  helper=new JwtHelperService ()

isloggedin:boolean=false
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  sendMail(reqObj: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(`${this.api}emailuser`, reqObj, { headers });
  }
  
  

  
}
