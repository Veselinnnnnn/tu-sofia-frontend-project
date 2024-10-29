import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StyledToastComponent } from '../../../../shared/components/styled-toast/styled-toast.component';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.scss'
})
export class ContactUsPageComponent implements OnInit {
  protected contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  protected onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.sendEmail(this.contactForm.value).subscribe(
        () => {
          this.showSuccessSnackBar();
        },
        (error) => {
          this.showErrorSnackBar(error.error.message);
        }
      )
    }
  }

  private createForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['adoption', Validators.required],
      message: ['', Validators.required],
    });
  }

  private showSuccessSnackBar(): void {
    this.snackBar.openFromComponent(StyledToastComponent, {
      duration: 5000,
      data: {
        icon: 'done',
        message: 'The email has been sent successfully!'
      },
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private showErrorSnackBar(message: string): void {
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
