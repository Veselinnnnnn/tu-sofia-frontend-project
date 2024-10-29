import { NgModule } from '@angular/core';
import { ResetPasswordRoutingModule } from "./reset-password-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import {NgIf} from "@angular/common";
import { SharedModule } from '../../../shared/shared.module';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ResetPasswordComponent,
  ],
    imports: [
        ResetPasswordRoutingModule,
        ReactiveFormsModule,
        NgIf,
        SharedModule,
        MatLabel,
        MatFormField,
        MatInput,
        MatButton,
        MatError,
        MatIcon,
        MatPrefix,
        TranslateModule
    ],
})
export class ResetPasswordModule { }
