import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { Address } from 'src/app/Models/Address';
import { Speaker } from 'src/app/Models/Speaker';

@Component({
  selector: 'app-edit-speaker-form',
  templateUrl: './edit-speaker-form.component.html',
  styleUrls: ['./edit-speaker-form.component.css']
})
export class EditSpeakerFormComponent implements OnInit {

  constructor(private adminService:AdminService ,private router:Router,private active:ActivatedRoute) { }

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
  
      alert("d5l")
      // (public _id:number,public email:string,public userName:string,public password:string,public address:Address)
      this.add.city=this.form.value.city;
      this.add.street=this.form.value.street;
      this.add.building=this.form.value.building
      let spk=new Speaker(0,this.form.value.email,"","",this.add);
      let spkId=this.active.snapshot.params['id'];
    this.sub=this.adminService.updateSpeaker(spkId,spk).subscribe((d:any)=>{
  
        console.log(d.modifiedCount);
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
      this.Servermessage="Registeration Form is Empty Please Fill All Required Fields"
    }
  
    }


  confirm(){

  
    if(this.form.valid&&!this.serverError){
      console.log("valid")
      this.router.navigate(['/admin/speaker'])
    }
  }
}
