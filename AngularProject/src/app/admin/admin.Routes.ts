
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AddEventComponent } from "./add-event/add-event.component";
import { AddSpeakerToEventComponent } from "./add-speaker-to-event/add-speaker-to-event.component";
import { AddStudentsToEventComponent } from "./add-students-to-event/add-students-to-event.component";
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { EditSpeakerFormComponent } from "./edit-speaker-form/edit-speaker-form.component";
import { EditStudentFormComponent } from "./edit-student-form/edit-student-form.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventEditDeleteComponent } from "./event-edit-delete/event-edit-delete.component";
import { EventEditComponent } from "./event-edit/event-edit.component";
import { SpkEditRemoveComponent } from "./spk-edit-remove/spk-edit-remove.component";
import { StdEditRemoveComponent } from "./std-edit-remove/std-edit-remove.component";

const routes: Routes = [
    {path:"",component:DashBoardComponent},
     {path:"student",component:StdEditRemoveComponent},
     {path:"speaker",component:SpkEditRemoveComponent},
     {path:"student/edit/:id",component:EditStudentFormComponent},
     {path:"speaker/edit/:id",component:EditSpeakerFormComponent},
     {path:"event",component:EventEditDeleteComponent},
     {path:"event/edit/:id",component:EventEditComponent},
     {path:"event/details/:id",component:EventDetailsComponent},
     {path:"event/addSpeaker",component:AddSpeakerToEventComponent},
     {path:"event/addStudents",component:AddStudentsToEventComponent},
     {path:"create",component:AddEventComponent},

]


  @NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
   
})
export class AdminRouter{



}