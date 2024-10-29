import { NgModule } from '@angular/core';
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import {NgIf} from "@angular/common";
import { SharedModule } from '../../../shared/shared.module';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
  ],
    imports: [
        ForgotPasswordRoutingModule,
        ReactiveFormsModule,
        NgIf,
        SharedModule,
        MatLabel,
        MatFormField,
        MatInput,
        MatButton,
        MatError,
        MatIconModule,
        MatPrefix,
        TranslateModule
    ],
})
export class ForgotPasswordModule { }
