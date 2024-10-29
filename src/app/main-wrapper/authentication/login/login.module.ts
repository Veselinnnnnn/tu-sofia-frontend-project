import { NgModule } from '@angular/core';
import { LoginRoutingModule } from "./login-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import {NgIf} from "@angular/common";
import { SharedModule } from '../../../shared/shared.module';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent,
  ],
    imports: [
        LoginRoutingModule,
        ReactiveFormsModule,
        NgIf,
        SharedModule,
        MatLabel,
        MatFormField,
        MatInput,
        MatButton,
        MatError,
        MatIcon,
        MatIconModule,
        MatPrefix,
        TranslateModule,
    ],
})
export class LoginModule { }
