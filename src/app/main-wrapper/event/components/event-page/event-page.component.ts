import { Component, OnInit } from '@angular/core';
import { EventResponseModel } from '../../../../core/model/event/EventResponse.model';
import { EventRequest } from '../../../../core/model/event/EventRequest.model';
import { EventService } from '../../../../core/services/event/event.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../../shared/components/styled-toast/styled-toast.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocalStorageService } from '../../../../core/services/utils/local-storage.service';
import { UserService } from '../../../../core/services/authentication/user.service';
import { DeleteDialogComponent } from '../../../../core/components/dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

class CustomErrorMatcher implements ErrorStateMatcher {
  private resetFlag = false;

  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (this.resetFlag) {
      return false;
    }

    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }

  setResetFlag(value: boolean): void {
    this.resetFlag = value;
  }
}

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent implements OnInit{
  protected events: EventResponseModel[] = [];
  protected pastEvents: EventResponseModel[] = [];
  protected eventForm!: FormGroup;
  protected editMode = false;
  protected errorMatcher: CustomErrorMatcher = new CustomErrorMatcher();
  protected isAdmin = false;

  private currentEventId: number | null = null;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.loadEvents();
    this.loadPastEvents();
    this.checkAdminStatus();
  }

  protected createEvent(): void {
    if (this.isAdmin && this.eventForm.valid) {
      const eventRequest: EventRequest = this.eventForm.value;
      this.eventService.createEvent(eventRequest).subscribe({
        next: () => {
          this.loadEvents();
          this.loadPastEvents();
          this.resetForm();
          this.showSuccessSnackBar();
        },
        error: (error) => this.showErrorSnackBar(error.error.message),
      });
    }
  }

  protected editEvent(event: EventResponseModel): void {
    if (this.isAdmin) {
      this.eventForm.patchValue(event);
      this.editMode = true;
      this.currentEventId = event.id;
    }
  }

  protected updateEvent(): void {
    if (this.isAdmin && this.currentEventId && this.eventForm.valid) {
      const eventRequest: EventRequest = this.eventForm.value;
      this.eventService.updateEvent(this.currentEventId, eventRequest).subscribe({
        next: () => {
          this.loadEvents();
          this.loadPastEvents();
          this.resetForm();
          this.showSuccessSnackBar();
        },
        error: (error) => this.showErrorSnackBar(error.error.message)
      });
    }
  }

  protected deleteEvent(id: number): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {
          type: 'event',
          id: id,
        }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.loadEvents();
        this.loadPastEvents();
        this.showSuccessSnackBar();
      })
    }
  }

  private checkAdminStatus(): void {
    this.userService.getBasicInfo(
      this.localStorageService.get('userId')
    ).subscribe((response) => {
      this.isAdmin = response.role === 'ADMIN';
    })
  }

  private loadEvents(): void {
    this.eventService.getCurrentEvents().subscribe(events => {
      this.events = events;
    });
  }

  private loadPastEvents(): void {
    this.eventService.getPastEvents().subscribe(events => {
      this.pastEvents = events;
    });
  }

  private resetForm(): void {
    this.eventForm.reset();
    this.eventForm.untouched;
    this.editMode = false;
    this.currentEventId = null;
    this.errorMatcher.setResetFlag(true);
  }

  private showSuccessSnackBar() {
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

  private showErrorSnackBar(error: string) {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'error',
        message: error
      },
      panelClass: 'error-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private createForm(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
    });
  }
}
