import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { EditSpeakerComponent } from "./edit-speaker/edit-speaker.component";
import { RegisteredEventComponent } from './registered-event/registered-event.component';
import { SpeakerProfileComponent } from "./speaker-profile/speaker-profile.component";
import { DetailsComponent } from "./details/details.component";


const routes: Routes = [
    {path:"",component:SpeakerProfileComponent},
    {path:"editSpeaker",component:EditSpeakerComponent},
    {path:"RegisteredEvent",component:RegisteredEventComponent,children:[



      {path:"details/:id",component:DetailsComponent}

    ]}


  ];




  
  @NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
   
})
export class SpeakerRouter{



}