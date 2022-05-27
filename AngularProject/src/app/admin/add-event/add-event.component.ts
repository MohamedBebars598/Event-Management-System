import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { Address } from 'src/app/Models/Address';
import { EventSend } from 'src/app/Models/EventSend';
import { Speaker } from 'src/app/Models/Speaker';
import { Event } from '../../Models/Event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

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
      let dt=this.event.date.toString();
      this.date=dt?.split('T')[0];
  
  
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
        console.log(this.form.value.date)
        let sentEvent=new EventSend(this.form.value.title,this.form.value.date,this.selectedMainSpeaker,this.selectedSpeakers,this.selectedStudents);
        console.log(sentEvent);
      this.sub=this.adminService.CreateEvent(sentEvent).subscribe((d:any)=>{
        console.log(d);
           if(d.meassge=="Create Event"){
            this.Servermessage="Event Has Been Created";
            this.serverError=false;
          }else
          {
            this.Servermessage="Failed To Create An Event";
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
