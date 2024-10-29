import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../../core/services/testimonial/testimonial.service';
import { Router } from '@angular/router';
import { TestimonialResponseModel } from '../../../../core/model/testimonial/TestimonialResponse.model';
import { MatDialog } from '@angular/material/dialog';
import { TestimonialDialogComponent } from '../testimonial-dialog/testimonial-dialog.component';
import { DeleteDialogComponent } from '../../../../core/components/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-testimonial-page',
  templateUrl: './testimonial-page.component.html',
  styleUrl: './testimonial-page.component.scss'
})
export class TestimonialPageComponent implements OnInit{
  protected testimonials: TestimonialResponseModel[] = [];
  private userId: string | null = localStorage.getItem('userId');

  constructor(
    private testimonialService: TestimonialService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() : void {
    this.loadTestimonials();
  }

  protected navigateBack(): void {
    this.router.navigateByUrl('/');
  }

  protected openEditDialog(testimonial: TestimonialResponseModel): void {
    const dialogRef = this.dialog.open(TestimonialDialogComponent, {
      width: '600px',
      data: { testimonial }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTestimonials();
      }
    });
  }

  protected deleteTestimonial(testimonialId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        type: 'testimonial',
        id: Number(testimonialId),
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTestimonials();
    })
  }

  protected isUserTestimonial(testimonial: TestimonialResponseModel): boolean {
    return testimonial.user?.id.toString() === this.userId;
  }

  protected getUserDisplayName(user: { firstName: string; lastName: string }): string {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}. ${user.lastName}`;
    }

    return 'Unknown User';
  }

  private loadTestimonials(): void {
    this.testimonialService.getAllTestimonials().subscribe((response) => {
      this.testimonials = response;
    });
  }
}
