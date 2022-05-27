import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/Models/student';
import { NgForm } from '@angular/forms';
import { AccessService } from 'src/app/Access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-sign-up',
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.css'],
 
})
export class StudentSignUpComponent implements OnInit {

  constructor(private signUp:AccessService,private router:Router) { }

  ngOnInit(): void {
  }

  @ViewChild('myForm') form: NgForm;

  Servermessage:string|undefined;
  serverError:boolean=false;
  singnUpType:string="/student/signup";
 onSubmit(){

  if(this.form.valid){

    let std=new Student(0,this.form.value.email,this.form.value.password);
    this.signUp.SignUp(std,this.singnUpType).subscribe((a:any)=>{
      this.Servermessage=a.Message;
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
      this.router.navigate(['/login'])
    }
  }

}
