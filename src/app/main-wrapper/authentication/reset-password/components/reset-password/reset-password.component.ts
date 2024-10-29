import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../../core/services/authentication/authentication.service';
import { StyledToastComponent } from '../../../../../shared/components/styled-toast/styled-toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  protected form!: FormGroup;

  private token: string | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.createForm();

    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  protected onSubmit(): void {
    if (this.form.valid && this.token) {
      const { newPassword } = this.form.value;
      this.authenticationService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          this.snackbar.openFromComponent(StyledToastComponent, {
            duration: 5000,
            data: {
              icon: 'done',
              message: 'Password reset successfully. Redirecting to login...'
            },
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          setTimeout(() => this.router.navigate(['/authentication/login']), 2000);
        },
        error: (error) => {
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
      });
    }
  }

  protected createForm(): void {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.mustMatch('newPassword', 'confirmPassword') });
  }

  private mustMatch(controlName: string, matchingControlName: string): Validators {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }
}
