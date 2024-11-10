import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../../core/services/animal/animal.service';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { ApplicationService } from '../../../../core/services/application/application.service';
import { StyledToastComponent } from '../../../../shared/components/styled-toast/styled-toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { log } from 'node:util';
import { UserService } from '../../../../core/services/authentication/user.service';
import { response } from 'express';
import { ApplicationDetailsService } from '../../../../core/services/application-details/application-details.service';

@Component({
  selector: 'app-request-adoption',
  templateUrl: './request-adoption.component.html',
  styleUrls: ['./request-adoption.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestAdoptionComponent implements OnInit {
  defaultAnimalId!: number;
  adoptionForm!: FormGroup;
  isLoading: boolean = false;
  protected animals: AnimalResponseModel[] = [];
  defaultAnimalName: string | undefined;
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RequestAdoptionComponent>,
    private localStorageService: LocalStorageService,
    private applicationService: ApplicationService,
    private applicationDetailsService: ApplicationDetailsService,
    private animalService: AnimalService,
    private userService: UserService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // If requestId is provided, fetch application and details data
    if (this.data.request?.id) {
      // Fetch application data
      this.isEditMode = true;
      this.applicationService.getApplicationById(this.data.request.id).subscribe((applicationResponse) => {
        console.log("Application Response", applicationResponse);

        // Patch the form with application data
        this.adoptionForm.patchValue({
          email: applicationResponse.email || '',
          animalId: applicationResponse.animalId || this.defaultAnimalId,
          pickUpTime: this.convertTo12HourFormat(applicationResponse.pickUpTime?.toString() || ''),
          returnTime: this.convertTo12HourFormat(applicationResponse.returnTime?.toString() || ''),
          // If there are other fields from applicationResponse you need to map, add them here
        });

        // Fetch and patch application details
        this.applicationDetailsService.getApplicationDetailsByApplicationId(this.data.request.id).subscribe((detailsResponse) => {
          console.log("Application Details Response", detailsResponse);

          // Patch the form with application details data
          this.adoptionForm.patchValue({
            firstName: detailsResponse.firstName || '',
            lastName: detailsResponse.lastName || '',
            phoneNumber: detailsResponse.phoneNumber || '',
            address: detailsResponse.address || '',
            city: detailsResponse.city || '',
            state: detailsResponse.state || '',
            postalCode: detailsResponse.postalCode || '',
            country: detailsResponse.country || '',
            reasonForAdoption: detailsResponse.reasonForAdoption || '',
            hasPreviousExperienceWithPets: detailsResponse.hasPreviousExperienceWithPets || false,
            hasOtherPets: detailsResponse.hasOtherPets || false,
            hasChildren: detailsResponse.hasChildren || false,
            hasFencedYard: detailsResponse.hasFencedYard || false,
            referenceContact: detailsResponse.referenceContact || '',
            backgroundCheckStatus: detailsResponse.backgroundCheckStatus || ''
          });
        });
      });
    } else {
      // Default behavior for a new request
      if (this.data.animalId && this.data.animalName) {
        this.setDefaultAnimal();
      }

      this.userService.getBasicInfo(Number(this.localStorageService.get('userId'))).subscribe((basicInfoResponse) => {
        console.log("Basic Info Response", basicInfoResponse);

        this.adoptionForm.patchValue({
          firstName: basicInfoResponse.firstName || '',
          lastName: basicInfoResponse.lastName || '',
          email: basicInfoResponse.email || ''
        });
      });

      this.userService.getAdvancedInfo(Number(this.localStorageService.get('userId'))).subscribe((response) => {
        console.log("Backend Response", response);

        this.adoptionForm.patchValue({
          phoneNumber: response?.phoneNumber || '',
          address: response.address || '',
          city: response.city || '',
          state: response.state || '',
          postalCode: response.postalCode || '',
          country: response.country || '',
          reasonForAdoption: response.reasonForAdoption || '',
          hasPreviousExperienceWithPets: response.hasPreviousExperienceWithPets || false,
          hasOtherPets: response.hasOtherPets || false,
          hasChildren: response.hasChildren || false,
          hasFencedYard: response.hasFencedYard || false,
          referenceContact: response.referenceContact || '',
          backgroundCheckStatus: response.backgroundCheckStatus || ''
        });
      });

      this.animalService.getAllAnimals().subscribe((response: AnimalResponseModel[]) => {
        this.animals = response;
      });
    }

    // Initialize the form
    this.adoptionForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [this.data?.request?.email || '', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      reasonForAdoption: ['', Validators.required],
      animalId: [this.data?.request?.animalId || this.defaultAnimalId, Validators.required],
      hasPreviousExperienceWithPets: [false, Validators.required],
      hasOtherPets: [false, Validators.required],
      hasChildren: [false, Validators.required],
      hasFencedYard: [false, Validators.required],
      referenceContact: ['', Validators.required],
      backgroundCheckStatus: ['', Validators.required],
    });
  }



  private convertTo12HourFormat(time24: string): string {
    if (time24) {
      const [hours24, minutes] = time24.split(':').map(Number);
      let period = 'AM';
      let hours12 = hours24;

      if (hours24 >= 12) {
        period = 'PM';
        if (hours24 > 12) {
          hours12 = hours24 - 12;
        }
      } else if (hours24 === 0) {
        hours12 = 12;
      }

      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return '';
  }

  onSubmit(): void {
    console.log(this.adoptionForm);
    if (this.adoptionForm.valid) {
      if(!this.isEditMode) {
        this.isLoading = true;
        const formData = this.adoptionForm.value;
        // Process the form data here
        console.log('Form Data:', formData);
        const applicationRequest = this.createApplicationRequest();
        this.applicationService.create({ applicationRequest, applicationDetailsRequest: this.adoptionForm.value }).subscribe(
          (response) => {
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'done',
                message: 'Adoption request successfully submitted',
              },
              panelClass: 'success-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });

            this.isLoading = false;
            this.dialogRef.close(formData);
          },
          () => {
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'error',
                message: 'Error submitting adoption request',
              },
              panelClass: 'error-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });

            this.isLoading = false;
          }
        )
      } else {
        // Update existing application request
        const applicationId = this.data.request.id; // Get the existing application ID
        const applicationRequest = this.createApplicationRequest(applicationId); // Adjust to pass application ID
        const applicationDetailsRequest = this.adoptionForm.value; // Use the form data directly

        this.applicationService.update(applicationId, { applicationRequest, applicationDetailsRequest }).subscribe(
          (response) => {
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'done',
                message: 'Adoption request successfully updated',
              },
              panelClass: 'success-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });

            this.isLoading = false;
            this.dialogRef.close(applicationDetailsRequest);
          },
          () => {
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'error',
                message: 'Error updating adoption request',
              },
              panelClass: 'error-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });

            this.isLoading = false;
          }
        );
      }
      // Close the dialog and pass data to parent component
    } else {
      // Handle form validation errors if needed
      console.log('Form is not valid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private createApplicationRequest(applicationId?: number) {
    return {
      id: applicationId, // Add this line to pass the existing application ID
      userId: this.localStorageService.get('userId'),
      name: this.adoptionForm.get('firstName')!.value ?? '',
      email: this.adoptionForm.get('email')!.value ?? '',
      requestType: "ADOPTION", // Convert string to enum if necessary
      animalId: this.adoptionForm.get('animalId')!.value ?? '',
      pickUpTime: null, // Convert to LocalTime
      returnTime: null, // Convert to LocalTime
      date: new Date(), // Assuming the date is in the correct format
    };
  }

  private setDefaultAnimal(response?: AnimalResponseModel) {
    this.defaultAnimalId = response?.id || this.data.animalId;
    this.defaultAnimalName = response?.name || this.data.animalName;
    this.animals = [{name: this.defaultAnimalName, id: this.defaultAnimalId} as AnimalResponseModel];
  }
}
