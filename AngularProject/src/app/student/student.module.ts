import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentRouter } from './student.Routes';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisteredEventComponent } from './registered-event/registered-event.component';
import { DetailsComponent } from './details/details.component';
import { AccessModule } from '../access/access.module';



@NgModule({
  declarations: [
    StudentProfileComponent,
    EditStudentComponent,
    RegisteredEventComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,StudentRouter,RouterModule,FormsModule,StudentRouter,AccessModule
  ],

  exports:[
    StudentProfileComponent,EditStudentComponent,DetailsComponent
  ]
})
export class StudentModule { }
