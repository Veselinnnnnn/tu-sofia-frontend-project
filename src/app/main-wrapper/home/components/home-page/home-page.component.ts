import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../../../core/services/animal/animal.service';
import { AnimalResponseModel } from '../../../../core/model/animal/AnimalResponse.model';
import { Router } from '@angular/router';
import { TestimonialService } from '../../../../core/services/testimonial/testimonial.service';
import { MatDialog } from '@angular/material/dialog';
import { TestimonialResponseModel } from '../../../../core/model/testimonial/TestimonialResponse.model';
import {
  TestimonialDialogComponent
} from '../../../testimonial/components/testimonial-dialog/testimonial-dialog.component';
import { PaypalDialogComponent } from '../paypal-dialog/paypal-dialog.component';
import { EventService } from '../../../../core/services/event/event.service';
import { EventResponseModel } from '../../../../core/model/event/EventResponse.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  protected featuredPets: AnimalResponseModel[] = [];
  protected testimonials: TestimonialResponseModel[] = [];
  protected displayedTestimonials: TestimonialResponseModel[] = [];
  protected events: EventResponseModel[] = [];
  protected isFeedbackEmpty: boolean = true;
  protected goalAmount: number = 1000;
  protected currentDonations: number = 600;

  constructor(
    private router: Router,
    private animalService: AnimalService,
    private testimonialService: TestimonialService,
    private dialog: MatDialog,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.animalService.getFeaturePets().subscribe((response) => {
      this.featuredPets = response;
    });

    this.loadUpcomingEvents();
    this.loadTestimonials();
  }

  protected get progress(): number {
    return (this.currentDonations / this.goalAmount) * 100;
  }

  protected openDonateDialog(): void {
    this.dialog.open(PaypalDialogComponent);
  }

  protected loadTestimonials(): void {
    this.testimonialService.getAllTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data;
        this.isFeedbackEmpty = this.testimonials.length === 0;

        this.displayedTestimonials = this.getRandomTestimonials(3);
      },
    });
  }

  protected getUserDisplayName(user: { firstName: string; lastName: string }): string {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}. ${user.lastName}`;
    }

    return 'Unknown User';
  }

  protected getRandomTestimonials(count: number): TestimonialResponseModel[] {
    const shuffled = this.testimonials.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  protected navigateToAvailableAnimals(): void {
    this.router.navigateByUrl('/available-animals');
  }

  protected navigateToAnimalDetails(animal: AnimalResponseModel): void {
    this.router.navigate(['available-animals/animal', animal.id]);
  }

  protected openTestimonialDialog(): void {
    const dialogRef = this.dialog.open(TestimonialDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTestimonials();
      }
    });
  }

  private loadUpcomingEvents(): void {
    this.eventService.getCurrentEvents().subscribe({
      next: (data) => {
        if (data.length === 0) {
        } else {
          this.events = data.slice(0, 3);
        }
      },
    });
  }
}
