import { StyledToastComponent } from '../../../../../shared/components/styled-toast/styled-toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/authentication/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  protected form!: FormGroup;
  protected isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  protected submit(): void {
    this.isFormSubmitted = true;

    if (this.form.valid) {
      this.userService.register(this.form.value).subscribe(
        () => {
          this.snackbar.openFromComponent(StyledToastComponent, {
            duration: 5000,
            data: {
              icon: 'done',
              message: 'Registration successful!'
            },
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.router.navigateByUrl('/home');
        }, () => {
          this.snackbar.openFromComponent(StyledToastComponent, {
            duration: 5000,
            data: {
              icon: 'error',
              message: 'Registration failed!'
            },
            panelClass: 'error-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      );

      this.clearForm();
    }
  }

  private clearForm(): void {
    this.isFormSubmitted = false;
    this.form.reset();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
}
