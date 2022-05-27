import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from './Models/student';
import { Event }from './Models/Event'

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService implements OnInit {

  baseUrl:string="http://localhost:8080/student";
  private Events:Event[]=[]

  constructor(private http:HttpClient) { 
  }


  ngOnInit(){


  }

//get student profile Data
  getStudentData(stdID:number){

    return this.http.get<any>(this.baseUrl+`/${stdID}`)
  }




  //update Student Data...
  updateStudentData(stdID:number,std:Student){

    return this.http.put<Student>(this.baseUrl+`/${stdID}`,std);
  }



  //get Registered Event..

  getRegisterdEvent(stdID:number){


    return this.http.get<Event[]>(this.baseUrl+'/events'+`/${stdID}`);

  }


setEventData(events:Event[]){

  this.Events=events

}

getEvents(){
  return this.Events;
}




}
