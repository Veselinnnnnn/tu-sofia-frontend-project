import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/authentication/user.service';
import { LocalStorageService } from '../../../core/services/utils/local-storage.service';
import { StyledToastComponent } from '../../../shared/components/styled-toast/styled-toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-advanced-info',
  templateUrl: './advanced-info.component.html',
  styleUrl: './advanced-info.component.scss'
})
export class AdvancedInfoComponent implements OnInit{
  userForm!: FormGroup;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.getUserAdvancedInfo();
  }

  protected getUserAdvancedInfo(): void {
    this.userService.getAdvancedInfo(
      Number(this.localStorageService.get('userId'))
    ).subscribe(
      (data) => {
        this.userForm.patchValue({
          userId: this.localStorageService.get('userId'),
          phoneNumber: data.phoneNumber,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          hasPreviousExperienceWithPets: data.hasPreviousExperienceWithPets,
          hasOtherPets: data.hasOtherPets,
          householdType: data.householdType,
          employmentStatus: data.employmentStatus,
          reasonForAdoption: data.reasonForAdoption,
          hasChildren: data.hasChildren,
          hasFencedYard: data.hasFencedYard,
          referenceContact: data.referenceContact,
          backgroundCheckStatus: data.backgroundCheckStatus
        });
      });
  }

  protected onSubmit(): void {
    if (this.userForm.valid) {
      const userId = this.route.snapshot.queryParams['id'];
      this.userService.updateAdvancedInfo(this.userForm.value).subscribe(
        (response) => {
          this.showSuccessSnackBar();
        },
      );
    }
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      userId: [this.localStorageService.get('userId'), Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      hasPreviousExperienceWithPets: [false],
      hasOtherPets: [false],
      householdType: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      reasonForAdoption: ['', Validators.required],
      hasChildren: [false],
      hasFencedYard: [false],
      referenceContact: ['', Validators.required],
      backgroundCheckStatus: ['', Validators.required]
    });
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
