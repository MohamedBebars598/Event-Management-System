import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-add-students-to-event',
  templateUrl: './add-students-to-event.component.html',
  styleUrls: ['./add-students-to-event.component.css']
})
export class AddStudentsToEventComponent implements OnInit {
  students:number[]=[];
  AllEvents:number[]=[];
  selectedEvent:number=0;
  selectedStudent:number[]=[];
  @ViewChild('myForm') form: NgForm;
  Servermessage:string|undefined;
  sub:Subscription|null=null;
  singnUpType:string="/speaker/signup";
  serverError:boolean=false;//use it in confirm fun. to prevent navigate incase of error..



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
      this.adminService.getAllStudents().subscribe((s)=>{

        s.map((student,i)=>{
            this.students.push(student._id);
        })
      },(err)=>{
        this.Servermessage=err.error.meassge;
      })
      
    }
  

  

    onSubmit(){
      
  
      if(this.form.valid&&this.selectedStudent.length!=0){      
        
    
      this.sub=this.adminService.addStudents(this.selectedEvent,this.selectedStudent).subscribe((d:any)=>{
  
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
