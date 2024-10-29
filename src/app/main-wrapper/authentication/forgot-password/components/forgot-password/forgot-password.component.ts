import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../../core/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  protected form!: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  protected onSubmit(): void {
    if (this.form.valid) {
      this.authenticationService.forgotPassword(this.form.value.email).subscribe(
        () => {
          this.snackbar.openFromComponent(StyledToastComponent, {
            duration: 5000,
            data: {
              icon: 'done',
              message: 'Reset link sent! Please check your email.'
            },
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        },
        (error) => {
          this.snackbar.openFromComponent(StyledToastComponent, {
            duration: 5000,
            data: {
              icon: 'error',
              message: error.error.message
            },
            panelClass: 'error-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      );
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }
}
