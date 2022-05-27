import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AccessService } from './Access.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService,public Access:AccessService,public router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    //check if the token is not expired ...
let notValidToken=(Date.now()/1000)>this.Access.getDecodedToken()?.exp;
if(notValidToken&&this.Access.isLoggedIn()){
  //delete the expired token...
  this.Access.userLogOut();
  alert("p")
  this.router.navigate(['/login'])
}else{

  setTimeout(()=>{

    this.loaderService.isLoading.next(true);
  })

}

      

    return next.handle(req).pipe(
      finalize(
        () => {
          
          this.loaderService.isLoading.next(false);
        }
      )
    );
  }
}
