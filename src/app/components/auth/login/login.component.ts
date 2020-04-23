import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  public minLength:number = 8;

  ngOnInit() { }

  login(form:NgForm){
    this.auth.signIn({email: form.value.email, password:form.value.password});
  };

};
