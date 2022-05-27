import { Injectable } from '@angular/core';
import { Student } from './Models/student';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessService {

  constructor(public http: HttpClient) {}

  baseUrl: string = 'http://localhost:8080';

SignUp(member: any,signUpType:string) {
    return this.http.post<any>(this.baseUrl+signUpType, member);
  }

  userLogin(user: any,LoginType:string){
  
    return this.http.post<any>(this.baseUrl+LoginType, user);
  }


  getToken(){

    return localStorage.getItem('token');
  }
  userLogOut(){
   
  
    localStorage.removeItem("token");
  }

  //just to use it in change the data depnding on if he or she is logged in or not
    isLoggedIn(){
      return localStorage.getItem('token')!=null;
    }


    //get user Role to decide which pages will be displayed....
      getDecodedToken(){

        let jwt=this.getToken();
        if(jwt){
          let jwtData = jwt.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          return decodedJwtData??null;
        }

      }




}
