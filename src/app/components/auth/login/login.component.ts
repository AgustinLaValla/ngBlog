import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/shared/model/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  public minLength:number = 8;

  ngOnInit() {
  }


  login(form:NgForm){
    this.auth.singIn({email: form.value.email, password:form.value.password})
  }

}
