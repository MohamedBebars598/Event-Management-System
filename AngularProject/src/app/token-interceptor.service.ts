import { Injectable } from '@angular/core';
import { AccessService } from './Access.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private Access:AccessService ,public router:Router) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
let tokenizedReq=req.clone({

  setHeaders:{
    Authorization:`Bearer ${this.Access.getToken()}`
  }
})




console.log(tokenizedReq);
return next.handle(tokenizedReq);
}


}
