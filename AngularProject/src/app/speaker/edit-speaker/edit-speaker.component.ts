import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccessService } from 'src/app/Access.service';
import { Address } from 'src/app/Models/Address';
import { Speaker } from 'src/app/Models/Speaker';
import { SpeakerService } from 'src/app/speaker.service';

@Component({
  selector: 'app-edit-speaker',
  templateUrl: './edit-speaker.component.html',
  styleUrls: ['./edit-speaker.component.css']
})
export class EditSpeakerComponent implements OnInit {

  constructor(private acc:AccessService,private speakService:SpeakerService ,private router:Router) { }

  ngOnInit(): void {
  }

  @ViewChild('myForm') form: NgForm;
add:Address=new Address("",'',0);
  Servermessage:string|undefined;
  sub:Subscription|null=null;
  singnUpType:string="/speaker/signup";
  serverError:boolean=false;//use it in confirm fun. to prevent navigate incase of error..




  onSubmit(){

    if(this.form.valid){
  
      // (public _id:number,public email:string,public userName:string,public password:string,public address:Address)
      this.add.city=this.form.value.city;
      this.add.street=this.form.value.street;
      this.add.building=this.form.value.building
      let spk=new Speaker(0,this.form.value.email,this.form.value.userName,this.form.value.password,this.add);
      let spkId=this.acc.getDecodedToken().id;
    this.sub=this.speakService.updateSpeaker(spkId,spk).subscribe((d:any)=>{
  
        console.log(d.s.modifiedCount);
        if(d.s.modifiedCount==1){
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
      this.router.navigate(['/speaker'])
    }
  }

}
