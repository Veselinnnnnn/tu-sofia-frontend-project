import { NgModule } from '@angular/core';
import { MainRoutingModule } from "./main-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@NgModule({

  declarations: [],
  imports: [
    MainRoutingModule,
    ReactiveFormsModule,
    MatIcon,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    NgIf
  ],
  exports: []
})
export class MainModule { }
