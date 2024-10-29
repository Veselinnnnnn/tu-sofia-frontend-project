import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialPageWrapperComponent } from './testimonial-page-wrapper.component';

describe('TestimonialPageWrapperComponent', () => {
  let component: TestimonialPageWrapperComponent;
  let fixture: ComponentFixture<TestimonialPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialPageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
