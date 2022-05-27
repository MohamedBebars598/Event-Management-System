import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AccessService } from 'src/app/Access.service';
import { userLogin } from '../../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private signUp: AccessService,private router:Router) {}

  ngOnInit(): void {}

  @ViewChild('myForm') form: NgForm;

  def: string = '-1';
  Servermessage: string = '';
  loginType: string = '';
  token: string = '';

  //functions
  //submitForm
  onSubmit() {
    console.log(this.form);
    if (this.form.valid&&this.form.value.loginType!=-'1') {
      let user = new userLogin(this.form.value.email, this.form.value.password);
      this.signUp.userLogin(user, this.loginType).subscribe(
        (a: any) => {
          this.token = a.token;
          localStorage.setItem('token', this.token);

          if(this.signUp.getDecodedToken().role=="student"){
              //event emitter
            this.router.navigate(['student']);
          }else if(this.signUp.getDecodedToken().role=="speaker"){
            this.router.navigate(['speaker']);
          }else if(this.signUp.getDecodedToken().role=="admin"){
            this.router.navigate(['admin']);
          }
          console.log(this.signUp.getDecodedToken().role);
        },
        (err) => {
          this.Servermessage = err.error.meassge;
        }
      );
    } else {
      this.Servermessage =
        'Login Form is Empty Please Fill All Required Fields';
        console.log(this.Servermessage)
    }
  }

  onChange(s: any) {
    console.log(s.value);
    if (s.value == 'speaker') {
      this.loginType = '/login/speaker';
    } else if (s.value === 'student') {
      this.loginType = '/login/student';
    } else if (s.value === 'admin') {
      this.loginType = '/login/admin';
    }
  }
}
