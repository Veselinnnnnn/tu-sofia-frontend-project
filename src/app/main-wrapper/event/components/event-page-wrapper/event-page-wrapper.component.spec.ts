import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPageWrapperComponent } from './event-page-wrapper.component';

describe('EventPageWrapperComponent', () => {
  let component: EventPageWrapperComponent;
  let fixture: ComponentFixture<EventPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventPageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
