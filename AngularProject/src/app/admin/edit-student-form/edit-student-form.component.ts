import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { Student } from 'src/app/Models/student';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.css']
})
export class EditStudentFormComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private Active:ActivatedRoute) { }

  ngOnInit(): void {
  }

  @ViewChild('myForm') form: NgForm;

  Servermessage:string|undefined;
  serverError:boolean=false;
 onSubmit(){

  if(this.form.valid){

    let std=new Student(0,this.form.value.email,"");
    let stdIndex=this.Active.snapshot.params['id'];
    this.adminService.updateStudent(stdIndex,std).subscribe((a:any)=>{
      if(a.modifiedCount==1){

        this.Servermessage="updated Successfully"
        this.serverError=false;
      }else if(a.modifiedCount==0){

        this.Servermessage="No Changes";
      }
    },err=>{
      this.Servermessage=err.error.meassge;
      this.serverError=true;
      console.log(this.Servermessage)
    })

  }else{
    this.Servermessage="Registeration Form is Empty Please Fill All Required Fields"
  }

  }


  confirm(){

    if(this.form.valid&&!this.serverError){
      console.log("valid")
      this.router.navigate(['/admin/student'])
    }
  }

}
