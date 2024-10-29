import { NgModule } from '@angular/core';
import { StyledButtonComponent } from './components/styled-button/styled-button.component';
import { StyledToastComponent } from './components/styled-toast/styled-toast.component';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@NgModule({
  declarations: [
    StyledButtonComponent,
    StyledToastComponent,
  ],
  imports: [
    MatIcon,
    NgIf
  ],
  exports: [
    StyledButtonComponent,
    StyledToastComponent,
  ]
})
export class SharedModule { }
