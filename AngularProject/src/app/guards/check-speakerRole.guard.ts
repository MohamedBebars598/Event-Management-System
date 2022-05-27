import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../Access.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSpeakerRoleGuard implements CanActivate {
  constructor(public auth:AccessService,public router:Router){

  }
  canActivate()
  {
if(this.auth.getDecodedToken()?.role=='speaker'){
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