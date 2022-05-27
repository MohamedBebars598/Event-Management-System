import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Speaker } from 'src/app/Models/Speaker';

@Component({
  selector: 'app-spk-edit-remove',
  templateUrl: './spk-edit-remove.component.html',
  styleUrls: ['./spk-edit-remove.component.css']
})
export class SpkEditRemoveComponent implements OnInit {

  spks:Speaker[]=[];
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
this.adminService.getAllSpeakers().subscribe(d=>{
this.spks=d;
},err=>{

  console.log(err);
})



  }



  removespk(id:number){

    this.adminService.deleteSpeaker(id).subscribe(d=>{

      for(let i=0;i<this.spks.length;i++){
        if(this.spks[i]._id==id){
  
          let index=this.spks.indexOf(this.spks[i])
          this.spks.splice(index,1);
        }
      }
    },err=>{

      console.log(err);
    })

    
  }

}
