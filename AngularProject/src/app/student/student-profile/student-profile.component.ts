import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AccessService } from 'src/app/Access.service';
import { Student } from 'src/app/Models/student';
import { StudentServiceService } from 'src/app/student-service.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit ,OnDestroy {

  //event emitter
@Output()onLogged:EventEmitter<Student>=new EventEmitter<Student>();

  constructor(private acc:AccessService,private studentServ:StudentServiceService) { 


  }
  ngOnDestroy(): void {
   this.sub?.unsubscribe();
  }

  stdID:number=0;
  std:Student=new Student(0,"","");
  sub:Subscription|null=null;
  errorFlag:boolean=false;
  serverErrorMessage:string='';


  ngOnInit(): void {

    this.stdID=this.acc.getDecodedToken().id;

    this.sub=this.studentServ.getStudentData(this.stdID).subscribe(d=>{

      this.std=d;

    },(err)=>{

      console.log(err);
      
    })

    
  }







}
