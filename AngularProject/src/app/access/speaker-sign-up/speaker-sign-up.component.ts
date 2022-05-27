import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/Access.service';
import { Address } from 'src/app/Models/Address';
import { Speaker } from 'src/app/Models/Speaker';

@Component({
  selector: 'app-speaker-sign-up',
  templateUrl: './speaker-sign-up.component.html',
  styleUrls: ['./speaker-sign-up.component.css']
})
export class SpeakerSignUpComponent implements OnInit {

  constructor(public signUp:AccessService,public router:Router) { }

  ngOnInit(): void {
  }

  @ViewChild('myForm') form: NgForm;
add:Address=new Address("",'',0);
  Servermessage:string|undefined;
  singnUpType:string="/speaker/signup";
  serverError:boolean=false;//use it in confirm fun. to prevent navigate incase of error..
 onSubmit(){
  console.log(this.form);
  if(this.form.valid){
this.add.city=this.form.value.city;
this.add.street=this.form.value.street;
this.add.building=this.form.value.building
    let std=new Speaker(0,this.form.value.email,this.form.value.userName,this.form.value.password,this.add);
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
      this.router.navigate(['/login'])
    }
  }
}
