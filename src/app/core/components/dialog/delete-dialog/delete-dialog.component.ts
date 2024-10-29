import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../../../services/comment/comment.service';
import { ApplicationService } from '../../../services/application/application.service';
import { AnimalService } from '../../../services/animal/animal.service';
import { EventService } from '../../../services/event/event.service';
import { TestimonialService } from '../../../services/testimonial/testimonial.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService,
    private applicationService: ApplicationService,
    private testimonialService: TestimonialService,
    private animalService: AnimalService,
    private eventService: EventService,
    private snackbar: MatSnackBar,
  ) {}

  protected onConfirm(): void {
    if(this.data.type === 'comment') {
      this.commentService.deleteComment(this.data.id).subscribe(
        () => {
          this.showSuccessSnackBar();
          this.dialogRef.close(true);
        },
        (error) => {
          this.showErrorSnackBar(error.error.message);
        }
      );
    }

    if(this.data.type === 'application') {
      this.applicationService.delete(this.data.id).subscribe(
        () => {
          this.showSuccessSnackBar();
          this.dialogRef.close(true);
        },
        (error) => {
          this.showErrorSnackBar(error.error.message);
        }
      );
    }

    if(this.data.type === 'animal') {
      this.animalService.deleteAnimal(this.data.id).subscribe(
        () => {
          this.showSuccessSnackBar();
          this.dialogRef.close(true);
        },
        (error) => {
          this.showErrorSnackBar(error.error.message);
        }
      );
    }

    if(this.data.type === 'event') {
      this.eventService.deleteEvent(this.data.id).subscribe(
        () => {
          this.showSuccessSnackBar();
          this.dialogRef.close(true);
        },
        (error) => {
          this.showErrorSnackBar(error.error.message);
        }
      );
    }

    if(this.data.type === 'testimonial') {
      this.testimonialService.deleteTestimonial(this.data.id).subscribe(
        () => {
          this.showSuccessSnackBar();
          this.dialogRef.close(true);
        },
        (error) => {
          this.showErrorSnackBar(error.error.message);
        }
      );
    }
  }

  protected onCancel(): void {
    this.dialogRef.close(false);
  }

  private showSuccessSnackBar(): void {
    this.snackbar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'done',
        message: `The ${this.data.type} has been successfully deleted`
      },
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private showErrorSnackBar(message: string): void {
    this.snackbar.openFromComponent(StyledToastComponent, {
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
