import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AccessService } from 'src/app/Access.service';
import { Event } from 'src/app/Models/Event';
import { StudentServiceService } from 'src/app/student-service.service';

@Component({
  selector: 'app-registered-event',
  templateUrl: './registered-event.component.html',
  styleUrls: ['./registered-event.component.css']
})
export class RegisteredEventComponent implements OnInit ,OnDestroy{

  events:Event[]=[];
  sub:Subscription|null=null;
  constructor(private student:StudentServiceService,private acc:AccessService,private Router:Router) { }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();

  }

  ngOnInit(): void {

    
    let id=this.acc.getDecodedToken().id;
    this.student.getRegisterdEvent(id).subscribe(d=>{
      this.events=d;
      this.student.setEventData(this.events);
      console.log(this.events)
    },err=>{
  

      //if the token is expired it will be directed to the login page to get authentication token ...
      if(err.error.meassge==="Error: Not Authenticated"){

        localStorage.clear();
        this.Router.navigate(['/login'])
        
      }
    })
  }

}
