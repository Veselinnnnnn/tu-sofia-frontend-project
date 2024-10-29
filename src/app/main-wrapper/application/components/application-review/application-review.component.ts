import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../../core/services/application/application.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationResponse } from '../../../../core/model/application/ApplicationResponse.model';
import { AnimalService } from '../../../../core/services/animal/animal.service';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrl: './application-review.component.scss'
})
export class ApplicationReviewComponent implements OnInit {
  applicationForm!: FormGroup;
  applicationId!: number;
  application!: ApplicationResponse;
  animalName!: string;
  isLoading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private localStorageService: LocalStorageService,
    private animalService: AnimalService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadApplicationData();
  }

  onSubmit(): void {
    this.isLoading = true; // Show loader
    this.applicationService.approveApplication(this.application.id).subscribe(
      response => {
        this.showSuccessSnackBar();
        this.router.navigate(['/home']); // Adjust the path as needed
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.showErrorSnackBar();
      }
    );
  }

  onDecline(): void {
    this.isLoading = true; // Show loader
    this.applicationService.declineApplication(this.application.id).subscribe(
      response => {
        this.showSuccessSnackBar();
        this.router.navigate(['/home']); // Adjust the path as needed
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.showErrorSnackBar();
      }
    );
  }

  showSuccessSnackBar() {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'done',
        message: 'Your action was successful!'
      },
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  showErrorSnackBar() {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'error',
        message: 'An error occurred. Please try again!'
      },
      panelClass: 'error-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private initializeForm(): void {
    this.applicationForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      name: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      requestType: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}],
      animalName: [{value: '', disabled: true}], // Change from animalId to animalName
      pickUpTime: [{value: '', disabled: true}],
      returnTime: [{value: '', disabled: true}],
      date: [{value: '', disabled: true}]
    });
  }

  private loadApplicationData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.applicationService.get(+id).subscribe(
        (data: ApplicationResponse) => {
          this.application = data;
          this.applicationForm.patchValue(data);
          this.loadAnimalName(data.animalId); // Fetch the animal name
        },
        error => {
          console.error('Error loading application data', error);
        }
      );
    }
  }

  private loadAnimalName(animalId: number): void {
    this.animalService.getAnimal(
      animalId,
      Number(this.localStorageService.get('userId')),
    ).subscribe(
      (animal: AnimalResponseModel) => {
        this.animalName = animal.name;
        this.applicationForm.get('animalName')?.setValue(this.animalName);
      },
      error => {
      }
    );
  }

  get isNew(): boolean {
    console.log(this.applicationForm.get('status')?.value);
    return !(this.applicationForm.get('status')?.value === 'PENDING');
  }
}
