//Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms' 
//Child Routes
import { LoginRoutingModule } from './login-routing.module';

//Components
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [FormsModule]
})
export class LoginModule { }
