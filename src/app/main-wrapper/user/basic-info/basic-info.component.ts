import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/authentication/user.service';
import { LocalStorageService } from '../../../core/services/utils/local-storage.service';
import { UserResponseModel } from '../../../core/model/user/UserResponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss'
})
export class BasicInfoComponent implements OnInit{
  data!: UserResponseModel;
  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.createForm();
    this.getBasicInfo();
  }

  private getBasicInfo() {
    const userId = this.localStorageService.get('userId');
    this.userService.getBasicInfo(userId).subscribe((data: UserResponseModel) => {
      this.data = data;
      this.userForm.patchValue(data);
    });
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      id: [''],
      username: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null],
      email: [null, [Validators.required, Validators.email]],
      role: [{ value: '', disabled: true }, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateBasicInfo(this.userForm.value).subscribe(() => {
        this.showSuccessSnackBar();
      });
    }
  }

  private showSuccessSnackBar() {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'done',
        message: 'User information updated successfully!'
      },
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
