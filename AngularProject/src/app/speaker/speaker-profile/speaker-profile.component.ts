import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessService } from 'src/app/Access.service';
import { Address } from 'src/app/Models/Address';
import { Speaker } from 'src/app/Models/Speaker';
import { SpeakerService } from 'src/app/speaker.service';
import { StudentServiceService } from 'src/app/student-service.service';

@Component({
  selector: 'app-speaker-profile',
  templateUrl: './speaker-profile.component.html',
  styleUrls: ['./speaker-profile.component.css']
})
export class SpeakerProfileComponent implements OnInit {

  constructor(private acc:AccessService,private speakServ:SpeakerService) { 


  }
  ngOnDestroy(): void {
   this.sub?.unsubscribe();
  }

  spkID:number=0;
  address:Address=new Address("","",0);
  spk:Speaker=new Speaker(0,"","","",this.address);
  sub:Subscription|null=null;
  errorFlag:boolean=false;
  serverErrorMessage:string='';


  ngOnInit(): void {

    this.spkID=this.acc.getDecodedToken().id;

    this.sub=this.speakServ.getStudentData(this.spkID).subscribe(d=>{

      this.spk=d;
      console.log(this.spk)

    },(err)=>{

      console.log(err);
      
    })

    
  }
}
