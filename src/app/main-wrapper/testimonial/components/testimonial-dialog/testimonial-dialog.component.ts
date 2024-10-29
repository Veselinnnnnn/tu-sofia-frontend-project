import { Component, Inject } from '@angular/core';
import { TestimonialService } from '../../../../core/services/testimonial/testimonial.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestimonialRequestModel } from '../../../../core/model/testimonial/TestimonialRequest.model';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { StyledToastComponent } from '../../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-testimonial-dialog',
  templateUrl: './testimonial-dialog.component.html',
  styleUrl: './testimonial-dialog.component.scss'
})
export class TestimonialDialogComponent {
  protected message: string = '';
  protected isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TestimonialDialogComponent>,
    private localStorageService: LocalStorageService,
    private testimonialService: TestimonialService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) {
    if (data?.testimonial) {
      this.isEditMode = true;
      this.message = data.testimonial.message;
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public submitFeedback(): void {
    const testimonialRequest: TestimonialRequestModel = {
      message: this.message,
      userId: this.localStorageService.get('userId'),
    };

    if (this.isEditMode) {
      this.testimonialService.updateTestimonial(this.data.testimonial.id, testimonialRequest).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.testimonialService.saveTestimonial(testimonialRequest).subscribe({
        next: (response) => {
          this.showSuccessSnackBar();
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.showErrorSnackBar(error.error.message);
        },
      });
    }
  }

  showSuccessSnackBar(): void {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'done',
        message: 'Thanks for feedback!'
      },
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  showErrorSnackBar(message: string): void {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'error',
        message: message
      },
      panelClass: 'error-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
