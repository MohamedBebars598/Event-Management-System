import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/Access.service';
import { Student } from 'src/app/Models/student';
import { StudentServiceService } from 'src/app/student-service.service';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {



  constructor(private acc:AccessService,private student:StudentServiceService,private router:Router) { }

  ngOnInit(): void {
 }

 std:Student=new Student(0,"","");

  @ViewChild('myForm') form: NgForm;

  Servermessage:string|undefined;
  sub:Subscription|null=null;
  serverError:boolean=false;
  singnUpType:string="/student/signup";

 onSubmit(){

  if(this.form.valid){

    let std=new Student(0,this.form.value.email,this.form.value.password);
    let stdId=this.acc.getDecodedToken().id;
    this.sub=this.student.updateStudentData(stdId,std).subscribe((d:any)=>{

      console.log(d.modifiedCount);
      if(d.modifiedCount==1){
        this.Servermessage="Update Succeeded";
      }else{
        this.Servermessage="update Failed";
      }
      
    },(err)=>{
      this.Servermessage=err.error.meassge;
      console.log(err);
    })

  }else{
    this.Servermessage="Registeration Form is Empty Please Fill All Required Fields"
  }

  }


  confirm(){

    if(this.form.valid&&!this.serverError){
      console.log("valid")
      this.router.navigate(['/student'])
    }
  }





}
