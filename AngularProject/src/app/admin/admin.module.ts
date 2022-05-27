import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStudentComponent } from './get-student/get-student.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AdminRouter } from './admin.Routes';
import { RouterModule } from '@angular/router';
import { StdEditRemoveComponent } from './std-edit-remove/std-edit-remove.component';
import { EditStudentFormComponent } from './edit-student-form/edit-student-form.component';
import { FormsModule } from '@angular/forms';
import { SpkEditRemoveComponent } from './spk-edit-remove/spk-edit-remove.component';
import { EditSpeakerFormComponent } from './edit-speaker-form/edit-speaker-form.component';
import { AccessModule } from '../access/access.module';
import { EventEditDeleteComponent } from './event-edit-delete/event-edit-delete.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddSpeakerToEventComponent } from './add-speaker-to-event/add-speaker-to-event.component';
import { AddStudentsToEventComponent } from './add-students-to-event/add-students-to-event.component';
import { AddEventComponent } from './add-event/add-event.component';

@NgModule({
  declarations: [
    GetStudentComponent,
    DashBoardComponent,
    StdEditRemoveComponent,
    EditStudentFormComponent,
    SpkEditRemoveComponent,
    EditSpeakerFormComponent,
    EventEditDeleteComponent,
    EventEditComponent,
    EventDetailsComponent,
    AddSpeakerToEventComponent,
    AddStudentsToEventComponent,
    AddEventComponent,
  ],
  imports: [
    CommonModule,AdminRouter,RouterModule,FormsModule,AccessModule,MultiSelectModule,DropdownModule
  ]
})
export class AdminModule { }
