import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccessService } from 'src/app/Access.service';
import { SpeakerService } from 'src/app/speaker.service';
import { Event } from 'src/app/Models/Event';


@Component({
  selector: 'app-registered-event',
  templateUrl: './registered-event.component.html',
  styleUrls: ['./registered-event.component.css']
})
export class RegisteredEventComponent implements OnInit {

  Servermessage:string|null=null;
  events:Event[]=[];
  sub:Subscription|null=null;
  constructor(private spkService:SpeakerService,private acc:AccessService,private Router:Router) { }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();

  }

  ngOnInit(): void {

    
    let id=this.acc.getDecodedToken().id;
    this.spkService.getRegisterdEvent(id).subscribe(d=>{

      console.log(d);
      this.events=d;
      this.spkService.setEventData(this.events);
      console.log(this.events)
    },err=>{
  

      //if the token is expired it will be directed to the login page to get authentication token ...
      if(err.error.meassge==="Error: Not Authenticated"){

        localStorage.clear();
        this.Router.navigate(['/login'])
        
      }else{

        this.Servermessage=err.error.meassge;
      }
    })
  }

}
