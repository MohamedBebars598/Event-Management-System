import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { Address } from 'src/app/Models/Address';
import { Event } from 'src/app/Models/Event';
import { EventSend } from 'src/app/Models/EventSend';
import { Speaker } from 'src/app/Models/Speaker';
import { Student } from 'src/app/Models/student';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
event:Event=new Event(0,'',new Date(),new Speaker(0,'','','',new Address('','',0)),[],[]);
title:string='';
date:string="";
stdIds:number[]=[];
spkIds:number[]=[];
MainSoeaker:number[]=[];
selectedStudents:number[]=[];
selectedSpeakers:number[]=[];
selectedMainSpeaker:number=0;
  constructor(private adminService:AdminService ,private router:Router,private active:ActivatedRoute) { }


  ngOnInit(): void {

    let ev=this.adminService.getEvent();
    let index=this.active.snapshot.params['id'];
    for(let i=0;i<ev.length;i++){
      if(ev[i]._id==index){
        this.event=ev[i];
      }
    }
    this.title=this.event.title;
    let dt=this.event?.date?.toString();
    this.date=dt?.split('T')[0];

    // //put the selected values of the events...
    // //fill the selected students before Edit..
    // for(let i=0;i<this.event.students.length;i++){
    //   alert("std")
    //   this.selectedStudents.push(this.event.students[i]._id);
    // }

    
    // //fill the selected other Speakers before Edit..
    //     for(let i=0;i<this.event.otherSpeakers.length;i++){
    //       this.selectedSpeakers.push(this.event.otherSpeakers[i]._id);
    //       this.selectedMainSpeaker=this.event.mainSpeaker._id;
    //       console.log(this.selectedMainSpeaker);
    //     }




    //get All Students
    this.adminService.getAllStudents().subscribe(d=>{

      for(let i=0;i<d.length;i++){
        this.stdIds.push(d[i]._id);

        //this condition to take the rest of the speakers that didn't selected as other Speakers..
       
      }
    });

    //get All Speakers
    this.adminService.getAllSpeakers().subscribe(d=>{

      for(let i=0;i<d.length;i++){
        this.spkIds.push(d[i]._id);
        if(d[i]._id!=this.selectedSpeakers[i]){

          this.MainSoeaker.push(d[i]._id)
        }
      }    
    })
    
  }



 
  @ViewChild('myForm') form: NgForm;
  Servermessage:string|undefined;
  sub:Subscription|null=null;
  singnUpType:string="/speaker/signup";
  serverError:boolean=false;//use it in confirm fun. to prevent navigate incase of error..




  onSubmit(){


    if(this.form.valid&&(this.selectedMainSpeaker!=0&&this.selectedSpeakers.length!=0&&this.selectedStudents.length!=0)){      
      let evekId=this.active.snapshot.params['id'];
      let s=new Date(this.form.value.date);
      let sentEvent=new EventSend(this.form.value.title,s,this.selectedMainSpeaker,this.selectedSpeakers,this.selectedStudents);
    this.sub=this.adminService.updateEvent(evekId,sentEvent).subscribe((d:any)=>{

      console.log(d);
         if(d.modifiedCount==1){
          this.Servermessage="Update Succeeded";
          this.serverError=false;
        }else if(d.modifiedCount==1)
        {
          this.Servermessage="update Failed";
        }
        
      },(err)=>{
        this.serverError=true;
        this.Servermessage=err.error.meassge;
        console.log(err);
      })
  
    }else{
      this.serverError=true;
      this.Servermessage="Registeration Form is Empty Please Fill All Required Fields"
    }
  
    }


  confirm(){

  
    if(this.form.valid&&!this.serverError){
      console.log("valid")
      this.router.navigate(['/admin/event'])
    }
  }
}
