import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsPageWrapperComponent } from './contact-us-page-wrapper.component';

describe('ContactUsPageWrapperComponent', () => {
  let component: ContactUsPageWrapperComponent;
  let fixture: ComponentFixture<ContactUsPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsPageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
