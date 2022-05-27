import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Speaker } from './Models/Speaker';
import { Event }from './Models/Event'

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  baseUrl:string="http://localhost:8080/speaker";
  private Events:Event[]=[]

  constructor(private http:HttpClient) { }

//get speaker profile Data
getStudentData(stdID:number){

  return this.http.get<any>(this.baseUrl+`/${stdID}`)
}


  //update speaker Data...
  updateSpeaker(spkID:number,std:Speaker){

    return this.http.put<Speaker>(this.baseUrl+`/${spkID}`,std);
  }




    //get Registered Event..

    getRegisterdEvent(spkID:number){


      return this.http.get<Event[]>(this.baseUrl+'/events'+`/${spkID}`);
  
    }
  
  
  setEventData(events:Event[]){
  
    this.Events=events
  
  }
  
  getEvents(){
    return this.Events;
  }

}
