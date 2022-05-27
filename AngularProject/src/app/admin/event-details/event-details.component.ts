import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { Event } from 'src/app/Models/Event';
import { Speaker } from 'src/app/Models/Speaker';
import { Student } from 'src/app/Models/student';
import { SpeakerService } from 'src/app/speaker.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  myEvents:Event[]=[];
  otherSpeakers:Speaker[]=[];
  EventStudent:Student[]=[];
  constructor(private adminService:AdminService,private activeRoute:ActivatedRoute) { }
  
  ngOnInit(): void {

    this.myEvents=this.adminService.getEvent()
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
