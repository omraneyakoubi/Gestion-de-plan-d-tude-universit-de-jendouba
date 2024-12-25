import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; // Add this line


@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ]
})
export class LoginModule { }
