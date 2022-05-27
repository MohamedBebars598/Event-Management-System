import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './Models/Event';
import { EventSend } from './Models/EventSend';
import { Speaker } from './Models/Speaker';
import { Student } from './Models/student';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  Events:Event[]=[]
  event:Event|null=null;
  constructor(private http:HttpClient) { }

  baseUrl:string='http://localhost:8080/admin'

//get All students
getAllStudents(){

  return this.http.get<Student[]>(this.baseUrl+'/getAllStudent');

}

//delete student

deleteStudent(stdId:number){

  return this.http.delete(this.baseUrl+'/student/'+stdId)
}


//update Student Email
updateStudent(stdId:number,std:Student){

  return this.http.put<Student>(this.baseUrl+'/student/'+stdId,std);
}




//Speaker Part >>>>>>>>
//get All Speaker....
getAllSpeakers(){

return this.http.get<Speaker[]>(this.baseUrl+'/getAllSpeakers')

}


deleteSpeaker(stdId:number){

  return this.http.delete(this.baseUrl+'/speaker/'+stdId)
}


//update Speaker
updateSpeaker(spkId:number,spk:Speaker){

  return this.http.put<Speaker>(this.baseUrl+'/speaker/'+spkId,spk);
}




//event part 
getAllEvent(){


  return this.http.get<Event[]>(this.baseUrl+'/getAllEvents')
}


//delete Event 

deleteEvent(evnId:number){

  return this.http.delete(this.baseUrl+'/event/'+evnId)
}


//set Evnent
setEvents(evn:Event[]){

this.Events=evn;
}

//Get  Event
getEvent(){



return this.Events;

}


//update Event

updateEvent(EvId:number,event:EventSend){

  return this.http.put<EventSend>(this.baseUrl+`/event/${EvId}`,event);
}



//addMain Speaker To Specific Eevnt...
addMainSpeaker(eveId:number,mainSpeaker:number){


  let onTheFley={


    mainSpeaker:mainSpeaker
  }

return this.http.put<number>(this.baseUrl+'/mainSpeaker/add/'+eveId,onTheFley);

}



addOtherSpeakers(eveId:number,otherSpeakers:number[]){


  let onTheFley={


    otherSpeakers:otherSpeakers
  }

return this.http.put<number[]>(this.baseUrl+'/otherSpeakers/add/'+eveId,onTheFley);

}




//add Students To specific Events...
addStudents(eveId:number,students:number[]){


  let onTheFley={


    students:students
  }

return this.http.put<number>(this.baseUrl+'/student/add/'+eveId,onTheFley);

}



//create Event.....
CreateEvent(eve:EventSend){

return this.http.post(this.baseUrl+"/event",eve);

}


}
