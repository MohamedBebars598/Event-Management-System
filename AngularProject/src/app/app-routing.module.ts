import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './access/login/login.component';
import { SingUpTypeComponent } from './access/sing-up-type/sing-up-type.component';
import { SpeakerSignUpComponent } from './access/speaker-sign-up/speaker-sign-up.component';
import { StudentSignUpComponent } from './access/student-sign-up/student-sign-up.component';
import { CheckadminRoleGuard } from './guards/check-adminRole.guard';
import { CheckSpeakerRoleGuard } from './guards/check-speakerRole.guard';
import { CheckStudentRoleGuard } from './guards/check-studentRole.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signUp",component:SingUpTypeComponent},
  {path:"studentSignUp",component:StudentSignUpComponent},
  {path:"speakerSignUp",component:SpeakerSignUpComponent},
  {path:"student",loadChildren:()=>import('./student/student.module').then(m=>m.StudentModule),canActivate:[CheckStudentRoleGuard]},
  {path:"speaker",loadChildren:()=>import('./speaker/speaker.module').then(m=>m.SpeakerModule),canActivate:[CheckSpeakerRoleGuard]},
  {path:"admin",loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),canActivate:[CheckadminRoleGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
