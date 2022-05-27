import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { RegisteredEventComponent } from "./registered-event/registered-event.component";
import { StudentProfileComponent } from "./student-profile/student-profile.component";

const routes: Routes = [
    {path:"",component:StudentProfileComponent},
    {path:"editStudent",component:EditStudentComponent},
    {path:"RegisteredEvent",component:RegisteredEventComponent,children:[

      {path:"details/:id",component:DetailsComponent}
    ]}

  ];


  @NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
   
})
export class StudentRouter{



}