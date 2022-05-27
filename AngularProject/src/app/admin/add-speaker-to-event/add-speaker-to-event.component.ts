import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { Address } from 'src/app/Models/Address';
import { EventSend } from 'src/app/Models/EventSend';
import { Speaker } from 'src/app/Models/Speaker';
import { Event } from '../../Models/Event';

@Component({
  selector: 'app-add-speaker-to-event',
  templateUrl: './add-speaker-to-event.component.html',
  styleUrls: ['./add-speaker-to-event.component.css']
})
export class AddSpeakerToEventComponent implements OnInit {
  event:Event=new Event(0,'',new Date(),new Speaker(0,'','','',new Address('','',0)),[],[]);
  title:string='';
  date:string="";
  MainSoeaker:number[]=[];
  AllEvents:number[]=[];
  SpeakerType:string[]=['Main Speaker','Other Speaker'];
  otherSpeakers:number[]=[];
  selectedMainSpeaker:number=0;
  selectedEvent:number=0;
  selectedType:string='';
  SelectedOtherSpeakers:number[]=[];



    constructor(private adminService:AdminService ,private router:Router,private active:ActivatedRoute) { }
  
  
    ngOnInit(): void {
  
      //get All Events to choose from them ....
      this.adminService.getAllEvent().subscribe((d)=>{
        d.map((event,i)=>{
          this.AllEvents.push(event._id);
        })

      },(err)=>{

        this.Servermessage=err.error.meassge;
      })


      //get AllSpeakers to choose the Main Speaker....
      this.adminService.getAllSpeakers().subscribe((s)=>{

        s.map((speaker,i)=>{
            this.MainSoeaker.push(speaker._id);
            this.otherSpeakers.push(speaker._id);
        })
      },(err)=>{
        this.Servermessage=err.error.meassge;
      })
      
    }
  

  
  
   
    @ViewChild('myForm') form: NgForm;
    Servermessage:string|undefined;
    sub:Subscription|null=null;
    singnUpType:string="/speaker/signup";
    serverError:boolean=false;//use it in confirm fun. to prevent navigate incase of error..
  
  
  
  
    onSubmit(){
      
  
      if(this.form.valid&&(this.selectedMainSpeaker!=0||this.selectedEvent!=0)){      
        
        if(this.selectedType=="Main Speaker"){
      this.sub=this.adminService.addMainSpeaker(this.selectedEvent,this.selectedMainSpeaker).subscribe((d:any)=>{
  
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
      }else if(this.selectedType=="Other Speaker"){
        alert("ss")
        this.sub=this.adminService.addOtherSpeakers(this.selectedEvent,this.SelectedOtherSpeakers).subscribe((d:any)=>{
  
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
      }

      }else{
        this.serverError=true;
        this.Servermessage="update Form is Empty Please Fill All Required Fields"
      }
    
      }
  
  
    confirm(){
  
    
      if(this.form.valid&&!this.serverError){
        console.log("valid")
        this.router.navigate(['/admin/event'])
      }
    }

}
