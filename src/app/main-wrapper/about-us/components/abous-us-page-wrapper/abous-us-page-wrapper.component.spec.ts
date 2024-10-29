import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbousUsPageWrapperComponent } from './abous-us-page-wrapper.component';

describe('AbousUsPageWrapperComponent', () => {
  let component: AbousUsPageWrapperComponent;
  let fixture: ComponentFixture<AbousUsPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbousUsPageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbousUsPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
