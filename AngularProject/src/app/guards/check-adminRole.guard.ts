import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../Access.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CheckadminRoleGuard implements CanActivate {
  constructor(private auth:AccessService,private router:Router){

  }
  canActivate()
  {
if(this.auth.getDecodedToken()?.role=='admin'){

  return true;
}else if(this.auth.getDecodedToken()==null){

  alert("please enter your credentials ...")
  this.router.navigate(['/login'])
  return false;
}
else{

alert('Access Denied and you will be redirected to your Main Page')
this.router.navigate(['/'+this.auth.getDecodedToken().role])
  return false;
}
  
}
}