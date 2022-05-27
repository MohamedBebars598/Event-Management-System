import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerProfileComponent } from './speaker-profile/speaker-profile.component';
import { SpeakerRouter } from './speaker.Routes';
import { RouterModule } from '@angular/router';
import { EditSpeakerComponent } from './edit-speaker/edit-speaker.component';
import { FormsModule } from '@angular/forms';
import { RegisteredEventComponent } from './registered-event/registered-event.component';
import { DetailsComponent } from './details/details.component';
import { AccessModule } from '../access/access.module';



@NgModule({
  declarations: [
    SpeakerProfileComponent,
    EditSpeakerComponent,
    RegisteredEventComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SpeakerRouter,
    RouterModule,
    SpeakerRouter,
    FormsModule,
    AccessModule
  ]
  ,
  exports:[SpeakerProfileComponent,EditSpeakerComponent]
})
export class SpeakerModule { }
