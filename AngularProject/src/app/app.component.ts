import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from './Access.service';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'eventSystem';


  constructor(public ActiveLink:ActivatedRoute,public acc:AccessService,public route:Router,public loaderService:LoaderService){

    this.who();
  }



//determine which bac should  be displayed ....
whichBac(){

let type=location.pathname;
let url;
if(type.startsWith("/signUp")){

  url='/signUp'

  }else if(type.startsWith("/studentSignUp")){

    url="/studentSignUp"
  }else if(type.startsWith("/speakerSignUp")){

    url="/speakerSignUp"
  }else if(type.startsWith("/login")){

    url="/login"
  }else if(type.startsWith("/student")){

    url="/student"
  }else if(type.startsWith("/speaker")){

    url="/speaker"
  }else if(type.startsWith("/admin")){

    url="/admin"
  }

  return url;

}


//determine if ther is user Logged in or not  ...

userLogged(){
  console.log(this.acc.isLoggedIn());
  return this.acc.isLoggedIn()
}


who(){
   let role=this.acc?.getDecodedToken()?.role;
   return role??null;
}


logOut(){
console.log('ssss')
  localStorage.removeItem('token');
  this.route.navigate(['']);
}







}