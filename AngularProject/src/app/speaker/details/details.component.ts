import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Speaker } from 'src/app/Models/Speaker';
import { Student } from 'src/app/Models/student';
import { SpeakerService } from 'src/app/speaker.service';
import { StudentServiceService } from 'src/app/student-service.service';
import { Event } from 'src/app/Models/Event';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  myEvents:Event[]=[];
  otherSpeakers:Speaker[]=[];
  EventStudent:Student[]=[];
  constructor(private spkService:SpeakerService,private activeRoute:ActivatedRoute) { }
  
  ngOnInit(): void {

    this.myEvents=this.spkService.getEvents()
    let mySub=this.activeRoute.params.subscribe(d=>{


     let EventIndex=Number.parseInt( d["id"]);
     for(let i=0;i<this.myEvents.length;i++){

      if(this.myEvents[i]._id==EventIndex){

        this.otherSpeakers=this.myEvents[i]?.otherSpeakers;
        this.EventStudent=this.myEvents[i]?.students;
      }

     }
    


    })
 

  }

}
