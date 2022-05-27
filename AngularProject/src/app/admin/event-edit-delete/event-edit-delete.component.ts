import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Event } from 'src/app/Models/Event';
import { Speaker } from 'src/app/Models/Speaker';

@Component({
  selector: 'app-event-edit-delete',
  templateUrl: './event-edit-delete.component.html',
  styleUrls: ['./event-edit-delete.component.css']
})
export class EventEditDeleteComponent implements OnInit {

  otherSpks:Speaker[]=[];
  Events:Event[]=[]
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
this.adminService.getAllEvent().subscribe(d=>{
this.Events=d;
this.adminService.setEvents(d);

console.log(this.Events)
},err=>{

  console.log(err);
})



  }



  removeEvent(id:number){

    this.adminService.deleteEvent(id).subscribe(d=>{

      for(let i=0;i<this.Events.length;i++){
        if(this.Events[i]._id==id){
  
          let index=this.Events.indexOf(this.Events[i])
          this.Events.splice(index,1);
        }
      }
    },err=>{

      console.log(err);
    })

    
  }

  

}
