import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialDialogComponent } from './testimonial-dialog.component';

describe('TestimonialDialogComponent', () => {
  let component: TestimonialDialogComponent;
  let fixture: ComponentFixture<TestimonialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
