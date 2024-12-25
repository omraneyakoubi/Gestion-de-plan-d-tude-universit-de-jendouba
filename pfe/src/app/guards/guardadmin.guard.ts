import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardadminGuard implements CanActivate {
  constructor(private auth:LoginService ,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve,reject)=>{
      if(this.auth.isLoggedIn()==true){
        resolve(true)
      }
      else{
        this.router.navigate(['/gestionnaire/login'])
        resolve
      }
    
    })
  }

  
}
