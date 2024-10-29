import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../../../../core/services/authentication/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../../../core/services/utils/local-storage.service";
import { StyledToastComponent } from '../../../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected form!: FormGroup;
  protected isFormSubmitted: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
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
      this.userService.login(this.form.value).subscribe(
        (response) => {
          this.snackbar.openFromComponent(StyledToastComponent, {
            duration: 5000,
            data: {
              icon: 'done',
              message: 'Login successful!'
            },
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });

          const payload = JSON.parse(atob((response?.token).split('.')[1]));
          const expirationDate = new Date(Number(payload.exp) * 1000);
          const userId = Number(payload.sub);
          this.localStorageService.set('expires_at', expirationDate);
          this.localStorageService.set('userId', userId);
          this.localStorageService.set('token', response?.token);
          this.router.navigateByUrl('/home');
          this.clearForm();

        }, (error) => {
          console.log(error);
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

  private clearForm (): void {
    this.isFormSubmitted = false;
    this.form.reset();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
}
