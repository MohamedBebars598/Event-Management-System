import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { StudentSignUpComponent } from './student-sign-up/student-sign-up.component';
import { FormsModule } from '@angular/forms';
import { EmailValidatorDirective } from '../shared/EmailValidation.directive';
import { PasswordValidatorDirective } from '../shared/PasswordValidation.directive';
import {HttpClientModule} from '@angular/common/http';
import { ModalMessageComponent } from './modal-message/modal-message.component'
import { UserNameValidatorDirective } from '../shared/UserNameValidation.directive';
import { CityValidatorDirective } from '../shared/CityValidation.directive';
import { StreetValidatorDirective } from '../shared/StreetValidation.directive';
import { BuildingNumberValidatorDirective } from '../shared/BuildingValidaion.directive';
import { SpeakerSignUpComponent } from './speaker-sign-up/speaker-sign-up.component';
import { SingUpTypeComponent } from './sing-up-type/sing-up-type.component';
import { RouterModule } from '@angular/router';
import { StudentRouter } from '../student/student.Routes';
import { DateValidatorDirective } from '../shared/DateValidation.directive';






@NgModule({
  declarations: [
    LoginComponent,
    StudentSignUpComponent,
    ModalMessageComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    UserNameValidatorDirective,
    DateValidatorDirective,
    CityValidatorDirective,
    StreetValidatorDirective,
    BuildingNumberValidatorDirective,
    SpeakerSignUpComponent,
    SingUpTypeComponent,
  
    
  ],
  imports: [
    CommonModule,FormsModule,HttpClientModule,RouterModule,StudentRouter
  ],
  exports:[LoginComponent,
    StudentSignUpComponent,
    ModalMessageComponent,
    SpeakerSignUpComponent,
    SingUpTypeComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    UserNameValidatorDirective,
    CityValidatorDirective,
    StreetValidatorDirective,
    BuildingNumberValidatorDirective,
    DateValidatorDirective
  ]
})
export class AccessModule { }
