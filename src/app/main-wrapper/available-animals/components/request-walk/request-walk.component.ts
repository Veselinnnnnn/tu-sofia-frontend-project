import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../../core/services/animal/animal.service';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApplicationService } from '../../../../core/services/application/application.service';
import { StyledToastComponent } from '../../../../shared/components/styled-toast/styled-toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';

@Component({
  selector: 'app-request-walk',
  templateUrl: './request-walk.component.html',
  styleUrl: './request-walk.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestWalkComponent implements OnInit {
  walkForm!: FormGroup;

  defaultAnimalId: number | undefined;
  defaultAnimalName: string | undefined;
  editMode: boolean = false;
  isLoading = false;

  protected animals: AnimalResponseModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private snackbar: MatSnackBar,
    private applicationService: ApplicationService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<RequestWalkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    if (this.data.animalId && this.data.animalName) {
      this.setDefaultAnimal();
    }

    if (this.data?.request?.animalId) {
      this.editMode = true;
      this.animalService.getAnimal(
        this.data?.request?.animalId,
        Number(this.localStorageService.get('userId'))
      ).subscribe((response) => {
        this.setDefaultAnimal(response);
      });
    }

    this.createForm();

    this.animalService.getAllAnimals().subscribe(response => {
      this.animals = response;
      this.walkForm.get('animalId')?.setValue(this.defaultAnimalId);
    });
  }

  onSubmit() {
    if (this.walkForm.valid) {
      this.isLoading = true;
      const pickUpTime = this.convertTo24HourFormat(this.walkForm.get('pickUpTime')?.value);
      const returnTime = this.convertTo24HourFormat(this.walkForm.get('returnTime')?.value);

      const requestPayload = {
        ...this.walkForm.value,
        pickUpTime: pickUpTime,
        returnTime: returnTime,
        requestType: 'WALK',
        userId: Number(this.localStorageService.get('userId')),
      };

      if (this.data?.request?.id) {
        this.applicationService.update(this.data.request.id, {applicationRequest: requestPayload}).subscribe({
          next: (response) => {
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'done',
                message: 'Request successfully updated'
              },
              panelClass: 'success-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });

            this.isLoading = false;
            this.dialogRef.close();
          },
          error: (error) => {
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'error',
                message: 'Error submitting request'
              },
              panelClass: 'error-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });

            this.isLoading = false;
          },
        });
      } else {
        // Create a new request
        this.applicationService.create({ applicationRequest: requestPayload }).subscribe({
          next: (response) => {
            console.log('Request successfully submitted');
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'done',
                message: 'Request successfully submitted'
              },
              panelClass: 'success-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });

            this.isLoading = false;
            this.dialogRef.close();
          },
          error: (error) => {
            this.snackbar.openFromComponent(StyledToastComponent, {
              duration: 5000,
              data: {
                icon: 'error',
                message: 'Error submitting request'
              },
              panelClass: 'error-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });

            this.isLoading = false;
          },
        });
      }
    }
  }

  private setDefaultAnimal(response?: AnimalResponseModel) {
    this.defaultAnimalId = response?.id || this.data.animalId;
    this.defaultAnimalName = response?.name || this.data.animalName;
    this.animals = [{name: this.defaultAnimalName, id: this.defaultAnimalId} as AnimalResponseModel];
  }

  private createForm() {
    this.walkForm = this.formBuilder.group({
      name: [this.data?.request?.name || '', Validators.required],
      email: [this.data?.request?.email || '', [Validators.required, Validators.email]],
      date: [this.data?.request?.date || '', Validators.required],
      animalId: [this.data?.request?.animalId || this.defaultAnimalId, Validators.required],
      pickUpTime: [this.convertTo12HourFormat(this.data?.request?.pickUpTime) || '', Validators.required],
      returnTime: [this.data?.request?.returnTime || {value: '', disabled: true}],
    });

    this.walkForm.get('pickUpTime')?.valueChanges.subscribe(pickUpTime => {
      if (pickUpTime) {
        this.updateReturnTime(pickUpTime);
      }
    });
  }

  private updateReturnTime(pickUpTime: string) {
    const [time, period] = pickUpTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let hours24 = hours;
    if (period === 'PM' && hours !== 12) hours24 += 12;
    if (period === 'AM' && hours === 12) hours24 = 0;

    const pickUpDate = new Date();
    pickUpDate.setHours(hours24, minutes, 0, 0);

    const returnDate = new Date(pickUpDate.getTime() + 60 * 60 * 1000);

    const returnHours = returnDate.getHours().toString().padStart(2, '0');
    const returnMinutes = returnDate.getMinutes().toString().padStart(2, '0');
    const returnTime = `${returnHours}:${returnMinutes}`;

    this.walkForm.get('returnTime')?.setValue(returnTime, {emitEvent: false});
  }

  private convertTo24HourFormat(pickUpTime: string): string {
    const [time, period] = pickUpTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let formattedHours = hours;

    if (hours === 12) {
      formattedHours = 0;
    } else if (hours > 12) {
      formattedHours = hours - 12;
    }

    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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
}
