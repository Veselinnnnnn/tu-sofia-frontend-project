import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from "./register-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import { SharedModule } from '../../../shared/shared.module';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
    imports: [
        RegisterRoutingModule,
        ReactiveFormsModule,
        NgIf,
        MatIcon,
        NgClass,
        NgStyle,
        SharedModule,
        MatFormField,
        MatInput,
        MatButton,
        MatLabel,
        MatError,
        MatPrefix,
        MatIcon,
        TranslateModule,
    ],
})
export class RegisterModule { }
