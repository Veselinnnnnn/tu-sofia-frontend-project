import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWalkComponent } from './request-walk.component';

describe('HistoryComponent', () => {
  let component: RequestWalkComponent;
  let fixture: ComponentFixture<RequestWalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestWalkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestWalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
