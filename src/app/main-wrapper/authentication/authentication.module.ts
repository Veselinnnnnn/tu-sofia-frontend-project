import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
  ],
  imports: [
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ],
})
export class AuthenticationModule { }
