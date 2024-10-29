import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdoptionComponent } from './request-adoption.component';

describe('RequestAdoptionComponent', () => {
  let component: RequestAdoptionComponent;
  let fixture: ComponentFixture<RequestAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestAdoptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
