import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Student } from 'src/app/Models/student';

@Component({
  selector: 'app-std-edit-remove',
  templateUrl: './std-edit-remove.component.html',
  styleUrls: ['./std-edit-remove.component.css']
})
export class StdEditRemoveComponent implements OnInit {

  stds:Student[]=[];
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
this.adminService.getAllStudents().subscribe(d=>{
this.stds=d;
},err=>{

  console.log(err);
})



  }



  removeStd(id:number){

    this.adminService.deleteStudent(id).subscribe(d=>{

      for(let i=0;i<this.stds.length;i++){
        if(this.stds[i]._id==id){
  
          let index=this.stds.indexOf(this.stds[i])
          this.stds.splice(index,1);
        }
      }
    },err=>{

      console.log(err);
    })

    
  }

}
